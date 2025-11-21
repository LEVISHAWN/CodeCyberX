import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const EditorToolbar = ({
  onRun,
  onSave,
  onShare,
  onReset,
  onNewFile,
  onOpenFile,
  isRunning = false,
  isSaving = false,
  language = 'javascript',
  onLanguageChange,
  className = ""
}) => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'sql', label: 'SQL' }
  ];

  const handleShare = (type) => {
    setIsShareMenuOpen(false);
    onShare?.(type);
  };

  const handleFileAction = (action) => {
    setIsFileMenuOpen(false);
    if (action === 'new') onNewFile?.();
    if (action === 'open') onOpenFile?.();
  };

  return (
    <div className={`bg-card border-b border-border p-4 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Left Section - File Operations */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFileMenuOpen(!isFileMenuOpen)}
              iconName="File"
              iconPosition="left"
            >
              File
            </Button>

            {isFileMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevated z-20">
                <div className="py-1">
                  <button
                    onClick={() => handleFileAction('new')}
                    className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-fast"
                  >
                    <Icon name="FileText" size={16} className="mr-3" />
                    New File
                  </button>
                  <button
                    onClick={() => handleFileAction('open')}
                    className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-fast"
                  >
                    <Icon name="FolderOpen" size={16} className="mr-3" />
                    Open File
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button
                    onClick={onSave}
                    disabled={isSaving}
                    className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-fast disabled:opacity-50"
                  >
                    <Icon name="Save" size={16} className="mr-3" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <Select
            options={languageOptions}
            value={language}
            onChange={onLanguageChange}
            className="w-36"
          />
        </div>

        {/* Center Section - Main Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="default"
            size="sm"
            onClick={onRun}
            disabled={isRunning}
            loading={isRunning}
            iconName="Play"
            iconPosition="left"
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            disabled={isSaving}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
        </div>

        {/* Right Section - Share and More */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
              iconName="Share"
              iconPosition="left"
            >
              Share
            </Button>

            {isShareMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevated z-20">
                <div className="py-1">
                  <button
                    onClick={() => handleShare('link')}
                    className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-fast"
                  >
                    <Icon name="Link" size={16} className="mr-3" />
                    Copy Link
                  </button>
                  <button
                    onClick={() => handleShare('embed')}
                    className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-fast"
                  >
                    <Icon name="Code" size={16} className="mr-3" />
                    Embed Code
                  </button>
                  <button
                    onClick={() => handleShare('github')}
                    className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-fast"
                  >
                    <Icon name="Github" size={16} className="mr-3" />
                    Save to GitHub
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button
                    onClick={() => handleShare('export')}
                    className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-fast"
                  >
                    <Icon name="Download" size={16} className="mr-3" />
                    Export File
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Security Status Indicator */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 border border-success/20 rounded-md">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Secure</span>
          </div>
        </div>
      </div>

      {/* Secondary Toolbar */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} />
            <span>Auto-save: On</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={14} />
            <span>Collaborative: Ready</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={14} />
            <span>Real-time analysis: Active</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Server" size={14} />
          <span>Sandboxed Environment</span>
        </div>
      </div>

      {/* Backdrop for dropdowns */}
      {(isShareMenuOpen || isFileMenuOpen) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setIsShareMenuOpen(false);
            setIsFileMenuOpen(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default EditorToolbar;