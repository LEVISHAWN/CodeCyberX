import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import CodeEditor from './components/CodeEditor';
import VulnerabilityPanel from './components/VulnerabilityPanel';
import ConsoleOutput from './components/ConsoleOutput';
import EditorToolbar from './components/EditorToolbar';
import CodeTemplates from './components/CodeTemplates';

const InteractiveCodeEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(14);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showConsole, setShowConsole] = useState(true);
  const [showVulnerabilities, setShowVulnerabilities] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(false);
  const [layout, setLayout] = useState('horizontal'); // horizontal or vertical

  // Initialize with default code based on language
  useEffect(() => {
    const defaultCode = {
      javascript: `// Welcome to SecureCodeHub Interactive Editor!
// This environment provides real-time security analysis

function greetUser(name) {
  // TODO: Add input validation here
  console.log("Hello, " + name + "!");
  return "Welcome to secure coding!";
}

// Example with potential security issue
function processUserData(userData) {
  // This concatenation could be vulnerable
  const query = "SELECT * FROM users WHERE name = '" + userData + "'";
  console.log("Query:", query);
  return query;
}

// Test the functions
greetUser("SecureCodeHub User");
processUserData("admin");`,
      python: `# Welcome to SecureCodeHub Python Editor!
# This environment provides real-time security analysis

import hashlib
import secrets

def greet_user(name):
    # TODO: Add input validation here
    print(f"Hello, {name}!")
    return "Welcome to secure coding!"

def process_user_data(user_data):
    # This string formatting could be vulnerable
    query = f"SELECT * FROM users WHERE name = '{user_data}'"
    print(f"Query: {query}")
    return query

# Example of secure random generation
def generate_secure_token():
    return secrets.token_hex(32)

# Test the functions
greet_user("SecureCodeHub User")
process_user_data("admin")
token = generate_secure_token()
print(f"Secure token: {token}")`
    };

    setCode(defaultCode?.[language] || defaultCode?.javascript);
  }, [language]);

  const handleRunCode = async () => {
    setIsRunning(true);
    
    // Simulate code execution and security analysis
    setTimeout(() => {
      const newOutput = [
        {
          id: Date.now(),
          type: 'info',
          timestamp: new Date(),
          message: 'Code execution started...',
          source: 'system'
        },
        {
          id: Date.now() + 1,
          type: 'log',
          timestamp: new Date(),
          message: language === 'javascript' ? 'Hello, SecureCodeHub User!' : 'Hello, SecureCodeHub User!',
          source: 'user'
        },
        {
          id: Date.now() + 2,
          type: 'warning',
          timestamp: new Date(),
          message: 'Security scan completed. Issues detected.',
          source: 'security'
        },
        {
          id: Date.now() + 3,
          type: 'success',
          timestamp: new Date(),
          message: 'Execution completed successfully.',
          source: 'system'
        }
      ];
      
      setConsoleOutput(prev => [...prev, ...newOutput]);
      setIsRunning(false);
    }, 2000);
  };

  const handleSaveCode = async () => {
    setIsSaving(true);
    
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      const saveMessage = {
        id: Date.now(),
        type: 'success',
        timestamp: new Date(),
        message: 'Code saved successfully to your workspace.',
        source: 'system'
      };
      setConsoleOutput(prev => [...prev, saveMessage]);
    }, 1000);
  };

  const handleShareCode = (type) => {
    const shareMessage = {
      id: Date.now(),
      type: 'info',
      timestamp: new Date(),
      message: `Code shared via ${type}. Link copied to clipboard.`,
      source: 'system'
    };
    setConsoleOutput(prev => [...prev, shareMessage]);
  };

  const handleResetCode = () => {
    if (confirm('Are you sure you want to reset the code? All changes will be lost.')) {
      const defaultCode = language === 'javascript' ?'// Start coding here...\nconsole.log("Hello, SecureCodeHub!");'
        : '# Start coding here...\nprint("Hello, SecureCodeHub!")';
      setCode(defaultCode);
      setConsoleOutput([]);
      setVulnerabilities([]);
    }
  };

  const handleNewFile = () => {
    if (confirm('Create a new file? Current changes will be lost.')) {
      setCode('');
      setConsoleOutput([]);
      setVulnerabilities([]);
    }
  };

  const handleSelectTemplate = (template) => {
    if (confirm('Load this template? Current code will be replaced.')) {
      setCode(template?.code);
      setShowTemplates(false);
      
      const templateMessage = {
        id: Date.now(),
        type: 'info',
        timestamp: new Date(),
        message: `Template "${template?.title}" loaded successfully.`,
        source: 'system'
      };
      setConsoleOutput(prev => [...prev, templateMessage]);
    }
  };

  const handleClearConsole = () => {
    setConsoleOutput([]);
  };

  const handleRescanVulnerabilities = () => {
    const rescanMessage = {
      id: Date.now(),
      type: 'info',
      timestamp: new Date(),
      message: 'Rescanning code for security vulnerabilities...',
      source: 'security'
    };
    setConsoleOutput(prev => [...prev, rescanMessage]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        {/* Page Header */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Link to="/learning-path-catalog" className="hover:text-foreground transition-fast">
                    Learning Paths
                  </Link>
                  <Icon name="ChevronRight" size={16} />
                  <span>Interactive Code Editor</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground">
                  Interactive Code Editor
                </h1>
                <p className="text-muted-foreground mt-2">
                  Practice secure coding with real-time vulnerability detection and feedback
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant={layout === 'horizontal' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLayout('horizontal')}
                  iconName="Columns"
                />
                <Button
                  variant={layout === 'vertical' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLayout('vertical')}
                  iconName="Rows"
                />
                <Button
                  variant={showTemplates ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowTemplates(!showTemplates)}
                  iconName="FileText"
                  iconPosition="left"
                >
                  Templates
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Editor Toolbar */}
          <EditorToolbar
            onRun={handleRunCode}
            onSave={handleSaveCode}
            onShare={handleShareCode}
            onReset={handleResetCode}
            onNewFile={handleNewFile}
            onOpenFile={() => {}}
            isRunning={isRunning}
            isSaving={isSaving}
            language={language}
            onLanguageChange={setLanguage}
            className="mb-6"
          />

          <div className={`grid gap-6 ${layout === 'horizontal' ? 'lg:grid-cols-12' : 'grid-cols-1'}`}>
            {/* Left Panel - Code Editor and Templates */}
            <div className={`space-y-6 ${layout === 'horizontal' ? 'lg:col-span-8' : ''}`}>
              {/* Code Templates */}
              {showTemplates && (
                <CodeTemplates
                  onSelectTemplate={handleSelectTemplate}
                  language={language}
                />
              )}

              {/* Code Editor */}
              <CodeEditor
                code={code}
                onChange={setCode}
                language={language}
                onLanguageChange={setLanguage}
                theme={theme}
                onThemeChange={setTheme}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
              />

              {/* Console Output - Mobile/Vertical Layout */}
              {(layout === 'vertical' || window.innerWidth < 1024) && showConsole && (
                <ConsoleOutput
                  output={consoleOutput}
                  isRunning={isRunning}
                  onClear={handleClearConsole}
                  onToggleExpand={() => setIsConsoleExpanded(!isConsoleExpanded)}
                  isExpanded={isConsoleExpanded}
                />
              )}
            </div>

            {/* Right Panel - Vulnerability Analysis and Console */}
            <div className={`space-y-6 ${layout === 'horizontal' ? 'lg:col-span-4' : ''}`}>
              {/* Vulnerability Panel */}
              {showVulnerabilities && (
                <VulnerabilityPanel
                  vulnerabilities={vulnerabilities}
                  isScanning={isRunning}
                  onRescan={handleRescanVulnerabilities}
                />
              )}

              {/* Console Output - Desktop/Horizontal Layout */}
              {layout === 'horizontal' && window.innerWidth >= 1024 && showConsole && (
                <ConsoleOutput
                  output={consoleOutput}
                  isRunning={isRunning}
                  onClear={handleClearConsole}
                  onToggleExpand={() => setIsConsoleExpanded(!isConsoleExpanded)}
                  isExpanded={isConsoleExpanded}
                />
              )}
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="mt-8 bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="BookOpen" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    Learning Resources
                  </span>
                </div>
                <Link to="/lesson-content-viewer">
                  <Button variant="ghost" size="sm">
                    View Lessons
                  </Button>
                </Link>
                <Link to="/community-forums">
                  <Button variant="ghost" size="sm">
                    Get Help
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant={showConsole ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowConsole(!showConsole)}
                  iconName="Terminal"
                  iconPosition="left"
                >
                  Console
                </Button>
                <Button
                  variant={showVulnerabilities ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowVulnerabilities(!showVulnerabilities)}
                  iconName="Shield"
                  iconPosition="left"
                >
                  Security
                </Button>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-primary/5 border border-primary/20 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <Icon name="Lightbulb" size={24} className="text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Getting Started with Secure Coding
                </h3>
                <p className="text-muted-foreground mb-4">
                  This interactive editor helps you learn secure coding practices through hands-on experience. 
                  Write code, see real-time security analysis, and learn from detailed explanations.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" iconName="Play" iconPosition="left">
                    Watch Tutorial
                  </Button>
                  <Button variant="outline" size="sm" iconName="FileText" iconPosition="left">
                    Documentation
                  </Button>
                  <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
                    Ask Questions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCodeEditor;