import React from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const LearningPathCard = ({ 
  path,
  viewMode = 'grid',
  onEnroll,
  onBookmark,
  onPreview
}) => {
  const {
    id,
    title,
    description,
    skillLevel,
    duration,
    completionRate,
    enrolledCount,
    rating,
    topics,
    language,
    instructor,
    thumbnail,
    isNew,
    isFeatured,
    isBookmarked,
    prerequisites,
    price
  } = path;

  const getSkillLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-success/10 text-success border-success/20';
      case 'intermediate':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'advanced':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDuration = (duration) => {
    if (duration < 7) return `${duration} days`;
    if (duration < 30) return `${Math.ceil(duration / 7)} weeks`;
    return `${Math.ceil(duration / 30)} months`;
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle hover:shadow-elevated transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <div className="relative w-full lg:w-32 h-32 rounded-lg overflow-hidden">
              <Image
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
              />
              {isNew && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                  New
                </div>
              )}
              {isFeatured && (
                <div className="absolute top-2 right-2 bg-warning text-warning-foreground text-xs px-2 py-1 rounded-full font-medium">
                  Featured
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSkillLevelColor(skillLevel)}`}>
                    {skillLevel}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {language}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 truncate">
                  {title}
                </h3>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{formatDuration(duration)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{enrolledCount?.toLocaleString()} enrolled</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span>{rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="TrendingUp" size={14} />
                    <span>{completionRate}% completion</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {topics?.slice(0, 3)?.map((topic, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                  {topics?.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{topics?.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2 sm:ml-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onBookmark(id)}
                    iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPreview(id)}
                    iconName="Eye"
                    iconPosition="left"
                  >
                    Preview
                  </Button>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onEnroll(id)}
                  iconName="Play"
                  iconPosition="left"
                  fullWidth
                >
                  {price === 0 ? 'Start Free' : `$${price}`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300 group">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {isNew && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          )}
          {isFeatured && (
            <span className="bg-warning text-warning-foreground text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => onBookmark(id)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
        >
          <Icon 
            name={isBookmarked ? "BookmarkCheck" : "Bookmark"} 
            size={16} 
            className={isBookmarked ? "text-primary" : "text-muted-foreground"}
          />
        </button>

        {/* Quick Stats */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>{enrolledCount > 1000 ? `${Math.floor(enrolledCount / 1000)}k` : enrolledCount}</span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSkillLevelColor(skillLevel)}`}>
            {skillLevel}
          </span>
          <span className="text-sm text-muted-foreground">
            {language}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          {description}
        </p>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{formatDuration(duration)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={14} />
            <span>{completionRate}%</span>
          </div>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-1 mb-4">
          {topics?.slice(0, 2)?.map((topic, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs"
            >
              {topic}
            </span>
          ))}
          {topics?.length > 2 && (
            <span className="text-xs text-muted-foreground">
              +{topics?.length - 2}
            </span>
          )}
        </div>

        {/* Prerequisites */}
        {prerequisites && prerequisites?.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground mb-1">
              <Icon name="Info" size={12} />
              <span>Prerequisites:</span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {prerequisites?.join(', ')}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview(id)}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            Preview
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onEnroll(id)}
            iconName="Play"
            iconPosition="left"
            className="flex-1"
          >
            {price === 0 ? 'Start Free' : `$${price}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningPathCard;