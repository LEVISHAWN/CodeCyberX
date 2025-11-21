import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PerformanceKPIs from './components/PerformanceKPIs';
import LearningVelocityChart from './components/LearningVelocityChart';
import SkillsRadarChart from './components/SkillsRadarChart';
import AchievementsSection from './components/AchievementsSection';
import TimeAnalytics from './components/TimeAnalytics';
import ExportSection from './components/ExportSection';

const ProgressAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'skills', label: 'Skills', icon: 'Target' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' },
    { id: 'time', label: 'Time Analytics', icon: 'Clock' },
    { id: 'export', label: 'Export & Share', icon: 'Share2' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <PerformanceKPIs />
            <LearningVelocityChart />
          </div>
        );
      case 'skills':
        return <SkillsRadarChart />;
      case 'achievements':
        return <AchievementsSection />;
      case 'time':
        return <TimeAnalytics />;
      case 'export':
        return <ExportSection />;
      default:
        return (
          <div className="space-y-8">
            <PerformanceKPIs />
            <LearningVelocityChart />
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Progress Analytics - SecureCodeHub</title>
        <meta name="description" content="Comprehensive learning insights and performance tracking across programming and cybersecurity modules with data-driven recommendations." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Progress Analytics</h1>
                  <p className="text-muted-foreground mt-2">
                    Comprehensive insights into your learning journey and performance metrics
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Icon name="RefreshCw" size={16} className="mr-2" />
                    Refresh Data
                  </Button>
                  <Button variant="default" size="sm">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Customize
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-8">
              <div className="border-b border-border">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {renderTabContent()}
            </div>

            {/* Quick Stats Footer */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">127.5</div>
                    <div className="text-xs text-muted-foreground">Total Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">24</div>
                    <div className="text-xs text-muted-foreground">Modules Done</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">15</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">78%</div>
                    <div className="text-xs text-muted-foreground">Progress</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={14} />
                  <span>Last updated: {new Date()?.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProgressAnalytics;