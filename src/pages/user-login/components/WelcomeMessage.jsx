import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeMessage = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-elevated">
          <Icon name="Shield" size={32} color="white" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Welcome Back
      </h1>
      
      <p className="text-lg text-muted-foreground mb-6">
        Continue your secure coding journey
      </p>
      
      <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} className="text-primary" />
          <span>50K+ Learners</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="BookOpen" size={16} className="text-primary" />
          <span>100+ Lessons</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={16} className="text-primary" />
          <span>Certified Training</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;