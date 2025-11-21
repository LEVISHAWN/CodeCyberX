import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ForumSearch = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'general', label: 'General Discussion' },
    { value: 'code-help', label: 'Code Help' },
    { value: 'security', label: 'Security Questions' },
    { value: 'career', label: 'Career Advice' },
    { value: 'announcements', label: 'Announcements' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'solved', label: 'Solved First' },
    { value: 'unsolved', label: 'Unsolved First' },
    { value: 'votes', label: 'Most Upvoted' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch?.({
      query: searchQuery,
      category: selectedCategory,
      sort: selectedSort
    });
  };

  const handleFilterChange = (filters) => {
    onFilterChange?.(filters);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search discussions, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <Select
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="w-40"
            />
            
            <Select
              options={sortOptions}
              value={selectedSort}
              onChange={setSelectedSort}
              className="w-36"
            />
            
            <Button type="submit" iconName="Search" iconPosition="left">
              Search
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <Icon name={isAdvancedOpen ? "ChevronUp" : "ChevronDown"} size={16} />
            <span>Advanced Filters</span>
          </button>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="TrendingUp" size={14} />
              <span>Trending: React Security, API Testing</span>
            </div>
          </div>
        </div>
        
        {isAdvancedOpen && (
          <div className="border-t border-border pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date Range
                </label>
                <Select
                  options={[
                    { value: 'all', label: 'All Time' },
                    { value: 'today', label: 'Today' },
                    { value: 'week', label: 'This Week' },
                    { value: 'month', label: 'This Month' },
                    { value: 'year', label: 'This Year' }
                  ]}
                  value="all"
                  onChange={() => {}}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <Select
                  options={[
                    { value: 'all', label: 'All Posts' },
                    { value: 'solved', label: 'Solved Only' },
                    { value: 'unsolved', label: 'Unsolved Only' },
                    { value: 'locked', label: 'Locked Posts' }
                  ]}
                  value="all"
                  onChange={() => {}}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Author Level
                </label>
                <Select
                  options={[
                    { value: 'all', label: 'All Levels' },
                    { value: 'beginner', label: 'Beginner' },
                    { value: 'intermediate', label: 'Intermediate' },
                    { value: 'advanced', label: 'Advanced' },
                    { value: 'expert', label: 'Expert' }
                  ]}
                  value="all"
                  onChange={() => {}}
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ForumSearch;