import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationProgress = ({ currentStep = 1, totalSteps = 3 }) => {
  const steps = [
    { id: 1, title: 'Account Details', icon: 'User' },
    { id: 2, title: 'Experience Level', icon: 'BookOpen' },
    { id: 3, title: 'Preferences', icon: 'Settings' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step?.id < currentStep 
                  ? 'bg-success border-success text-success-foreground' 
                  : step?.id === currentStep 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'bg-background border-border text-muted-foreground'
              }`}>
                {step?.id < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              <span className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                step?.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step?.title}
              </span>
            </div>
            
            {index < steps?.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 transition-colors duration-300 ${
                step?.id < currentStep ? 'bg-success' : 'bg-border'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 text-center">
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

export default RegistrationProgress;