import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FilterPanel from './components/FilterPanel';
import LearningPathCard from './components/LearningPathCard';
import FeaturedSection from './components/FeaturedSection';
import ViewToggle from './components/ViewToggle';
import QuickFilters from './components/QuickFilters';
import SearchBar from './components/SearchBar';

const LearningPathCatalog = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');
  const [filters, setFilters] = useState({
    skillLevel: searchParams?.get('level') || 'all',
    language: searchParams?.get('language') || 'all',
    duration: searchParams?.get('duration') || 'all',
    topics: searchParams?.getAll('topics') || [],
    sortBy: searchParams?.get('sort') || 'popularity'
  });
  const [viewMode, setViewMode] = useState('grid');
  const [quickFilters, setQuickFilters] = useState([]);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Mock data for learning paths
  const mockLearningPaths = [
    {
      id: 1,
      title: "Web Security Fundamentals",
      description: "Master the essential concepts of web application security, including common vulnerabilities, secure coding practices, and defensive programming techniques. Learn to identify and prevent OWASP Top 10 vulnerabilities.",
      skillLevel: "Beginner",
      duration: 28,
      completionRate: 87,
      enrolledCount: 15420,
      rating: 4.8,
      topics: ["Web Security", "OWASP Top 10", "Secure Coding", "XSS Prevention"],
      language: "JavaScript",
      instructor: "Dr. Sarah Chen",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
      isNew: false,
      isFeatured: true,
      isBookmarked: false,
      prerequisites: ["Basic HTML/CSS", "JavaScript fundamentals"],
      price: 0
    },
    {
      id: 2,
      title: "Advanced Penetration Testing",
      description: "Comprehensive hands-on training in ethical hacking and penetration testing methodologies. Learn advanced techniques for vulnerability assessment, exploitation, and security reporting.",
      skillLevel: "Advanced",
      duration: 84,
      completionRate: 72,
      enrolledCount: 8930,
      rating: 4.9,
      topics: ["Penetration Testing", "Ethical Hacking", "Vulnerability Assessment", "Security Auditing"],
      language: "Python",
      instructor: "Marcus Rodriguez",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
      isNew: false,
      isFeatured: true,
      isBookmarked: true,
      prerequisites: ["Network fundamentals", "Linux command line", "Basic security concepts"],
      price: 149
    },
    {
      id: 3,
      title: "Secure API Development",
      description: "Learn to build and secure REST APIs with industry best practices. Cover authentication, authorization, input validation, rate limiting, and API security testing.",
      skillLevel: "Intermediate",
      duration: 42,
      completionRate: 91,
      enrolledCount: 12750,
      rating: 4.7,
      topics: ["API Security", "Authentication", "OAuth", "Rate Limiting"],
      language: "Python",
      instructor: "Jennifer Kim",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      isNew: true,
      isFeatured: true,
      isBookmarked: false,
      prerequisites: ["REST API basics", "HTTP protocol understanding"],
      price: 79
    },
    {
      id: 4,
      title: "Cryptography for Developers",
      description: "Understand cryptographic principles and their practical implementation in software development. Learn about encryption, hashing, digital signatures, and key management.",
      skillLevel: "Intermediate",
      duration: 35,
      completionRate: 83,
      enrolledCount: 9640,
      rating: 4.6,
      topics: ["Cryptography", "Encryption", "Digital Signatures", "Key Management"],
      language: "Java",
      instructor: "Prof. Alan Thompson",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      isNew: false,
      isFeatured: false,
      isBookmarked: false,
      prerequisites: ["Mathematics basics", "Programming fundamentals"],
      price: 99
    },
    {
      id: 5,
      title: "Mobile Application Security",
      description: "Comprehensive guide to securing mobile applications on Android and iOS platforms. Learn about platform-specific security features, secure storage, and mobile threat modeling.",
      skillLevel: "Intermediate",
      duration: 49,
      completionRate: 78,
      enrolledCount: 7820,
      rating: 4.5,
      topics: ["Mobile Security", "Android Security", "iOS Security", "Secure Storage"],
      language: "Java",
      instructor: "Lisa Wang",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
      isNew: true,
      isFeatured: false,
      isBookmarked: true,
      prerequisites: ["Mobile development experience", "Basic security knowledge"],
      price: 129
    },
    {
      id: 6,
      title: "Cloud Security Essentials",
      description: "Master cloud security fundamentals across AWS, Azure, and Google Cloud. Learn about identity management, network security, data protection, and compliance in cloud environments.",
      skillLevel: "Beginner",
      duration: 21,
      completionRate: 89,
      enrolledCount: 18500,
      rating: 4.8,
      topics: ["Cloud Security", "AWS Security", "Identity Management", "Compliance"],
      language: "Python",
      instructor: "David Park",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
      isNew: false,
      isFeatured: false,
      isBookmarked: false,
      prerequisites: ["Basic cloud concepts"],
      price: 0
    },
    {
      id: 7,
      title: "DevSecOps Implementation",
      description: "Integrate security into your DevOps pipeline with automated security testing, vulnerability scanning, and secure deployment practices. Build security-first development workflows.",
      skillLevel: "Advanced",
      duration: 56,
      completionRate: 74,
      enrolledCount: 6420,
      rating: 4.7,
      topics: ["DevSecOps", "CI/CD Security", "Automated Testing", "Container Security"],
      language: "Python",
      instructor: "Michael Brown",
      thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop",
      isNew: true,
      isFeatured: false,
      isBookmarked: false,
      prerequisites: ["DevOps experience", "Docker knowledge", "CI/CD understanding"],
      price: 199
    },
    {
      id: 8,
      title: "Incident Response & Forensics",
      description: "Learn systematic approaches to cybersecurity incident response and digital forensics. Develop skills in threat detection, evidence collection, and recovery procedures.",
      skillLevel: "Advanced",
      duration: 63,
      completionRate: 69,
      enrolledCount: 5230,
      rating: 4.6,
      topics: ["Incident Response", "Digital Forensics", "Threat Detection", "Evidence Collection"],
      language: "Python",
      instructor: "Rachel Green",
      thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop",
      isNew: false,
      isFeatured: false,
      isBookmarked: true,
      prerequisites: ["Security fundamentals", "Network analysis", "System administration"],
      price: 179
    }
  ];

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter and search logic
  const filteredPaths = mockLearningPaths?.filter(path => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery?.toLowerCase();
      const matchesSearch = 
        path?.title?.toLowerCase()?.includes(searchLower) ||
        path?.description?.toLowerCase()?.includes(searchLower) ||
        path?.topics?.some(topic => topic?.toLowerCase()?.includes(searchLower)) ||
        path?.instructor?.toLowerCase()?.includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Skill level filter
    if (filters?.skillLevel !== 'all' && path?.skillLevel?.toLowerCase() !== filters?.skillLevel) {
      return false;
    }

    // Language filter
    if (filters?.language !== 'all' && path?.language?.toLowerCase() !== filters?.language?.toLowerCase()) {
      return false;
    }

    // Duration filter
    if (filters?.duration !== 'all') {
      const duration = path?.duration;
      switch (filters?.duration) {
        case 'short':
          if (duration > 28) return false;
          break;
        case 'medium':
          if (duration <= 28 || duration > 84) return false;
          break;
        case 'long':
          if (duration <= 84) return false;
          break;
      }
    }

    // Topics filter
    if (filters?.topics?.length > 0) {
      const hasMatchingTopic = filters?.topics?.some(filterTopic =>
        path?.topics?.some(pathTopic => 
          pathTopic?.toLowerCase()?.includes(filterTopic?.replace('-', ' '))
        )
      );
      if (!hasMatchingTopic) return false;
    }

    // Quick filters
    if (quickFilters?.includes('free') && path?.price > 0) return false;
    if (quickFilters?.includes('beginner') && path?.skillLevel !== 'Beginner') return false;
    if (quickFilters?.includes('new') && !path?.isNew) return false;
    if (quickFilters?.includes('popular') && path?.enrolledCount < 10000) return false;

    return true;
  });

  // Sort filtered paths
  const sortedPaths = [...filteredPaths]?.sort((a, b) => {
    switch (filters?.sortBy) {
      case 'rating':
        return b?.rating - a?.rating;
      case 'newest':
        return b?.isNew - a?.isNew;
      case 'duration-short':
        return a?.duration - b?.duration;
      case 'duration-long':
        return b?.duration - a?.duration;
      case 'alphabetical':
        return a?.title?.localeCompare(b?.title);
      case 'price-low':
        return a?.price - b?.price;
      case 'price-high':
        return b?.price - a?.price;
      case 'popularity':
      default:
        return b?.enrolledCount - a?.enrolledCount;
    }
  });

  // Get featured paths
  const featuredPaths = mockLearningPaths?.filter(path => path?.isFeatured);

  // Search suggestions
  const searchSuggestions = mockLearningPaths?.filter(path => 
      searchQuery && 
      path?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    )?.slice(0, 5);

  // Event handlers
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams?.set('search', query);
    } else {
      newParams?.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (query) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500); // Simulate search delay
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    const newParams = new URLSearchParams();
    
    Object.entries(newFilters)?.forEach(([key, value]) => {
      if (value !== 'all' && value !== '' && value?.length > 0) {
        if (Array.isArray(value)) {
          value?.forEach(v => newParams?.append(key, v));
        } else {
          newParams?.set(key, value);
        }
      }
    });
    
    if (searchQuery) newParams?.set('search', searchQuery);
    setSearchParams(newParams);
  };

  const handleQuickFilterToggle = (filterId) => {
    setQuickFilters(prev => 
      prev?.includes(filterId) 
        ? prev?.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleEnroll = (pathId) => {
    navigate(`/lesson-content-viewer?path=${pathId}`);
  };

  const handlePreview = (pathId) => {
    navigate(`/lesson-content-viewer?path=${pathId}&preview=true`);
  };

  const handleBookmark = (pathId) => {
    // Mock bookmark functionality
    console.log('Bookmarked path:', pathId);
  };

  return (
    <>
      <Helmet>
        <title>Learning Path Catalog - SecureCodeHub</title>
        <meta name="description" content="Discover structured cybersecurity courses tailored to your skill level. Learn secure coding, penetration testing, and web security with hands-on labs." />
        <meta name="keywords" content="cybersecurity courses, secure coding, penetration testing, web security, programming education" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                <span>Home</span>
                <Icon name="ChevronRight" size={14} />
                <span>Learning Paths</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Learning Path Catalog
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Discover structured cybersecurity courses designed to take you from beginner to expert. 
                Learn secure coding practices, vulnerability detection, and real-world security skills.
              </p>
            </div>

            {/* Search Bar */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
              suggestions={searchSuggestions}
              isLoading={isLoading}
              className="mb-6"
            />

            {/* Quick Filters */}
            <QuickFilters
              activeFilters={quickFilters}
              onFilterToggle={handleQuickFilterToggle}
              className="mb-8"
            />

            {/* Featured Section */}
            {!searchQuery && quickFilters?.length === 0 && (
              <FeaturedSection
                featuredPaths={featuredPaths}
                onEnroll={handleEnroll}
                onPreview={handlePreview}
              />
            )}

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filter Panel */}
              <div className="lg:col-span-1">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  resultCount={sortedPaths?.length}
                  onClearFilters={() => {
                    setFilters({
                      skillLevel: 'all',
                      language: 'all',
                      duration: 'all',
                      topics: [],
                      sortBy: 'popularity'
                    });
                    setQuickFilters([]);
                  }}
                  isMobile={isMobile}
                  isOpen={isFilterPanelOpen}
                  onToggle={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                />
              </div>

              {/* Learning Paths Grid */}
              <div className="lg:col-span-3">
                {/* View Controls */}
                <ViewToggle
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  sortBy={filters?.sortBy}
                  onSortChange={(sortBy) => handleFiltersChange({ ...filters, sortBy })}
                  totalResults={sortedPaths?.length}
                  className="mb-6"
                />

                {/* Results */}
                {sortedPaths?.length > 0 ? (
                  <div className={
                    viewMode === 'grid' 
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" :"space-y-4"
                  }>
                    {sortedPaths?.map((path) => (
                      <LearningPathCard
                        key={path?.id}
                        path={path}
                        viewMode={viewMode}
                        onEnroll={handleEnroll}
                        onBookmark={handleBookmark}
                        onPreview={handlePreview}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No learning paths found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search terms to find what you're looking for.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setFilters({
                          skillLevel: 'all',
                          language: 'all',
                          duration: 'all',
                          topics: [],
                          sortBy: 'popularity'
                        });
                        setQuickFilters([]);
                      }}
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}

                {/* Load More Button */}
                {sortedPaths?.length > 0 && sortedPaths?.length >= 12 && (
                  <div className="text-center mt-8">
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="ChevronDown"
                      iconPosition="right"
                    >
                      Load More Paths
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LearningPathCatalog;