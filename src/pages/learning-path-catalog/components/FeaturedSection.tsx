import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const FeaturedSection = ({ featuredPaths, onEnroll, onPreview }) => {
  if (!featuredPaths || featuredPaths?.length === 0) {
    return null;
  }

  const mainFeatured = featuredPaths?.[0];
  const secondaryFeatured = featuredPaths?.slice(1, 3);

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

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center space-x-2">
            <Icon name="Star" size={24} className="text-warning" />
            <span>Featured Learning Paths</span>
          </h2>
          <p className="text-muted-foreground mt-1">
            Handpicked courses to accelerate your cybersecurity journey
          </p>
        </div>
        <Link to="/learning-path-catalog?featured=true">
          <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
            View All Featured
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured Path */}
        <div className="lg:col-span-2">
          <div className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border border-primary/20 rounded-xl overflow-hidden shadow-elevated">
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full font-medium">
                🔥 Most Popular
              </span>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="relative md:w-2/5 h-64 md:h-auto">
                <Image
                  src={mainFeatured?.thumbnail}
                  alt={mainFeatured?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 md:p-8">
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSkillLevelColor(mainFeatured?.skillLevel)}`}>
                    {mainFeatured?.skillLevel}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {mainFeatured?.language}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  {mainFeatured?.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {mainFeatured?.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>{formatDuration(mainFeatured?.duration)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={16} />
                    <span>{mainFeatured?.enrolledCount?.toLocaleString()} enrolled</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} className="text-warning fill-current" />
                    <span>{mainFeatured?.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {mainFeatured?.topics?.slice(0, 4)?.map((topic, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="default"
                    onClick={() => onEnroll(mainFeatured?.id)}
                    iconName="Play"
                    iconPosition="left"
                    className="flex-1"
                  >
                    {mainFeatured?.price === 0 ? 'Start Free' : `Enroll for $${mainFeatured?.price}`}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onPreview(mainFeatured?.id)}
                    iconName="Eye"
                    iconPosition="left"
                  >
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Featured Paths */}
        <div className="space-y-4">
          {secondaryFeatured?.map((path) => (
            <div
              key={path?.id}
              className="bg-card border border-border rounded-lg p-4 shadow-subtle hover:shadow-elevated transition-all duration-300"
            >
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={path?.thumbnail}
                      alt={path?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium border ${getSkillLevelColor(path?.skillLevel)}`}>
                      {path?.skillLevel}
                    </span>
                    {path?.isNew && (
                      <span className="bg-success text-success-foreground text-xs px-1.5 py-0.5 rounded-full font-medium">
                        New
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">
                    {path?.title}
                  </h4>

                  <div className="flex items-center space-x-3 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{formatDuration(path?.duration)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span>{path?.rating}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => onPreview(path?.id)}
                      iconName="Eye"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Preview
                    </Button>
                    <Button
                      variant="default"
                      size="xs"
                      onClick={() => onEnroll(path?.id)}
                      iconName="Play"
                      iconPosition="left"
                      className="flex-1"
                    >
                      {path?.price === 0 ? 'Free' : `$${path?.price}`}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* View More Card */}
          <div className="bg-muted/50 border border-dashed border-muted-foreground/30 rounded-lg p-4 text-center">
            <Icon name="Plus" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-3">
              Discover more featured paths
            </p>
            <Link to="/learning-path-catalog?featured=true">
              <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
                Browse All
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;