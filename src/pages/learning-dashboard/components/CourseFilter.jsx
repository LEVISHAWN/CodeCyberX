import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseFilter = ({ filters, onFilterChange, onClearFilters }) => {
  const languages = ['All', 'Python', 'JavaScript'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const topics = ['All', 'Web Security', 'Data Security', 'Network Security', 'Algorithms'];

  const handleLanguageChange = (language) => {
    onFilterChange({ ...filters, language: language === 'All' ? '' : language });
  };

  const handleDifficultyChange = (difficulty) => {
    onFilterChange({ ...filters, difficulty: difficulty === 'All' ? '' : difficulty });
  };

  const handleTopicChange = (topic) => {
    onFilterChange({ ...filters, topic: topic === 'All' ? '' : topic });
  };

  const hasActiveFilters = filters?.language || filters?.difficulty || filters?.topic;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Filter Courses</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <Icon name="X" size={16} className="mr-1" />
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Language Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Language</label>
          <div className="flex flex-wrap gap-2">
            {languages?.map((language) => (
              <button
                key={language}
                onClick={() => handleLanguageChange(language)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-smooth ${
                  (language === 'All' && !filters?.language) || filters?.language === language
                    ? 'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-muted'
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
        
        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Difficulty</label>
          <div className="flex flex-wrap gap-2">
            {difficulties?.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => handleDifficultyChange(difficulty)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-smooth ${
                  (difficulty === 'All' && !filters?.difficulty) || filters?.difficulty === difficulty
                    ? 'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-muted'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>
        
        {/* Topic Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Topic Focus</label>
          <div className="flex flex-wrap gap-2">
            {topics?.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicChange(topic)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-smooth ${
                  (topic === 'All' && !filters?.topic) || filters?.topic === topic
                    ? 'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-muted'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;