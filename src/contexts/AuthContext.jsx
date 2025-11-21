import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/*
  AuthContext

  Purpose:
  - Centralize authentication state and helpers for the app.
  - Expose a small API to components: `user`, `userProfile`, `loading`, and
    actions like `signIn`, `signUp`, `signOut`, `signInWithOAuth`.

  Important implementation notes:
  - This context subscribes to Supabase's auth state changes (onAuthStateChange)
    and keeps the `user` state in sync with Supabase.
  - When a user is present, the provider attempts to load a richer
    `userProfile` from the `user_profiles` table. The profile loading is
    separated into `profileOperations` to keep async code organized and testable.
  - The initial session is read using `supabase.auth.getSession()` to
    bootstrap `user` on first render.
  - All public methods return `{ data, error }` or `{ error }` to make it easy
    for callers to display UI feedback. They also toggle `loading` for
    UX purposes.

  Security / production considerations:
  - Make sure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correctly
    set in your environment for both dev and production.
  - Ensure RLS policies exist for `user_profiles` as migration SQL in
    `supabase/migrations` configures; otherwise profile queries may return
    empty results or 403 errors.
*/

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  // Public auth state
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)

  /*
    profileOperations groups profile-related async functions so the auth
    handlers can call them without duplicating code. This pattern improves
    readability and makes it easier to stub the operations in tests.
  */
  const profileOperations = {
    async load(userId) {
      if (!userId) return
      setProfileLoading(true)
      try {
        // Query the user_profiles table for the authenticated user's profile.
        // Use `.single()` because we expect exactly one profile per user.
        const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single()
        if (!error && data) {
          setUserProfile(data)
        }
      } catch (err) {
        // Log to console in dev. In production consider reporting to an
        // observability service for debugging.
        // eslint-disable-next-line no-console
        console.error('Profile loading error:', err)
      } finally {
        setProfileLoading(false)
      }
    },

    clear() {
      setUserProfile(null)
      setProfileLoading(false)
    }
  }

  /*
    authStateHandlers centralizes callbacks from supabase auth. The
    `onChange` function intentionally keeps a simple synchronous signature
    because supabase will call it for auth state events.
  */
  const authStateHandlers = {
    // Keep this function signature stable: (event, session)
    onChange: (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)

      // If a session exists, load the richer profile record from our
      // `user_profiles` table. This is fire-and-forget; the state will update
      // when the load completes. If no session, clear any existing profile.
      if (session?.user) {
        profileOperations?.load(session?.user?.id)
      } else {
        profileOperations?.clear()
      }
    }
  }

  useEffect(() => {
    // Bootstrap initial session and register the auth state change
    // subscription. We read the initial session to populate state on page
    // refreshes.
    supabase?.auth?.getSession()?.then(({ data: { session } }) => {
      authStateHandlers?.onChange(null, session)
    })

    // Subscribe to auth changes; this ensures the context reacts to sign-in,
    // sign-out, token refreshes and other auth events from Supabase.
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(
      authStateHandlers?.onChange
    )

    // Cleanup the subscription when the provider unmounts
    return () => subscription?.unsubscribe()
  }, [])

  /*
    Public auth actions. Each returns Supabase's result so callers can handle
    success/error and display UI feedback.
  */
  const signUp = async (email, password, options = {}) => {
    try {
      setLoading(true)
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: options
        }
      })
      return { data, error }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Sign up error:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      })
      return { data, error }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Sign in error:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase?.auth?.signOut()
      return { error }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Sign out error:', error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  /*
    signInWithOAuth opens the provider sign-in flow. Set `redirectTo` to an
    app path that the provider should return to after completing OAuth.
  */
  const signInWithOAuth = async (provider) => {
    try {
      const { data, error } = await supabase?.auth?.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location?.origin}/learning-path-catalog`
        }
      })
      return { data, error }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('OAuth sign in error:', error)
      return { data: null, error }
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    profileLoading,
    signUp,
    signIn,
    signOut,
    signInWithOAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}