import React, { useState } from 'react';
import "../../Assets/css/futures.css";
import betmgmLogo from "../../Assets/images/betmgm.png";
import draftkingsLogo from "../../Assets/images/draftking.png";
import fanduelLogo from "../../Assets/images/fanduel.webp";
import caesarsLogo from "../../Assets/images/caesors.png";
import betriversLogo from "../../Assets/images/betrivers.png";
import bet365Logo from "../../Assets/images/bet365.webp";
import unibetLogo from "../../Assets/images/unibet.png";

const Futures = () => {
    return (
        <>

            <section className='backgroung_image'>
                <div className='contanier'>
                    <div className='row'>
                        <h2 className="injury-title">NBA Futures</h2>
                        <div className='col-lg-12 col-md-12 col-sm-12  team_data_all position-relative'>
                            <div className='d-flex futures_checkout col-lg-12 col-md-12 col-sm-12 '>
                                <div className='d-flex col-2'>
                                    <h4 className='future_heading'>Futures</h4>
                                </div>
                                <div className='d-flex gap-5 col-8 image_tab'>
                                    <h4 className='future_heading'>Consensus</h4>
                                    <img src={betmgmLogo} alt="" height={50} width={50} className='mt-2' />
                                    <img src={draftkingsLogo} alt="" height={50} width={50} className='mt-2' />
                                    <img src={fanduelLogo} alt="" height={50} width={50} className='mt-2' />
                                    <img src={caesarsLogo} alt="" height={50} width={50} className='mt-2' />
                                    <img src={betriversLogo} alt="" height={50} width={50} className='mt-2' />
                                    <img src={bet365Logo} alt="" height={50} width={50} className='mt-2' />
                                    <img src={unibetLogo} alt="" height={50} width={50} className='mt-2 image_head' />
                                </div>
                            </div>
                            <div className='image_scorll'>
                                <div className='team_data d-flex'>
                                    <div className='team_box col-2 pt-5'>
                                        Chicago White Sox
                                    </div>
                                    <div className='team_box col-10'>
                                        <div className='d-flex'>
                                            <h6 className='col-2 mt-1'>Yes
                                                +4000</h6>
                                            <div className='d-flex gap-5 text-center justify-center '>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab_yes shadow-lg'>
                                                    <h6>yes <br/>+4000</h6>

                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex mt-1'>
                                            <h6 className='col-2 mt-2'>No
                                                -20000</h6>
                                            <div className='d-flex gap-5 text-center justify-center '>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab_yes shadow-lg'>
                                                    <h6>yes<br/> +4000</h6>

                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='team_data d-flex'>
                                    <div className='team_box col-2 pt-5'>
                                        Colorado Rockies
                                    </div>
                                    <div className='team_box col-10'>
                                        <div className='d-flex'>
                                            <h6 className='col-2 mt-1'>Yes
                                                +4000</h6>
                                            <div className='d-flex gap-5 text-center justify-center '>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab_yes shadow-lg'>
                                                    <h6>yes <br/>+4000</h6>

                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex mt-1'>
                                            <h6 className='col-2 mt-2'>No
                                                -20000</h6>
                                            <div className='d-flex gap-5 text-center justify-center '>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab_yes shadow-lg'>
                                                    <h6>yes <br/>+4000</h6>

                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='team_data d-flex'>
                                    <div className='team_box col-2 pt-5'>
                                        Miami Marlins
                                    </div>
                                    <div className='team_box col-10'>
                                        <div className='d-flex'>
                                            <h6 className='col-2 mt-1'>Yes
                                                +4000</h6>
                                            <div className='d-flex gap-5 text-center justify-center '>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab_yes shadow-lg'>
                                                    <h6>yes<br/> +4000</h6>

                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex mt-1'>
                                            <h6 className='col-2 mt-2'>No
                                                -20000</h6>
                                            <div className='d-flex gap-5 text-center justify-center '>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab_yes shadow-lg'>
                                                    <h6>yes <br/> +4000</h6>

                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='team_data d-flex'>
                                    <div className='team_box col-2 pt-5'>
                                        Los Angeles Dodgers
                                    </div>
                                    <div className='team_box col-10'>
                                        <div className='d-flex'>
                                            <h6 className='col-2 mt-1'>Yes
                                                +4000</h6>
                                            <div className='d-flex gap-5 text-center justify-center '>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab_yes shadow-lg'>
                                                    <h6>yes<br/> +4000</h6>

                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex mt-1'>
                                            <h6 className='col-2 mt-2'>No
                                                -20000</h6>
                                            <div className='d-flex gap-5 text-center justify-center '>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab_yes shadow-lg'>
                                                    <h6>yes <br/>+4000</h6>

                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='team_data d-flex'>
                                    <div className='team_box col-2 pt-5'>
                                        Chicago White Sox
                                    </div>
                                    <div className='team_box col-10'>
                                        <div className='d-flex'>
                                            <h6 className='col-2 mt-1'>Yes
                                                +4000</h6>
                                            <div className='d-flex gap-5 text-center justify-center '>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab_yes shadow-lg'>
                                                    <h6>yes <br/>+4000</h6>

                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex mt-1'>
                                            <h6 className='col-2 mt-2'>No
                                                -20000</h6>
                                            <div className='d-flex gap-5 text-center justify-center '>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab_yes shadow-lg'>
                                                    <h6>yes<br/> +4000</h6>

                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                                <div className='col-1 text-center tean_tab pt-1 shadow-lg'>
                                                    N/A
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}
export default Futures;