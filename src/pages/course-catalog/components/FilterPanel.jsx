import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  resultCount,
  isCollapsed,
  onToggleCollapse 
}) => {
  const categories = [
    { value: 'programming-basics', label: 'Programming Basics' },
    { value: 'web-security', label: 'Web Security' },
    { value: 'algorithm-challenges', label: 'Algorithm Challenges' },
    { value: 'penetration-testing', label: 'Penetration Testing' },
    { value: 'secure-coding', label: 'Secure Coding' },
    { value: 'cryptography', label: 'Cryptography' }
  ];

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const durationRanges = [
    { value: '0-5', label: 'Under 5 hours' },
    { value: '5-15', label: '5-15 hours' },
    { value: '15-30', label: '15-30 hours' },
    { value: '30+', label: '30+ hours' }
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'hindi', label: 'Hindi' }
  ];

  const handleCategoryChange = (category) => {
    const updatedCategories = filters?.categories?.includes(category)
      ? filters?.categories?.filter(c => c !== category)
      : [...filters?.categories, category];
    onFilterChange({ ...filters, categories: updatedCategories });
  };

  const handleDifficultyChange = (difficulty) => {
    const updatedDifficulty = filters?.difficulty?.includes(difficulty)
      ? filters?.difficulty?.filter(d => d !== difficulty)
      : [...filters?.difficulty, difficulty];
    onFilterChange({ ...filters, difficulty: updatedDifficulty });
  };

  const handleDurationChange = (duration) => {
    onFilterChange({ ...filters, duration });
  };

  const handleLanguageChange = (language) => {
    onFilterChange({ ...filters, language });
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-subtle ${isCollapsed ? 'md:block hidden' : ''}`}>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span className="font-semibold text-foreground">Filters</span>
          <span className="text-sm text-muted-foreground">({resultCount} courses)</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onToggleCollapse}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      <div className="p-4 space-y-6">
        {/* Results Count - Desktop */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} />
            <span className="font-semibold text-foreground">Filters</span>
          </div>
          <span className="text-sm text-muted-foreground">{resultCount} courses</span>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Folder" size={16} />
            <span>Categories</span>
          </h3>
          <div className="space-y-2">
            {categories?.map((category) => (
              <Checkbox
                key={category?.value}
                label={category?.label}
                checked={filters?.categories?.includes(category?.value)}
                onChange={() => handleCategoryChange(category?.value)}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Difficulty Level */}
        <div>
          <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="BarChart3" size={16} />
            <span>Difficulty Level</span>
          </h3>
          <div className="space-y-2">
            {difficultyLevels?.map((level) => (
              <Checkbox
                key={level?.value}
                label={level?.label}
                checked={filters?.difficulty?.includes(level?.value)}
                onChange={() => handleDifficultyChange(level?.value)}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Clock" size={16} />
            <span>Duration</span>
          </h3>
          <Select
            options={durationRanges}
            value={filters?.duration}
            onChange={handleDurationChange}
            placeholder="Select duration"
          />
        </div>

        {/* Language */}
        <div>
          <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Globe" size={16} />
            <span>Language</span>
          </h3>
          <Select
            options={languages}
            value={filters?.language}
            onChange={handleLanguageChange}
            placeholder="Select language"
          />
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full"
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;