import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ViewToggle = ({
  viewMode = 'grid',
  onViewModeChange,
  sortBy = 'popularity',
  onSortChange,
  totalResults = 0,
  className = ""
}) => {
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'duration-short', label: 'Shortest Duration' },
    { value: 'duration-long', label: 'Longest Duration' },
    { value: 'alphabetical', label: 'A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 ${className}`}>
      {/* Results Count */}
      <div className="flex items-center space-x-2">
        <Icon name="Search" size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {totalResults?.toLocaleString()} learning paths found
        </span>
      </div>
      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground hidden sm:block">
            Sort by:
          </span>
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            className="w-40"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            iconName="Grid3X3"
            className="px-3"
          />
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            iconName="List"
            className="px-3"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewToggle;