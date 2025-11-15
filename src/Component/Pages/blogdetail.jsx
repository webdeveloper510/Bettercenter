import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../Assets/css/blogdetail.css';
import api from '../../api';
import blog1 from '../../Assets/images/blog1.jpg';
import { toast } from "react-toastify";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NEW STATES
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  // FETCH BLOG DETAILS
  const fetchBlog = async () => {
    try {
      const response = await api.getBlogsData();
      if (response && response.data) {
        const matchedBlog = response.data.find(item => String(item.id) === String(id));
        matchedBlog ? setBlog(matchedBlog) : setError("Blog not found");
      }
    } catch (err) {
      setError("An error occurred while fetching blog data");
    } finally {
      setLoading(false);
    }
  };

const fetchComments = async () => {
  const res = await api.getBlogComments(id);

  if (res.status === 200) {
    const reversed = [...res.data].reverse(); 
    setComments(reversed);
  } else {
    setComments([]);
  }
};



const submitComment = async () => {
  if (!newComment.trim()) return;

  setCommentLoading(true);

  const res = await api.addBlogComment(id, newComment);

  if (res.status === 201) {
    setNewComment("");
    fetchComments();
  }

  else if (res.status === 400) {
    if (res.errors?.comment_text) {
      toast.error(res.errors.comment_text[0]);
    } else {
      toast.error("Validation error");
    }
  }

  else {
    toast.error("Something went wrong");
  }

  setCommentLoading(false);
};


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!blog) return <div>No blog found.</div>;

  const isVideo = blog.file_url?.endsWith('.mp4');

  return (
    <section className="backgroung_image">
      <h2 className="text-center our_team_head pb-4 py-5 gap-3">Blog detail</h2>

      <div className="container">
        <div className="blog-detail-container">
          <h1>{blog.title}</h1>

          {isVideo ? (
            <video controls>
              <source src={blog.file_url} type="video/mp4" />
            </video>
          ) : (
            <img src={blog.file_url || blog1} alt={blog.title} />
          )}

          <p>Posted on: {new Date(blog.uploaded_at).toLocaleDateString()}</p>

          <div dangerouslySetInnerHTML={{ __html: blog.description }}></div>

          {/* ------------------ COMMENTS SECTION ---------------------- */}
          <div className="comments-section mt-5">
            <h3 className="mb-3">Comments</h3>

            {/* Add Comment Box */}
            <div className="comment-box mb-4">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Write your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>

              <button
                className="btn btn-primary mt-2"
                onClick={submitComment}
                disabled={commentLoading}
              >
                {commentLoading ? "Posting..." : "Post Comment"}
              </button>
            </div>

            {/* Comment List */}
            <div className="comment-list">
              {comments.length === 0 ? (
                <p>No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((c, i) => (
                  <div className="single-comment p-3 mb-3 border rounded" key={i}>
                    <p className="mb-1">{c.comment_text}</p>
                    <small className="text-muted">
                      {new Date(c.created_at).toLocaleString()}
                    </small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
