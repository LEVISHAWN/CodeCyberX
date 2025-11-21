import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ProgressOverviewCard from './components/ProgressOverviewCard';
import CourseCard from './components/CourseCard';
import RecommendationCard from './components/RecommendationCard';
import AchievementBadge from './components/AchievementBadge';
import UpcomingDeadline from './components/UpcomingDeadline';
import ForumHighlight from './components/ForumHighlight';
import CourseFilter from './components/CourseFilter';
import LearningAssistant from '../../components/LearningAssistant';

const LearningDashboard = () => {
  const [filters, setFilters] = useState({
    language: '',
    difficulty: '',
    topic: ''
  });
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Mock data for progress overview
  const progressData = [
    {
      title: "Current Streak",
      value: "7 days",
      subtitle: "Keep it up! Your longest streak was 12 days",
      icon: "Flame",
      color: "bg-orange-500",
      trend: { type: 'up', value: '+2 days' }
    },
    {
      title: "Modules Completed",
      value: "24",
      subtitle: "Out of 45 total modules",
      icon: "CheckCircle",
      color: "bg-green-500",
      trend: { type: 'up', value: '+3 this week' }
    },
    {
      title: "Badges Earned",
      value: "12",
      subtitle: "3 new badges this month",
      icon: "Award",
      color: "bg-purple-500",
      trend: { type: 'up', value: '+3 new' }
    },
    {
      title: "Overall Progress",
      value: "68%",
      subtitle: "Across all learning paths",
      icon: "TrendingUp",
      color: "bg-blue-500",
      trend: { type: 'up', value: '+5% this week' }
    }
  ];

  // Mock data for current courses
  const coursesData = [
    {
      id: 1,
      title: "Python Security Fundamentals",
      description: "Learn secure coding practices in Python with hands-on vulnerability detection exercises.",
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
      language: "Python",
      difficulty: "Intermediate",
      progress: 75,
      duration: "6 weeks",
      nextLesson: "SQL Injection Prevention",
      enrolled: "2.4k",
      rating: "4.8",
      topic: "Data Security"
    },
    {
      id: 2,
      title: "JavaScript Web Security",
      description: "Master client-side security, XSS prevention, and secure authentication in modern web apps.",
      thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=400&h=300&fit=crop",
      language: "JavaScript",
      difficulty: "Advanced",
      progress: 45,
      duration: "8 weeks",
      nextLesson: "Cross-Site Scripting (XSS) Defense",
      enrolled: "1.8k",
      rating: "4.9",
      topic: "Web Security"
    },
    {
      id: 3,
      title: "Cryptography Basics with Python",
      description: "Understanding encryption, hashing, and digital signatures through practical Python implementations.",
      thumbnail: "https://images.pixabay.com/photo/2018/05/14/16/54/cyber-3400789_1280.jpg?w=400&h=300&fit=crop",
      language: "Python",
      difficulty: "Beginner",
      progress: 90,
      duration: "4 weeks",
      nextLesson: "Digital Signatures",
      enrolled: "3.2k",
      rating: "4.7",
      topic: "Data Security"
    },
    {
      id: 4,
      title: "Network Security Fundamentals",
      description: "Learn network protocols, firewalls, and intrusion detection systems with practical labs.",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
      language: "Python",
      difficulty: "Intermediate",
      progress: 30,
      duration: "10 weeks",
      nextLesson: "Firewall Configuration",
      enrolled: "1.5k",
      rating: "4.6",
      topic: "Network Security"
    }
  ];

  // Mock data for AI recommendations
  const recommendationsData = [
    {
      id: 1,
      title: "Advanced Penetration Testing",
      description: "Take your security skills to the next level with advanced penetration testing techniques.",
      thumbnail: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?w=100&h=100&fit=crop",
      difficulty: "Advanced",
      reason: "Skill Gap",
      estimatedTime: "12 weeks",
      rating: "4.9"
    },
    {
      id: 2,
      title: "Secure API Development",
      description: "Learn to build and secure REST APIs with authentication, authorization, and rate limiting.",
      thumbnail: "https://images.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.png?w=100&h=100&fit=crop",
      difficulty: "Intermediate",
      reason: "Trending",
      estimatedTime: "6 weeks",
      rating: "4.8"
    },
    {
      id: 3,
      title: "Mobile App Security",
      description: "Secure mobile applications against common vulnerabilities and attack vectors.",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop",
      difficulty: "Intermediate",
      reason: "Similar Users",
      estimatedTime: "8 weeks",
      rating: "4.7"
    }
  ];

  // Mock data for recent achievements
  const achievementsData = [
    {
      id: 1,
      title: "Python Master",
      description: "Completed all Python security modules",
      category: "completion",
      type: "gold",
      earnedDate: "2 days ago",
      isNew: true
    },
    {
      id: 2,
      title: "7-Day Streak",
      description: "Maintained learning streak for 7 consecutive days",
      category: "streak",
      type: "silver",
      earnedDate: "Today",
      isNew: true
    },
    {
      id: 3,
      title: "Community Helper",
      description: "Helped 10 fellow learners in forums",
      category: "community",
      type: "bronze",
      earnedDate: "1 week ago",
      isNew: false
    }
  ];

  // Mock data for upcoming deadlines
  const deadlinesData = [
    {
      id: 1,
      title: "SQL Injection Lab",
      course: "Python Security Fundamentals",
      type: "assignment",
      priority: "high",
      dueDate: "Tomorrow, 11:59 PM"
    },
    {
      id: 2,
      title: "XSS Prevention Quiz",
      course: "JavaScript Web Security",
      type: "quiz",
      priority: "medium",
      dueDate: "Oct 12, 2025"
    },
    {
      id: 3,
      title: "Cryptography Project",
      course: "Cryptography Basics",
      type: "project",
      priority: "low",
      dueDate: "Oct 15, 2025"
    }
  ];

  // Mock data for forum highlights
  const forumPostsData = [
    {
      id: 1,
      title: "Best practices for secure password hashing?",
      preview: "I\'m working on a user authentication system and want to ensure I\'m using the most secure methods for password storage...",
      author: {
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg"
      },
      topic: "Security",
      replies: 12,
      likes: 24,
      timeAgo: "2h ago"
    },
    {
      id: 2,
      title: "Python vs JavaScript for cybersecurity?",
      preview: "I\'m new to cybersecurity and wondering which language would be better to focus on first. What are your thoughts?",
      author: {
        name: "Mike Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      topic: "General",
      replies: 8,
      likes: 15,
      timeAgo: "4h ago"
    },
    {
      id: 3,
      title: "Help with SQL injection prevention",
      preview: "I\'m stuck on the SQL injection lab. Can someone explain parameterized queries in more detail?",
      author: {
        name: "Alex Kim",
        avatar: "https://randomuser.me/api/portraits/men/23.jpg"
      },
      topic: "Python",
      replies: 6,
      likes: 9,
      timeAgo: "6h ago"
    }
  ];

  // Filter courses based on selected filters
  useEffect(() => {
    let filtered = coursesData;

    if (filters?.language) {
      filtered = filtered?.filter(course => 
        course?.language?.toLowerCase() === filters?.language?.toLowerCase()
      );
    }

    if (filters?.difficulty) {
      filtered = filtered?.filter(course => 
        course?.difficulty?.toLowerCase() === filters?.difficulty?.toLowerCase()
      );
    }

    if (filters?.topic) {
      filtered = filtered?.filter(course => 
        course?.topic?.toLowerCase() === filters?.topic?.toLowerCase()
      );
    }

    setFilteredCourses(filtered);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({ language: '', difficulty: '', topic: '' });
  };

  // Prepare learner context for AI assistant
  const learnerContext = {
    courses: filteredCourses,
    overallProgress: 68,
    streak: 7,
    recentTopics: ['SQL Injection', 'XSS Prevention', 'Cryptography', 'Network Security'],
    currentLevel: 'Intermediate',
    completedModules: 24,
    totalModules: 45
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, John! 👋
                </h1>
                <p className="text-muted-foreground">
                  Ready to continue your cybersecurity learning journey?
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/course-catalog">
                  <Button variant="outline">
                    <Icon name="Search" size={16} className="mr-2" />
                    Browse Courses
                  </Button>
                </Link>
                <Link to="/progress-analytics">
                  <Button variant="default">
                    <Icon name="BarChart3" size={16} className="mr-2" />
                    View Analytics
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Progress Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {progressData?.map((item, index) => (
              <ProgressOverviewCard
                key={index}
                title={item?.title}
                value={item?.value}
                subtitle={item?.subtitle}
                icon={item?.icon}
                color={item?.color}
                trend={item?.trend}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Current Courses */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground">Your Courses</h2>
                  <Link to="/course-catalog">
                    <Button variant="ghost" size="sm">
                      View All
                      <Icon name="ArrowRight" size={16} className="ml-1" />
                    </Button>
                  </Link>
                </div>
                
                {/* Course Filters */}
                <CourseFilter
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
                
                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCourses?.map((course) => (
                    <CourseCard key={course?.id} course={course} />
                  ))}
                </div>
                
                {filteredCourses?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No courses found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or browse all available courses.
                    </p>
                    <Button variant="outline" onClick={handleClearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>

              {/* AI Recommendations */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold text-foreground">Recommended for You</h2>
                    <div className="flex items-center space-x-1 px-2 py-1 bg-primary bg-opacity-10 rounded-full">
                      <Icon name="Sparkles" size={14} color="var(--color-primary)" />
                      <span className="text-xs font-medium text-primary">AI Powered</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {recommendationsData?.map((recommendation) => (
                    <RecommendationCard key={recommendation?.id} recommendation={recommendation} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Recent Achievements */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Recent Achievements</h3>
                  <Link to="/progress-analytics">
                    <Button variant="ghost" size="sm">
                      View All
                      <Icon name="ArrowRight" size={16} className="ml-1" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-3">
                  {achievementsData?.map((achievement) => (
                    <AchievementBadge key={achievement?.id} achievement={achievement} />
                  ))}
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h3>
                  <Button variant="ghost" size="sm">
                    <Icon name="Calendar" size={16} />
                  </Button>
                </div>
                <div className="space-y-3">
                  {deadlinesData?.map((deadline) => (
                    <UpcomingDeadline key={deadline?.id} deadline={deadline} />
                  ))}
                </div>
              </div>

              {/* Community Forum Highlights */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Forum Highlights</h3>
                  <Button variant="ghost" size="sm">
                    <Icon name="MessageCircle" size={16} />
                  </Button>
                </div>
                <div className="space-y-3">
                  {forumPostsData?.map((post) => (
                    <ForumHighlight key={post?.id} post={post} />
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link to="/course-catalog" className="block">
                    <Button variant="ghost" fullWidth className="justify-start">
                      <Icon name="Search" size={16} className="mr-2" />
                      Browse All Courses
                    </Button>
                  </Link>
                  <Button variant="ghost" fullWidth className="justify-start">
                    <Icon name="BookOpen" size={16} className="mr-2" />
                    Study Materials
                  </Button>
                  <Button variant="ghost" fullWidth className="justify-start">
                    <Icon name="Users" size={16} className="mr-2" />
                    Join Study Group
                  </Button>
                  <Link to="/user-profile-settings" className="block">
                    <Button variant="ghost" fullWidth className="justify-start">
                      <Icon name="Settings" size={16} className="mr-2" />
                      Account Settings
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Learning Assistant - Floating Chatbot */}
      <LearningAssistant learnerContext={learnerContext} />
    </div>
  );
};

export default LearningDashboard;