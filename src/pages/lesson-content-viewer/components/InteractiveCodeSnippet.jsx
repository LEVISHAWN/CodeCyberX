import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveCodeSnippet = ({
  title = "SQL Query Example",
  description = "Try modifying this query to see how SQL injection vulnerabilities work:",
  initialCode = `SELECT * FROM users WHERE username = 'USER_INPUT' AND password = 'PASSWORD_INPUT';`,
  language = "sql",
  isVulnerable = true,
  solution = "",
  hints = [],
  onCodeChange,
  className = ""
}) => {
  const [code, setCode] = useState(initialCode);
  const [isEditing, setIsEditing] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [testResults, setTestResults] = useState([]);

  const defaultHints = [
    "Look for places where user input is directly concatenated into the SQL query",
    "Consider using parameterized queries or prepared statements",
    "Think about how an attacker might manipulate the input to change the query logic"
  ];

  const defaultSolution = `// Secure version using parameterized query
const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
const values = [username, password];
db.query(query, values, callback);`;

  const currentHints = hints?.length > 0 ? hints : defaultHints;
  const currentSolution = solution || defaultSolution;

  const analyzeCode = () => {
    const vulnerabilityPatterns = [
      { pattern: /'\$\{.*\}'/g, issue: "String interpolation vulnerability" },
      { pattern: /'\s*\+\s*.*\s*\+\s*'/g, issue: "String concatenation vulnerability" },
      { pattern: /WHERE.*=.*'.*'/g, issue: "Potential SQL injection point" }
    ];

    const foundIssues = [];
    vulnerabilityPatterns?.forEach(({ pattern, issue }) => {
      if (pattern?.test(code)) {
        foundIssues?.push(issue);
      }
    });

    if (foundIssues?.length > 0) {
      setFeedback({
        type: 'error',
        message: 'Security vulnerabilities detected!',
        details: foundIssues
      });
    } else {
      setFeedback({
        type: 'success',
        message: 'No obvious vulnerabilities found. Good job!',
        details: []
      });
    }

    // Simulate test results
    setTestResults([
      { test: "Basic functionality", status: "passed", message: "Query executes correctly" },
      { test: "SQL injection test", status: foundIssues?.length > 0 ? "failed" : "passed", message: foundIssues?.length > 0 ? "Vulnerable to injection" : "Protected against injection" },
      { test: "Input validation", status: "warning", message: "Consider additional input validation" }
    ]);
  };

  const resetCode = () => {
    setCode(initialCode);
    setFeedback(null);
    setTestResults([]);
    setShowSolution(false);
  };

  const handleCodeChange = (e) => {
    const newCode = e?.target?.value;
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed': return { icon: 'CheckCircle', color: 'text-success' };
      case 'failed': return { icon: 'XCircle', color: 'text-error' };
      case 'warning': return { icon: 'AlertTriangle', color: 'text-warning' };
      default: return { icon: 'Circle', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden shadow-subtle ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          
          {isVulnerable && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-error/10 border border-error/20 rounded-md">
              <Icon name="AlertTriangle" size={14} className="text-error" />
              <span className="text-xs font-medium text-error">Vulnerable</span>
            </div>
          )}
        </div>
      </div>
      {/* Code Editor */}
      <div className="relative">
        <div className="flex items-center justify-between p-3 bg-muted/30 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Code" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground uppercase">{language}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              iconName={isEditing ? "Eye" : "Edit"}
              iconPosition="left"
            >
              {isEditing ? "View" : "Edit"}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={resetCode}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="relative">
          {isEditing ? (
            <textarea
              value={code}
              onChange={handleCodeChange}
              className="w-full h-32 p-4 font-mono text-sm bg-background border-none resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter your code here..."
            />
          ) : (
            <pre className="p-4 bg-background overflow-x-auto">
              <code className="font-mono text-sm text-foreground whitespace-pre-wrap">
                {code}
              </code>
            </pre>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between space-x-3">
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={analyzeCode}
              iconName="Play"
              iconPosition="left"
            >
              Test Code
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              iconName="Lightbulb"
              iconPosition="left"
            >
              Hints ({currentHints?.length})
            </Button>
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowSolution(!showSolution)}
            iconName="Eye"
            iconPosition="left"
          >
            {showSolution ? "Hide" : "Show"} Solution
          </Button>
        </div>
      </div>
      {/* Feedback */}
      {feedback && (
        <div className={`p-4 border-t border-border ${
          feedback?.type === 'error' ? 'bg-error/5' : 'bg-success/5'
        }`}>
          <div className="flex items-start space-x-3">
            <Icon 
              name={feedback?.type === 'error' ? "AlertCircle" : "CheckCircle"} 
              size={20} 
              className={feedback?.type === 'error' ? 'text-error' : 'text-success'} 
            />
            <div className="flex-1">
              <h4 className={`text-sm font-medium ${
                feedback?.type === 'error' ? 'text-error' : 'text-success'
              }`}>
                {feedback?.message}
              </h4>
              {feedback?.details?.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {feedback?.details?.map((detail, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-center space-x-2">
                      <Icon name="ArrowRight" size={12} />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Test Results */}
      {testResults?.length > 0 && (
        <div className="p-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Test Results</h4>
          <div className="space-y-2">
            {testResults?.map((result, index) => {
              const { icon, color } = getStatusIcon(result?.status);
              return (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-md bg-muted/30">
                  <Icon name={icon} size={16} className={color} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{result?.test}</div>
                    <div className="text-xs text-muted-foreground">{result?.message}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Hints */}
      {showHints && (
        <div className="p-4 border-t border-border bg-warning/5">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Lightbulb" size={16} className="text-warning" />
            <span>Hints</span>
          </h4>
          <div className="space-y-2">
            {currentHints?.map((hint, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-5 h-5 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-warning">{index + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground">{hint}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Solution */}
      {showSolution && (
        <div className="p-4 border-t border-border bg-success/5">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span>Secure Solution</span>
          </h4>
          <pre className="p-3 bg-background border border-border rounded-md overflow-x-auto">
            <code className="font-mono text-sm text-foreground whitespace-pre-wrap">
              {currentSolution}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default InteractiveCodeSnippet;