import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, onSearch }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  // Mock search suggestions and recent searches
  const mockSuggestions = [
    "Python security fundamentals",
    "JavaScript web security",
    "SQL injection prevention",
    "Cryptography basics",
    "Penetration testing",
    "Secure coding practices",
    "Web application security",
    "Network security",
    "Ethical hacking",
    "Cybersecurity fundamentals"
  ];

  const recentSearches = [
    "Python basics",
    "Web security",
    "Algorithm challenges"
  ];

  useEffect(() => {
    if (searchQuery?.length > 0) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions(recentSearches);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    onSearchChange(e?.target?.value);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    onSearchChange('');
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={20} color="var(--color-muted-foreground)" />
        </div>
        <Input
          type="text"
          placeholder="Search courses, technologies, or topics..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-20 h-12 text-base"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearSearch}
              className="h-8 w-8"
            >
              <Icon name="X" size={16} />
            </Button>
          )}
          <Button
            variant="default"
            size="sm"
            onClick={handleSearchClick}
            iconName="Search"
            iconSize={16}
          >
            Search
          </Button>
        </div>
      </div>
      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-elevated z-50 max-h-64 overflow-y-auto">
          {searchQuery?.length === 0 && recentSearches?.length > 0 && (
            <div className="p-3 border-b border-border">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Recent Searches
                </span>
              </div>
              {recentSearches?.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(search)}
                  className="flex items-center space-x-2 w-full text-left px-2 py-1 text-sm text-foreground hover:bg-muted rounded transition-smooth"
                >
                  <Icon name="RotateCcw" size={14} color="var(--color-muted-foreground)" />
                  <span>{search}</span>
                </button>
              ))}
            </div>
          )}

          {suggestions?.length > 0 && (
            <div className="p-2">
              {searchQuery?.length > 0 && (
                <div className="flex items-center space-x-2 mb-2 px-2">
                  <Icon name="Lightbulb" size={14} color="var(--color-muted-foreground)" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Suggestions
                  </span>
                </div>
              )}
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex items-center space-x-2 w-full text-left px-2 py-2 text-sm text-foreground hover:bg-muted rounded transition-smooth"
                >
                  <Icon name="Search" size={14} color="var(--color-muted-foreground)" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {suggestions?.length === 0 && searchQuery?.length > 0 && (
            <div className="p-4 text-center">
              <Icon name="Search" size={24} color="var(--color-muted-foreground)" className="mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No suggestions found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;