import { createClient } from '@supabase/supabase-js';

/*
	Supabase client initialization

	- This file creates and exports a single Supabase client instance used by the
		rest of the application.
	- Vite exposes environment variables that start with VITE_ via
		`import.meta.env`. Make sure `VITE_SUPABASE_URL` and
		`VITE_SUPABASE_ANON_KEY` are defined in your `.env` (or your environment)
		before running the app.
	- Keep this module simple and side-effect free. Any additional helper
		functions that use `supabase` should be placed in `src/lib/*` so they are
		testable and reusable.
*/

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY

// Defensive warning for developers: runtime will fail if these are undefined.
if (!supabaseUrl || !supabaseAnonKey) {
	// We only log here; do not throw so the app can still render during early
	// development. Missing keys will lead to auth/DB errors when calling Supabase.
	// Replace with a stricter check if you want fail-fast behavior in CI.
	// eslint-disable-next-line no-console
	console.warn('[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. Supabase client requests will fail.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/*
	Usage examples:

		import { supabase } from '../lib/supabase'

		// Auth
		await supabase.auth.signInWithPassword({ email, password })

		// Query
		const { data, error } = await supabase.from('user_profiles').select('*')

	Keep network calls out of React render functions; prefer hooks or
	helper modules that abstract requests and handle loading/error states.
*/