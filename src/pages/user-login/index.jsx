import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import WelcomeMessage from './components/WelcomeMessage';
import OAuthButtons from './components/OAuthButtons';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';

const UserLogin = () => {
  const navigate = useNavigate();
  const { signIn, signInWithOAuth, loading } = useAuth();
  const [error, setError] = useState(null);

  const handleLogin = async (formData) => {
    setError(null);

    try {
      const { data, error: authError } = await signIn(formData?.email, formData?.password);
      
      if (authError) {
        if (authError?.message?.includes('Invalid login credentials')) {
          setError('invalid_credentials');
        } else if (authError?.message?.includes('Email not confirmed')) {
          setError('email_not_confirmed');
        } else {
          setError('network_error');
        }
        return;
      }

      if (data?.user) {
        // Navigate to learning dashboard on successful login
        navigate('/learning-path-catalog');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('network_error');
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);

    try {
      const { error: authError } = await signInWithOAuth('google');
      
      if (authError) {
        setError('oauth_error');
      }
      // OAuth redirects are handled automatically by Supabase
    } catch (err) {
      console.error('Google login error:', err);
      setError('oauth_error');
    }
  };

  const handleGitHubLogin = async () => {
    setError(null);

    try {
      const { error: authError } = await signInWithOAuth('github');
      
      if (authError) {
        setError('oauth_error');
      }
      // OAuth redirects are handled automatically by Supabase
    } catch (err) {
      console.error('GitHub login error:', err);
      setError('oauth_error');
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - SecureCodeHub</title>
        <meta name="description" content="Sign in to SecureCodeHub to continue your secure coding journey. Access interactive lessons, track progress, and join our community of security-aware developers." />
        <meta name="keywords" content="secure coding, login, cybersecurity training, programming education" />
      </Helmet>
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl shadow-elevated p-8">
            <WelcomeMessage />
            
            <div className="space-y-6">
              <OAuthButtons
                onGoogleLogin={handleGoogleLogin}
                onGitHubLogin={handleGitHubLogin}
                isLoading={loading}
              />
              
              <LoginForm
                onSubmit={handleLogin}
                isLoading={loading}
                error={error}
              />
            </div>
            
            <SecurityBadges />
          </div>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="text-sm font-medium text-primary mb-2">Demo Credentials</h3>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Email:</strong> demo@securecodehub.com</p>
              <p><strong>Password:</strong> SecurePass123</p>
              <p><strong>Email:</strong> test@example.com</p>
              <p><strong>Password:</strong> SecureTest123!</p>
              <p className="mt-2 text-primary">Use these credentials to test the login functionality</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;