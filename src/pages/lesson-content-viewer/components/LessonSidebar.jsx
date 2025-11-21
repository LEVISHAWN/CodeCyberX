import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LessonSidebar = ({
  currentSection = 1,
  onSectionChange,
  lessonData = {},
  className = ""
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const defaultLessonData = {
    title: "SQL Injection Prevention",
    path: "Web Security Fundamentals",
    totalSections: 6,
    completedSections: 2,
    estimatedTime: "45 min",
    difficulty: "Intermediate",
    sections: [
      {
        id: 1,
        title: "Introduction to SQL Injection",
        type: "video",
        duration: "8 min",
        completed: true,
        current: currentSection === 1
      },
      {
        id: 2,
        title: "Common Attack Vectors",
        type: "interactive",
        duration: "12 min",
        completed: true,
        current: currentSection === 2
      },
      {
        id: 3,
        title: "Parameterized Queries",
        type: "video",
        duration: "10 min",
        completed: false,
        current: currentSection === 3
      },
      {
        id: 4,
        title: "Input Validation Techniques",
        type: "hands-on",
        duration: "15 min",
        completed: false,
        current: currentSection === 4
      },
      {
        id: 5,
        title: "Testing Your Defenses",
        type: "quiz",
        duration: "8 min",
        completed: false,
        current: currentSection === 5
      },
      {
        id: 6,
        title: "Best Practices Summary",
        type: "text",
        duration: "5 min",
        completed: false,
        current: currentSection === 6
      }
    ]
  };

  const lesson = { ...defaultLessonData, ...lessonData };
  const progressPercentage = Math.round((lesson?.completedSections / lesson?.totalSections) * 100);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return 'Play';
      case 'interactive': return 'Code';
      case 'hands-on': return 'Wrench';
      case 'quiz': return 'HelpCircle';
      case 'text': return 'FileText';
      default: return 'BookOpen';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'text-blue-500';
      case 'interactive': return 'text-purple-500';
      case 'hands-on': return 'text-orange-500';
      case 'quiz': return 'text-green-500';
      case 'text': return 'text-gray-500';
      default: return 'text-muted-foreground';
    }
  };

  if (isCollapsed) {
    return (
      <div className={`w-12 bg-card border-r border-border flex flex-col items-center py-4 ${className}`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(false)}
          className="mb-4"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>
        <div className="flex flex-col space-y-2">
          {lesson?.sections?.map((section) => (
            <div
              key={section?.id}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs cursor-pointer transition-fast ${
                section?.completed
                  ? 'bg-success text-success-foreground'
                  : section?.current
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              onClick={() => onSectionChange?.(section?.id)}
            >
              {section?.completed ? (
                <Icon name="Check" size={12} />
              ) : (
                section?.id
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-80 bg-card border-r border-border flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground truncate">
            {lesson?.title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(true)}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{lesson?.path}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{progressPercentage}% Complete</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-success h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      {/* Lesson Info */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Duration</div>
            <div className="font-medium text-foreground">{lesson?.estimatedTime}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Difficulty</div>
            <div className="font-medium text-foreground">{lesson?.difficulty}</div>
          </div>
        </div>
      </div>
      {/* Sections List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {lesson?.sections?.map((section, index) => (
            <div
              key={section?.id}
              className={`p-3 rounded-lg cursor-pointer transition-fast mb-2 ${
                section?.current
                  ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted/50'
              }`}
              onClick={() => onSectionChange?.(section?.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  section?.completed
                    ? 'bg-success text-success-foreground'
                    : section?.current
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {section?.completed ? (
                    <Icon name="Check" size={14} />
                  ) : (
                    <Icon name={getTypeIcon(section?.type)} size={14} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium truncate ${
                    section?.current ? 'text-primary' : 'text-foreground'
                  }`}>
                    {section?.title}
                  </h4>
                  
                  <div className="flex items-center space-x-2 mt-1">
                    <Icon 
                      name={getTypeIcon(section?.type)} 
                      size={12} 
                      className={getTypeColor(section?.type)}
                    />
                    <span className="text-xs text-muted-foreground">
                      {section?.duration}
                    </span>
                  </div>
                </div>
                
                {section?.current && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Controls */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentSection <= 1}
            onClick={() => onSectionChange?.(currentSection - 1)}
            iconName="ChevronLeft"
            iconPosition="left"
            className="flex-1"
          >
            Previous
          </Button>
          
          <Button
            variant="default"
            size="sm"
            disabled={currentSection >= lesson?.totalSections}
            onClick={() => onSectionChange?.(currentSection + 1)}
            iconName="ChevronRight"
            iconPosition="right"
            className="flex-1"
          >
            Next
          </Button>
        </div>
        
        <div className="mt-3 text-center">
          <span className="text-xs text-muted-foreground">
            Section {currentSection} of {lesson?.totalSections}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LessonSidebar;