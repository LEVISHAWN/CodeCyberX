import React from 'react';
import { Link } from 'react-router-dom';

const LoginFooter = () => {
  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            New to SecureCodeHub?
          </span>
        </div>
      </div>

      {/* Registration Link */}
      <div className="text-center">
        <Link
          to="/user-registration"
          className="text-primary hover:text-primary/80 font-medium transition-smooth"
        >
          Create your account
        </Link>
      </div>

      {/* Additional Links */}
      <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
        <Link to="/privacy" className="hover:text-foreground transition-smooth">
          Privacy Policy
        </Link>
        <Link to="/terms" className="hover:text-foreground transition-smooth">
          Terms of Service
        </Link>
        <Link to="/help" className="hover:text-foreground transition-smooth">
          Help Center
        </Link>
      </div>
    </div>
  );
};

export default LoginFooter;