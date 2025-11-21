import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LessonNavigation = ({
  currentLesson = {
    id: "sql-injection-prevention",
    title: "SQL Injection Prevention",
    path: "Web Security Fundamentals"
  },
  previousLesson = {
    id: "input-validation",
    title: "Input Validation Techniques",
    available: true
  },
  nextLesson = {
    id: "xss-prevention", 
    title: "Cross-Site Scripting Prevention",
    available: true
  },
  onComplete,
  isCompleted = false,
  className = ""
}) => {
  const handleMarkComplete = () => {
    onComplete?.(currentLesson?.id);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 shadow-subtle ${className}`}>
      {/* Current Lesson Info */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="BookOpen" size={20} className="text-primary" />
          <span className="text-sm text-muted-foreground">{currentLesson?.path}</span>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {currentLesson?.title}
        </h2>
        
        {!isCompleted ? (
          <Button
            variant="default"
            onClick={handleMarkComplete}
            iconName="Check"
            iconPosition="left"
            className="mb-4"
          >
            Mark as Complete
          </Button>
        ) : (
          <div className="flex items-center justify-center space-x-2 mb-4 p-3 bg-success/10 border border-success/20 rounded-md">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <span className="text-sm font-medium text-success">Lesson Completed!</span>
          </div>
        )}
      </div>
      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous Lesson */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Previous Lesson
          </span>
          {previousLesson?.available ? (
            <Link
              to={`/lesson-content-viewer?lesson=${previousLesson?.id}`}
              className="block p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-fast group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-fast">
                  <Icon name="ChevronLeft" size={20} className="text-muted-foreground group-hover:text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-fast">
                    {previousLesson?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">Continue from where you left off</p>
                </div>
              </div>
            </Link>
          ) : (
            <div className="p-4 border border-border rounded-lg bg-muted/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="Lock" size={20} className="text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-muted-foreground">No previous lesson</h4>
                  <p className="text-xs text-muted-foreground">This is the first lesson</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next Lesson */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Next Lesson
          </span>
          {nextLesson?.available ? (
            <Link
              to={`/lesson-content-viewer?lesson=${nextLesson?.id}`}
              className="block p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-fast group"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-fast">
                    {nextLesson?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">Continue your learning journey</p>
                </div>
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-fast">
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-primary" />
                </div>
              </div>
            </Link>
          ) : (
            <div className="p-4 border border-border rounded-lg bg-muted/30">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-muted-foreground">Complete current lesson</h4>
                  <p className="text-xs text-muted-foreground">Unlock the next lesson</p>
                </div>
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="Lock" size={20} className="text-muted-foreground" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-center space-x-4">
          <Link to="/learning-path-catalog">
            <Button
              variant="outline"
              size="sm"
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Catalog
            </Button>
          </Link>
          
          <Link to="/interactive-code-editor">
            <Button
              variant="secondary"
              size="sm"
              iconName="Code"
              iconPosition="left"
            >
              Practice Coding
            </Button>
          </Link>
          
          <Link to="/community-forums">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
            >
              Discuss
            </Button>
          </Link>
        </div>
      </div>
      {/* Progress Indicator */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Course Progress</span>
          <span>3 of 8 lessons completed</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '37.5%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LessonNavigation;