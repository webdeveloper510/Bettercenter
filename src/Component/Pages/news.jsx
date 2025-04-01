import React, { useEffect } from "react";
import "../../Assets/css/newspage.css";
import mabbook from "../../Assets/images/macbook-459196_1920.jpg";
import rocket from "../../Assets/images/rockets-6847181_640.jpg";
import api from "../../api";
import axios from "axios";

const News = () => {
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             console.log("Submitting values:");
    //             const response = await axios.get("http://54.174.64.250:8000/news-data");
    //             console.log("Extracted Token:", response.data);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData(); 
    // }, []); 

   
    return (
        <>
            <section className="backgroung_image">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center py-5 our_team_head">The Rise of Gourmet Street Food: Trends and Top Picks</h1>
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
                            <div className="macbook">
                                <img src={mabbook} alt="" srcset="" width={950} />

                            </div>

                            <p className="pt-5 started_page">
                                <span className="fs-5">s</span>  he started her blog exactly six months before I launched Camels & Chocolate, and she really set the bar high for my own blog birthday, Y’all this summer! I’ve already been brainstorming party ideas … who wants to come? It’s no coincidence that Buster Keaton and Charlot’s movies of the and award-winning chefs about what exactly makes their hometowns In fact, not being able to rely on spoken word made them better storytellers. They fully understood and used the power of showing without words. A range of amenities provides many things to do in Bellevue. About 40 percent of the city’s population are minorities, which contributes to an overall diverse range of lifestyles and ideas.

                                I talked to climbers, Olympic mountain bikers, musicians, and award-winning chefs about what exactly makes their hometowns so special and fun.
                            </p>
                            <p className="py-3 started_page">
                                I talked to climbers, Olympic mountain bikers, musicians, and award-winning chefs about what exactly makes their hometowns so special and fun.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row ">
                        <div className="col-7">
                            <div className="started_page_second">
                                <p className="started_page py-1">
                                    Bike paths and sidewalks make getting to and from the city’s many festivals, museums, restaurants and music venues easy. A range of amenities provides many things to do in Bellevue. About 40 percent of the city’s population are minorities, which contributes to an overall diverse range of lifestyles and ideas.
                                </p>
                                <p className="started_page py-1">
                                    While Denver sits at the base of the Rocky Mountains, it’s not considered a mountain town since it takes at least an hour to get to the Rockies for snowboarding and ski activities, a local expert explained. Olympic mountain bikers, musicians, and award-winning chefs about what exactly makes their hometowns so special and fun.
                                </p>
                                <p className="started_page py-1">
                                    In fact, not being able to rely on spoken word made them better storytellers. They fully understood and used the power of showing without words. They fully understood and used the power of showing without words. They fully understood and used the power of showing without words.


                                </p>
                            </div>


                        </div>
                        <div className="col-3">
                            <img src={mabbook} alt="" srcset="" width={350} height={350} />

                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <h2 className=" our_team_head my-4 page_second" >Capital of Texas</h2>

                        <div className="col-10">
                            <p className="py-1 started_page">
                                Visual storytelling is simply the way most brands will decide to go in 2016 & beyond, as they try to tell their story to their customers the oldest and most important unwritten rule in film industry says that you shouldn’t rely much on words to tell your story. In fact, you should rely on them as less as possible. It’s no coincidence that Buster Keaton and Charlot’s movies remain among the biggest classic movies of all time. In fact, not being able to rely on spoken word made them better storytellers. They fully understood and used the power of showing without words.
                            </p>
                            <p className="py-1 started_page">While Denver sits at the base of the Rocky Mountains, it’s not considered a mountain town since it takes at least an hour to get to the Rockies for snowboarding and ski activities, a local expert explained sits at the base of the Rocky Mountains, it’s not considered a mountain town since it takes at least an hour to get to the Rockies for snowboarding and ski activities, a local expert explained.

                            </p>
                            <img src={rocket} alt="" width={950} height={500} className="started_image my-4" />
                            <p className="py-3 started_page">
                                While Denver sits at the base of the Rocky Mountains, it’s not considered a mountain town since it takes at least an hour to get to the Rockies for snowboarding and ski activities, a local expert explained. Olympic mountain bikers, musicians, and award-winning chefs about what exactly makes their hometowns so special and fun.
                                In fact, not being able to rely on spoken word made them better storytellers. They fully understood and used the power of showing without words.
                            </p>
                            <p className="py-1 started_page">Probably the oldest and most important unwritten rule in film industry says that you shouldn’t rely much on words to tell your story. In fact, you should rely on them as less as possible is simply the way most brands will decide to go in 2016 & beyond, as they try to tell their story to their customers.

                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default News;