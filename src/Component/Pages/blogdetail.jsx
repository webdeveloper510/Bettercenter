import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../Assets/css/blogdetail.css';
import api from '../../api';
import blog1 from '../../Assets/images/blog1.jpg'; 

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.getBlogsData();
        if (response && response.data) {
          const matchedBlog = response.data.find(item => String(item.id) === String(id));
          if (matchedBlog) {
            setBlog(matchedBlog);
          } else {
            setError("Blog not found");
          }
        } else {
          setError("Failed to fetch blog data");
        }
      } catch (err) {
        setError("An error occurred while fetching blog data");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!blog) return <div>No blog found.</div>;

  const isVideo = blog.file_url?.endsWith('.mp4');

  return (
    <div className="blog-detail-container">
      <h1>{blog.title}</h1>

      {isVideo ? (
        <video controls>
          <source src={blog.file_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={blog.file_url || blog1} alt={blog.title} />
      )}

      <p>Posted on: {new Date(blog.uploaded_at).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: blog.description }}></div>

    </div>
  );
};

export default BlogDetail;
