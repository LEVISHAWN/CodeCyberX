import React from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedPaths = () => {
  const featuredPaths = [
    {
      id: 1,
      title: "Career Switcher\'s Complete Path",
      description: "Comprehensive journey from programming basics to cybersecurity expertise, designed for professionals transitioning into tech careers.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
      duration: "6-8 months",
      courses: 12,
      students: 2847,
      difficulty: "Beginner to Advanced",
      highlights: [
        "Zero to hero programming foundation",
        "Industry-relevant security practices",
        "Portfolio projects included",
        "Job placement assistance"
      ],
      badge: "Most Popular",
      badgeColor: "bg-accent text-accent-foreground"
    },
    {
      id: 2,
      title: "Student Security Specialist Track",
      description: "Perfect for computer science students wanting to specialize in cybersecurity while building strong programming fundamentals.",
      image: "https://images.pixabay.com/photo/2018/05/18/15/30/web-design-3411373_1280.jpg",
      duration: "4-6 months",
      courses: 8,
      students: 1923,
      difficulty: "Intermediate",
      highlights: [
        "Academic credit eligible",
        "Hands-on lab simulations",
        "Peer collaboration projects",
        "Industry mentorship program"
      ],
      badge: "Academic Favorite",
      badgeColor: "bg-secondary text-secondary-foreground"
    },
    {
      id: 3,
      title: "Professional Security Upskilling",
      description: "Advanced security training for experienced developers looking to enhance their cybersecurity knowledge and secure coding practices.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      duration: "3-4 months",
      courses: 6,
      students: 1456,
      difficulty: "Advanced",
      highlights: [
        "Advanced threat detection",
        "Enterprise security patterns",
        "Compliance and regulations",
        "Leadership in security teams"
      ],
      badge: "Expert Level",
      badgeColor: "bg-error text-error-foreground"
    }
  ];

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Featured Learning Paths</h2>
          <p className="text-muted-foreground">
            Curated sequences designed for different career goals and experience levels
          </p>
        </div>
        <Button variant="outline" iconName="ArrowRight" iconPosition="right">
          View All Paths
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {featuredPaths?.map((path) => (
          <div
            key={path?.id}
            className="bg-card border border-border rounded-lg shadow-subtle hover:shadow-elevated transition-reveal overflow-hidden group"
          >
            {/* Path Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={path?.image}
                alt={path?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${path?.badgeColor}`}>
                  {path?.badge}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{path?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="BookOpen" size={14} />
                    <span>{path?.courses} courses</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Path Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
                {path?.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {path?.description}
              </p>

              {/* Path Stats */}
              <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{path?.students?.toLocaleString()} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="BarChart3" size={14} />
                  <span>{path?.difficulty}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-2">What you'll learn:</h4>
                <ul className="space-y-1">
                  {path?.highlights?.slice(0, 3)?.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={14} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  iconName="Eye"
                  iconPosition="left"
                  iconSize={14}
                >
                  Preview
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  iconName="Play"
                  iconPosition="left"
                  iconSize={14}
                >
                  Start Path
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPaths;