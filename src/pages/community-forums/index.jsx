import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ForumCategory from './components/ForumCategory';
import ThreadCard from './components/ThreadCard';
import ForumSearch from './components/ForumSearch';
import CreatePostButton from './components/CreatePostButton';
import UserReputationCard from './components/UserReputationCard';
import ForumStats from './components/ForumStats';

const CommunityForums = () => {
  const [activeTab, setActiveTab] = useState('categories');
  const [searchResults, setSearchResults] = useState(null);

  // Mock data for forum categories
  const forumCategories = [
    {
      id: 1,
      name: "General Discussion",
      type: "general",
      description: "Open discussions about cybersecurity, programming, and learning experiences",
      postCount: 1247,
      memberCount: 892,
      recentThreads: [
        {
          id: 101,
          title: "Best practices for secure password storage",
          author: "Sarah Chen",
          replyCount: 23,
          lastActivity: "2 hours ago",
          solved: true
        },
        {
          id: 102,
          title: "Career transition from web dev to cybersecurity",
          author: "Mike Rodriguez",
          replyCount: 15,
          lastActivity: "4 hours ago",
          solved: false
        },
        {
          id: 103,
          title: "Recommended cybersecurity certifications for 2024",
          author: "Alex Johnson",
          replyCount: 31,
          lastActivity: "6 hours ago",
          solved: false
        }
      ]
    },
    {
      id: 2,
      name: "Code Help",
      type: "code-help",
      description: "Get help with coding challenges, debugging, and implementation questions",
      postCount: 2156,
      memberCount: 1234,
      recentThreads: [
        {
          id: 201,
          title: "SQL injection prevention in Node.js applications",
          author: "David Kim",
          replyCount: 18,
          lastActivity: "1 hour ago",
          solved: true
        },
        {
          id: 202,
          title: "Implementing JWT authentication securely",
          author: "Emma Wilson",
          replyCount: 12,
          lastActivity: "3 hours ago",
          solved: false
        },
        {
          id: 203,
          title: "Cross-site scripting (XSS) protection in React",
          author: "James Brown",
          replyCount: 27,
          lastActivity: "5 hours ago",
          solved: true
        }
      ]
    },
    {
      id: 3,
      name: "Security Questions",
      type: "security",
      description: "Discuss security vulnerabilities, threat analysis, and defensive strategies",
      postCount: 987,
      memberCount: 756,
      recentThreads: [
        {
          id: 301,
          title: "Understanding buffer overflow attacks",
          author: "Lisa Zhang",
          replyCount: 34,
          lastActivity: "30 minutes ago",
          solved: false
        },
        {
          id: 302,
          title: "Zero-day vulnerability disclosure process",
          author: "Robert Taylor",
          replyCount: 19,
          lastActivity: "2 hours ago",
          solved: true
        }
      ]
    },
    {
      id: 4,
      name: "Career Advice",
      type: "career",
      description: "Professional development, job search tips, and industry insights",
      postCount: 654,
      memberCount: 543,
      recentThreads: [
        {
          id: 401,
          title: "Salary expectations for junior security analysts",
          author: "Maria Garcia",
          replyCount: 28,
          lastActivity: "1 hour ago",
          solved: false
        },
        {
          id: 402,
          title: "Building a cybersecurity portfolio",
          author: "Tom Anderson",
          replyCount: 22,
          lastActivity: "4 hours ago",
          solved: true
        }
      ]
    },
    {
      id: 5,
      name: "Announcements",
      type: "announcements",
      description: "Platform updates, new features, and important community news",
      postCount: 89,
      memberCount: 2341,
      recentThreads: [
        {
          id: 501,
          title: "New AI-powered code analysis feature released",
          author: "SecureCodeHub Team",
          replyCount: 45,
          lastActivity: "12 hours ago",
          solved: false
        }
      ]
    }
  ];

  // Mock data for recent threads
  const recentThreads = [
    {
      id: 1001,
      title: "How to implement secure file upload in web applications?",
      preview: "I\'m working on a web application that needs to handle file uploads securely. What are the best practices to prevent malicious file uploads and ensure data integrity?",
      author: {
        name: "Jennifer Liu",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        badge: true
      },
      category: "Security Questions",
      tags: ["file-upload", "security", "web-development"],
      priority: "high",
      status: "unsolved",
      replyCount: 12,
      viewCount: 234,
      upvotes: 18,
      lastActivity: "45 minutes ago",
      aiModerated: true
    },
    {
      id: 1002,
      title: "Best resources for learning penetration testing?",
      preview: "I'm transitioning from software development to cybersecurity and want to focus on penetration testing. Can anyone recommend good learning resources, labs, or certification paths?",
      author: {
        name: "Carlos Martinez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        badge: false
      },
      category: "Career Advice",
      tags: ["penetration-testing", "career", "learning"],
      priority: "medium",
      status: null,
      replyCount: 28,
      viewCount: 567,
      upvotes: 35,
      lastActivity: "2 hours ago",
      aiModerated: true
    },
    {
      id: 1003,
      title: "React component security: Preventing XSS attacks",
      preview: "I've been reading about XSS vulnerabilities in React applications. What are the specific techniques to sanitize user input and prevent script injection in React components?",
      author: {
        name: "Priya Patel",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        badge: true
      },
      category: "Code Help",
      tags: ["react", "xss", "frontend-security"],
      priority: "high",
      status: "solved",
      replyCount: 19,
      viewCount: 445,
      upvotes: 42,
      lastActivity: "3 hours ago",
      aiModerated: true
    },
    {
      id: 1004,
      title: "Database encryption strategies for sensitive data",
      preview: "Our application handles sensitive user data and we need to implement proper database encryption. What are the current best practices for encrypting data at rest and in transit?",
      author: {
        name: "Ahmed Hassan",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        badge: true
      },
      category: "Security Questions",
      tags: ["database", "encryption", "data-protection"],
      priority: "high",
      status: "unsolved",
      replyCount: 15,
      viewCount: 312,
      upvotes: 27,
      lastActivity: "5 hours ago",
      aiModerated: true
    },
    {
      id: 1005,
      title: "Setting up a home cybersecurity lab",
      preview: "I want to create a home lab environment for practicing cybersecurity skills. What hardware and software setup would you recommend for someone starting out?",
      author: {
        name: "Sophie Turner",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
        badge: false
      },
      category: "General Discussion",
      tags: ["home-lab", "practice", "setup"],
      priority: "low",
      status: null,
      replyCount: 33,
      viewCount: 678,
      upvotes: 51,
      lastActivity: "8 hours ago",
      aiModerated: true
    }
  ];

  // Mock data for top contributors
  const topContributors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      reputationPoints: 12450,
      postsCount: 234,
      helpfulAnswers: 189,
      badges: [
        { name: "Security Expert", type: "expert", icon: "Shield" },
        { name: "Top Helper", type: "helper", icon: "Heart" },
        { name: "Code Reviewer", type: "contributor", icon: "Code" }
      ],
      specialties: ["Web Security", "Cryptography", "Penetration Testing"]
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      reputationPoints: 8920,
      postsCount: 156,
      helpfulAnswers: 134,
      badges: [
        { name: "Code Master", type: "expert", icon: "Code" },
        { name: "Community Helper", type: "helper", icon: "Users" }
      ],
      specialties: ["React Security", "API Security", "DevSecOps"]
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      reputationPoints: 7340,
      postsCount: 198,
      helpfulAnswers: 145,
      badges: [
        { name: "Mentor", type: "helper", icon: "Award" },
        { name: "Problem Solver", type: "contributor", icon: "CheckCircle" }
      ],
      specialties: ["Database Security", "Cloud Security", "Compliance"]
    }
  ];

  // Mock forum statistics
  const forumStats = {
    totalPosts: 5234,
    activeUsers: 1847,
    solvedToday: 23,
    onlineNow: 156
  };

  const handleSearch = (searchParams) => {
    // Mock search functionality
    const filteredThreads = recentThreads?.filter(thread => 
      thread?.title?.toLowerCase()?.includes(searchParams?.query?.toLowerCase()) ||
      thread?.preview?.toLowerCase()?.includes(searchParams?.query?.toLowerCase()) ||
      thread?.tags?.some(tag => tag?.toLowerCase()?.includes(searchParams?.query?.toLowerCase()))
    );
    setSearchResults(filteredThreads);
    setActiveTab('search');
  };

  const handleCreatePost = (postData) => {
    console.log('Creating new post:', postData);
    // Mock post creation - in real app, this would make an API call
  };

  const tabs = [
    { id: 'categories', label: 'Categories', icon: 'Grid3X3' },
    { id: 'recent', label: 'Recent Posts', icon: 'Clock' },
    { id: 'trending', label: 'Trending', icon: 'TrendingUp' },
    { id: 'unanswered', label: 'Unanswered', icon: 'HelpCircle' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Community Forums</h1>
                <p className="text-muted-foreground mt-2">
                  Connect with fellow learners, share knowledge, and get help from the cybersecurity community
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/learning-path-catalog">
                  <Button variant="outline" iconName="BookOpen" iconPosition="left">
                    Learning Paths
                  </Button>
                </Link>
                <Link to="/interactive-code-editor">
                  <Button variant="outline" iconName="Code" iconPosition="left">
                    Code Editor
                  </Button>
                </Link>
              </div>
            </div>
            
            <ForumStats stats={forumStats} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <ForumSearch onSearch={handleSearch} onFilterChange={() => {}} />
              
              <CreatePostButton onCreatePost={handleCreatePost} />

              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                      activeTab === tab?.id
                        ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>

              {/* Content based on active tab */}
              <div className="space-y-6">
                {activeTab === 'categories' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {forumCategories?.map((category) => (
                      <ForumCategory key={category?.id} category={category} />
                    ))}
                  </div>
                )}

                {(activeTab === 'recent' || activeTab === 'trending' || activeTab === 'unanswered') && (
                  <div className="space-y-4">
                    {recentThreads?.map((thread) => (
                      <ThreadCard key={thread?.id} thread={thread} />
                    ))}
                  </div>
                )}

                {activeTab === 'search' && searchResults && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-foreground">
                        Search Results ({searchResults?.length})
                      </h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchResults(null);
                          setActiveTab('categories');
                        }}
                        iconName="X"
                        iconPosition="left"
                      >
                        Clear Search
                      </Button>
                    </div>
                    {searchResults?.length > 0 ? (
                      searchResults?.map((thread) => (
                        <ThreadCard key={thread?.id} thread={thread} />
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search terms or browse categories instead
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Top Contributors */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Top Contributors</h3>
                <div className="space-y-4">
                  {topContributors?.map((user) => (
                    <UserReputationCard key={user?.id} user={user} />
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link
                    to="/learning-path-catalog"
                    className="flex items-center space-x-2 p-2 rounded hover:bg-muted transition-colors"
                  >
                    <Icon name="BookOpen" size={16} className="text-primary" />
                    <span className="text-sm text-foreground">Learning Paths</span>
                  </Link>
                  <Link
                    to="/interactive-code-editor"
                    className="flex items-center space-x-2 p-2 rounded hover:bg-muted transition-colors"
                  >
                    <Icon name="Code" size={16} className="text-primary" />
                    <span className="text-sm text-foreground">Code Editor</span>
                  </Link>
                  <Link
                    to="/lesson-content-viewer"
                    className="flex items-center space-x-2 p-2 rounded hover:bg-muted transition-colors"
                  >
                    <Icon name="Play" size={16} className="text-primary" />
                    <span className="text-sm text-foreground">Lessons</span>
                  </Link>
                </div>
              </div>

              {/* Community Guidelines */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Community Guidelines</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span>Be respectful and constructive</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span>Search before posting</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span>Include relevant details</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <span>Mark solved posts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForums;