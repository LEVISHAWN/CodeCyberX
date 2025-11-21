import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserContextMenu = ({
  user = null,
  isAuthenticated = false,
  onLogin,
  onLogout,
  onRegister,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    onLogout?.();
  };

  const userInitials = user?.name 
    ? user?.name?.split(' ')?.map(n => n?.[0])?.join('')?.toUpperCase()
    : 'U';

  const userProgress = user?.progress || {
    completedPaths: 0,
    totalPaths: 5,
    currentStreak: 0,
    level: 'Beginner'
  };

  if (!isAuthenticated) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogin}
          iconName="LogIn"
          iconPosition="left"
        >
          Sign In
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={onRegister}
          iconName="UserPlus"
          iconPosition="left"
        >
          Get Started
        </Button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
          {user?.avatar ? (
            <img 
              src={user?.avatar} 
              alt={user?.name || 'User'} 
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            userInitials
          )}
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-foreground">
            {user?.name || 'User'}
          </div>
          <div className="text-xs text-muted-foreground">
            {userProgress?.level}
          </div>
        </div>
        <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
      </Button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevated z-50">
          {/* User Info Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-lg font-medium">
                {user?.avatar ? (
                  <img 
                    src={user?.avatar} 
                    alt={user?.name || 'User'} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  userInitials
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-popover-foreground truncate">
                  {user?.name || 'User'}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email || 'user@example.com'}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Icon name="Award" size={12} className="text-primary" />
                  <span className="text-xs text-muted-foreground">
                    {userProgress?.level}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="p-4 border-b border-border">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {userProgress?.completedPaths}
                </div>
                <div className="text-xs text-muted-foreground">
                  Paths Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground flex items-center justify-center space-x-1">
                  <Icon name="Flame" size={16} className="text-warning" />
                  <span>{userProgress?.currentStreak}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Day Streak
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-fast"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="User" size={16} className="mr-3" />
              Profile & Settings
            </Link>
            
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-fast"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="BarChart3" size={16} className="mr-3" />
              Learning Dashboard
            </Link>
            
            <Link
              to="/achievements"
              className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-fast"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="Trophy" size={16} className="mr-3" />
              Achievements
            </Link>
            
            <Link
              to="/certificates"
              className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-fast"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="Award" size={16} className="mr-3" />
              Certificates
            </Link>

            <div className="border-t border-border my-2"></div>
            
            <Link
              to="/help"
              className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-fast"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="HelpCircle" size={16} className="mr-3" />
              Help & Support
            </Link>
            
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-fast"
              onClick={() => setIsOpen(false)}
            >
              <Icon name="Settings" size={16} className="mr-3" />
              Preferences
            </Link>

            <div className="border-t border-border my-2"></div>
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-fast"
            >
              <Icon name="LogOut" size={16} className="mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default UserContextMenu;