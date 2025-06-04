import React, { useEffect, useState } from "react";
import "../../Assets/css/newspage.css";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const Newspage = () => {
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState([]);
  console.log("🚀 ~ Newspage ~ newsData:", newsData);
  const navigate = useNavigate();
  const getCurrentDate = () => {
    const today = new Date(); 
    return today.toISOString().split("T")[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = getCurrentDate();
        const response = await api.getNewsData(currentDate);
        setNewsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading news...</p>
      </div>
    );
  }


  return (
    <>
      <section className="backgroung_image news_background">
        <div className="container">
          <div className="row py-5 gap-3"></div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className=" our_team_head pb-4">Latest news</h2>

              <div className=" ">
                <div className="">
                  {newsData.length > 0 ? (
                    newsData.map((res, key) => (
                      <div className="main_dot" key={key}>
                        <div className="out_newdetail">
                          <img
                            src={res.home_file_url}
                            alt=""
                            width={250}
                            height={180}
                          />
                        </div>
                        <div className="sub_headingline_one">
                          <h2
                            className="sub_heading"
                            onClick={() =>
                              navigate("/news", { state: { newsIndex: key } })
                            }
                          >
                            <p className="sub_heading_link">{res.title}</p>
                          </h2>
                          <h6 className="sub_heading_news">
                            <p className="sub_heading_news">{res.subtitle}</p>
                          </h6>
                          <span className="started_page">{res.timestamp}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-5 text-white fs-4">
                      No news available for today.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Newspage;
