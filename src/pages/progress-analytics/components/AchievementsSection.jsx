import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementsSection = () => {
  const achievements = [
    {
      id: 1,
      title: "Python Master",
      description: "Completed all Python fundamentals modules",
      icon: "Award",
      earned: true,
      earnedDate: "2024-09-15",
      category: "Programming",
      rarity: "common"
    },
    {
      id: 2,
      title: "Security Sentinel",
      description: "Identified 50+ vulnerabilities in code challenges",
      icon: "Shield",
      earned: true,
      earnedDate: "2024-09-28",
      category: "Security",
      rarity: "rare"
    },
    {
      id: 3,
      title: "Streak Champion",
      description: "Maintained 30-day learning streak",
      icon: "Zap",
      earned: false,
      progress: 50,
      category: "Consistency",
      rarity: "epic"
    },
    {
      id: 4,
      title: "Code Reviewer",
      description: "Provided helpful feedback on 25 peer submissions",
      icon: "Eye",
      earned: true,
      earnedDate: "2024-10-02",
      category: "Community",
      rarity: "uncommon"
    },
    {
      id: 5,
      title: "Vulnerability Hunter",
      description: "Discovered critical security flaw in advanced lab",
      icon: "Target",
      earned: false,
      progress: 75,
      category: "Security",
      rarity: "legendary"
    },
    {
      id: 6,
      title: "Algorithm Ace",
      description: "Solved 100 coding challenges with optimal solutions",
      icon: "Brain",
      earned: false,
      progress: 68,
      category: "Problem Solving",
      rarity: "rare"
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "Secure Python Development",
      issueDate: "2024-09-20",
      credentialId: "SPD-2024-001234",
      status: "active"
    },
    {
      id: 2,
      title: "Web Security Fundamentals",
      issueDate: "2024-10-05",
      credentialId: "WSF-2024-005678",
      status: "active"
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'text-muted-foreground';
      case 'uncommon':
        return 'text-success';
      case 'rare':
        return 'text-primary';
      case 'epic':
        return 'text-secondary';
      case 'legendary':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRarityBg = (rarity) => {
    switch (rarity) {
      case 'common':
        return 'bg-muted';
      case 'uncommon':
        return 'bg-success/10';
      case 'rare':
        return 'bg-primary/10';
      case 'epic':
        return 'bg-secondary/10';
      case 'legendary':
        return 'bg-warning/10';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Achievements */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
            <p className="text-sm text-muted-foreground">Badges and milestones earned</p>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="Share2" size={16} className="mr-2" />
            Share
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements?.map((achievement) => (
            <div 
              key={achievement?.id} 
              className={`p-4 rounded-lg border transition-all duration-200 ${
                achievement?.earned 
                  ? `${getRarityBg(achievement?.rarity)} border-border` 
                  : 'bg-muted/50 border-dashed border-border opacity-75'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  achievement?.earned 
                    ? getRarityBg(achievement?.rarity) 
                    : 'bg-muted'
                }`}>
                  <Icon 
                    name={achievement?.icon} 
                    size={20} 
                    color={achievement?.earned ? `var(--color-${achievement?.rarity === 'common' ? 'muted-foreground' : achievement?.rarity === 'uncommon' ? 'success' : achievement?.rarity === 'rare' ? 'primary' : achievement?.rarity === 'epic' ? 'secondary' : 'warning'})` : 'var(--color-muted-foreground)'} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className={`text-sm font-medium ${
                      achievement?.earned ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement?.title}
                    </h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getRarityColor(achievement?.rarity)} ${getRarityBg(achievement?.rarity)}`}>
                      {achievement?.rarity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {achievement?.description}
                  </p>
                  {achievement?.earned ? (
                    <p className="text-xs text-success">
                      Earned {new Date(achievement.earnedDate)?.toLocaleDateString()}
                    </p>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-muted-foreground">{achievement?.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${achievement?.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Certifications */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Certifications</h3>
            <p className="text-sm text-muted-foreground">Earned certificates and credentials</p>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export All
          </Button>
        </div>

        <div className="space-y-4">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Icon name="Award" size={20} color="var(--color-success)" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{cert?.title}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-xs text-muted-foreground">
                      Issued: {new Date(cert.issueDate)?.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ID: {cert?.credentialId}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">
                  Active
                </span>
                <Button variant="ghost" size="sm">
                  <Icon name="ExternalLink" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;