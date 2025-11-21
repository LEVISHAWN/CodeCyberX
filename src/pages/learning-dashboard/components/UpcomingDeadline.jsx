import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingDeadline = ({ deadline }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'assignment':
        return 'FileText';
      case 'quiz':
        return 'HelpCircle';
      case 'project':
        return 'Folder';
      default:
        return 'Calendar';
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg hover:bg-muted transition-smooth">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
          <Icon name={getTypeIcon(deadline?.type)} size={16} color="var(--color-primary)" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <h4 className="font-medium text-foreground text-sm truncate">{deadline?.title}</h4>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(deadline?.priority)}`}>
            {deadline?.priority}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-1">{deadline?.course}</p>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
          <span className="text-xs text-muted-foreground">{deadline?.dueDate}</span>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDeadline;