import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportSection = () => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedData, setSelectedData] = useState(['progress', 'achievements']);
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    { id: 'pdf', label: 'PDF Report', icon: 'FileText', description: 'Comprehensive visual report' },
    { id: 'csv', label: 'CSV Data', icon: 'Table', description: 'Raw data for analysis' },
    { id: 'json', label: 'JSON Export', icon: 'Code', description: 'Structured data format' }
  ];

  const dataTypes = [
    { id: 'progress', label: 'Learning Progress', description: 'Hours, modules, and completion rates' },
    { id: 'achievements', label: 'Achievements & Badges', description: 'Earned certifications and milestones' },
    { id: 'analytics', label: 'Performance Analytics', description: 'Charts and statistical insights' },
    { id: 'timeline', label: 'Learning Timeline', description: 'Historical activity and patterns' }
  ];

  const handleDataTypeToggle = (typeId) => {
    setSelectedData(prev => 
      prev?.includes(typeId) 
        ? prev?.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // TODO: Implement actual export/download functionality
    const filename = `securecodehub-analytics-${new Date()?.toISOString()?.split('T')?.[0]}.${selectedFormat}`;
    
    setIsExporting(false);
  };

  const shareOptions = [
    { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', color: 'text-blue-600' },
    { id: 'twitter', label: 'Twitter', icon: 'Twitter', color: 'text-blue-400' },
    { id: 'github', label: 'GitHub', icon: 'Github', color: 'text-gray-800' },
    { id: 'link', label: 'Copy Link', icon: 'Link', color: 'text-primary' }
  ];

  return (
    <div className="space-y-6">
      {/* Export Configuration */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Export Analytics</h3>
            <p className="text-sm text-muted-foreground">Download your learning data for portfolio or external tracking</p>
          </div>
          <Icon name="Download" size={20} color="var(--color-primary)" />
        </div>

        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Export Format</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {exportFormats?.map((format) => (
                <div
                  key={format?.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedFormat === format?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedFormat(format?.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={format?.icon} 
                      size={20} 
                      color={selectedFormat === format?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                    />
                    <div>
                      <div className={`text-sm font-medium ${
                        selectedFormat === format?.id ? 'text-primary' : 'text-foreground'
                      }`}>
                        {format?.label}
                      </div>
                      <div className="text-xs text-muted-foreground">{format?.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Selection */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Include Data</h4>
            <div className="space-y-2">
              {dataTypes?.map((type) => (
                <div
                  key={type?.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedData?.includes(type?.id)
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleDataTypeToggle(type?.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        selectedData?.includes(type?.id)
                          ? 'border-primary bg-primary' :'border-border'
                      }`}>
                        {selectedData?.includes(type?.id) && (
                          <Icon name="Check" size={12} color="white" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{type?.label}</div>
                        <div className="text-xs text-muted-foreground">{type?.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Button */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              {selectedData?.length} data type{selectedData?.length !== 1 ? 's' : ''} selected
            </div>
            <Button
              onClick={handleExport}
              disabled={selectedData?.length === 0 || isExporting}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
            >
              {isExporting ? 'Exporting...' : `Export ${selectedFormat?.toUpperCase()}`}
            </Button>
          </div>
        </div>
      </div>
      {/* Social Sharing */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Share Achievements</h3>
            <p className="text-sm text-muted-foreground">Showcase your learning progress on social platforms</p>
          </div>
          <Icon name="Share2" size={20} color="var(--color-primary)" />
        </div>

        <div className="space-y-4">
          {/* Achievement Preview */}
          <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-border">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Trophy" size={24} color="white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground">127.5 Hours Learned</h4>
                <p className="text-sm text-muted-foreground">24 modules completed • 15-day streak</p>
                <p className="text-xs text-primary font-medium mt-1">SecureCodeHub Learning Journey</p>
              </div>
            </div>
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {shareOptions?.map((option) => (
              <Button
                key={option?.id}
                variant="outline"
                className="flex items-center justify-center space-x-2 h-12"
                onClick={() => {
                  // TODO: Implement social sharing functionality
                }}
              >
                <Icon name={option?.icon} size={18} className={option?.color} />
                <span className="text-sm">{option?.label}</span>
              </Button>
            ))}
          </div>

          <div className="text-xs text-muted-foreground text-center pt-2">
            Sharing respects your privacy settings and only includes public achievements
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Common analytics tasks and shortcuts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Target" size={20} color="var(--color-primary)" />
              <div className="text-left">
                <div className="text-sm font-medium text-foreground">Set Learning Goals</div>
                <div className="text-xs text-muted-foreground">Define targets for next month</div>
              </div>
            </div>
          </Button>

          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={20} color="var(--color-secondary)" />
              <div className="text-left">
                <div className="text-sm font-medium text-foreground">Schedule Review</div>
                <div className="text-xs text-muted-foreground">Plan weekly progress check</div>
              </div>
            </div>
          </Button>

          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Users" size={20} color="var(--color-accent)" />
              <div className="text-left">
                <div className="text-sm font-medium text-foreground">Compare with Peers</div>
                <div className="text-xs text-muted-foreground">Anonymous benchmarking</div>
              </div>
            </div>
          </Button>

          <Button variant="outline" className="justify-start h-auto p-4">
            <div className="flex items-center space-x-3">
              <Icon name="BookOpen" size={20} color="var(--color-warning)" />
              <div className="text-left">
                <div className="text-sm font-medium text-foreground">Detailed Reports</div>
                <div className="text-xs text-muted-foreground">In-depth analysis view</div>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportSection;