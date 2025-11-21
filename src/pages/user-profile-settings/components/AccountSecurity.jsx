import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/input';


const AccountSecurity = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [errors, setErrors] = useState({});

  const activeSessions = [
    {
      id: 1,
      device: "MacBook Pro",
      browser: "Chrome 118.0",
      location: "New York, NY",
      lastActive: "2 minutes ago",
      current: true
    },
    {
      id: 2,
      device: "iPhone 14",
      browser: "Safari Mobile",
      location: "New York, NY",
      lastActive: "1 hour ago",
      current: false
    },
    {
      id: 3,
      device: "Windows PC",
      browser: "Firefox 119.0",
      location: "Boston, MA",
      lastActive: "3 days ago",
      current: false
    }
  ];

  const connectedAccounts = [
    {
      provider: "Google",
      email: "john.doe@gmail.com",
      connected: true,
      icon: "Mail"
    },
    {
      provider: "GitHub",
      username: "johndoe",
      connected: true,
      icon: "Github"
    },
    {
      provider: "LinkedIn",
      username: "john-doe-dev",
      connected: false,
      icon: "Linkedin"
    }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear errors when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!passwordData?.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handlePasswordSubmit = async () => {
    if (!validatePassword()) return;
    
    setIsChangingPassword(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setSaveMessage('Password updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleToggle2FA = async () => {
    setIsEnabling2FA(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTwoFactorEnabled(!twoFactorEnabled);
    setIsEnabling2FA(false);
    setSaveMessage(`Two-factor authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'} successfully!`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleRevokeSession = (sessionId) => {
    // Handle session revocation
    // TODO: Implement session revocation logic
  };

  const handleConnectAccount = (provider) => {
    // Handle OAuth connection
    // TODO: Implement OAuth connection logic
  };

  const handleDisconnectAccount = (provider) => {
    // Handle OAuth disconnection
    // TODO: Implement OAuth disconnection logic
  };

  return (
    <div className="space-y-8">
      {/* Success Message */}
      {saveMessage && (
        <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-md">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <span className="text-sm text-success">{saveMessage}</span>
        </div>
      )}
      {/* Change Password */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
        </div>

        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={passwordData?.currentPassword}
            onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
            error={errors?.currentPassword}
            required
          />

          <Input
            label="New Password"
            type="password"
            value={passwordData?.newPassword}
            onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
            error={errors?.newPassword}
            description="Must be at least 8 characters long"
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData?.confirmPassword}
            onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
          />

          <Button
            variant="default"
            onClick={handlePasswordSubmit}
            loading={isChangingPassword}
            iconName="Save"
            iconPosition="left"
          >
            Update Password
          </Button>
        </div>
      </div>
      {/* Two-Factor Authentication */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Smartphone" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
        </div>

        <div className="p-4 border border-border rounded-md">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={twoFactorEnabled ? "ShieldCheck" : "Shield"} 
                  size={16} 
                  color={twoFactorEnabled ? "var(--color-success)" : "var(--color-muted-foreground)"} 
                />
                <span className="font-medium text-foreground">
                  Two-Factor Authentication {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {twoFactorEnabled 
                  ? 'Your account is protected with 2FA. You\'ll need your authenticator app to sign in.' :'Add an extra layer of security to your account by enabling two-factor authentication.'
                }
              </p>
            </div>
            <Button
              variant={twoFactorEnabled ? "destructive" : "default"}
              onClick={handleToggle2FA}
              loading={isEnabling2FA}
              size="sm"
            >
              {twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
            </Button>
          </div>
        </div>
      </div>
      {/* Connected Accounts */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Link" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Connected Accounts</h3>
        </div>

        <div className="space-y-3">
          {connectedAccounts?.map((account) => (
            <div key={account?.provider} className="flex items-center justify-between p-4 border border-border rounded-md">
              <div className="flex items-center space-x-3">
                <Icon name={account?.icon} size={20} />
                <div>
                  <p className="font-medium text-foreground">{account?.provider}</p>
                  <p className="text-sm text-muted-foreground">
                    {account?.email || account?.username}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {account?.connected && (
                  <span className="flex items-center space-x-1 text-sm text-success">
                    <Icon name="CheckCircle" size={14} />
                    <span>Connected</span>
                  </span>
                )}
                <Button
                  variant={account?.connected ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => account?.connected 
                    ? handleDisconnectAccount(account?.provider)
                    : handleConnectAccount(account?.provider)
                  }
                >
                  {account?.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Active Sessions */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Monitor" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Active Sessions</h3>
        </div>

        <div className="space-y-3">
          {activeSessions?.map((session) => (
            <div key={session?.id} className="flex items-center justify-between p-4 border border-border rounded-md">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={session?.device?.includes('iPhone') ? "Smartphone" : "Monitor"} 
                  size={20} 
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-foreground">{session?.device}</p>
                    {session?.current && (
                      <span className="px-2 py-1 text-xs bg-success/10 text-success rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session?.browser} • {session?.location}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last active: {session?.lastActive}
                  </p>
                </div>
              </div>
              {!session?.current && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRevokeSession(session?.id)}
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button variant="destructive" size="sm" className="mt-4">
          Sign out of all other sessions
        </Button>
      </div>
    </div>
  );
};

export default AccountSecurity;