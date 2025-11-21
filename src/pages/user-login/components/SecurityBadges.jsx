import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      icon: 'Lock',
      text: 'Secure Login',
      description: 'Multi-factor authentication available'
    },
    {
      icon: 'Eye',
      text: 'Privacy Protected',
      description: 'We never share your personal information'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-sm text-muted-foreground group"
            title={feature?.description}
          >
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center group-hover:bg-success/20 transition-fast">
              <Icon name={feature?.icon} size={16} className="text-success" />
            </div>
            <span className="font-medium">{feature?.text}</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">
          Trusted by 50,000+ developers worldwide
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;