import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import { cn } from '../../utils/cn';

const ProgressIndicator = ({
  currentLesson = 1,
  totalLessons = 1,
  completedLessons = 0,
  lessonTitle = '',
  pathTitle = '',
  showNavigation = true,
  onPrevious,
  onNext,
  className = ''
}) => {
  const progressPercentage = totalLessons > 0 
    ? (completedLessons / totalLessons) * 100 
    : 0;

  const currentProgressPercentage = totalLessons > 0 
    ? ((currentLesson - 1) / totalLessons) * 100 
    : 0;

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {/* Left side - Path and Lesson info */}
      <div className="flex-1 min-w-0">
        {pathTitle && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
            <Icon name="BookOpen" size={14} />
            <span className="truncate">{pathTitle}</span>
          </div>
        )}
        {lessonTitle && (
          <h2 className="text-lg font-semibold text-foreground truncate">
            {lessonTitle}
          </h2>
        )}
        
        {/* Progress bar */}
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Lesson {currentLesson} of {totalLessons}
            </span>
            <span>
              {completedLessons} of {totalLessons} completed
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            {/* Overall progress */}
            <div 
              className="h-full bg-success transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
            {/* Current lesson progress indicator */}
            {currentProgressPercentage > 0 && (
              <div 
                className="h-full bg-primary transition-all duration-300 -mt-2"
                style={{ width: `${Math.min(currentProgressPercentage, 100)}%` }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Right side - Navigation buttons */}
      {showNavigation && (
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            iconName="ChevronLeft"
            iconPosition="left"
            disabled={currentLesson <= 1}
          >
            Previous
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onNext}
            iconName="ChevronRight"
            iconPosition="right"
            disabled={currentLesson >= totalLessons}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;
