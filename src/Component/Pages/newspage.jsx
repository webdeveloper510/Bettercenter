import React, { useEffect, useState } from "react";
import "../../Assets/css/newspage.css";
import Laptop from "../../Assets/images/laptop-4906312_640.jpg";
import rocket from "../../Assets/images/rockets-6847181_640.jpg";
import vr from "../../Assets/images/augmented-reality-1853592_640.jpg";
import game from "../../Assets/images/gaming-4061103_640.jpg";
import axios from "axios";
import api from "../../api";
import { useNavigate } from "react-router-dom";


const Newspage = () => {
    const [loading, setLoading] = useState(true);

    const [newsData, setNewsData] = useState([])
    const navigate= useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await api.getNewsData()
                setNewsData((response.data))
            } catch (error) {
                console.error("Error fetching data:", error);
            }finally {
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

    if (!newsData) {
        return <p className="text-center py-5">No news available.</p>;
    }

    return (
        <>
            <section className="backgroung_image">
                <div className="container">
                    <div className="row py-5 gap-3">
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className=" our_team_head pb-4" >Latest news</h2>


                            <div className=" ">
                                {newsData.length !== 0 &&
                                    newsData.map((res, key) => (
                                        <div className="main_dot" key={key}>

                                            <img src={res.image_url} alt="" width={250} height={180} />
                                            <div className="sub_headingline_one">
                                                <h2 className="sub_heading" onClick={()=>navigate('/news', { state:{newsIndex: key}})}>
                                                    <p className="sub_heading_link">
                                                        {res.article_title}
                                                    </p>
                                                </h2>
                                                <h6 className="sub_heading_news">
                                                    <p href="" className="sub_heading_news">
                                                        {res.article_subtitle}
                                                    </p>
                                                </h6>
                                                <span className="started_page ">{res.timestamp}</span>

                                            </div>


                                        </div>
                                    ))
                                }



                            </div>

                        </div>

                    </div>
                </div>

            </section>
        </>
    )
}
export default Newspage;