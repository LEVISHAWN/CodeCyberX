import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Image from '../../../components/AppImage';

const AchievementShowcase = () => {
  const [showcaseSettings, setShowcaseSettings] = useState({
    publicProfile: true,
    showBadges: true,
    showCertificates: true,
    showProgress: false,
    showStreak: true
  });

  const [selectedBadges, setSelectedBadges] = useState([1, 3, 5, 7]);
  const [selectedCertificates, setSelectedCertificates] = useState([1, 2]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const availableBadges = [
    {
      id: 1,
      name: "First Steps",
      description: "Completed your first coding exercise",
      icon: "Award",
      color: "var(--color-success)",
      earned: true,
      earnedDate: "2024-09-15"
    },
    {
      id: 2,
      name: "Security Aware",
      description: "Identified 10 security vulnerabilities",
      icon: "Shield",
      color: "var(--color-primary)",
      earned: true,
      earnedDate: "2024-09-20"
    },
    {
      id: 3,
      name: "Code Warrior",
      description: "Solved 50 coding challenges",
      icon: "Sword",
      color: "var(--color-warning)",
      earned: true,
      earnedDate: "2024-09-25"
    },
    {
      id: 4,
      name: "Team Player",
      description: "Helped 5 community members",
      icon: "Users",
      color: "var(--color-secondary)",
      earned: true,
      earnedDate: "2024-10-01"
    },
    {
      id: 5,
      name: "Streak Master",
      description: "Maintained a 30-day learning streak",
      icon: "Flame",
      color: "var(--color-error)",
      earned: true,
      earnedDate: "2024-10-05"
    },
    {
      id: 6,
      name: "Bug Hunter",
      description: "Found and reported 5 platform bugs",
      icon: "Bug",
      color: "var(--color-accent)",
      earned: false,
      earnedDate: null
    },
    {
      id: 7,
      name: "Mentor",
      description: "Successfully mentored 3 students",
      icon: "GraduationCap",
      color: "var(--color-primary)",
      earned: true,
      earnedDate: "2024-10-08"
    },
    {
      id: 8,
      name: "Speed Demon",
      description: "Completed a challenge in under 5 minutes",
      icon: "Zap",
      color: "var(--color-warning)",
      earned: false,
      earnedDate: null
    }
  ];

  const availableCertificates = [
    {
      id: 1,
      name: "JavaScript Security Fundamentals",
      issuer: "SecureCodeHub",
      issueDate: "2024-09-30",
      credentialId: "SCH-JS-2024-001",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Python Secure Coding",
      issuer: "SecureCodeHub",
      issueDate: "2024-10-05",
      credentialId: "SCH-PY-2024-002",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Web Application Security",
      issuer: "SecureCodeHub",
      issueDate: null,
      credentialId: null,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
      inProgress: true,
      progress: 75
    }
  ];

  const handleSettingChange = (field, checked) => {
    setShowcaseSettings(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleBadgeToggle = (badgeId) => {
    setSelectedBadges(prev => 
      prev?.includes(badgeId) 
        ? prev?.filter(id => id !== badgeId)
        : [...prev, badgeId]
    );
  };

  const handleCertificateToggle = (certId) => {
    setSelectedCertificates(prev => 
      prev?.includes(certId) 
        ? prev?.filter(id => id !== certId)
        : [...prev, certId]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSaveMessage('Achievement showcase updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const earnedBadges = availableBadges?.filter(badge => badge?.earned);
  const earnedCertificates = availableCertificates?.filter(cert => cert?.issueDate);

  return (
    <div className="space-y-8">
      {/* Success Message */}
      {saveMessage && (
        <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-md">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <span className="text-sm text-success">{saveMessage}</span>
        </div>
      )}
      {/* Showcase Settings */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Showcase Settings</h3>
        </div>

        <div className="space-y-3">
          <Checkbox
            label="Make achievements public"
            description="Allow others to view your achievements on your profile"
            checked={showcaseSettings?.publicProfile}
            onChange={(e) => handleSettingChange('publicProfile', e?.target?.checked)}
          />

          <Checkbox
            label="Show badges"
            description="Display earned badges on your public profile"
            checked={showcaseSettings?.showBadges}
            onChange={(e) => handleSettingChange('showBadges', e?.target?.checked)}
            disabled={!showcaseSettings?.publicProfile}
          />

          <Checkbox
            label="Show certificates"
            description="Display earned certificates and credentials"
            checked={showcaseSettings?.showCertificates}
            onChange={(e) => handleSettingChange('showCertificates', e?.target?.checked)}
            disabled={!showcaseSettings?.publicProfile}
          />

          <Checkbox
            label="Show learning progress"
            description="Display your overall learning progress and statistics"
            checked={showcaseSettings?.showProgress}
            onChange={(e) => handleSettingChange('showProgress', e?.target?.checked)}
            disabled={!showcaseSettings?.publicProfile}
          />

          <Checkbox
            label="Show current streak"
            description="Display your current learning streak"
            checked={showcaseSettings?.showStreak}
            onChange={(e) => handleSettingChange('showStreak', e?.target?.checked)}
            disabled={!showcaseSettings?.publicProfile}
          />
        </div>
      </div>
      {/* Badge Selection */}
      {showcaseSettings?.publicProfile && showcaseSettings?.showBadges && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} color="var(--color-primary)" />
              <h3 className="text-lg font-semibold text-foreground">Select Badges to Display</h3>
            </div>
            <span className="text-sm text-muted-foreground">
              {selectedBadges?.length} of {earnedBadges?.length} selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableBadges?.map((badge) => (
              <div
                key={badge?.id}
                className={`p-4 border rounded-lg transition-smooth cursor-pointer ${
                  badge?.earned
                    ? selectedBadges?.includes(badge?.id)
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50' :'border-border opacity-50 cursor-not-allowed'
                }`}
                onClick={() => badge?.earned && handleBadgeToggle(badge?.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    badge?.earned ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={badge?.icon} 
                      size={20} 
                      color={badge?.earned ? badge?.color : "var(--color-muted-foreground)"} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground truncate">{badge?.name}</h4>
                      {badge?.earned && selectedBadges?.includes(badge?.id) && (
                        <Icon name="Check" size={16} color="var(--color-primary)" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{badge?.description}</p>
                    {badge?.earned && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Earned: {new Date(badge.earnedDate)?.toLocaleDateString()}
                      </p>
                    )}
                    {!badge?.earned && (
                      <p className="text-xs text-muted-foreground mt-2">Not earned yet</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Certificate Selection */}
      {showcaseSettings?.publicProfile && showcaseSettings?.showCertificates && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={20} color="var(--color-primary)" />
              <h3 className="text-lg font-semibold text-foreground">Select Certificates to Display</h3>
            </div>
            <span className="text-sm text-muted-foreground">
              {selectedCertificates?.length} of {earnedCertificates?.length} selected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableCertificates?.map((cert) => (
              <div
                key={cert?.id}
                className={`p-4 border rounded-lg transition-smooth ${
                  cert?.issueDate
                    ? selectedCertificates?.includes(cert?.id)
                      ? 'border-primary bg-primary/5 cursor-pointer' :'border-border hover:border-primary/50 cursor-pointer' :'border-border opacity-50 cursor-not-allowed'
                }`}
                onClick={() => cert?.issueDate && handleCertificateToggle(cert?.id)}
              >
                <div className="flex space-x-4">
                  <div className="w-20 h-16 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={cert?.image}
                      alt={cert?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground truncate">{cert?.name}</h4>
                      {cert?.issueDate && selectedCertificates?.includes(cert?.id) && (
                        <Icon name="Check" size={16} color="var(--color-primary)" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{cert?.issuer}</p>
                    {cert?.issueDate ? (
                      <>
                        <p className="text-xs text-muted-foreground mt-1">
                          Issued: {new Date(cert.issueDate)?.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ID: {cert?.credentialId}
                        </p>
                      </>
                    ) : cert?.inProgress ? (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-smooth"
                              style={{ width: `${cert?.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{cert?.progress}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">In progress</p>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground mt-1">Not earned yet</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Profile Preview */}
      {showcaseSettings?.publicProfile && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={20} color="var(--color-primary)" />
            <h3 className="text-lg font-semibold text-foreground">Profile Preview</h3>
          </div>

          <div className="p-6 border border-border rounded-lg bg-card">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={24} color="white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground">John Doe</h4>
                <p className="text-muted-foreground">Secure Code Developer</p>
                {showcaseSettings?.showStreak && (
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="Flame" size={14} color="var(--color-warning)" />
                    <span className="text-sm text-muted-foreground">7 day streak</span>
                  </div>
                )}
              </div>
            </div>

            {showcaseSettings?.showBadges && selectedBadges?.length > 0 && (
              <div className="mb-6">
                <h5 className="font-medium text-foreground mb-3">Achievements</h5>
                <div className="flex flex-wrap gap-2">
                  {earnedBadges?.filter(badge => selectedBadges?.includes(badge?.id))?.slice(0, 6)?.map((badge) => (
                      <div
                        key={badge?.id}
                        className="flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full"
                      >
                        <Icon name={badge?.icon} size={14} color={badge?.color} />
                        <span className="text-sm font-medium text-foreground">{badge?.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {showcaseSettings?.showCertificates && selectedCertificates?.length > 0 && (
              <div>
                <h5 className="font-medium text-foreground mb-3">Certificates</h5>
                <div className="space-y-2">
                  {earnedCertificates?.filter(cert => selectedCertificates?.includes(cert?.id))?.map((cert) => (
                      <div key={cert?.id} className="flex items-center space-x-3 p-2 bg-muted rounded">
                        <Icon name="FileText" size={16} color="var(--color-primary)" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{cert?.name}</p>
                          <p className="text-xs text-muted-foreground">{cert?.issuer}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Save Button */}
      <div className="flex justify-start pt-4 border-t border-border">
        <Button
          variant="default"
          onClick={handleSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          Save Showcase Settings
        </Button>
      </div>
    </div>
  );
};

export default AchievementShowcase;