import React from 'react';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessMessage = ({ userEmail, onContinue }) => {
  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircle" size={32} className="text-success" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Welcome to SecureCodeHub!
        </h2>
        <p className="text-muted-foreground">
          Your account has been created successfully.
        </p>
      </div>

      <div className="bg-muted/50 border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Mail" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            Verification email sent
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          We've sent a verification email to <strong>{userEmail}</strong>. 
          Please check your inbox and click the verification link to activate your account.
        </p>
      </div>

      <div className="space-y-4">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={onContinue}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Dashboard
        </Button>
        
        <div className="text-sm text-muted-foreground">
          Didn't receive the email? 
          <button className="text-primary hover:underline ml-1">
            Resend verification
          </button>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          What's Next?
        </h3>
        <div className="grid gap-4 text-left">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="BookOpen" size={12} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">
                Explore Learning Paths
              </h4>
              <p className="text-xs text-muted-foreground">
                Discover curated courses tailored to your experience level
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Code" size={12} className="text-secondary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">
                Start Coding
              </h4>
              <p className="text-xs text-muted-foreground">
                Practice with our interactive code editor and real-time feedback
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Users" size={12} className="text-accent" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">
                Join the Community
              </h4>
              <p className="text-xs text-muted-foreground">
                Connect with fellow learners and security experts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;