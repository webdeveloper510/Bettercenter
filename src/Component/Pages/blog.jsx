import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Assets/css/blog.css";
import blog1 from "../../Assets/images/blog1.jpg"; 
import api from "../../api"; 

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await api.getBlogsData();

        if (response && response.data) {
          setBlogs(response.data);
        } else {
          setError("Failed to fetch blog data");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("An error occurred while fetching blog data");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const displayBlogs = blogs.length > 0 ? blogs : "";

  return (
    <section className="backgroung_image">
      <h2 className="text-center our_team_head pb-4 py-5 gap-3">Blog</h2>
      <div className="container">
        {loading ? (
          <div className="text-center py-5">Loading blog posts...</div>
        ) : error ? (
          <div className="text-center py-5 text-danger">{error}</div>
        ) : (
          <div className="blog-page">
            {displayBlogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <div className="blog-image">
                  {blog.file_url ? (
                    blog.file_url.endsWith(".mp4") ? (
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
                {blog.sports_type}. {new Date(blog.uploaded_at).toLocaleDateString()}
                  </p>
                  <h2 className="blog-title">{blog.title}</h2>

                  <p
                    className="blog-description"
                    dangerouslySetInnerHTML={{
                      __html:
                        blog.description.length > 160
                          ? blog.description.substring(0, 160) + "..."
                          : blog.description,
                    }}
                  ></p>

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
        )}
      </div>
    </section>
  );
};

export default BlogList;
