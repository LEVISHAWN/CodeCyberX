import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadge = ({ achievement }) => {
  const getBadgeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'gold':
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
      case 'silver':
        return 'bg-gradient-to-br from-gray-300 to-gray-500';
      case 'bronze':
        return 'bg-gradient-to-br from-orange-400 to-orange-600';
      default:
        return 'bg-gradient-to-br from-blue-400 to-blue-600';
    }
  };

  const getAchievementIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'streak':
        return 'Flame';
      case 'completion':
        return 'CheckCircle';
      case 'skill':
        return 'Award';
      case 'community':
        return 'Users';
      default:
        return 'Trophy';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-subtle hover:shadow-elevated transition-reveal">
      <div className="flex items-center space-x-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getBadgeColor(achievement?.type)}`}>
          <Icon name={getAchievementIcon(achievement?.category)} size={20} color="white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground mb-1">{achievement?.title}</h4>
          <p className="text-xs text-muted-foreground mb-1">{achievement?.description}</p>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Earned {achievement?.earnedDate}</span>
            {achievement?.isNew && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                New!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;