import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../../Assets/css/blogdetail.css';
import blog1 from '../../Assets/images/blog1.jpg' // Sample image

const BlogDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  // For demo purposes — you can replace with API fetch using `id`
  const blog = {
    id,
    title: 'New York Mets vs. Miami Marlins: Game Preview',
    description:
      'A detailed breakdown of the upcoming game between the New York Mets and Miami Marlins, including key players, strategies, and predictions. This matchup brings two competitive teams head-to-head with both having standout players. The Mets have shown strong batting skills while the Marlins are holding up great on defense. Analysts expect a close game with strategic plays on both sides. Stay tuned for live updates, player stats, and post-game analysis.',
    uploaded_at: '2025-04-09',
    file_url: blog1,
  }

  const isVideo = blog.file_url?.endsWith('.mp4')

  return (
    <section className="blog-detail-page backgroung_image">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        <h1 className="blog-detail-title">{blog.title}</h1>

        <div className="blog-detail-media">
          {isVideo ? (
            <video controls width="100%">
              <source src={blog.file_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={blog.file_url} alt={blog.title} />
          )}
        </div>

        <p className="blog-detail-date">
          Posted on: {new Date(blog.uploaded_at).toLocaleDateString()}
        </p>

        <div className="blog-detail-content">
          <p>{blog.description}</p>
        </div>
      </div>
    </section>

  )
}

export default BlogDetail