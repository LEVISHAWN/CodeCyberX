import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ForumHighlight = ({ post }) => {
  const getTopicColor = (topic) => {
    switch (topic?.toLowerCase()) {
      case 'python':
        return 'text-blue-600 bg-blue-100';
      case 'javascript':
        return 'text-yellow-600 bg-yellow-100';
      case 'security':
        return 'text-red-600 bg-red-100';
      case 'general':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-purple-600 bg-purple-100';
    }
  };

  return (
    <div className="p-3 bg-card border border-border rounded-lg hover:bg-muted transition-smooth">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
          <Image 
            src={post?.author?.avatar} 
            alt={post?.author?.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-foreground">{post?.author?.name}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTopicColor(post?.topic)}`}>
              {post?.topic}
            </span>
          </div>
          
          <h4 className="text-sm font-medium text-foreground mb-1 line-clamp-2">{post?.title}</h4>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{post?.preview}</p>
          
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={12} />
              <span>{post?.replies}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={12} />
              <span>{post?.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{post?.timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumHighlight;