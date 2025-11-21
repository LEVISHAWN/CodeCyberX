import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressOverviewCard = ({ title, value, subtitle, icon, color, trend }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle hover:shadow-elevated transition-reveal">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend?.type === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <Icon name={trend?.type === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
            <span>{trend?.value}</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default ProgressOverviewCard;