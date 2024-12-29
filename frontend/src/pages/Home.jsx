import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import '../styles/index.css';
import '../styles/home.css';

import c1 from '../assets/carousel/1.jpeg';
import c2 from '../assets/carousel/2.jpeg';
import c3 from '../assets/carousel/3.jpg';
import c4 from '../assets/carousel/4.jpg';



import UnproctectedNav from './components/UnprotectedNav';

const Home = () => {

    useEffect(() => {
        // Inicializa el carrusel manualmente
        const initializeCarousel = () => {
            const carousel = document.querySelector('#carouselex');
                if (carousel) {
                    // Attach carousel object to document reference.
                    new window.bootstrap.Carousel(carousel, {
                        interval: 2000,
                        ride: "carousel",
                    });
                }
        }
        initializeCarousel();
    }, []);

    const carouselImgs = [c1, c2, c3, c4]

    const navigate = useNavigate();

    return(
        <div id="home-page">
            
            <UnproctectedNav />


            <div id="hero">
                <div className='container row h-100'>
                    <div className='col d-flex align-items-center'>
                        <div className='p-5'> 
                            <div className='mb-4'>
                                <h1 className='fw-bold mb-4'>
                                    Budget-friendly nutrition at your fingertips.
                                </h1>
                                <p className='h5'>
                                    Effortlessly plan your diet to meet your macro and micronutrient goals,
                                     all while staying within your budget. Achieve optimal health and nourishment
                                      without breaking the bank.
                                </p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button id="signup-btn" className='shadow-sm' onClick={() => navigate('/signup')}>
                                    Sign Up
                                </button>

                            </div>
                        </div>
                        
                    </div>
                    <div className='col d-flex justify-content-center align-items-center'>
                        
                        <div id="carouselex" className="carousel slide w-100" data-bs-ride="carousel" >
                            <div className="carousel-inner">
                                {carouselImgs.map((i, idx) => {
                                    return (
                                        <div key={idx} className={`carousel-item ${idx == 0? 'active': ''}`}>
                                            <img src={i} className="d-block w-100 shadow-sm" alt="carousel img"/>
                                        </div>
                                    )
                                })}
                            </div>
                            {/* 
                             <button className="carousel-control-prev" type="button" data-bs-target="#carouselex" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselex" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button> */}
                           
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home