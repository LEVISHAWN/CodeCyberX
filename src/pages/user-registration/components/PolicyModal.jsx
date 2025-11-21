import React from 'react';
import Button from '../../../components/ui/Button';


const PolicyModal = ({ isOpen, onClose, type = 'terms' }) => {
  if (!isOpen) return null;

  const content = {
    terms: {
      title: 'Terms of Service',
      content: `**Effective Date:** October 8, 2025

**1. Acceptance of Terms**
By creating an account with SecureCodeHub, you agree to be bound by these Terms of Service and all applicable laws and regulations.

**2. Description of Service**
SecureCodeHub provides an integrated educational platform combining programming language learning with cybersecurity training through interactive coding environments.

**3. User Accounts**
- You must provide accurate and complete information when creating your account
- You are responsible for maintaining the confidentiality of your account credentials
- You must notify us immediately of any unauthorized use of your account

**4. Acceptable Use**
You agree not to:
- Use the service for any unlawful purpose
- Attempt to gain unauthorized access to our systems
- Share your account credentials with others
- Upload malicious code or content

**5. Intellectual Property**
All content, features, and functionality of SecureCodeHub are owned by us and are protected by copyright, trademark, and other intellectual property laws.

**6. Privacy**
Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.

**7. Limitation of Liability**
SecureCodeHub shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.

**8. Termination**
We may terminate or suspend your account at any time for violation of these terms.

**9. Changes to Terms**
We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.

**10. Contact Information**
For questions about these terms, contact us at legal@securecodehub.com`
    },
    privacy: {
      title: 'Privacy Policy',
      content: `**Effective Date:** October 8, 2025

**1. Information We Collect**
We collect information you provide directly to us, such as:
- Account registration information (name, email, experience level)
- Learning progress and activity data
- Code submissions and project work
- Communication preferences

**2. How We Use Your Information**
We use your information to:
- Provide and improve our educational services
- Personalize your learning experience
- Send important updates about your account
- Analyze usage patterns to enhance our platform

**3. Information Sharing**
We do not sell, trade, or rent your personal information to third parties. We may share information:
- With your consent
- To comply with legal obligations
- To protect our rights and safety

**4. Data Security**
We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

**5. Cookies and Tracking**
We use cookies and similar technologies to:
- Remember your preferences
- Analyze site usage
- Provide personalized content

**6. Your Rights**
You have the right to:
- Access your personal information
- Correct inaccurate data
- Delete your account and associated data
- Opt-out of marketing communications

**7. Data Retention**
We retain your information for as long as your account is active or as needed to provide services, comply with legal obligations, and resolve disputes.

**8. International Transfers**
Your information may be transferred to and processed in countries other than your own, where data protection laws may differ.

**9. Children's Privacy**
Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.

**10. Changes to Privacy Policy**
We may update this privacy policy from time to time. We will notify you of any material changes.

**11. Contact Us**
For privacy-related questions, contact us at privacy@securecodehub.com`
    }
  };

  const currentContent = content?.[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-card border border-border rounded-lg shadow-elevated max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {currentContent?.title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="prose prose-sm max-w-none text-foreground">
            {currentContent?.content?.split('\n\n')?.map((paragraph, index) => (
              <div key={index} className="mb-4">
                {paragraph?.startsWith('**') && paragraph?.endsWith('**') ? (
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {paragraph?.replace(/\*\*/g, '')}
                  </h3>
                ) : paragraph?.startsWith('**') ? (
                  <h4 className="text-base font-medium text-foreground mb-2">
                    {paragraph?.replace(/\*\*/g, '')}
                  </h4>
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end p-6 border-t border-border">
          <Button
            variant="default"
            onClick={onClose}
            iconName="Check"
            iconPosition="left"
          >
            I Understand
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;