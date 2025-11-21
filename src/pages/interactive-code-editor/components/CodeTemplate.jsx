import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CodeTemplates = ({ 
  onSelectTemplate, 
  language = 'javascript',
  className = "" 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('security');
  const [isExpanded, setIsExpanded] = useState(false);

  const templates = {
    javascript: {
      security: [
        {
          id: 'js-input-validation',
          title: 'Input Validation',
          description: 'Secure input validation and sanitization',
          difficulty: 'beginner',
          code: `// Secure input validation example
function validateUserInput(input) {
  // Check for null or undefined
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input: must be a non-empty string');
  }
  
  // Sanitize input - remove potentially dangerous characters
  const sanitized = input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/['"]/g, '') // Remove quotes
    .trim();
  
  // Validate length
  if (sanitized.length < 1 || sanitized.length > 100) {
    throw new Error('Input length must be between 1 and 100 characters');
  }
  
  return sanitized;
}

// Example usage
try {
  const userInput = "Hello World!";
  const validInput = validateUserInput(userInput);
  console.log("Valid input:", validInput);
} catch (error) {
  console.error("Validation error:", error.message);
}`
        },
        {
          id: 'js-sql-injection-prevention',title: 'SQL Injection Prevention',description: 'Parameterized queries to prevent SQL injection',
          difficulty: 'intermediate',
          code: `// SQL Injection Prevention Example
// ❌ VULNERABLE CODE - Never do this!
function vulnerableQuery(userId) {
  const query = "SELECT * FROM users WHERE id = " + userId;
  return query; // This allows SQL injection!
}

// ✅ SECURE CODE - Use parameterized queries
function secureQuery(userId) {
  // Validate input first
  if (!userId || isNaN(userId)) {
    throw new Error('Invalid user ID');
  }
  
  // Use parameterized query (example with placeholder)
  const query = "SELECT * FROM users WHERE id = ?";
  const params = [parseInt(userId)];
  
  return { query, params };
}

// Example usage
try {
  const userId = "123";
  const { query, params } = secureQuery(userId);
  console.log("Secure query:", query);
  console.log("Parameters:", params);
} catch (error) {
  console.error("Query error:", error.message);
}`
        }
      ],
      basics: [
        {
          id: 'js-hello-world',
          title: 'Hello World',
          description: 'Basic JavaScript program',
          difficulty: 'beginner',
          code: `// Welcome to SecureCodeHub!
console.log("Hello, World!");

// Variables and data types
let message = "Learning secure coding";
const platform = "SecureCodeHub";
let isLearning = true;

console.log(\`\${message} on \${platform}\`);
console.log("Ready to learn:", isLearning);`
        }
      ]
    },
    python: {
      security: [
        {
          id: 'py-password-hashing',
          title: 'Password Hashing',
          description: 'Secure password storage with bcrypt',
          difficulty: 'intermediate',
          code: `# Secure Password Hashing Example
import hashlib
import secrets
import time

def hash_password(password):
    """
    Securely hash a password using PBKDF2 with SHA-256
    """
    # Generate a random salt
    salt = secrets.token_hex(32)
    
    # Hash the password with salt using PBKDF2
    pwdhash = hashlib.pbkdf2_hmac('sha256',
                                  password.encode('utf-8'),
                                  salt.encode('utf-8'),
                                  100000)  # 100,000 iterations
    
    return salt + pwdhash.hex()

def verify_password(stored_password, provided_password):
    """
    Verify a stored password against provided password
    """
    # Extract salt (first 64 characters)
    salt = stored_password[:64]
    stored_hash = stored_password[64:]
    
    # Hash the provided password with the same salt
    pwdhash = hashlib.pbkdf2_hmac('sha256',
                                  provided_password.encode('utf-8'),
                                  salt.encode('utf-8'),
                                  100000)
    
    return pwdhash.hex() == stored_hash

# Example usage
password = "MySecurePassword123!"
hashed = hash_password(password)
print("Password hashed successfully")

# Verify password
is_valid = verify_password(hashed, password)
print(f"Password verification: {is_valid}")`
        }
      ],
      basics: [
        {
          id: 'py-hello-world',
          title: 'Hello World',
          description: 'Basic Python program',
          difficulty: 'beginner',
          code: `# Welcome to SecureCodeHub Python Editor!
print("Hello, World!")

# Variables and data types
message = "Learning secure coding"
platform = "SecureCodeHub"
is_learning = True

print(f"{message} on {platform}")
print(f"Ready to learn: {is_learning}")

# Basic list operations
skills = ["Python", "Security", "Web Development"]
print("Skills to learn:", skills)`
        }
      ]
    }
  };

  const categories = [
    { value: 'security', label: 'Security Examples' },
    { value: 'basics', label: 'Basic Examples' },
    { value: 'algorithms', label: 'Algorithms' },
    { value: 'web', label: 'Web Development' }
  ];

  const currentTemplates = templates?.[language]?.[selectedCategory] || [];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-success bg-success/10 border-success/20';
      case 'intermediate': return 'text-warning bg-warning/10 border-warning/20';
      case 'advanced': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'Circle';
      case 'intermediate': return 'CircleDot';
      case 'advanced': return 'Target';
      default: return 'Circle';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-muted border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="FileText" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Code Templates
            </h3>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          />
        </div>

        {isExpanded && (
          <div className="mt-3">
            <Select
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="w-48"
            />
          </div>
        )}
      </div>
      {/* Templates List */}
      {isExpanded && (
        <div className="max-h-96 overflow-y-auto">
          {currentTemplates?.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4 opacity-50" />
              <h4 className="text-lg font-medium text-foreground mb-2">
                No Templates Available
              </h4>
              <p className="text-muted-foreground">
                Templates for {language} in {selectedCategory} category are coming soon.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {currentTemplates?.map((template) => (
                <div
                  key={template?.id}
                  className="p-4 hover:bg-muted/50 cursor-pointer transition-fast"
                  onClick={() => onSelectTemplate(template)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-sm font-medium text-foreground">
                          {template?.title}
                        </h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(template?.difficulty)}`}>
                          <Icon 
                            name={getDifficultyIcon(template?.difficulty)} 
                            size={12} 
                            className="inline mr-1" 
                          />
                          {template?.difficulty}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {template?.description}
                      </p>

                      {/* Code Preview */}
                      <div className="bg-gray-900 rounded-md p-3 overflow-hidden">
                        <pre className="text-xs text-gray-300 font-data line-clamp-3">
                          {template?.code?.split('\n')?.slice(0, 3)?.join('\n')}
                          {template?.code?.split('\n')?.length > 3 && '\n...'}
                        </pre>
                      </div>
                    </div>

                    <div className="ml-4 flex flex-col items-end space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Copy"
                        iconPosition="left"
                      >
                        Use Template
                      </Button>
                      
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Icon name="Code" size={12} />
                        <span>{template?.code?.split('\n')?.length} lines</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Quick Actions */}
      {!isExpanded && (
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('security');
                setIsExpanded(true);
              }}
              iconName="Shield"
              iconPosition="left"
            >
              Security
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('basics');
                setIsExpanded(true);
              }}
              iconName="BookOpen"
              iconPosition="left"
            >
              Basics
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeTemplates;