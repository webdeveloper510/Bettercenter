import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../Assets/css/homeblog.css";
import blogFallback from "../../Assets/images/blog1.jpg";
import api from "../../api";

const HomeBlog = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const filteredArticles =
    selectedTag === "All"
      ? allArticles
      : allArticles.filter((article) => article.sports_type === selectedTag);

  const uniqueTags = ["All", ...new Set(allArticles.map((a) => a.sports_type))];

  return (
    <section className="blog-articles py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-white mb-0 title_blog">Blog Articles</h3>

          <Dropdown onSelect={(e) => setSelectedTag(e)}>
            <Dropdown.Toggle
              variant="outline-light"
              size="sm"
              className="rounded-pill px-3 all_art"
            >
              {selectedTag === "All" ? "All Articles" : selectedTag}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {uniqueTags.map((tag, i) => (
                <Dropdown.Item key={i} eventKey={tag}>
                  {tag}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Row>
          {loading ? (
            <Col>
              <p className="text-white">Loading blogs...</p>
            </Col>
          ) : filteredArticles.length > 0 ? (
            filteredArticles.map((article, key) => (
              <Col md={6} lg={3} key={key} className="mb-4">
                <Card
                  className="article-card h-100"
                  onClick={() =>
                    navigate("/news", { state: { newsIndex: key } })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img
                    variant="top"
                    src={article.file_url || blogFallback}
                    onError={(e) => (e.target.src = blogFallback)}
                  />
                  <Card.Body>
                    <div className="article-tag">
                      {article.sports_type || "General"}
                    </div>
                    <Card.Title className="article-title">
                      {article.title}
                    </Card.Title>
                    <Card.Text className="article-meta">
                      {article.created_at}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-white">No blogs available.</p>
            </Col>
          )}
        </Row>

        <div className="text-center mt-3">
          <a href="/newspage" className="view-more-link text-uppercase">
            View More Articles
          </a>
        </div>
      </Container>
    </section>
  );
};

export default HomeBlog;
