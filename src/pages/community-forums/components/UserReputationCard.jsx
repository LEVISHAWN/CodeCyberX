import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UserReputationCard = ({ user }) => {
  const getBadgeColor = (badge) => {
    switch (badge?.type) {
      case 'expert': return 'text-purple-600 bg-purple-50';
      case 'helper': return 'text-green-600 bg-green-50';
      case 'contributor': return 'text-blue-600 bg-blue-50';
      case 'moderator': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getReputationLevel = (points) => {
    if (points >= 10000) return { level: 'Expert', color: 'text-purple-600' };
    if (points >= 5000) return { level: 'Advanced', color: 'text-blue-600' };
    if (points >= 1000) return { level: 'Intermediate', color: 'text-green-600' };
    return { level: 'Beginner', color: 'text-yellow-600' };
  };

  const reputation = getReputationLevel(user?.reputationPoints);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-4">
        <Image
          src={user?.avatar}
          alt={user?.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-medium text-foreground">{user?.name}</h3>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${reputation?.color}`}>
              {reputation?.level}
            </span>
            <span className="text-sm text-muted-foreground">
              {user?.reputationPoints} points
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {user?.postsCount}
          </div>
          <div className="text-xs text-muted-foreground">Posts</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">
            {user?.helpfulAnswers}
          </div>
          <div className="text-xs text-muted-foreground">Helpful</div>
        </div>
      </div>
      {user?.badges && user?.badges?.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Badges</h4>
          <div className="flex flex-wrap gap-2">
            {user?.badges?.slice(0, 3)?.map((badge, index) => (
              <div
                key={index}
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getBadgeColor(badge)}`}
              >
                <Icon name={badge?.icon} size={12} />
                <span>{badge?.name}</span>
              </div>
            ))}
            {user?.badges?.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{user?.badges?.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      {user?.specialties && user?.specialties?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">Expertise</h4>
          <div className="flex flex-wrap gap-1">
            {user?.specialties?.map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReputationCard;