import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProfileInformation = () => {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    bio: "Passionate developer learning secure coding practices. Currently focusing on full-stack development with emphasis on cybersecurity.",
    experienceLevel: "intermediate",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
    setSaveMessage('Profile updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data in real implementation
  };

  const handleImageUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profilePicture: e?.target?.result
        }));
      };
      reader?.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border">
            <Image
              src={profileData?.profilePicture}
              alt="Profile picture"
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <label className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-smooth">
              <Icon name="Camera" size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">Profile Picture</h3>
          <p className="text-sm text-muted-foreground">
            Upload a professional photo to personalize your profile
          </p>
          {isEditing && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              iconName="Upload"
              iconPosition="left"
            >
              Change Photo
            </Button>
          )}
        </div>
      </div>
      {/* Success Message */}
      {saveMessage && (
        <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-md">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <span className="text-sm text-success">{saveMessage}</span>
        </div>
      )}
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          value={profileData?.firstName}
          onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          disabled={!isEditing}
          required
        />
        <Input
          label="Last Name"
          type="text"
          value={profileData?.lastName}
          onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          disabled={!isEditing}
          required
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        value={profileData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        disabled={!isEditing}
        description="This email will be used for notifications and account recovery"
        required
      />
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Bio
        </label>
        <textarea
          value={profileData?.bio}
          onChange={(e) => handleInputChange('bio', e?.target?.value)}
          disabled={!isEditing}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          placeholder="Tell us about yourself and your coding journey..."
        />
        <p className="text-xs text-muted-foreground mt-1">
          {profileData?.bio?.length}/500 characters
        </p>
      </div>
      <Select
        label="Experience Level"
        options={experienceLevels}
        value={profileData?.experienceLevel}
        onChange={(value) => handleInputChange('experienceLevel', value)}
        disabled={!isEditing}
        description="This helps us recommend appropriate content difficulty"
      />
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        {!isEditing ? (
          <Button
            variant="default"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              onClick={handleSave}
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInformation;