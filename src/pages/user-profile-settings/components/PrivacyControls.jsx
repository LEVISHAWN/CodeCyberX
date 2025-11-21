import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const PrivacyControls = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showProgress: true,
    showAchievements: true,
    allowDirectMessages: true,
    shareDataForImprovement: true,
    allowAnalytics: true,
    thirdPartyIntegrations: false,
    showOnLeaderboard: true,
    allowMentorshipRequests: true,
    shareCodeSubmissions: false
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can view your profile' },
    { value: 'community', label: 'Community Only', description: 'Only SecureCodeHub members can view' },
    { value: 'private', label: 'Private', description: 'Only you can view your profile' }
  ];

  const handleSelectChange = (field, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSaveMessage('Privacy settings updated successfully!');
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
      {/* Profile Visibility */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Profile Visibility</h3>
        </div>

        <Select
          label="Who can view your profile"
          options={visibilityOptions}
          value={privacySettings?.profileVisibility}
          onChange={(value) => handleSelectChange('profileVisibility', value)}
          description="Control who can see your profile information and activity"
        />

        <div className="space-y-3 ml-6">
          <Checkbox
            label="Show learning progress"
            description="Display your course completion and skill levels"
            checked={privacySettings?.showProgress}
            onChange={(e) => handleCheckboxChange('showProgress', e?.target?.checked)}
            disabled={privacySettings?.profileVisibility === 'private'}
          />

          <Checkbox
            label="Show achievements and badges"
            description="Display earned certificates and accomplishments"
            checked={privacySettings?.showAchievements}
            onChange={(e) => handleCheckboxChange('showAchievements', e?.target?.checked)}
            disabled={privacySettings?.profileVisibility === 'private'}
          />

          <Checkbox
            label="Show on leaderboards"
            description="Include your profile in community rankings"
            checked={privacySettings?.showOnLeaderboard}
            onChange={(e) => handleCheckboxChange('showOnLeaderboard', e?.target?.checked)}
            disabled={privacySettings?.profileVisibility === 'private'}
          />
        </div>
      </div>
      {/* Communication Settings */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="MessageCircle" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Communication</h3>
        </div>

        <div className="space-y-3">
          <Checkbox
            label="Allow direct messages"
            description="Let other community members send you private messages"
            checked={privacySettings?.allowDirectMessages}
            onChange={(e) => handleCheckboxChange('allowDirectMessages', e?.target?.checked)}
          />

          <Checkbox
            label="Allow mentorship requests"
            description="Enable others to request mentorship or guidance from you"
            checked={privacySettings?.allowMentorshipRequests}
            onChange={(e) => handleCheckboxChange('allowMentorshipRequests', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Data Sharing */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Database" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Data Sharing</h3>
        </div>

        <div className="space-y-3">
          <Checkbox
            label="Share data for platform improvement"
            description="Help us improve SecureCodeHub by sharing anonymized usage data"
            checked={privacySettings?.shareDataForImprovement}
            onChange={(e) => handleCheckboxChange('shareDataForImprovement', e?.target?.checked)}
          />

          <Checkbox
            label="Allow analytics tracking"
            description="Enable tracking for personalized recommendations and insights"
            checked={privacySettings?.allowAnalytics}
            onChange={(e) => handleCheckboxChange('allowAnalytics', e?.target?.checked)}
          />

          <Checkbox
            label="Share code submissions for research"
            description="Allow anonymized code samples to be used for educational research"
            checked={privacySettings?.shareCodeSubmissions}
            onChange={(e) => handleCheckboxChange('shareCodeSubmissions', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Third-party Integrations */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Link" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Third-party Integrations</h3>
        </div>

        <div className="space-y-3">
          <Checkbox
            label="Enable third-party integrations"
            description="Allow connections with GitHub, LinkedIn, and other platforms"
            checked={privacySettings?.thirdPartyIntegrations}
            onChange={(e) => handleCheckboxChange('thirdPartyIntegrations', e?.target?.checked)}
          />
        </div>

        {privacySettings?.thirdPartyIntegrations && (
          <div className="ml-6 p-4 bg-muted rounded-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Github" size={20} />
                <div>
                  <p className="font-medium text-foreground">GitHub</p>
                  <p className="text-sm text-muted-foreground">Sync repositories and contributions</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Linkedin" size={20} />
                <div>
                  <p className="font-medium text-foreground">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">Share achievements and certificates</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </div>
        )}
      </div>
      {/* Data Rights */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Data Rights</h3>
        </div>

        <div className="p-4 bg-muted rounded-md space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="Download" size={16} className="mt-1" />
            <div className="flex-1">
              <p className="font-medium text-foreground">Download your data</p>
              <p className="text-sm text-muted-foreground">
                Get a copy of all your personal data, learning progress, and submissions
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                Request Data Export
              </Button>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Icon name="Trash2" size={16} className="mt-1" color="var(--color-error)" />
            <div className="flex-1">
              <p className="font-medium text-foreground">Delete your account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data
              </p>
              <Button variant="destructive" size="sm" className="mt-2">
                Delete Account
              </Button>
            </div>
          </div>
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
          Save Privacy Settings
        </Button>
      </div>
    </div>
  );
};

export default PrivacyControls;