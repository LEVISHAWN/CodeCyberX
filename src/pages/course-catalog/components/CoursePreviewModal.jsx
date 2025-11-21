import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CoursePreviewModal = ({ course, isOpen, onClose }) => {
  if (!isOpen || !course) return null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < Math.floor(rating) ? "var(--color-warning)" : "var(--color-muted)"}
        className={index < Math.floor(rating) ? "fill-current" : ""}
      />
    ));
  };

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-success text-success-foreground';
      case 'intermediate':
        return 'bg-warning text-warning-foreground';
      case 'advanced':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Mock curriculum data
  const curriculum = [
    {
      module: "Introduction to Secure Coding",
      lessons: [
        "Understanding Security Fundamentals",
        "Common Vulnerabilities Overview",
        "Setting Up Development Environment"
      ]
    },
    {
      module: "Input Validation & Sanitization",
      lessons: [
        "SQL Injection Prevention",
        "Cross-Site Scripting (XSS) Protection",
        "Command Injection Mitigation"
      ]
    },
    {
      module: "Authentication & Authorization",
      lessons: [
        "Secure Password Handling",
        "Session Management",
        "Multi-Factor Authentication"
      ]
    }
  ];

  // Mock instructor data
  const instructor = {
    name: "Dr. Sarah Chen",
    title: "Senior Security Engineer at TechCorp",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    experience: "8+ years",
    students: "15,000+",
    courses: 12,
    bio: "Dr. Chen is a cybersecurity expert with extensive experience in secure software development and penetration testing."
  };

  // Mock reviews
  const reviews = [
    {
      id: 1,
      name: "Alex Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent course! The hands-on approach really helped me understand secure coding practices."
    },
    {
      id: 2,
      name: "Maria Johnson",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 4,
      date: "1 month ago",
      comment: "Great content and practical examples. Would recommend to anyone starting in cybersecurity."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">Course Preview</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            {/* Course Header */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="lg:w-1/3">
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src={course?.thumbnail}
                    alt={course?.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(course?.difficulty)}`}>
                      {course?.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-2/3">
                <h3 className="text-2xl font-bold text-foreground mb-2">{course?.title}</h3>
                <p className="text-muted-foreground mb-4">{course?.description}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(course?.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      {course?.rating} ({course?.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Icon name="Clock" size={20} className="mx-auto mb-1" />
                    <div className="text-sm font-medium text-foreground">{course?.duration}</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Icon name="BookOpen" size={20} className="mx-auto mb-1" />
                    <div className="text-sm font-medium text-foreground">{course?.lessons}</div>
                    <div className="text-xs text-muted-foreground">Lessons</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Icon name="Users" size={20} className="mx-auto mb-1" />
                    <div className="text-sm font-medium text-foreground">{course?.enrolled}</div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Icon name="Award" size={20} className="mx-auto mb-1" />
                    <div className="text-sm font-medium text-foreground">Certificate</div>
                    <div className="text-xs text-muted-foreground">Included</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {course?.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs Content */}
            <div className="space-y-8">
              {/* Curriculum */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="BookOpen" size={20} />
                  <span>Course Curriculum</span>
                </h4>
                <div className="space-y-4">
                  {curriculum?.map((module, index) => (
                    <div key={index} className="border border-border rounded-lg">
                      <div className="p-4 bg-muted/50">
                        <h5 className="font-medium text-foreground">{module.module}</h5>
                      </div>
                      <div className="p-4">
                        <ul className="space-y-2">
                          {module.lessons?.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Icon name="Play" size={14} />
                              <span>{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="User" size={20} />
                  <span>Instructor</span>
                </h4>
                <div className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
                  <Image
                    src={instructor?.avatar}
                    alt={instructor?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h5 className="font-semibold text-foreground">{instructor?.name}</h5>
                    <p className="text-sm text-muted-foreground mb-2">{instructor?.title}</p>
                    <p className="text-sm text-muted-foreground mb-3">{instructor?.bio}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{instructor?.experience} experience</span>
                      <span>{instructor?.students} students</span>
                      <span>{instructor?.courses} courses</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="MessageSquare" size={20} />
                  <span>Student Reviews</span>
                </h4>
                <div className="space-y-4">
                  {reviews?.map((review) => (
                    <div key={review?.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Image
                          src={review?.avatar}
                          alt={review?.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h6 className="font-medium text-foreground">{review?.name}</h6>
                            <span className="text-xs text-muted-foreground">{review?.date}</span>
                          </div>
                          <div className="flex items-center space-x-1 mb-2">
                            {renderStars(review?.rating)}
                          </div>
                          <p className="text-sm text-muted-foreground">{review?.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1"
              iconName="Bookmark"
              iconPosition="left"
              iconSize={16}
            >
              Save for Later
            </Button>
            <Button
              variant="default"
              className="flex-1"
              iconName="Play"
              iconPosition="left"
              iconSize={16}
            >
              Enroll Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewModal;