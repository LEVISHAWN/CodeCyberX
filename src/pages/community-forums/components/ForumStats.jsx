import React from 'react';
import Icon from '../../../components/AppIcon';

const ForumStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Posts',
      value: stats?.totalPosts,
      icon: 'MessageSquare',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      label: 'Active Users',
      value: stats?.activeUsers,
      icon: 'Users',
      color: 'text-green-600 bg-green-50'
    },
    {
      label: 'Solved Today',
      value: stats?.solvedToday,
      icon: 'CheckCircle',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      label: 'Online Now',
      value: stats?.onlineNow,
      icon: 'Circle',
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Community Stats</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={16} />
          <span>Updated live</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems?.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-2 ${item?.color}`}>
              <Icon name={item?.icon} size={20} />
            </div>
            <div className="text-xl font-semibold text-foreground">
              {item?.value?.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {item?.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-muted-foreground">AI Moderation Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={14} className="text-primary" />
              <span className="text-muted-foreground">Secure Environment</span>
            </div>
          </div>
          <div className="text-muted-foreground">
            Response time: &lt; 2 hours
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumStats;