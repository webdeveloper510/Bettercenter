import React, { useEffect, useState } from "react";
import "../../Assets/css/newspage.css";
import api from "../../api";
import { useLocation } from "react-router-dom";

const News = () => {
    const [loading, setLoading] = useState(true);
const [newsData, setNewsData] = useState(null);
const location = useLocation();
const newsIndex = location.state?.newsIndex;

useEffect(() => {
const fetchData = async () => {
try {
const response = await api.getNewsData();
setNewsData(response.data[newsIndex]);
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
<div className="loader-container my-5">
<div className="loader spinner-border text-primary text-center"></div>
<p className="text-center mt-5 ">Loading Latest news...</p>
</div>
);
}

if (!newsData) {
return <p className="text-center py-5">No news available.</p>;
}


    return (
        <>
            <section className="backgroung_image">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center py-5 our_team_head">{newsData.article_title}</h1>
                  
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                        
                                    <div>
                                        <img src={newsData.home_image_src} className="macbook my-3" alt="" srcset="" width={900} />
                                        <p className="pt-5 started_page" dangerouslySetInnerHTML={{ __html: newsData.news_text }}></p>

                                    </div>
                            
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
export default News;