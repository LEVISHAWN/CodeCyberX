import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import VideoPlayer from './components/VideoPlayer';
import LessonSidebar from './components/LessonSidebar';
import InteractiveCodeSnippet from './components/InteractiveCodeSnippet';
import QuizSection from './components/QuizSection';
import NotesSection from './components/NotesSection';
import LessonNavigation from './components/LessonNavigation';

import Button from '../../components/ui/Button';

const LessonContentViewer = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(1);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const lessonId = searchParams?.get('lesson') || 'sql-injection-prevention';

  // Mock lesson data
  const lessonData = {
    id: lessonId,
    title: "SQL Injection Prevention",
    path: "Web Security Fundamentals",
    description: "Learn how to identify, prevent, and mitigate SQL injection vulnerabilities in web applications through hands-on examples and best practices.",
    totalSections: 6,
    completedSections: 2,
    estimatedTime: "45 min",
    difficulty: "Intermediate",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    sections: [
      {
        id: 1,
        title: "Introduction to SQL Injection",
        type: "video",
        duration: "8 min",
        completed: true,
        content: {
          type: "video",
          videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          transcript: "Welcome to this comprehensive lesson on SQL injection prevention..."
        }
      },
      {
        id: 2,
        title: "Common Attack Vectors",
        type: "interactive",
        duration: "12 min",
        completed: true,
        content: {
          type: "text",
          text: `SQL injection attacks exploit vulnerabilities in web applications where user input is improperly handled in database queries. Understanding common attack vectors is crucial for building secure applications.\n\n## Primary Attack Methods\n\n### 1. Union-Based Attacks\nAttackers use UNION statements to extract data from other tables:\n\`\`\`sql\nSELECT * FROM users WHERE id = '1' UNION SELECT username, password FROM admin_users--'\n\`\`\`\n\n### 2. Boolean-Based Blind Attacks\nWhen error messages are suppressed, attackers use boolean logic to extract information:\n\`\`\`sql\nSELECT * FROM users WHERE id = '1' AND (SELECT COUNT(*) FROM admin_users) > 0--'\n\`\`\`\n\n### 3. Time-Based Blind Attacks\nUsing database functions to create delays and infer information:\n\`\`\`sql\nSELECT * FROM users WHERE id = '1' AND IF(1=1, SLEEP(5), 0)--'\n\`\`\`\n\n### 4. Error-Based Attacks\nExploiting database error messages to extract schema information:\n\`\`\`sql\nSELECT * FROM users WHERE id = '1' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT version()), 0x7e))--'\n\`\`\`\n\n## Impact Assessment\n\nSQL injection vulnerabilities can lead to:\n- **Data Breach**: Unauthorized access to sensitive information\n- **Data Manipulation**: Modification or deletion of critical data\n- **Authentication Bypass**: Gaining admin access without credentials\n- **System Compromise**: In some cases, executing system commands\n\n## Real-World Examples\n\nMany high-profile breaches have involved SQL injection:\n- **Equifax (2017)**: Affected 147 million people\n- **TalkTalk (2015)**: Customer data compromised\n- **Sony Pictures (2011)**: User accounts exposed\n\nThese incidents highlight the critical importance of proper input validation and secure coding practices.`
        }
      },
      {
        id: 3,
        title: "Parameterized Queries",
        type: "video",
        duration: "10 min",
        completed: false,
        content: {
          type: "code",
          title: "Implementing Parameterized Queries",
          description: "Transform this vulnerable query into a secure parameterized version:",
          code: `// Vulnerable code - DON'T DO THIS
const query = \`SELECT * FROM users WHERE username = '\${username}' AND password = '\${password}'\`;
db.query(query, (err, results) => {
  // Handle results
});`,
          solution: `// Secure code - Use parameterized queries
const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
const values = [username, password];
db.query(query, values, (err, results) => {
  // Handle results safely
});`,
          hints: [
            "Replace direct string concatenation with parameter placeholders",
            "Use the database library\'s parameter binding feature",
            "Never trust user input - always use prepared statements"
          ]
        }
      },
      {
        id: 4,
        title: "Input Validation Techniques",
        type: "hands-on",
        duration: "15 min",
        completed: false,
        content: {
          type: "text",
          text: `Input validation is a critical defense layer that works alongside parameterized queries to prevent SQL injection attacks.\n\n## Validation Strategies\n\n### 1. Whitelist Validation\nDefine what is allowed rather than what is forbidden:\n\`\`\`javascript\nconst allowedUsernames = /^[a-zA-Z0-9_]{3,20}$/;\nif (!allowedUsernames.test(username)) {\n  throw new Error('Invalid username format');\n}\n\`\`\`\n\n### 2. Data Type Validation\nEnsure inputs match expected data types:\n\`\`\`javascript\nconst userId = parseInt(req.params.id);\nif (isNaN(userId) || userId <= 0) {\n  return res.status(400).json({ error: 'Invalid user ID' });\n}\n\`\`\`\n\n### 3. Length Restrictions\nLimit input length to prevent buffer overflow attacks:\n\`\`\`javascript\nif (comment.length > 500) {\n  return res.status(400).json({ error: 'Comment too long' });\n}\n\`\`\`\n\n### 4. Special Character Handling\nSanitize or reject dangerous characters:\n\`\`\`javascript\nconst sanitized = input.replace(/[<>\"'%;()&+]/g, '');\n\`\`\`\n\n## Best Practices\n\n- **Validate on both client and server side**\n- **Use established validation libraries**\n- **Log validation failures for monitoring**\n- **Provide clear error messages to users**\n- **Implement rate limiting to prevent brute force attacks**\n\n## Common Mistakes\n\n❌ **Blacklist approach**: Trying to block specific patterns\n❌ **Client-side only validation**: Can be easily bypassed\n❌ **Insufficient error handling**: Revealing system information\n❌ **Over-reliance on validation**: Should complement, not replace parameterized queries`
        }
      },
      {
        id: 5,
        title: "Testing Your Defenses",
        type: "quiz",
        duration: "8 min",
        completed: false,
        content: {
          type: "quiz",
          questions: [
            {
              id: 1,
              type: "multiple-choice",
              question: "Which of the following is the most effective defense against SQL injection attacks?",
              options: [
                "Input validation only",
                "Parameterized queries/prepared statements",
                "Escaping special characters",
                "Using stored procedures"
              ],
              correctAnswer: 1,
              explanation: "Parameterized queries separate SQL code from data, making it impossible for user input to alter the query structure."
            },
            {
              id: 2,
              type: "multiple-choice",
              question: "What makes the following SQL query vulnerable to injection?\n\n`SELECT * FROM users WHERE id = '${userId}'`",
              options: [
                "It uses single quotes",
                "It directly concatenates user input",
                "It selects all columns",
                "It doesn't use a WHERE clause"
              ],
              correctAnswer: 1,
              explanation: "Direct string concatenation allows attackers to inject malicious SQL code by manipulating the userId parameter."
            },
            {
              id: 3,
              type: "true-false",
              question: "Input validation alone is sufficient to prevent all SQL injection attacks.",
              options: ["True", "False"],
              correctAnswer: 1,
              explanation: "While input validation is important, it's not foolproof. Parameterized queries provide a more robust defense."
            }
          ]
        }
      },
      {
        id: 6,
        title: "Best Practices Summary",
        type: "text",
        duration: "5 min",
        completed: false,
        content: {
          type: "text",
          text: `## SQL Injection Prevention: Complete Guide\n\nCongratulations on completing this comprehensive lesson on SQL injection prevention! Let's summarize the key concepts and best practices you've learned.\n\n## 🔐 Core Defense Strategies\n\n### 1. Parameterized Queries (Primary Defense)\n- Use prepared statements with parameter binding\n- Separate SQL code from user data\n- Supported by all major database systems\n- Most effective single defense mechanism\n\n### 2. Input Validation (Secondary Defense)\n- Implement whitelist validation\n- Validate data types and formats\n- Set appropriate length limits\n- Sanitize special characters when necessary\n\n### 3. Least Privilege Principle\n- Use database accounts with minimal required permissions\n- Avoid using administrative accounts for application connections\n- Implement role-based access control\n- Regularly audit database permissions\n\n### 4. Error Handling\n- Never expose database errors to users\n- Log detailed errors for developers\n- Provide generic error messages to users\n- Implement proper exception handling\n\n## 🛡️ Additional Security Measures\n\n### Web Application Firewalls (WAF)\n- Filter malicious requests before they reach your application\n- Provide an additional layer of protection\n- Can detect and block common attack patterns\n- Should complement, not replace, secure coding practices\n\n### Regular Security Testing\n- Perform automated vulnerability scans\n- Conduct manual penetration testing\n- Use tools like SQLMap for testing\n- Implement continuous security monitoring\n\n### Code Review Process\n- Review all database interaction code\n- Use static analysis tools\n- Implement peer review processes\n- Maintain security coding standards\n\n## 📋 Implementation Checklist\n\n✅ **All database queries use parameterized statements**\n✅ **Input validation implemented on all user inputs**\n✅ **Database connections use least privilege accounts**\n✅ **Error handling doesn't expose sensitive information**\n✅ **Security testing integrated into development process**\n✅ **Regular security audits conducted**\n✅ **Team trained on secure coding practices**\n\n## 🚀 Next Steps\n\n1. **Practice**: Apply these concepts in your own projects\n2. **Learn More**: Explore advanced topics like NoSQL injection\n3. **Stay Updated**: Follow security advisories and best practices\n4. **Share Knowledge**: Help others learn secure coding practices\n\n## 📚 Additional Resources\n\n- **OWASP SQL Injection Prevention Cheat Sheet**\n- **Database-specific security documentation**\n- **Security testing tools and frameworks**\n- **Community forums and security blogs**\n\nRemember: Security is not a one-time implementation but an ongoing process. Stay vigilant, keep learning, and always prioritize the security of your applications and users' data.`
        }
      }
    ]
  };

  const currentSectionData = lessonData?.sections?.find(s => s?.id === currentSection);

  useEffect(() => {
    // Check if lesson is completed based on localStorage or API
    const completed = localStorage.getItem(`lesson-completed-${lessonId}`);
    setLessonCompleted(completed === 'true');
  }, [lessonId]);

  const handleSectionChange = (sectionId) => {
    setCurrentSection(sectionId);
  };

  const handleLessonComplete = (lessonId) => {
    setLessonCompleted(true);
    localStorage.setItem(`lesson-completed-${lessonId}`, 'true');
  };

  const handleQuizComplete = (results) => {
    if (results?.passed) {
      // Mark section as completed
      // TODO: Implement quiz completion tracking
    }
  };

  const renderSectionContent = () => {
    if (!currentSectionData) return null;

    const { content } = currentSectionData;

    switch (content?.type) {
      case 'video':
        return (
          <VideoPlayer
            videoUrl={content?.videoUrl}
            title={currentSectionData?.title}
            duration={currentSectionData?.duration}
            currentTime={currentTime}
            onTimeUpdate={setCurrentTime}
            onProgress={() => {}} // Add missing required prop
            transcript={content?.transcript}
            className="mb-6"
          />
        );

      case 'code':
        return (
          <InteractiveCodeSnippet
            title={content?.title}
            description={content?.description}
            initialCode={content?.code}
            solution={content?.solution}
            hints={content?.hints}
            className="mb-6"
          />
        );

      case 'quiz':
        return (
          <QuizSection
            questions={content?.questions}
            onComplete={handleQuizComplete}
            className="mb-6"
          />
        );

      case 'text':
      default:
        return (
          <div className="bg-card border border-border rounded-lg p-6 shadow-subtle mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {currentSectionData?.title}
            </h2>
            <div className="prose prose-sm max-w-none">
              {content?.text?.split('\n')?.map((paragraph, index) => {
                if (paragraph?.startsWith('## ')) {
                  return (
                    <h3 key={index} className="text-lg font-semibold text-foreground mt-6 mb-3">
                      {paragraph?.replace('## ', '')}
                    </h3>
                  );
                } else if (paragraph?.startsWith('### ')) {
                  return (
                    <h4 key={index} className="text-base font-medium text-foreground mt-4 mb-2">
                      {paragraph?.replace('### ', '')}
                    </h4>
                  );
                } else if (paragraph?.startsWith('```')) {
                  return null; // Handle code blocks separately
                } else if (paragraph?.trim() === '') {
                  return <br key={index} />;
                } else if (paragraph?.startsWith('- ') || paragraph?.startsWith('* ')) {
                  return (
                    <li key={index} className="text-muted-foreground mb-1">
                      {paragraph?.replace(/^[*-] /, '')}
                    </li>
                  );
                } else {
                  return (
                    <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Progress Indicator */}
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <ProgressIndicator
              currentLesson={currentSection}
              totalLessons={lessonData?.totalSections}
              completedLessons={lessonData?.completedSections}
              lessonTitle={currentSectionData?.title || lessonData?.title}
              pathTitle={lessonData?.path}
              showNavigation={false}
              onPrevious={() => {}} // Add missing required prop
              onNext={() => {}} // Add missing required prop
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex">
          {/* Sidebar */}
          <LessonSidebar
            currentSection={currentSection}
            onSectionChange={handleSectionChange}
            lessonData={lessonData}
            className={`${isSidebarCollapsed ? 'hidden lg:flex' : 'flex'} flex-shrink-0`}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="p-6">
              {/* Mobile Sidebar Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  iconName="Menu"
                  iconPosition="left"
                >
                  Lesson Sections
                </Button>
              </div>

              {/* Section Content */}
              {renderSectionContent()}

              {/* Notes Section */}
              <NotesSection
                lessonId={lessonId}
                className="mb-6"
                onNotesChange={() => {}} // Add missing required prop
              />

              {/* Lesson Navigation */}
              <LessonNavigation
                currentLesson={lessonData}
                previousLesson={{
                  id: "input-validation",
                  title: "Input Validation Techniques",
                  available: true
                }}
                nextLesson={{
                  id: "xss-prevention",
                  title: "Cross-Site Scripting Prevention", 
                  available: lessonCompleted
                }}
                onComplete={handleLessonComplete}
                isCompleted={lessonCompleted}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonContentViewer;