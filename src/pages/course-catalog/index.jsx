import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CourseCard from './components/CourseCard';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import FeaturedPaths from './components/FeaturedPaths';
import CoursePreviewModal from './components/CoursePreviewModal';

const CourseCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    difficulty: [],
    duration: '',
    language: ''
  });
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');

  // Mock courses data
  const mockCourses = [
    {
      id: 1,
      title: "Python Security Fundamentals",
      description: "Learn Python programming with integrated cybersecurity practices, covering secure coding patterns and vulnerability prevention.",
      thumbnail: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
      difficulty: "Beginner",
      duration: "8 hours",
      rating: 4.8,
      reviews: 1247,
      technologies: ["Python", "Security", "Cryptography"],
      prerequisites: [],
      enrolled: 3420,
      lessons: 24,
      isNew: true,
      category: "programming-basics",
      instructor: "Dr. Sarah Chen"
    },
    {
      id: 2,
      title: "JavaScript Web Security Mastery",
      description: "Master JavaScript development while learning to identify and prevent common web vulnerabilities like XSS and CSRF attacks.",
      thumbnail: "https://images.pixabay.com/photo/2016/12/05/11/39/javascript-1885576_1280.jpg",
      difficulty: "Intermediate",
      duration: "12 hours",
      rating: 4.7,
      reviews: 892,
      technologies: ["JavaScript", "Web Security", "Node.js"],
      prerequisites: ["Basic JavaScript knowledge"],
      enrolled: 2156,
      lessons: 18,
      isNew: false,
      category: "web-security",
      instructor: "Michael Rodriguez"
    },
    {
      id: 3,
      title: "Algorithm Challenges with Penetration Testing",
      description: "Solve complex algorithms while learning penetration testing techniques, combining problem-solving with ethical hacking skills.",
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
      difficulty: "Advanced",
      duration: "15 hours",
      rating: 4.9,
      reviews: 634,
      technologies: ["Algorithms", "Penetration Testing", "Python"],
      prerequisites: ["Data Structures", "Basic Security Knowledge"],
      enrolled: 1789,
      lessons: 32,
      isNew: false,
      category: "algorithm-challenges",
      instructor: "Alex Thompson"
    },
    {
      id: 4,
      title: "Secure Full-Stack Development",
      description: "Build complete web applications with security-first approach, covering both frontend and backend security practices.",
      thumbnail: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg",
      difficulty: "Intermediate",
      duration: "20 hours",
      rating: 4.6,
      reviews: 1156,
      technologies: ["React", "Node.js", "Security", "Database"],
      prerequisites: ["JavaScript", "Basic Web Development"],
      enrolled: 2847,
      lessons: 28,
      isNew: true,
      category: "web-security",
      instructor: "Emma Wilson"
    },
    {
      id: 5,
      title: "Cryptography for Developers",
      description: "Understand cryptographic principles and implement secure encryption in your applications with hands-on examples.",
      thumbnail: "https://images.pixabay.com/photo/2018/07/14/11/33/cyber-security-3535772_1280.jpg",
      difficulty: "Advanced",
      duration: "10 hours",
      rating: 4.8,
      reviews: 567,
      technologies: ["Cryptography", "Python", "Security"],
      prerequisites: ["Programming Experience", "Math Basics"],
      enrolled: 1234,
      lessons: 16,
      isNew: false,
      category: "secure-coding",
      instructor: "Dr. James Park"
    },
    {
      id: 6,
      title: "Mobile App Security Testing",
      description: "Learn to secure mobile applications and perform security testing on iOS and Android platforms.",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
      difficulty: "Intermediate",
      duration: "14 hours",
      rating: 4.5,
      reviews: 423,
      technologies: ["Mobile Security", "iOS", "Android", "Testing"],
      prerequisites: ["Mobile Development Basics"],
      enrolled: 987,
      lessons: 22,
      isNew: true,
      category: "penetration-testing",
      instructor: "Lisa Chang"
    }
  ];

  const [filteredCourses, setFilteredCourses] = useState(mockCourses);

  // Filter and search logic
  useEffect(() => {
    let filtered = mockCourses;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(course =>
        course?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        course?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        course?.technologies?.some(tech => tech?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(course =>
        filters?.categories?.includes(course?.category)
      );
    }

    // Apply difficulty filter
    if (filters?.difficulty?.length > 0) {
      filtered = filtered?.filter(course =>
        filters?.difficulty?.includes(course?.difficulty?.toLowerCase())
      );
    }

    // Apply duration filter
    if (filters?.duration) {
      filtered = filtered?.filter(course => {
        const duration = parseInt(course?.duration);
        switch (filters?.duration) {
          case '0-5':
            return duration <= 5;
          case '5-15':
            return duration > 5 && duration <= 15;
          case '15-30':
            return duration > 15 && duration <= 30;
          case '30+':
            return duration > 30;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        filtered?.sort((a, b) => b?.enrolled - a?.enrolled);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.isNew - a?.isNew);
        break;
      case 'duration':
        filtered?.sort((a, b) => parseInt(a?.duration) - parseInt(b?.duration));
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
  }, [searchQuery, filters, sortBy]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      difficulty: [],
      duration: '',
      language: ''
    });
    setSearchQuery('');
  };

  const handleCoursePreview = (course) => {
    setSelectedCourse(course);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedCourse(null);
  };

  const toggleFilterPanel = () => {
    setIsFilterCollapsed(!isFilterCollapsed);
  };

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'duration', label: 'Shortest First' }
  ];

  return (
    <>
      <Helmet>
        <title>Course Catalog - SecureCodeHub</title>
        <meta name="description" content="Discover programming and cybersecurity courses tailored to your skill level. Learn secure coding practices with hands-on exercises." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Course Catalog</h1>
              <p className="text-muted-foreground">
                Discover programming and cybersecurity courses designed to build secure coding skills
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 flex justify-center">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onSearch={handleSearch}
              />
            </div>

            {/* Featured Learning Paths */}
            <FeaturedPaths />

            {/* Filters and Controls */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filter Panel - Desktop */}
              <div className="hidden lg:block lg:w-80 flex-shrink-0">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  resultCount={filteredCourses?.length}
                  isCollapsed={false}
                  onToggleCollapse={toggleFilterPanel}
                />
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {/* Controls Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center space-x-4">
                    {/* Mobile Filter Toggle */}
                    <Button
                      variant="outline"
                      onClick={toggleFilterPanel}
                      className="lg:hidden"
                      iconName="Filter"
                      iconPosition="left"
                      iconSize={16}
                    >
                      Filters ({filteredCourses?.length})
                    </Button>

                    {/* Results Count */}
                    <span className="text-sm text-muted-foreground">
                      {filteredCourses?.length} courses found
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Sort Dropdown */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Sort by:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e?.target?.value)}
                        className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {sortOptions?.map((option) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center border border-border rounded-md">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="rounded-r-none"
                      >
                        <Icon name="Grid3X3" size={16} />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="rounded-l-none"
                      >
                        <Icon name="List" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Course Grid */}
                {filteredCourses?.length > 0 ? (
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
                  }`}>
                    {filteredCourses?.map((course) => (
                      <CourseCard
                        key={course?.id}
                        course={course}
                        onPreview={handleCoursePreview}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search criteria or filters
                    </p>
                    <Button variant="outline" onClick={handleClearFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Filter Panel */}
        {!isFilterCollapsed && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-background overflow-y-auto">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                resultCount={filteredCourses?.length}
                isCollapsed={isFilterCollapsed}
                onToggleCollapse={toggleFilterPanel}
              />
            </div>
          </div>
        )}

        {/* Course Preview Modal */}
        <CoursePreviewModal
          course={selectedCourse}
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
        />
      </div>
    </>
  );
};

export default CourseCatalog;