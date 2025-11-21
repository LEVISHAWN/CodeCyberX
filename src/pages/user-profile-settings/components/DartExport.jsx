import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const DataExport = () => {
  const [exportSettings, setExportSettings] = useState({
    profileData: true,
    learningProgress: true,
    codeSubmissions: false,
    achievements: true,
    communityActivity: false,
    accountHistory: false
  });

  const [exportFormat, setExportFormat] = useState('json');
  const [isExporting, setIsExporting] = useState(false);
  const [exportHistory, setExportHistory] = useState([
    {
      id: 1,
      date: '2024-10-01',
      type: 'Full Export',
      format: 'JSON',
      size: '2.4 MB',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 2,
      date: '2024-09-15',
      type: 'Learning Progress',
      format: 'CSV',
      size: '156 KB',
      status: 'completed',
      downloadUrl: '#'
    },
    {
      id: 3,
      date: '2024-09-01',
      type: 'Profile Data',
      format: 'JSON',
      size: '45 KB',
      status: 'expired',
      downloadUrl: null
    }
  ]);

  const formatOptions = [
    { value: 'json', label: 'JSON', description: 'Machine-readable format, best for developers' },
    { value: 'csv', label: 'CSV', description: 'Spreadsheet format, good for data analysis' },
    { value: 'pdf', label: 'PDF', description: 'Human-readable format, good for archiving' }
  ];

  const dataTypes = [
    {
      key: 'profileData',
      label: 'Profile Information',
      description: 'Personal details, bio, preferences, and settings',
      size: '~45 KB'
    },
    {
      key: 'learningProgress',
      label: 'Learning Progress',
      description: 'Course completions, skill levels, and learning analytics',
      size: '~120 KB'
    },
    {
      key: 'codeSubmissions',
      label: 'Code Submissions',
      description: 'All your code solutions and project submissions',
      size: '~2.1 MB'
    },
    {
      key: 'achievements',
      label: 'Achievements & Certificates',
      description: 'Badges, certificates, and milestone records',
      size: '~80 KB'
    },
    {
      key: 'communityActivity',
      label: 'Community Activity',
      description: 'Forum posts, comments, and peer interactions',
      size: '~350 KB'
    },
    {
      key: 'accountHistory',
      label: 'Account History',
      description: 'Login history, security events, and account changes',
      size: '~25 KB'
    }
  ];

  const handleCheckboxChange = (field, checked) => {
    setExportSettings(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Add new export to history
    const newExport = {
      id: exportHistory?.length + 1,
      date: new Date()?.toISOString()?.split('T')?.[0],
      type: 'Custom Export',
      format: exportFormat?.toUpperCase(),
      size: calculateExportSize(),
      status: 'completed',
      downloadUrl: '#'
    };
    
    setExportHistory(prev => [newExport, ...prev]);
    setIsExporting(false);
  };

  const calculateExportSize = () => {
    let totalSize = 0;
    const sizeMap = {
      profileData: 45,
      learningProgress: 120,
      codeSubmissions: 2100,
      achievements: 80,
      communityActivity: 350,
      accountHistory: 25
    };

    Object.keys(exportSettings)?.forEach(key => {
      if (exportSettings?.[key]) {
        totalSize += sizeMap?.[key] || 0;
      }
    });

    return totalSize > 1000 ? `${(totalSize / 1000)?.toFixed(1)} MB` : `${totalSize} KB`;
  };

  const getSelectedDataTypes = () => {
    return Object.keys(exportSettings)?.filter(key => exportSettings?.[key])?.length;
  };

  const handleDownload = (exportItem) => {
    // TODO: Implement download functionality
    // Simulate download
  };

  const handleDeleteExport = (exportId) => {
    setExportHistory(prev => prev?.filter(item => item?.id !== exportId));
  };

  return (
    <div className="space-y-8">
      {/* Export Configuration */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Download" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Export Your Data</h3>
        </div>

        <div className="p-4 bg-muted rounded-md">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="mt-1" color="var(--color-primary)" />
            <div>
              <p className="text-sm font-medium text-foreground">Data Portability Rights</p>
              <p className="text-sm text-muted-foreground mt-1">
                You have the right to export your personal data in a structured, commonly used format. 
                This includes all information you've provided and data generated through your use of SecureCodeHub.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Data Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">Select Data to Export</h4>
          <span className="text-sm text-muted-foreground">
            {getSelectedDataTypes()} of {dataTypes?.length} selected • Est. size: {calculateExportSize()}
          </span>
        </div>

        <div className="space-y-3">
          {dataTypes?.map((dataType) => (
            <div key={dataType?.key} className="flex items-start space-x-3 p-3 border border-border rounded-md">
              <Checkbox
                checked={exportSettings?.[dataType?.key]}
                onChange={(e) => handleCheckboxChange(dataType?.key, e?.target?.checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-foreground">{dataType?.label}</h5>
                  <span className="text-xs text-muted-foreground">{dataType?.size}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{dataType?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Export Format */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Export Format</h4>
        
        <Select
          options={formatOptions}
          value={exportFormat}
          onChange={setExportFormat}
          description="Choose the format that best suits your needs"
        />
      </div>
      {/* Export Button */}
      <div className="flex items-center space-x-4 pt-4 border-t border-border">
        <Button
          variant="default"
          onClick={handleExport}
          loading={isExporting}
          disabled={getSelectedDataTypes() === 0}
          iconName="Download"
          iconPosition="left"
        >
          {isExporting ? 'Preparing Export...' : 'Export Data'}
        </Button>
        
        {isExporting && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>This may take a few minutes for large exports</span>
          </div>
        )}
      </div>
      {/* Export History */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="History" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Export History</h3>
        </div>

        <div className="space-y-3">
          {exportHistory?.map((exportItem) => (
            <div key={exportItem?.id} className="flex items-center justify-between p-4 border border-border rounded-md">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  exportItem?.status === 'completed' ? 'bg-success/10' : 
                  exportItem?.status === 'expired' ? 'bg-muted' : 'bg-warning/10'
                }`}>
                  <Icon 
                    name={
                      exportItem?.status === 'completed' ? 'CheckCircle' : 
                      exportItem?.status === 'expired' ? 'XCircle' : 'Clock'
                    } 
                    size={20} 
                    color={
                      exportItem?.status === 'completed' ? 'var(--color-success)' : 
                      exportItem?.status === 'expired' ? 'var(--color-muted-foreground)' : 'var(--color-warning)'
                    }
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-foreground">{exportItem?.type}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      exportItem?.status === 'completed' ? 'bg-success/10 text-success' :
                      exportItem?.status === 'expired' ? 'bg-muted text-muted-foreground' :
                      'bg-warning/10 text-warning'
                    }`}>
                      {exportItem?.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span>{new Date(exportItem.date)?.toLocaleDateString()}</span>
                    <span>{exportItem?.format}</span>
                    <span>{exportItem?.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {exportItem?.status === 'completed' && exportItem?.downloadUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(exportItem)}
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteExport(exportItem?.id)}
                  iconName="Trash2"
                />
              </div>
            </div>
          ))}
        </div>

        {exportHistory?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="FileX" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <p className="text-muted-foreground">No export history yet</p>
            <p className="text-sm text-muted-foreground">Your data exports will appear here</p>
          </div>
        )}
      </div>
      {/* Data Retention Info */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Data Retention Policy</h3>
        </div>

        <div className="p-4 bg-muted rounded-md space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={16} className="mt-1" />
            <div>
              <p className="font-medium text-foreground">Export Availability</p>
              <p className="text-sm text-muted-foreground">
                Data exports are available for download for 30 days after generation. 
                After this period, you'll need to generate a new export.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Icon name="Database" size={16} className="mt-1" />
            <div>
              <p className="font-medium text-foreground">Data Storage</p>
              <p className="text-sm text-muted-foreground">
                Your data is securely stored and backed up. We retain your learning data 
                to provide continuous service and personalized recommendations.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Icon name="Trash2" size={16} className="mt-1" />
            <div>
              <p className="font-medium text-foreground">Account Deletion</p>
              <p className="text-sm text-muted-foreground">
                If you delete your account, all personal data will be permanently removed 
                within 30 days, except where required by law or for security purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExport;