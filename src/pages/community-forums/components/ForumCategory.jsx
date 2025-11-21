import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ForumCategory = ({ category }) => {
  const getIconName = (categoryType) => {
    switch (categoryType) {
      case 'general': return 'MessageSquare';
      case 'code-help': return 'Code';
      case 'security': return 'Shield';
      case 'career': return 'Briefcase';
      case 'announcements': return 'Megaphone';
      default: return 'MessageCircle';
    }
  };

  const getCategoryColor = (categoryType) => {
    switch (categoryType) {
      case 'general': return 'text-blue-600 bg-blue-50';
      case 'code-help': return 'text-green-600 bg-green-50';
      case 'security': return 'text-red-600 bg-red-50';
      case 'career': return 'text-purple-600 bg-purple-50';
      case 'announcements': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${getCategoryColor(category?.type)}`}>
          <Icon name={getIconName(category?.type)} size={24} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">
              {category?.name}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="MessageSquare" size={14} />
                <span>{category?.postCount}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Users" size={14} />
                <span>{category?.memberCount}</span>
              </span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4">
            {category?.description}
          </p>
          
          {category?.recentThreads && category?.recentThreads?.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Recent Discussions</h4>
              {category?.recentThreads?.slice(0, 3)?.map((thread) => (
                <Link
                  key={thread?.id}
                  to={`/community-forums/thread/${thread?.id}`}
                  className="block p-2 rounded hover:bg-muted transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground truncate flex-1">
                      {thread?.title}
                    </span>
                    <div className="flex items-center space-x-2 ml-2">
                      {thread?.solved && (
                        <Icon name="CheckCircle" size={14} className="text-success" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {thread?.replyCount}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      by {thread?.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {thread?.lastActivity}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumCategory;