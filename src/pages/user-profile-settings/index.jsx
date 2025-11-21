import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import ProfileInformation from './components/ProfileInformation';
import LearningPreferences from './components/LearningPreferences';
import PrivacyControls from './components/PrivacyControls';
import AccountSecurity from './components/AccountSecurity';
import NotificationSettings from './components/NotificationSettings';
import AchievementShowcase from './components/AchievementShowcase';
import DataExport from './components/DataExport';

const UserProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      component: ProfileInformation
    },
    {
      id: 'learning',
      label: 'Learning',
      icon: 'BookOpen',
      component: LearningPreferences
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: 'Shield',
      component: PrivacyControls
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Lock',
      component: AccountSecurity
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      component: NotificationSettings
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: 'Award',
      component: AchievementShowcase
    },
    {
      id: 'data',
      label: 'Data Export',
      icon: 'Download',
      component: DataExport
    }
  ];

  const ActiveComponent = tabs?.find(tab => tab?.id === activeTab)?.component || ProfileInformation;

  return (
    <>
      <Helmet>
        <title>Profile Settings - SecureCodeHub</title>
        <meta name="description" content="Manage your account settings, learning preferences, privacy controls, and security options on SecureCodeHub." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={20} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
                  <p className="text-muted-foreground">
                    Manage your account, preferences, and privacy settings
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop Sidebar Navigation */}
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                  <nav className="space-y-1">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                          activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={tab?.icon} size={16} />
                        <span>{tab?.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Mobile Tab Navigation */}
              <div className="lg:hidden">
                <div className="bg-card border border-border rounded-lg p-2 mb-6">
                  <div className="flex overflow-x-auto space-x-1">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-smooth ${
                          activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={tab?.icon} size={16} />
                        <span className="hidden sm:inline">{tab?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
                <div className="bg-card border border-border rounded-lg">
                  {/* Mobile Tab Header */}
                  <div className="lg:hidden border-b border-border p-4">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={tabs?.find(tab => tab?.id === activeTab)?.icon || 'User'} 
                        size={20} 
                        color="var(--color-primary)" 
                      />
                      <h2 className="text-xl font-semibold text-foreground">
                        {tabs?.find(tab => tab?.id === activeTab)?.label || 'Profile'}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <ActiveComponent />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UserProfileSettings;