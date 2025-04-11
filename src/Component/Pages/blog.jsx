import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../Assets/css/blog.css'
import blog1 from '../../Assets/images/blog1.jpg' // ✅ Fixed semicolon here

const BlogList = () => {
  const navigate = useNavigate()

  const blogs = [
    {
      id: 1,
      title: 'New York Mets vs. Miami Marlins: Game Preview',
      description: 'A detailed breakdown of the upcoming game between the New York Mets and Miami Marlins, including key players, strategies, and predictions.',
      uploaded_at: '2025-04-09',
      file_url: blog1,
    },
    {
      id: 2,
      title: 'Top 5 Home Runs of the Season',
      description: 'Here’s a look at the most incredible home runs of the current MLB season so far, with analysis on each play.',
      uploaded_at: '2025-04-08',
      file_url: blog1,
    },
    {
      id: 3,
      title: 'MLB Trade Deadline Insights',
      description: 'Everything you need to know about the recent trades, and how they affect each team’s playoff hopes.',
      uploaded_at: '2025-04-07',
      file_url: blog1,
    },
    {
      id: 4,
      title: 'Best Pitchers in April 2025',
      description: 'We rank the best performing pitchers this April based on ERA, strikeouts, and WHIP.',
      uploaded_at: '2025-04-06',
      file_url: blog1,
    },
    {
      id: 5,
      title: 'Rising Stars in Baseball',
      description: 'Meet the next generation of baseball stars who are making waves in the 2025 season.',
      uploaded_at: '2025-04-05',
      file_url: blog1,
    },
  ]

  return (
    <section className="backgroung_image">
      <h2 class="text-center our_team_head pb-4 py-5 gap-3">Blog</h2>
      <div className="container">
        <div className="blog-page">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <div className="blog-image">
                {blog.file_url ? (
                  blog.file_url.endsWith('.mp4') ? (
                    <video width="100%" controls>
                      <source src={blog.file_url} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={blog.file_url} alt={blog.title} />
                  )
                ) : (
                  <div className="no-image">No Media</div>
                )}
              </div>
              <div className="blog-content">
                <p className="blog-meta">
                  MLB • {new Date(blog.uploaded_at).toLocaleDateString()}
                </p>
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-description">
                  {blog.description.length > 160
                    ? blog.description.substring(0, 160) + '...'
                    : blog.description}
                </p>
                <span
                  className="read-more"
                  onClick={() => navigate(`/blog/${blog.id}`)}
                >
                  Read More
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


export default BlogList
