import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
import '../../Assets/css/homeblog.css';
import blogFallback from '../../Assets/images/blog1.jpg';
import api from '../../api';

const HomeBlog = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.getBlogsData();
        if (response && response.data) {
          setAllArticles(response.data.slice(0, 4)); 
        }
      } catch (error) {
        console.error("Failed to fetch home blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const getHoursAgo = (dateString) => {
    const uploadedTime = new Date(dateString);
    const now = new Date();
    const diffInMs = now - uploadedTime;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    return `${diffInHours} hours ago`;
  };

  const filteredArticles =
    selectedTag === 'All'
      ? allArticles
      : allArticles.filter((article) => article.sports_type === selectedTag);

  const uniqueTags = ['All', ...new Set(allArticles.map(article => article.sports_type))];

  return (
    <section className="blog-articles py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-white mb-0 title_blog">Blog Articles</h3>

          <Dropdown onSelect={(e) => setSelectedTag(e)}>
            <Dropdown.Toggle variant="outline-light" size="sm" className="rounded-pill px-3 all_art">
              {selectedTag === 'All' ? 'All Articles' : selectedTag}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {uniqueTags.map((tag, i) => (
                <Dropdown.Item key={i} eventKey={tag}>{tag}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Row>
          {loading ? (
            <Col><p className="text-white">Loading blogs...</p></Col>
          ) : filteredArticles.map((article, index) => (
            <Col md={6} lg={3} key={index} className="mb-4">
              <Card className="article-card h-100">
                <Card.Img
                  variant="top"
                  src={article.file_url || blogFallback}
                  onError={(e) => e.target.src = blogFallback}
                />
                <Card.Body>
                  <div className="article-tag">{article.sports_type || 'General'}</div>
                  <Card.Title className="article-title">{article.title}</Card.Title>
                  <Card.Text className="article-meta">
                    {getHoursAgo(article.uploaded_at)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-3">
          <a href="/blog" className="view-more-link text-uppercase">View More Articles</a>
        </div>
      </Container>
    </section>
  );
};

export default HomeBlog;
