import React, { useEffect, useState } from "react";
import "../../Assets/css/newspage.css";
import Laptop from "../../Assets/images/laptop-4906312_640.jpg";
import rocket from "../../Assets/images/rockets-6847181_640.jpg";
import vr from "../../Assets/images/augmented-reality-1853592_640.jpg";
import game from "../../Assets/images/gaming-4061103_640.jpg";
import axios from "axios";
import api from "../../api";


const Newspage = () => {
    const [newsData, setNewsData] = useState([])
    console.log("🚀 ~ Newspage ~ newsData:", newsData)
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await api.getNewsData()
                console.log("🚀 ~ fetchData ~ response:", response)
           
                setNewsData((response.data))
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <section className="backgroung_image">
                <div className="container">
                    <div className="row py-5 gap-3">
                        <h2 className="text-center our_team_head pb-4" >NEWS</h2>

                        <div className="col-12 laptop_image">
                            <div className="d-flex gap-2">
                                <a href="" className="heading_news_one">AI Powered
                                </a><p className="heading_news"> | 2mo ago</p>
                            </div>
                            <h2 className="news_page_heading">The Future of Sustainable Living: Driving Eco-Friendly<br></br> Lifestyles</h2>

                        </div>
                        {/* <div className="col-4">
                            <div className="d-flex ">
                                <img src={Laptop} alt="" width={200} height={100} />
                                <div className="sub_headingline">
                                    <div className="d-flex gap-2">
                                        <a href="" className="heading_news_one">AI Powered
                                        </a><p className="heading_news"> | 4m ago</p>
                                    </div>
                                    <h2 className="sub_heading"><a href="/news" className="sub_heading_link">The Future of Sustainable Living: Driving Eco-Friendly Lifestyles
                                    </a></h2>
                                </div>
                            </div>
                            <div className="d-flex pt-2">
                                <img src={rocket} alt="" width={200} height={100} />
                                <div className="sub_headingline">
                                    <div className="d-flex gap-2">
                                        <a href="" className="heading_news_one">Tech
                                        </a><p className="heading_news"> | 5day ago</p>
                                    </div>
                                    <h2 className="sub_heading"><a href="/news" className="sub_heading_link">Business Agility the Digital Age: Leveraging AI and Automation</a></h2>
                                </div>
                            </div>
                            <div className="d-flex pt-2">
                                <img src={vr} alt="" width={200} height={100} />
                                <div className="sub_headingline">
                                    <div className="d-flex gap-2">
                                        <a href="" className="heading_news_one">Network
                                        </a><p className="heading_news"> | 2hour ago</p>
                                    </div>
                                    <h2 className="sub_heading"><a href="/news" className="sub_heading_link">The Art of Baking: From Classic Bread to Artisan Pastries</a></h2>
                                </div>
                            </div>
                            <div className="d-flex pt-2">
                                <img src={game} alt="" width={200} height={100} />
                                <div className="sub_headingline">
                                    <div className="d-flex gap-2">
                                        <a href="" className="heading_news_one">Virual Realty
                                        </a><p className="heading_news"> | 12week ago</p>
                                    </div>
                                    <h2 className="sub_heading"><a href="/news" className="sub_heading_link">AI and Marketing: Unlocking Customer Insights</a></h2>
                                </div>
                            </div>

                            <a class=" see_btn mt-2" href="#">See all Tech<i></i></a>
                        </div> */}
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
                                            
                                            <img src={res.image_url[0]} alt="" width={250} height={180} />
                                            <div className="sub_headingline_one">
                                            <h2 className="sub_heading">
                                                    <p href="" className="sub_heading_link">
                                                        {res.article_title}
                                                    </p>
                                                </h2>
                                                <h6 className="sub_heading_news">
                                                    <p href="" className="sub_heading_news">
                                                        {res.article_subtitle}
                                                    </p>
                                                </h6>
                                                <span className="started_page">{res.timestamp}</span>

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