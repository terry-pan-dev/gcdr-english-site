import React, { useEffect, useState } from 'react';
import { BlogCard } from './BlogCard';
import { BlogSidebar } from './BlogSidebar';
import { TimelineConnector } from './TimelineConnector';

interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  image?: string;
  featured: boolean;
  pinned: boolean;
  tags: string[];
  publish: boolean;
}

interface BlogListProps {
  apiBaseUrl: string;
  initialCategory?: string | null;
  initialPage?: number;
}

export function BlogList({ apiBaseUrl, initialCategory, initialPage = 1 }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(initialCategory || null);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const postsPerPage = 10;

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${apiBaseUrl}/api/public/blogs`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data.blogs || []);
      } catch (err: any) {
        console.error('Error fetching blogs:', err);
        setError(err.message || 'Failed to load blogs');
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [apiBaseUrl]);

  // Filter posts by category
  const filteredPosts = categoryFilter
    ? posts.filter((post) => post.category === categoryFilter)
    : posts;

  // Pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  // Get unique categories
  const categories = [...new Set(posts.map((p) => p.category))];

  // Convert posts to the format expected by BlogCard
  const formattedPosts = paginatedPosts.map((post) => ({
    id: post.id,
    data: {
      title: post.title,
      date: new Date(post.date),
      author: post.author,
      category: post.category,
      excerpt: post.excerpt,
      image: post.image,
      featured: post.featured,
      pinned: post.pinned,
      tags: post.tags,
      publish: post.publish,
    },
  }));

  // Generate page numbers array
  const pageNumbers: Array<{ page: number; isEllipsis: boolean }> = [];
  let lastAdded = 0;
  for (let i = 1; i <= totalPages; i++) {
    const showPage =
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1);
    
    if (showPage) {
      if (i - lastAdded > 1) {
        pageNumbers.push({ page: 0, isEllipsis: true });
      }
      pageNumbers.push({ page: i, isEllipsis: false });
      lastAdded = i;
    }
  }

  const handleCategoryChange = (category: string | null) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a050]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#c9a050] text-[#1c1917] rounded-lg hover:bg-[#b8904a] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const sortedPosts = posts;
  const recentPosts = sortedPosts.slice(0, 5).map((post) => ({
    id: post.id,
    data: {
      title: post.title,
      date: new Date(post.date),
      author: post.author,
      category: post.category,
      excerpt: post.excerpt,
      image: post.image,
      featured: post.featured,
      pinned: post.pinned,
      tags: post.tags,
      publish: post.publish,
    },
  }));

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Blog List - 2/3 width on desktop */}
      <div className="w-full lg:w-2/3 space-y-4 sm:space-y-8">
        {/* Mobile Categories - Only visible on phones */}
        <div className="block sm:hidden mb-6 -mt-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all hover:scale-105 active:scale-95 ${
                !categoryFilter ? 'font-semibold' : ''
              }`}
              style={
                !categoryFilter
                  ? { backgroundColor: '#c9a050', color: '#1c1917' }
                  : { backgroundColor: 'white', border: '2px solid #c9a050', color: '#1c1917' }
              }
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all hover:scale-105 active:scale-95 ${
                  categoryFilter === category ? 'font-semibold' : ''
                }`}
                style={
                  categoryFilter === category
                    ? { backgroundColor: '#c9a050', color: '#1c1917' }
                    : { backgroundColor: 'white', border: '2px solid #c9a050', color: '#1c1917' }
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {formattedPosts.length > 0 ? (
          formattedPosts.map((post, index) => (
            <React.Fragment key={post.id}>
              <BlogCard post={post} index={startIndex + index} />
              {index < formattedPosts.length - 1 && (
                <TimelineConnector index={startIndex + index} />
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-stone-600 text-lg">No posts found.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-3 mt-20 sm:mt-24 -mb-8 sm:-mb-6">
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              {currentPage > 1 ? (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-2 rounded-lg transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: 'white', border: '2px solid #c9a050', color: '#1c1917' }}
                >
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </span>
                </button>
              ) : (
                <span
                  className="px-4 py-2 rounded-lg opacity-50 cursor-not-allowed"
                  style={{ backgroundColor: 'white', border: '2px solid #c9a050', color: '#1c1917' }}
                >
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </span>
                </span>
              )}

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {pageNumbers.map((item, idx) => {
                  if (item.isEllipsis) {
                    return (
                      <span key={`ellipsis-${idx}`} className="px-2 text-stone-500">
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={item.page}
                      onClick={() => handlePageChange(item.page)}
                      className={`px-3 py-2 rounded-lg transition-all min-w-[2.5rem] text-center ${
                        item.page === currentPage
                          ? 'font-semibold'
                          : 'hover:scale-105 active:scale-95'
                      }`}
                      style={
                        item.page === currentPage
                          ? { backgroundColor: '#c9a050', color: '#1c1917' }
                          : { backgroundColor: 'white', border: '2px solid #c9a050', color: '#1c1917' }
                      }
                    >
                      {item.page}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              {currentPage < totalPages ? (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-2 rounded-lg transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: 'white', border: '2px solid #c9a050', color: '#1c1917' }}
                >
                  <span className="flex items-center gap-1">
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              ) : (
                <span
                  className="px-4 py-2 rounded-lg opacity-50 cursor-not-allowed"
                  style={{ backgroundColor: 'white', border: '2px solid #c9a050', color: '#1c1917' }}
                >
                  <span className="flex items-center gap-1">
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </span>
              )}
            </div>
            
            {/* Page Info */}
            <p className="text-sm text-stone-600">
              Showing {startIndex + 1}-{Math.min(endIndex, totalPosts)} of {totalPosts} posts
              {categoryFilter && ` in "${categoryFilter}"`}
            </p>
          </div>
        )}
      </div>

      {/* Sidebar - 1/3 width on desktop */}
      <div className="hidden lg:block w-1/3">
        <BlogSidebar
          categories={categories}
          recentPosts={recentPosts}
          currentCategory={categoryFilter}
          onCategoryChange={handleCategoryChange}
        />
      </div>
    </div>
  );
}

