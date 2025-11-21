import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    // Email Notifications
    emailEnabled: true,
    courseUpdates: true,
    achievementEmails: true,
    weeklyProgress: true,
    securityAlerts: true,
    communityDigest: false,
    
    // Push Notifications
    pushEnabled: true,
    learningReminders: true,
    streakReminders: true,
    newMessages: true,
    mentorshipRequests: true,
    
    // In-App Notifications
    inAppEnabled: true,
    realTimeUpdates: true,
    systemAnnouncements: true,
    
    // Frequency Settings
    reminderFrequency: 'daily',
    digestFrequency: 'weekly',
    quietHoursEnabled: true,
    quietStart: '22:00',
    quietEnd: '08:00'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const frequencyOptions = [
    { value: 'realtime', label: 'Real-time' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'never', label: 'Never' }
  ];

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i?.toString()?.padStart(2, '0');
    return { value: `${hour}:00`, label: `${hour}:00` };
  });

  const handleCheckboxChange = (field, checked) => {
    setNotifications(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSelectChange = (field, value) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSaveMessage('Notification settings updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleTestNotification = () => {
    // Simulate test notification
    setSaveMessage('Test notification sent! Check your email and device.');
    setTimeout(() => setSaveMessage(''), 3000);
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
      {/* Email Notifications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">Email Notifications</h3>
          </div>
          <Checkbox
            checked={notifications?.emailEnabled}
            onChange={(e) => handleCheckboxChange('emailEnabled', e?.target?.checked)}
            size="lg"
          />
        </div>

        {notifications?.emailEnabled && (
          <div className="ml-6 space-y-3">
            <Checkbox
              label="Course updates and announcements"
              description="Get notified about new courses, updates, and important announcements"
              checked={notifications?.courseUpdates}
              onChange={(e) => handleCheckboxChange('courseUpdates', e?.target?.checked)}
            />

            <Checkbox
              label="Achievement and milestone emails"
              description="Receive emails when you earn badges, complete courses, or reach milestones"
              checked={notifications?.achievementEmails}
              onChange={(e) => handleCheckboxChange('achievementEmails', e?.target?.checked)}
            />

            <Checkbox
              label="Weekly progress summary"
              description="Get a weekly email with your learning progress and recommendations"
              checked={notifications?.weeklyProgress}
              onChange={(e) => handleCheckboxChange('weeklyProgress', e?.target?.checked)}
            />

            <Checkbox
              label="Security alerts"
              description="Important security notifications about your account"
              checked={notifications?.securityAlerts}
              onChange={(e) => handleCheckboxChange('securityAlerts', e?.target?.checked)}
            />

            <Checkbox
              label="Community digest"
              description="Weekly roundup of popular discussions and community highlights"
              checked={notifications?.communityDigest}
              onChange={(e) => handleCheckboxChange('communityDigest', e?.target?.checked)}
            />
          </div>
        )}
      </div>
      {/* Push Notifications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Smartphone" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">Push Notifications</h3>
          </div>
          <Checkbox
            checked={notifications?.pushEnabled}
            onChange={(e) => handleCheckboxChange('pushEnabled', e?.target?.checked)}
            size="lg"
          />
        </div>

        {notifications?.pushEnabled && (
          <div className="ml-6 space-y-3">
            <Checkbox
              label="Learning reminders"
              description="Gentle reminders to continue your learning journey"
              checked={notifications?.learningReminders}
              onChange={(e) => handleCheckboxChange('learningReminders', e?.target?.checked)}
            />

            <Checkbox
              label="Streak reminders"
              description="Don't break your learning streak! Get reminded to practice daily"
              checked={notifications?.streakReminders}
              onChange={(e) => handleCheckboxChange('streakReminders', e?.target?.checked)}
            />

            <Checkbox
              label="New messages"
              description="Get notified when you receive direct messages or forum replies"
              checked={notifications?.newMessages}
              onChange={(e) => handleCheckboxChange('newMessages', e?.target?.checked)}
            />

            <Checkbox
              label="Mentorship requests"
              description="Notifications for new mentorship opportunities and requests"
              checked={notifications?.mentorshipRequests}
              onChange={(e) => handleCheckboxChange('mentorshipRequests', e?.target?.checked)}
            />
          </div>
        )}
      </div>
      {/* In-App Notifications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">In-App Notifications</h3>
          </div>
          <Checkbox
            checked={notifications?.inAppEnabled}
            onChange={(e) => handleCheckboxChange('inAppEnabled', e?.target?.checked)}
            size="lg"
          />
        </div>

        {notifications?.inAppEnabled && (
          <div className="ml-6 space-y-3">
            <Checkbox
              label="Real-time updates"
              description="Show notifications as they happen while using the platform"
              checked={notifications?.realTimeUpdates}
              onChange={(e) => handleCheckboxChange('realTimeUpdates', e?.target?.checked)}
            />

            <Checkbox
              label="System announcements"
              description="Important platform updates and maintenance notifications"
              checked={notifications?.systemAnnouncements}
              onChange={(e) => handleCheckboxChange('systemAnnouncements', e?.target?.checked)}
            />
          </div>
        )}
      </div>
      {/* Notification Frequency */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Frequency Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Learning reminder frequency"
            options={frequencyOptions}
            value={notifications?.reminderFrequency}
            onChange={(value) => handleSelectChange('reminderFrequency', value)}
            description="How often to remind you about learning"
          />

          <Select
            label="Digest email frequency"
            options={frequencyOptions?.filter(opt => opt?.value !== 'realtime')}
            value={notifications?.digestFrequency}
            onChange={(value) => handleSelectChange('digestFrequency', value)}
            description="Frequency of summary emails"
          />
        </div>
      </div>
      {/* Quiet Hours */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Moon" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Quiet Hours</h3>
        </div>

        <Checkbox
          label="Enable quiet hours"
          description="Pause non-urgent notifications during specified hours"
          checked={notifications?.quietHoursEnabled}
          onChange={(e) => handleCheckboxChange('quietHoursEnabled', e?.target?.checked)}
        />

        {notifications?.quietHoursEnabled && (
          <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Quiet hours start"
              options={timeOptions}
              value={notifications?.quietStart}
              onChange={(value) => handleSelectChange('quietStart', value)}
            />

            <Select
              label="Quiet hours end"
              options={timeOptions}
              value={notifications?.quietEnd}
              onChange={(value) => handleSelectChange('quietEnd', value)}
            />
          </div>
        )}
      </div>
      {/* Notification Preview */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Preview & Test</h3>
        </div>

        <div className="p-4 bg-muted rounded-md">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Trophy" size={16} color="white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Achievement Unlocked!</p>
              <p className="text-sm text-muted-foreground">
                You've completed the "JavaScript Security Fundamentals" course. Great job!
              </p>
              <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleTestNotification}
            iconName="Send"
            iconPosition="left"
          >
            Send Test Notification
          </Button>
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-start pt-4 border-t border-border">
        <Button
          variant="default"
          onClick={handleSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;