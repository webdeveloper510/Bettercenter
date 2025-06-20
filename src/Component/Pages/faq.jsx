import React, { useEffect, useState } from "react";
import { Container, Accordion, Spinner, Alert } from "react-bootstrap";
import api from "../../api"; 

const Faq = () => {
  const [faqList, setFaqList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFAQData = async () => {
    try {
      const response = await api.getFAQDetail();
      if (response.status === 200 && Array.isArray(response.data)) {
        setFaqList(response.data);
      } else {
        throw new Error("Invalid FAQ data structure");
      }
    } catch (err) {
      console.error("FAQ Fetch Error:", err);
      setError("Failed to load FAQs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQData();
  }, []);

  return (
    <section className="team-section">
      <Container>
        <h2 className="text-center mt-5 our_team_head">FREQUENTLY ASKED QUESTIONS</h2>
        <p className="text-center team-subtitle">
          Learn more about how to use BettorCenter and improve your betting strategy with these common questions.
        </p>

        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center my-4">
            {error}
          </Alert>
        ) : (
          <Accordion defaultActiveKey="0" className="faq-section my-4">
            {faqList.map((faq, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={faq.id || idx}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body>{faq.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </Container>
    </section>
  );
};

export default Faq;
