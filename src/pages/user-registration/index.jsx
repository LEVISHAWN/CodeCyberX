import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import RegistrationForm from './components/RegistrationForm';
import OAuthButtons from './components/OAuthButtons';
import RegistrationProgress from './components/RegistrationProgress';
import PolicyModal from './components/PolicyModal';
import SuccessMessage from './components/SuccessMessage';
import Icon from '../../components/AppIcon';

const UserRegistration = () => {
  const navigate = useNavigate();
  const { signUp, signInWithOAuth, loading } = useAuth();
  const [registrationStep, setRegistrationStep] = useState(1);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [policyType, setPolicyType] = useState('terms');
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  const handleRegistration = async (formData) => {
    setRegistrationError(null);
    
    try {
      const { data, error } = await signUp(formData?.email, formData?.password, {
        full_name: formData?.fullName,
        experience_level: formData?.experienceLevel,
        newsletter_subscription: formData?.subscribeNewsletter
      });
      
      if (error) {
        if (error?.message?.includes('User already registered')) {
          setRegistrationError('user_exists');
        } else if (error?.message?.includes('Password should be at least 6 characters')) {
          setRegistrationError('weak_password');
        } else if (error?.message?.includes('Unable to validate email address')) {
          setRegistrationError('invalid_email');
        } else {
          setRegistrationError('registration_failed');
        }
        return;
      }

      if (data?.user) {
        setUserEmail(formData?.email);
        setRegistrationComplete(true);
      }
      
    } catch (error) {
      console.error('Registration failed:', error);
      setRegistrationError('network_error');
    }
  };

  const handleOAuthSignUp = async (provider) => {
    setRegistrationError(null);
    
    try {
      const { error } = await signInWithOAuth(provider);
      
      if (error) {
        setRegistrationError('oauth_error');
      }
      // OAuth redirects are handled automatically by Supabase
    } catch (error) {
      console.error(`${provider} registration failed:`, error);
      setRegistrationError('oauth_error');
    }
  };

  const handlePolicyClick = (type) => {
    setPolicyType(type);
    setShowPolicyModal(true);
  };

  const handleContinueToDashboard = () => {
    navigate('/learning-path-catalog');
  };

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Registration Successful - SecureCodeHub</title>
          <meta name="description" content="Welcome to SecureCodeHub! Your account has been created successfully." />
        </Helmet>
        
        <Header />
        
        <main className="pt-16">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              <SuccessMessage 
                userEmail={userEmail}
                onContinue={handleContinueToDashboard}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Create Account - SecureCodeHub</title>
        <meta name="description" content="Join SecureCodeHub and start your journey in secure coding. Create your account to access interactive learning paths and cybersecurity training." />
        <meta name="keywords" content="secure coding, cybersecurity training, programming education, account registration" />
      </Helmet>
      
      <Header />
      
      <main className="pt-16">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">
                  Join SecureCodeHub
                </h1>
                <p className="text-muted-foreground">
                  Start your journey in secure coding and cybersecurity
                </p>
              </div>
            </div>

            {/* Progress Indicator */}
            <RegistrationProgress 
              currentStep={registrationStep}
              totalSteps={3}
            />

            {/* Registration Form Card */}
            <div className="bg-card border border-border rounded-lg shadow-subtle p-6 space-y-6">
              {/* Display registration error */}
              {registrationError && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-lg flex items-center space-x-3">
                  <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0" />
                  <div className="text-sm text-error">
                    {registrationError === 'user_exists' ? 'An account with this email already exists. Please sign in instead.' :
                     registrationError === 'weak_password' ? 'Password must be at least 6 characters long.' :
                     registrationError === 'invalid_email' ? 'Please enter a valid email address.' :
                     registrationError === 'oauth_error' ? 'OAuth registration failed. Please try again.' :
                     registrationError === 'network_error'? 'Network error. Please check your connection and try again.' : 'Registration failed. Please try again.'}
                  </div>
                </div>
              )}

              {/* OAuth Buttons */}
              <OAuthButtons
                onGoogleSignUp={() => handleOAuthSignUp('google')}
                onGitHubSignUp={() => handleOAuthSignUp('github')}
                isLoading={loading}
              />

              {/* Registration Form */}
              <RegistrationForm
                onSubmit={handleRegistration}
                isLoading={loading}
                onPolicyClick={handlePolicyClick}
              />
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  to="/user-login" 
                  className="text-primary hover:underline font-medium"
                >
                  Sign in instead
                </Link>
              </p>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Lock" size={12} />
              <span>Your data is protected with enterprise-grade security</span>
            </div>

            {/* Demo Information */}
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">
                    Supabase Authentication
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Your account will be created using Supabase authentication. You'll receive a confirmation email to verify your account.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Policy Modal */}
      <PolicyModal
        isOpen={showPolicyModal}
        onClose={() => setShowPolicyModal(false)}
        type={policyType}
      />
    </div>
  );
};

export default UserRegistration;