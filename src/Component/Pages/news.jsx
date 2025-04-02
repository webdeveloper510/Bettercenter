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
                            <div className="d-flex gap-4 py-5 justify-content-center">
                                <div className="socal_media text-center">
                                    <a href="" className="">
                                        <svg className="socal_media_icon mt-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" /></svg>
                                    </a>
                                </div>
                                <div className="socal_media text-center">
                                    <a href="" className="">
                                        <svg className="socal_media_icon mt-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>                                    </a>
                                </div>
                                <div className="socal_media text-center">
                                    <a href="" className="">
                                        <svg className="socal_media_icon mt-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" /></svg>                                    </a>
                                </div>
                                <div className="socal_media text-center">
                                    <a href="" className="">
                                        <svg className="socal_media_icon mt-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>                                    </a>
                                </div>
                                <div className="socal_media text-center">
                                    <a href="" className="">
                                        <svg className="socal_media_icon mt-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" /></svg>                                    </a>
                                </div>
                            </div>
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