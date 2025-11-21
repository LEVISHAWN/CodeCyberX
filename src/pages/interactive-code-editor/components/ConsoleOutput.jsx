import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConsoleOutput = ({ 
  output = [], 
  isRunning = false, 
  onClear,
  onToggleExpand,
  isExpanded = false,
  className = "" 
}) => {
  const [filter, setFilter] = useState('all');
  const consoleRef = useRef(null);

  const mockOutput = [
    {
      id: 1,
      type: 'info',
      timestamp: new Date(Date.now() - 5000),
      message: 'Code execution started...',
      source: 'system'
    },
    {
      id: 2,
      type: 'log',
      timestamp: new Date(Date.now() - 4500),
      message: 'Hello, SecureCodeHub!',
      source: 'user'
    },
    {
      id: 3,
      type: 'warning',
      timestamp: new Date(Date.now() - 4000),
      message: 'Warning: Using deprecated function Math.random() for security-sensitive operations',
      source: 'security'
    },
    {
      id: 4,
      type: 'log',
      timestamp: new Date(Date.now() - 3500),
      message: 'Processing user input: "admin"',
      source: 'user'
    },
    {
      id: 5,
      type: 'error',
      timestamp: new Date(Date.now() - 3000),
      message: 'SecurityError: Potential SQL injection detected at line 15',
      source: 'security'
    },
    {
      id: 6,
      type: 'success',
      timestamp: new Date(Date.now() - 2500),
      message: 'Security scan completed. 3 issues found.',
      source: 'security'
    },
    {
      id: 7,
      type: 'log',
      timestamp: new Date(Date.now() - 2000),
      message: 'Execution completed in 1.23s',
      source: 'system'
    }
  ];

  const displayOutput = output?.length > 0 ? output : mockOutput;

  const filteredOutput = displayOutput?.filter(item => {
    if (filter === 'all') return true;
    return item?.type === filter;
  });

  useEffect(() => {
    if (consoleRef?.current) {
      consoleRef.current.scrollTop = consoleRef?.current?.scrollHeight;
    }
  }, [displayOutput]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'info': return 'Info';
      default: return 'Terminal';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'success': return 'text-success';
      case 'info': return 'text-primary';
      default: return 'text-foreground';
    }
  };

  const getSourceBadge = (source) => {
    switch (source) {
      case 'security': return 'bg-error/10 text-error border-error/20';
      case 'system': return 'bg-primary/10 text-primary border-primary/20';
      case 'user': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp?.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const typeCounts = {
    error: displayOutput?.filter(item => item?.type === 'error')?.length,
    warning: displayOutput?.filter(item => item?.type === 'warning')?.length,
    success: displayOutput?.filter(item => item?.type === 'success')?.length,
    log: displayOutput?.filter(item => item?.type === 'log')?.length
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      {/* Console Header */}
      <div className="bg-muted border-b border-border p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Terminal" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Console Output
            </h3>
            {isRunning && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Running</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpand}
              iconName={isExpanded ? "Minimize2" : "Maximize2"}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
              iconName="Trash2"
              iconPosition="left"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Output Summary */}
        <div className="flex items-center space-x-4 mt-3">
          <div className="flex items-center space-x-2">
            <Icon name="XCircle" size={12} className="text-error" />
            <span className="text-sm text-muted-foreground">
              Errors: {typeCounts?.error}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={12} className="text-warning" />
            <span className="text-sm text-muted-foreground">
              Warnings: {typeCounts?.warning}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={12} className="text-success" />
            <span className="text-sm text-muted-foreground">
              Success: {typeCounts?.success}
            </span>
          </div>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {['all', 'log', 'error', 'warning', 'success', 'info']?.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-fast ${
                filter === type
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {type === 'all' ? 'All' : type?.charAt(0)?.toUpperCase() + type?.slice(1)}
              {type !== 'all' && typeCounts?.[type] > 0 && (
                <span className="ml-1 text-xs">
                  ({typeCounts?.[type]})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Console Content */}
      <div 
        ref={consoleRef}
        className={`bg-gray-900 text-gray-100 font-data text-sm overflow-y-auto ${
          isExpanded ? 'h-96' : 'h-48'
        }`}
      >
        {filteredOutput?.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            <Icon name="Terminal" size={32} className="mx-auto mb-2 opacity-50" />
            <p>No output to display</p>
            <p className="text-xs mt-1">Run your code to see results here</p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {filteredOutput?.map((item) => (
              <div key={item?.id} className="flex items-start space-x-3 group">
                <span className="text-gray-500 text-xs mt-1 font-mono">
                  {formatTimestamp(item?.timestamp)}
                </span>
                
                <Icon 
                  name={getTypeIcon(item?.type)} 
                  size={14} 
                  className={`mt-0.5 ${getTypeColor(item?.type)}`} 
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded border ${getSourceBadge(item?.source)}`}>
                      {item?.source}
                    </span>
                  </div>
                  
                  <pre className="text-gray-100 whitespace-pre-wrap break-words mt-1">
                    {item?.message}
                  </pre>
                </div>
              </div>
            ))}
            
            {isRunning && (
              <div className="flex items-center space-x-3 text-gray-400">
                <span className="text-xs font-mono">
                  {formatTimestamp(new Date())}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm">Executing...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Console Footer */}
      <div className="bg-muted border-t border-border px-4 py-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Total: {displayOutput?.length} messages</span>
            <span>Filtered: {filteredOutput?.length} shown</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={12} className="text-success" />
            <span>Secure execution environment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsoleOutput;