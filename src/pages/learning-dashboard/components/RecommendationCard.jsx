import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ recommendation }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getReasonIcon = (reason) => {
    switch (reason?.toLowerCase()) {
      case 'skill gap':
        return 'Target';
      case 'trending':
        return 'TrendingUp';
      case 'similar users':
        return 'Users';
      default:
        return 'Lightbulb';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-subtle hover:shadow-elevated transition-reveal">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
          <Image 
            src={recommendation?.thumbnail} 
            alt={recommendation?.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recommendation?.difficulty)}`}>
              {recommendation?.difficulty}
            </span>
            <div className="flex items-center space-x-1">
              <Icon name={getReasonIcon(recommendation?.reason)} size={12} color="var(--color-muted-foreground)" />
              <span className="text-xs text-muted-foreground">{recommendation?.reason}</span>
            </div>
          </div>
          
          <h4 className="font-medium text-foreground mb-1 line-clamp-2">{recommendation?.title}</h4>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{recommendation?.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                <span className="text-xs text-muted-foreground">{recommendation?.estimatedTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} color="var(--color-warning)" />
                <span className="text-xs text-muted-foreground">{recommendation?.rating}</span>
              </div>
            </div>
            
            <Button variant="outline" size="xs">
              Start
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;