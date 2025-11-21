import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreatePostButton = ({ onCreatePost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: '',
    priority: 'medium'
  });

  const categoryOptions = [
    { value: 'general', label: 'General Discussion' },
    { value: 'code-help', label: 'Code Help' },
    { value: 'security', label: 'Security Questions' },
    { value: 'career', label: 'Career Advice' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    onCreatePost?.(postData);
    setIsModalOpen(false);
    setPostData({
      title: '',
      content: '',
      category: 'general',
      tags: '',
      priority: 'medium'
    });
  };

  const handleInputChange = (field, value) => {
    setPostData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <Button
        variant="default"
        onClick={() => setIsModalOpen(true)}
        iconName="Plus"
        iconPosition="left"
        className="mb-6"
      >
        Create New Post
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Create New Discussion
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Title"
                  type="text"
                  placeholder="What's your question or topic?"
                  value={postData?.title}
                  onChange={(e) => handleInputChange('title', e?.target?.value)}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Category"
                    options={categoryOptions}
                    value={postData?.category}
                    onChange={(value) => handleInputChange('category', value)}
                  />

                  <Select
                    label="Priority"
                    options={priorityOptions}
                    value={postData?.priority}
                    onChange={(value) => handleInputChange('priority', value)}
                  />
                </div>

                <Input
                  label="Tags"
                  type="text"
                  placeholder="javascript, security, api (comma separated)"
                  value={postData?.tags}
                  onChange={(e) => handleInputChange('tags', e?.target?.value)}
                  description="Add relevant tags to help others find your post"
                />

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Content
                  </label>
                  <textarea
                    className="w-full min-h-[200px] p-3 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                    placeholder="Describe your question or topic in detail. Include code snippets, error messages, or any relevant information..."
                    value={postData?.content}
                    onChange={(e) => handleInputChange('content', e?.target?.value)}
                    required
                  />
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Icon name="Info" size={16} className="text-primary mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Community Guidelines:</p>
                      <ul className="space-y-1">
                        <li>• Be respectful and constructive in your discussions</li>
                        <li>• Search existing posts before creating new ones</li>
                        <li>• Include relevant code snippets and error messages</li>
                        <li>• Mark your post as solved when you find an answer</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Bot" size={16} className="text-primary" />
                    <span>AI moderation will review your post</span>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="default"
                      iconName="Send"
                      iconPosition="left"
                    >
                      Create Post
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePostButton;