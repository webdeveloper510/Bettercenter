import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AIPicks = () => {
  return (
    <section className="main">
    <div className="outer_custom">
    <h2 className="text-center our_team_head py-4 gap-3">Ai Picks</h2>
      <Container>
        {/* Iframe code */}
        <div className="row py-5 gap-3">
          <iframe
            src="https://betscienceai.shinyapps.io/sports-predictor/?mode=full"
            width="100%"
            height="800"
            style={{ border: 'none' }}
            title="Sports Predictor"
          />
        </div>
        {/* Iframe code End */}
      </Container>
    </div>
    </section>
  );
};

export default AIPicks;
