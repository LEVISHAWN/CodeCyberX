import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ThreadCard = ({ thread }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'solved': return 'CheckCircle';
      case 'locked': return 'Lock';
      case 'pinned': return 'Pin';
      default: return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={thread?.author?.avatar}
            alt={thread?.author?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <Link
                to={`/community-forums/thread/${thread?.id}`}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                {thread?.title}
              </Link>
              
              <div className="flex items-center space-x-2 mt-1">
                {thread?.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                
                {thread?.priority && (
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(thread?.priority)}`}>
                    {thread?.priority}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              {thread?.status && getStatusIcon(thread?.status) && (
                <Icon
                  name={getStatusIcon(thread?.status)}
                  size={16}
                  className={thread?.status === 'solved' ? 'text-success' : 'text-muted-foreground'}
                />
              )}
              
              {thread?.aiModerated && (
                <div className="flex items-center space-x-1">
                  <Icon name="Bot" size={14} className="text-primary" />
                  <span className="text-xs text-primary">AI Verified</span>
                </div>
              )}
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {thread?.preview}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="User" size={14} />
                <span>{thread?.author?.name}</span>
                {thread?.author?.badge && (
                  <Icon name="Award" size={12} className="text-warning" />
                )}
              </span>
              
              <span className="flex items-center space-x-1">
                <Icon name="MessageSquare" size={14} />
                <span>{thread?.replyCount} replies</span>
              </span>
              
              <span className="flex items-center space-x-1">
                <Icon name="Eye" size={14} />
                <span>{thread?.viewCount} views</span>
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Icon name="ThumbsUp" size={14} className="text-success" />
                <span className="text-sm text-success">{thread?.upvotes}</span>
              </div>
              
              <span className="text-xs text-muted-foreground">
                {thread?.lastActivity}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;