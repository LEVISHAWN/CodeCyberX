import React from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course }) => {
  const getLanguageIcon = (language) => {
    switch (language?.toLowerCase()) {
      case 'python':
        return 'Code2';
      case 'javascript':
        return 'Braces';
      default:
        return 'Code';
    }
  };

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

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-subtle hover:shadow-elevated transition-reveal">
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={course?.thumbnail} 
          alt={course?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course?.difficulty)}`}>
            {course?.difficulty}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="bg-black bg-opacity-50 rounded-full p-2">
            <Icon name={getLanguageIcon(course?.language)} size={16} color="white" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="BookOpen" size={14} color="var(--color-muted-foreground)" />
          <span className="text-xs text-muted-foreground">{course?.language}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{course?.duration}</span>
        </div>
        
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{course?.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course?.description}</p>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs font-medium text-foreground">{course?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${course?.progress}%` }}
            />
          </div>
        </div>
        
        {course?.nextLesson && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Next Lesson</p>
            <p className="text-sm font-medium text-foreground">{course?.nextLesson}</p>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} color="var(--color-muted-foreground)" />
              <span className="text-xs text-muted-foreground">{course?.enrolled}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} color="var(--color-warning)" />
              <span className="text-xs text-muted-foreground">{course?.rating}</span>
            </div>
          </div>
          
          <Button variant="default" size="sm">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;