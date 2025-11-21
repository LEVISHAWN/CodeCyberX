import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickFilters = ({
  activeFilters = [],
  onFilterToggle,
  className = ""
}) => {
  const quickFilterOptions = [
    {
      id: 'free',
      label: 'Free Courses',
      icon: 'Gift',
      count: 24
    },
    {
      id: 'beginner',
      label: 'Beginner Friendly',
      icon: 'GraduationCap',
      count: 18
    },
    {
      id: 'popular',
      label: 'Most Popular',
      icon: 'TrendingUp',
      count: 12
    },
    {
      id: 'new',
      label: 'New Releases',
      icon: 'Sparkles',
      count: 8
    },
    {
      id: 'hands-on',
      label: 'Hands-on Labs',
      icon: 'Code',
      count: 15
    },
    {
      id: 'certified',
      label: 'With Certificate',
      icon: 'Award',
      count: 20
    }
  ];

  return (
    <div className={`${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="Zap" size={16} className="text-primary" />
        <span className="text-sm font-medium text-foreground">
          Quick Filters
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {quickFilterOptions?.map((filter) => {
          const isActive = activeFilters?.includes(filter?.id);
          
          return (
            <Button
              key={filter?.id}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterToggle(filter?.id)}
              iconName={filter?.icon}
              iconPosition="left"
              className="text-xs"
            >
              {filter?.label}
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                isActive 
                  ? 'bg-primary-foreground/20 text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {filter?.count}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickFilters;