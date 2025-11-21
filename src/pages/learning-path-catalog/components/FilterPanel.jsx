import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({
  filters,
  onFiltersChange,
  resultCount = 0,
  onClearFilters,
  isMobile = false,
  isOpen = true,
  onToggle
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const skillLevelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const languageOptions = [
    { value: 'all', label: 'All Languages' },
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: 'short', label: '1-4 weeks' },
    { value: 'medium', label: '1-3 months' },
    { value: 'long', label: '3+ months' }
  ];

  const topicOptions = [
    { value: 'web-security', label: 'Web Security' },
    { value: 'secure-coding', label: 'Secure Coding' },
    { value: 'vulnerability-detection', label: 'Vulnerability Detection' },
    { value: 'penetration-testing', label: 'Penetration Testing' },
    { value: 'cryptography', label: 'Cryptography' },
    { value: 'api-security', label: 'API Security' },
    { value: 'mobile-security', label: 'Mobile Security' },
    { value: 'cloud-security', label: 'Cloud Security' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleTopicToggle = (topic) => {
    const currentTopics = localFilters?.topics || [];
    const newTopics = currentTopics?.includes(topic)
      ? currentTopics?.filter(t => t !== topic)
      : [...currentTopics, topic];
    
    handleFilterChange('topics', newTopics);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      skillLevel: 'all',
      language: 'all',
      duration: 'all',
      topics: [],
      sortBy: 'popularity'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClearFilters?.();
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {resultCount} learning paths found
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          iconName="X"
          iconPosition="left"
        >
          Clear All
        </Button>
      </div>

      {/* Skill Level Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Skill Level
        </label>
        <Select
          options={skillLevelOptions}
          value={localFilters?.skillLevel || 'all'}
          onChange={(value) => handleFilterChange('skillLevel', value)}
          placeholder="Select skill level"
        />
      </div>

      {/* Programming Language Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Programming Language
        </label>
        <Select
          options={languageOptions}
          value={localFilters?.language || 'all'}
          onChange={(value) => handleFilterChange('language', value)}
          placeholder="Select language"
        />
      </div>

      {/* Duration Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Duration
        </label>
        <Select
          options={durationOptions}
          value={localFilters?.duration || 'all'}
          onChange={(value) => handleFilterChange('duration', value)}
          placeholder="Select duration"
        />
      </div>

      {/* Topic Focus Filter */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          Topic Focus
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {topicOptions?.map((topic) => (
            <Checkbox
              key={topic?.value}
              label={topic?.label}
              checked={(localFilters?.topics || [])?.includes(topic?.value)}
              onChange={() => handleTopicToggle(topic?.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Filter Toggle Button */}
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          className="w-full mb-4"
        >
          Filters ({resultCount} results)
        </Button>

        {/* Mobile Filter Panel */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-background">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">
                  Filter Learning Paths
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  iconName="X"
                />
              </div>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <FilterContent />
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border">
                <Button
                  variant="default"
                  onClick={onToggle}
                  fullWidth
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Filters</span>
        </h2>
      </div>
      
      <FilterContent />
    </div>
  );
};

export default FilterPanel;