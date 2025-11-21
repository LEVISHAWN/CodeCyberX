import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-4">
      {/* Logo */}
      <Link to="/" className="inline-flex items-center space-x-2">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
          <Icon name="Shield" size={24} color="white" />
        </div>
        <span className="text-2xl font-bold text-foreground">SecureCodeHub</span>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
        <p className="text-muted-foreground">
          Sign in to continue your secure coding journey
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;