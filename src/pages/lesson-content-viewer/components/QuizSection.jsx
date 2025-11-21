import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizSection = ({
  questions = [],
  onComplete,
  className = ""
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const defaultQuestions = [
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
  ];

  const quizQuestions = questions?.length > 0 ? questions : defaultQuestions;
  const currentQ = quizQuestions?.[currentQuestion];
  const totalQuestions = quizQuestions?.length;

  const handleAnswerSelect = (answerIndex) => {
    if (submitted) return;
    
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowResults(true);
    
    const score = calculateScore();
    onComplete?.({
      score,
      totalQuestions,
      answers: selectedAnswers,
      passed: score >= (totalQuestions * 0.7) // 70% passing grade
    });
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions?.forEach((question, index) => {
      if (selectedAnswers?.[index] === question?.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getScoreColor = (score) => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const isAnswerCorrect = (questionIndex, answerIndex) => {
    return answerIndex === quizQuestions?.[questionIndex]?.correctAnswer;
  };

  const getAnswerStyle = (answerIndex) => {
    if (!submitted) {
      return selectedAnswers?.[currentQuestion] === answerIndex
        ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted/50';
    }

    const isSelected = selectedAnswers?.[currentQuestion] === answerIndex;
    const isCorrect = isAnswerCorrect(currentQuestion, answerIndex);

    if (isCorrect) {
      return 'border-success bg-success/10 text-success';
    } else if (isSelected && !isCorrect) {
      return 'border-error bg-error/10 text-error';
    }
    
    return 'border-border bg-muted/30 text-muted-foreground';
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;

    return (
      <div className={`bg-card border border-border rounded-lg p-6 shadow-subtle ${className}`}>
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            passed ? 'bg-success/10' : 'bg-error/10'
          }`}>
            <Icon 
              name={passed ? "Trophy" : "XCircle"} 
              size={32} 
              className={passed ? 'text-success' : 'text-error'} 
            />
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Quiz {passed ? 'Completed!' : 'Incomplete'}
          </h3>
          
          <div className={`text-3xl font-bold mb-4 ${getScoreColor(score)}`}>
            {score}/{totalQuestions} ({percentage}%)
          </div>
          
          <p className="text-muted-foreground mb-6">
            {passed 
              ? "Great job! You've demonstrated a solid understanding of SQL injection prevention." :"You need at least 70% to pass. Review the material and try again."
            }
          </p>
          
          <div className="flex items-center justify-center space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswers({});
                setShowResults(false);
                setSubmitted(false);
              }}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Retake Quiz
            </Button>
            
            {passed && (
              <Button
                variant="default"
                onClick={() => onComplete?.({ score, totalQuestions, passed: true })}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Continue Learning
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden shadow-subtle ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Knowledge Check</h3>
          <div className="flex items-center space-x-2">
            <Icon name="HelpCircle" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Question */}
      <div className="p-6">
        <h4 className="text-lg font-medium text-foreground mb-4 leading-relaxed">
          {currentQ?.question}
        </h4>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQ?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={submitted}
              className={`w-full p-4 text-left border rounded-lg transition-all duration-200 ${getAnswerStyle(index)}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers?.[currentQuestion] === index
                    ? 'border-current' :'border-muted-foreground'
                }`}>
                  {selectedAnswers?.[currentQuestion] === index && (
                    <div className="w-3 h-3 rounded-full bg-current"></div>
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Explanation (shown after submission) */}
        {submitted && (
          <div className="mt-6 p-4 bg-muted/30 border border-border rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-foreground mb-1">Explanation</h5>
                <p className="text-sm text-muted-foreground">{currentQ?.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Navigation */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: totalQuestions }, (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentQuestion
                    ? 'bg-primary'
                    : selectedAnswers?.[index] !== undefined
                      ? 'bg-success' :'bg-muted'
                }`}
              ></div>
            ))}
          </div>

          <Button
            variant="default"
            onClick={handleNext}
            disabled={selectedAnswers?.[currentQuestion] === undefined}
            iconName={currentQuestion === totalQuestions - 1 ? "Check" : "ChevronRight"}
            iconPosition="right"
          >
            {currentQuestion === totalQuestions - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizSection;