import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({
  searchQuery = '',
  onSearchChange,
  onSearchSubmit,
  suggestions = [],
  isLoading = false,
  className = ""
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  const popularSearches = [
    'Web Security Fundamentals',
    'Secure Coding Practices',
    'Penetration Testing',
    'API Security',
    'Cryptography Basics',
    'Vulnerability Assessment',
    'OWASP Top 10',
    'Secure Development'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    onSearchChange(value);
    setShowSuggestions(value?.length > 0);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    const totalItems = suggestions?.length + popularSearches?.length;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedIndex(prev => (prev < totalItems - 1 ? prev + 1 : -1));
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedIndex(prev => (prev > -1 ? prev - 1 : totalItems - 1));
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedIndex >= 0) {
          const selectedItem = selectedIndex < suggestions?.length 
            ? suggestions?.[selectedIndex]
            : popularSearches?.[selectedIndex - suggestions?.length];
          handleSuggestionClick(selectedItem);
        } else {
          handleSubmit();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const searchTerm = typeof suggestion === 'string' ? suggestion : suggestion?.title;
    onSearchChange(searchTerm);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onSearchSubmit?.(searchTerm);
  };

  const handleSubmit = () => {
    if (searchQuery?.trim()) {
      onSearchSubmit?.(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleFocus = () => {
    if (searchQuery?.length > 0 || suggestions?.length > 0) {
      setShowSuggestions(true);
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search learning paths, topics, or skills..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className="pl-10 pr-12"
        />
        
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onSearchChange('');
              setShowSuggestions(false);
            }}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
          >
            <Icon name="X" size={14} />
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSubmit}
          loading={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8"
        >
          <Icon name="Search" size={16} />
        </Button>
      </div>
      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevated z-50 max-h-96 overflow-y-auto"
        >
          {/* Search Results */}
          {suggestions?.length > 0 && (
            <div className="p-2">
              <div className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-muted-foreground">
                <Icon name="Search" size={14} />
                <span>Search Results</span>
              </div>
              {suggestions?.map((suggestion, index) => (
                <button
                  key={`suggestion-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedIndex === index
                      ? 'bg-muted text-foreground'
                      : 'text-popover-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="BookOpen" size={16} className="text-primary" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {suggestion?.title}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {suggestion?.skillLevel} • {suggestion?.language}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {(searchQuery?.length === 0 || suggestions?.length === 0) && (
            <div className="p-2">
              <div className="flex items-center space-x-2 px-3 py-2 text-xs font-medium text-muted-foreground">
                <Icon name="TrendingUp" size={14} />
                <span>Popular Searches</span>
              </div>
              {popularSearches?.map((search, index) => {
                const adjustedIndex = suggestions?.length + index;
                return (
                  <button
                    key={`popular-${index}`}
                    onClick={() => handleSuggestionClick(search)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedIndex === adjustedIndex
                        ? 'bg-muted text-foreground'
                        : 'text-popover-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span>{search}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* No Results */}
          {searchQuery?.length > 0 && suggestions?.length === 0 && !isLoading && (
            <div className="p-4 text-center">
              <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No results found for "{searchQuery}"
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Try different keywords or browse our categories
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-muted-foreground">Searching...</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;