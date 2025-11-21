import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const LearningPreferences = () => {
  const [preferences, setPreferences] = useState({
    difficultyProgression: 'adaptive',
    aiTutoringIntensity: 'moderate',
    preferredLanguages: ['javascript', 'python'],
    notificationFrequency: 'daily',
    learningReminders: true,
    weekendLearning: false,
    achievementNotifications: true,
    communityUpdates: true
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const difficultyOptions = [
    { value: 'linear', label: 'Linear Progression', description: 'Follow a structured path from basic to advanced' },
    { value: 'adaptive', label: 'Adaptive Learning', description: 'AI adjusts difficulty based on your performance' },
    { value: 'challenge', label: 'Challenge Mode', description: 'Always push boundaries with harder content' }
  ];

  const aiIntensityOptions = [
    { value: 'minimal', label: 'Minimal Assistance', description: 'Let me figure things out mostly on my own' },
    { value: 'moderate', label: 'Moderate Guidance', description: 'Provide hints when I struggle' },
    { value: 'intensive', label: 'Intensive Support', description: 'Active guidance and frequent suggestions' }
  ];

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' }
  ];

  const notificationFrequencyOptions = [
    { value: 'realtime', label: 'Real-time' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Summary' },
    { value: 'never', label: 'Never' }
  ];

  const handleSelectChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setPreferences(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSaveMessage('Learning preferences updated successfully!');
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
      {/* Learning Progression */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Learning Progression</h3>
        </div>
        
        <Select
          label="Difficulty Progression"
          options={difficultyOptions}
          value={preferences?.difficultyProgression}
          onChange={(value) => handleSelectChange('difficultyProgression', value)}
          description="Choose how you want to advance through difficulty levels"
        />

        <Select
          label="AI Tutoring Intensity"
          options={aiIntensityOptions}
          value={preferences?.aiTutoringIntensity}
          onChange={(value) => handleSelectChange('aiTutoringIntensity', value)}
          description="Set how much AI assistance you want during learning"
        />
      </div>
      {/* Programming Languages */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Code" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Programming Languages</h3>
        </div>
        
        <Select
          label="Preferred Languages"
          options={languageOptions}
          value={preferences?.preferredLanguages}
          onChange={(value) => handleSelectChange('preferredLanguages', value)}
          multiple
          searchable
          description="Select languages you want to focus on (you can choose multiple)"
        />
      </div>
      {/* Notification Settings */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
        </div>

        <Select
          label="Notification Frequency"
          options={notificationFrequencyOptions}
          value={preferences?.notificationFrequency}
          onChange={(value) => handleSelectChange('notificationFrequency', value)}
          description="How often you want to receive learning updates"
        />

        <div className="space-y-3">
          <Checkbox
            label="Learning Reminders"
            description="Get reminded to continue your learning streak"
            checked={preferences?.learningReminders}
            onChange={(e) => handleCheckboxChange('learningReminders', e?.target?.checked)}
          />

          <Checkbox
            label="Weekend Learning"
            description="Include weekends in your learning schedule"
            checked={preferences?.weekendLearning}
            onChange={(e) => handleCheckboxChange('weekendLearning', e?.target?.checked)}
          />

          <Checkbox
            label="Achievement Notifications"
            description="Get notified when you earn badges and complete milestones"
            checked={preferences?.achievementNotifications}
            onChange={(e) => handleCheckboxChange('achievementNotifications', e?.target?.checked)}
          />

          <Checkbox
            label="Community Updates"
            description="Receive updates about forum discussions and peer activities"
            checked={preferences?.communityUpdates}
            onChange={(e) => handleCheckboxChange('communityUpdates', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Learning Schedule */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Learning Schedule</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']?.map((day) => (
            <div key={day} className="p-3 border border-border rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{day?.slice(0, 3)}</span>
                <Checkbox
                  checked={day !== 'Saturday' && day !== 'Sunday' ? true : preferences?.weekendLearning}
                  onChange={(e) => {
                    // Handle individual day preferences
                  }}
                  size="sm"
                />
              </div>
              <div className="mt-2">
                <select className="w-full text-xs border border-border rounded px-2 py-1 bg-input">
                  <option>30 min</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                </select>
              </div>
            </div>
          ))}
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
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default LearningPreferences;