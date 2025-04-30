import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import '../../Assets/css/homeblog.css';
import blog11 from '../../Assets/images/blog1.jpg';
import blog12 from '../../Assets/images/blog2.png';
import blog13 from '../../Assets/images/blog3.png';
import blog14 from '../../Assets/images/blog4.png';

const allArticles = [
  {
    img: blog11,
    tag: 'NBA',
    title: 'Top 10 NBA Playoffs PrizePicks Predictions: Tuesday (4/29)',
    author: 'BettingPros Staff · 3 hours ago'
  },
  {
    img: blog12,
    tag: 'NBA',
    title: 'Top 10 NBA Playoffs Underdog Player Picks: Tuesday',
    author: 'BettingPros Staff · 3 hours ago'
  },
  {
    img: blog13,
    tag: 'NHL',
    title: 'Bucks vs. Pacers NBA Playoffs Player Prop Bets (Tuesday)',
    author: 'BettingPros Staff · 3 hours ago'
  },
  {
    img: blog14,
    tag: 'MLB',
    title: 'Magic vs. Celtics NBA Playoffs Player Prop Bets (Tuesday)',
    author: 'BettingPros Staff · 3 hours ago'
  },
];

const HomeBlog = () => {
  const [selectedTag, setSelectedTag] = useState('All');

  const filteredArticles =
    selectedTag === 'All'
      ? allArticles
      : allArticles.filter((article) => article.tag === selectedTag);

  return (
    <section className="blog-articles py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-white mb-0 title_blog">Blog Articles</h3>

          {/* Dropdown Filter */}
          <Dropdown onSelect={(e) => setSelectedTag(e)}>
            <Dropdown.Toggle variant="outline-light" size="sm" className="rounded-pill px-3 all_art">
              {selectedTag === 'All' ? 'All Articles' : selectedTag}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="NBA">NBA</Dropdown.Item>
              <Dropdown.Item eventKey="NHL">NHL</Dropdown.Item>
              <Dropdown.Item eventKey="MLB">MLB</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Row>
          {filteredArticles.map((article, index) => (
            <Col md={6} lg={3} key={index} className="mb-4">
              <Card className="article-card h-100">
                <Card.Img variant="top" src={article.img} />
                <Card.Body>
                  <div className="article-tag">{article.tag}</div>
                  <Card.Title className="article-title">{article.title}</Card.Title>
                  <Card.Text className="article-meta">{article.author}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-3">
          <a href="#" className="view-more-link text-uppercase">View More Articles</a>
        </div>
      </Container>
    </section>
  );
};

export default HomeBlog;
