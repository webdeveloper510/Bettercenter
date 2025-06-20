import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Assets/css/freepicks.css";
import api from "../../api";

const FreePicks = () => {
  const navigate = useNavigate();
  const [freePicks, setFreePicks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreePicks = async () => {
      try {
        const response = await api.getFreePicksDetail();
        console.log("🚀 ~ API Response:", response);

        // Since getFreePicksDetail returns response.data, 
        // the structure is: { message, status, data }
        if (
          response &&
          response.status === 200 &&
          response.data &&
          Array.isArray(response.data)
        ) {
          setFreePicks(response.data);
        } else {
          console.error("Unexpected response structure:", response);
        }
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFreePicks();
  }, []);

  return (
    <section className="freepicks-sectionh ackgroung_image news_background">
      <div className="container py-5">
        <h1 className="text-center mb-4 page_title">Free Picks</h1>
        <p className="text-center mb-5">
          Welcome to our Free Picks page! Here you'll find daily predictions,
          expert analysis, and insights for NBA, NHL, and MLB – all for free.
        </p>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : freePicks?.length > 0 ? (
          <div className="row">
            {freePicks.map((pick, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="card p-3 shadow-sm h-100">
                  <img
                    src={pick.file_url}
                    alt={pick.title}
                    className="img-fluid mb-3"
                    style={{ maxHeight: "250px", objectFit: "cover", width: "100%" }}
                  />
                  <h5 className="fw-bold">{pick.title}</h5>
                  <div
                    dangerouslySetInnerHTML={{ __html: pick.description }}
                    className="mb-2"
                    style={{ color: "black" }}
                  />
                  <p className="mb-1" style={{ color: "black" }}>
                    <strong>Sport:</strong> {pick.sports_type}
                  </p>
                  <p className="mb-1" style={{ color: "black" }}>
                    <strong>Author:</strong> {pick.author_name}
                  </p>
                  <p className="mb-0" style={{ color: "black" }}>
                    <small>Uploaded at: {new Date(pick.uploaded_at).toLocaleString()}</small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No free picks available.</p>
        )}
      </div>
    </section>
  );
};

export default FreePicks;