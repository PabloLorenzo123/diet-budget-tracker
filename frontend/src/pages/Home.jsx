import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import '../styles/home.css';

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

    const navigate = useNavigate();

    return(
        <div id="home-page">
            
            <nav className="main-nav">
                <div className='content'>
                    <div className="main-nav-left">
                        <button className='bg-transparent m-0 p-0 border-0' onClick={() => navigate('/')}>
                            <h1 className='fw-bold'>
                                Dietbudget
                            </h1>
                        </button>
                    </div>
                    <div className="main-nav-right">
                        <nav>
                            <ul>
                                <button className='bg-transparent m-0 p-0 border-0' onClick={() => navigate('/login')}>
                                    <li>
                                        Log In
                                    </li>
                                </button>
                                <button className="nav-button" onClick={() => navigate('/signup')}>
                                    Sign Up
                                </button>
                            </ul>
                        </nav>
                    </div>
                </div>
            </nav>

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
                                <button id="signup-btn">
                                    Sign Up
                                </button>

                            </div>
                        </div>
                        
                    </div>
                    <div className='col d-flex justify-content-center align-items-center'>
                        
                        <div id="carouselex" className="carousel slide w-100" data-bs-ride="carousel" >
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ30eAgdT4359eOKtuCgTuID48H70I6kB6tohpPhnbKgJl9DxwLDJpQOeLkP-gHq4ZvMuG9eVl0eWdHB-2RhUc4XzNKOGYTZUN04oGKdbF93w" className="d-block w-100" alt="..."/>
                                </div>
                                <div className="carousel-item">
                                    <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ9HxAskPNCvxyie3KrNlbpbKkVdu1gQA1FPN_8qjAFeicg97gV-Ef08DpzaSvJ3vGYRU3mdu8lPJ5Z0u-UN3kofoD69GcNTgd_ggA-uC1mqg" className="d-block w-100" alt="..."/>
                                </div>
                                <div className="carousel-item">
                                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSEhIVFRUWFxUVFRcVFRUXFRUVFRYWFxUXFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGi0mHyUtKy0tNS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLSstLSstLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAACAAEDBAUGB//EAD8QAAEDAgMFBgMFBwIHAAAAAAEAAhEDIQQSMQVBUWFxBhMigZGhMrHBI0JS0fAUYoKSsuHxB3IVNENTdMLS/8QAGgEAAgMBAQAAAAAAAAAAAAAAAgMAAQQFBv/EACcRAAICAQQCAQQDAQAAAAAAAAABAhEDBBIhMRNBUQUicbEzYaEy/9oADAMBAAIRAxEAPwDj4TwnATowRgE8JwnChBoRQkAiAUIBCeERCShAQEQShEAoQSMBJoRAIkUKEQCcBEiKBypy1JxhU6m1GCzfEeWnMzwU4IW8qeFnsx+fQGBEm1ibXJ3KZ1FlSMmJqNdA8JaIBm/iAAOh5XCHcgtrLeVIhRtq02eB1Yl9wS5rGNkHdlndHur7qDTlyOBLgTlNiLkR1VqSJtZShIqUtQkIgSOE8IsqUKUQCE8J4ShQg0ISFIQhIVUQBJEkqIUgkU4CeEBYwRQszau1xQcGlhdImxA3kJbS202kWtylziAYmAAdJKll0agCIBN1VLZ+1KdazXXk+E2cRxA3qyi6nAWftfa7MPAIzOIkNBi3Encp6WGd3neGo6C2MlsolQstAIw1LKiaFdEEAiAThiMNRJAsENQYmuGNLj5czwU4C5ntPiBna0G4F+pUlwiLkgrY01anjIDQCQN1t3NQOxVhlIBFieQ0jgPz5Kg5p9FLSZN9Eqwy43EQIEX3n59VDUxbgACeUbrSoyC6zQT0CsYbYtaoYyO6kFC5JBRi30QtxM2J3f4VvDbQcwxmkaRaSI4qxjuyVem3OBm4gajyWLQBBUjJS6LnCUO0dnhMQ4tBIBnWLngDz381eC5LAYwhwYTv8OtiQeG7kNV0mzcTnzCQYjSbAiw9vKYToP0Kl8loNSyo0xCdQAGVLIjhOhosjyoSFLCYhRoqyGElLlTqUQzEnIwE+VJDOX7S4Z1StTawSS308RueAVbtDgXNrZ4JY7LDtwIAbB4ae63Nsba/Z3Bvd5pEzmjeRwKfam3G0iGBuZxAJEwGg6SVVIs1XCea5DavZ99M56JLmyIA+Npm3W+9dlMarO2btmnWs0w6YDXWcRuI49FbSIjn+1GCqAtqOBPga1xG5wF55c111Ftm9B9Fn7a2y3DwIzPImJiBxJVujhT3gq533bGSfAJg6KJckLYCMJQjhGkCMAiDUTQjARpAtgQuG24098+1w7/C7whcr2ewYr12573c88yD/hLzParDxJylSKWH2RXfBFJxzaWXT7G7El3irmB+EfUrtMPTCuMELmS1Enwjrw0kI8vkoYTYVGmAGsA8lYOFaNBCtByFxSW77NC46Kb6dl5t2q2aKVYlohrr9DvXqLwuO7dUvs2ujQwfNNwSqYnUx343/R5+98GV0fZzFtJdcCYgcSDE3M71zVUXU+zXtDrkibT15Lop0zkVweg5UxaibpZPC1iLAypoUoCUKUSyIhMpCElVEI4SRp1KLsy8qIhEGqxg8G+q7JTbmdrqBAGpJJAA5lIDOO7T4N9WvTbTaTLLncPEbk7gq3aPZr21u8DSWOyeIDQgAEHhpPmvUqPZWs5riDRLpaABiKJ1mZh0Tbj8lU2hsLEUBNai9rfxWcz+dpLfdDSYVmURPP8AWi4/a3ZtzDnoS4SPD99sm0cR7j3XbBqLKjcbKujh+1GzassqQXeBrXkXhzReeR4rsaLRDeg38grIanyK1GimwEQCINRtaiopsZrUQCIBOAjQDBhYuwqYp41zTYEPid4JDre/ot7Ks7a+CJLKrLPpmerd4/XNKzY90GhmHIozTOuw7gVcC83FFzbnEPz65WBxMcTGgW12a246ocuYvAsSdRprGuoXIlipWjtwzJumjrHua0EuIAHErDxnazDNsHFx4NE++iubVwveDKDreDvXPVsBUYKhoMGZpaGtLWl1ST4vE4gNgcj7XrGk+y8jlHo0sF2hp1dMwPMH6KbaVBtWm5jhIIPruWfs7C4s5TVyNkSYABB4WJGkLXNHKNZVSST4Dg3KNSPIa9OCRvBj6LQo9nqxp97EQMwbElwF7EaGBIG+FrY7YrxiyAwlrjmbERfUEkGLyu1oACm2W5MgFpmAL6+S05M7SW0xYdKpOW/0ZGGILGkaFoPqFJCNrABAEAWA4DcnyrsJcHGb5IoTwjIShXRLIyExClIQlqpoiZHCSPKkpRdmcFawGJNJ4eGtcLhzXjMx7Tq1w4H2sVWaFIAs406bEYfBCgKhFcUqzw5raZpl1N7Gua6m41PiaJJB4OG8FV8Y3Kz9nw9DFND7u70kl4a4WbSYA2MwHiud1t+P3zsuSfDMgcCJ09Sr1HbNdrAwPGQNcwNcym4ZHHMWkOaZE3uq2kspjCP/AO2/f913HKd3G3WyI4R4DjkcA0w7wnwmQIdaxlzR/EOIV1u3MQBl750Rl3TGfPqRM5rzqnrbZrvDmueCHPNQjJT+M6kENls74hFTJaKx2bVDiw0qmcCS3I7NBEgxExY+iF2FeGCoWODCSA6DlJGoDtCVfobdxDTLakXBHgpwCA4DKMsNs5wtFiQqz8W8syZvDrAAE6xJAkxJF91tESTKbRVDUQanDUQCKgbGATgIwE+VEkC2CAiDUQCIBXQLY+F2a0nPGrchFoI3gjerNLZzKQDWNDb7gB8kezqmrf1BR4zFhhBIJEwY571wMtqbj/Z6XDtcFP8AomriCCia1ruqo4zaDiB3bC6LndbqVZwwLxmAIvabJdNDrT4LYphUq6u1XWVB11QSRCxku/tNt4TY+sxkUZ8TpdG/KDc9Lwq20i6IaYPEcr/RcR2efVfi8znOc6XZnOMnKJAHTSy06bEpTTZi1mdwg4r2dtlSIUkJi1d483ZFlShSFqYhWWmAWpiEUJFUXZHCSOE6nBDLaEUJNCIBZTQx2hEkEQCMoQCIBIBEFZQgEQCQRQrKGARAJBGAropsYBGAnARAIkgGwcqUKSEoRJANjUbOBV6oA7VUnCyOnTY+HH4hbl6Lja7Htybvk7v07Luxbfgt0a9NosfTVG/HD7rXOPANM+9lGyi86QB0urDG5d11js6bjH0ROq5gDe+4iCOqiJsjr1ZKxdsbWZSbdwncrjByfAt5FBcgbUxracuJ0B8zuATbCoM7llVlMM7wEkxq4Eh3i33BXF4vGPrPkzwa0X1+ZK9O7G4Du8KcNUs6o41L6U3QA0D0v1K62kxuNujha7OsnFlSE8KSrTLSWuEEGCOYQLoUcywCEMKQpipRNxEkQjKZSgrI4SRykpRdmWCiCEBEAshqDaihM0I0ZQgiTIgESRVjhFCYBEAroFscBGAmCJqugGxwjASCIIgGxAJKWjh3P0HuAPUqduzX8h/EPorBbKZVbE1BSBqyA1ol82EDfPFbP/DgPiePIT7lcL/qXjWta3D05vD6hJ1H3G25gnyCVnjF43uQ3TznHInFnUUu0dGPjAUWI7TUosZ6LzfZePHdZSSHN0jeN3ooqldzjDiem7+64606s7ktW0jptq9qSZDPbTzK52pUc92ZxLju/IBRAQux7H7BMjEVRzptP9R+nqtmHDbpHPz6h1ci/wBlOz3dAVqrftD8I/AP/r5LqGkgykVJhxPiIsNOZ5LqxioRpHIlJzlbLeO2c6s0PY3xgeIb3Dceuv6C597SLEQRqDqDzXa7OdlFzff1Um1djMxAzDw1NzrQeThv6pHk2un0aHj3K12cGmhXtobMq0T42kDc4XaehVNOVPoQ7XDAKEhSFAoWmAkiSUCsygjahARtWRG0IIgEgE8I0UxwjCEIgiQLCARQmCMIqAY4CIJgjAVgNiClpNGp0HvyQgKRtyBwuep0RwhbE5Mm1cFuk+LnU6fujgFMXFQMElTW8kxiojFvFea/6kU2ms1w+LKA7XRpMTz8RG/Rd7tXaDaLHPcYGg4k7gOa8n2rizWqFxPicYjgJssmqkttG3Sxe6yns9nxcbfVWX0+KsV6GQ200VvYWyziaoZfu2wahHDc0cysME5cI25Hsbs0+xnZ41j31YfZtPgB/wCoRvI/CPf5984QnpsDGhrQABYAaADT5KGu8ASTA5rq4sagqOTlyObsMOkwFpUGXAGjb+Z09vmFjUMTJGRjncJBa0+Zv6Bb+GoFrb6m7julFNg41ZbpvhW6WJA1MLHqYkCzfEeJ0Cq1azuKV47H+Sjoam16QEElw3iJB9VzWPo0XGaUsP4XfD5EXH60UL3qPvOvoiji29ATzbuGVqlMgwVGQrbjmEb935KqUdC7I8qdOkpRe4ygEYTBEFkR0RwiCYIgiSBY8IgmRhHQDHCIJmo1YDY7QjATBEFdC2wmhWaYuTxPyt9FWw5424Kwx3h6/VaEqRkb3SJKcalC+rJ4IEldF2eedusU6pWLMxyssADaSASeZvHksrYOEl7RGpnyF/oFp9qaE4l8cifSPoq+z8SKOZ28NgdXH+y4ue90jt6WqjfRNtduaoyjTEu/9nRryAAPmu87P7Lbh6QaNdXHeXHUlYvYrY5g4mqPG+7J1DTvPM6+i6t5W3S4dkbfZi1mfyTddClQ4r4SRr+oVF21GNrGiScxGawkTbw/7iL8IV2nU0J13DcOvErWmn0YpcLku4CGAEjM72bx6qapiHu3+SqMKkE8lTXNkT4pBRCF70u7hAVC+QHMHBRuaByRuQOUZaQD+qifqiqPQhCi58IGEkUJIqF2ZIThCiasZ1QgjCEIgEaQDYQRBMEQCIBsIBGELQpAFAGxBIk7kQClogJkI2JnOiKCxtxI1/yFOD4WjkE9Z8AympjRPfRlXYUIi6AkAoNpVMtNxnQIWw0jzfbtecQ+qOOTyGvurHZ3Zf7TXgj7NkOqHj+FnnqeXVZlV53CXONhvLnHQea9K7PbMGGoNZ94+KoeL3a+Q0HIBc3FDyTt9HUyz8cKXZoV8Qym2XODWjiQBbhxXG4vtdUNT7MAUwbAjxPG+Tunl/ZZvavHGpiXtdMMORl7WifMm/pwWQDlF1eXPK6iDi06q5cl+htInE966zi/MeGUmIHIC3ku+wLiTJ4ei8wfUnd5yJC9D2Ri+8pZgLugcetwm6OfaEa2FbZGvTfmvoN3NWWvG4KvTNohSh0foLa0Ykwi48PdASeXqhdWG9wHmonYho+8PVUHZKUBdCgdiM1mz1KhNOeJQMamSVX8EYUIpwpiighWWXQkk10kVCrMuEQTJwsSR2GEAiCYImokAxwEYQhEEQtsJqlagCMKUA2GGyjqNLfF6o6YBQ4gwE+C2meX3lTGVwW2/Uq9h1j1qBM6gctVLsHHl7n03CC0Ajm3T1mfZJWrxTlsix70GfHDyTRsrn+2GIy0SONvVb8rh+32Mu2nP7x5Dd9fRXmlUGwcMd00ip2G2d3tc13jw0vh4Zzp6C/mF2O32vdQeKZcHkDLlJBJBBgEcdPNB2cwXcYdjNHEZnf7nXjy08lYouz1THw07dXkX9AY8yhxY6x18hZcu7Ja9HE0+zGLfd7A2bkve2fOCSpz2Mrb6lMebnfRd1W0PQ/JVs0mZ3IY6WHsuWqmlwchS7GEa1h5M+srqNibKbQpinJMSd2pJJ0U1O56K0yyfHFDG/t7ESy5Mi+7ok7scEL6TY0HomBJ3pGeKMHj4IKlBn4Qou6aPuj2VlxUL1Gy0kVX1QNxQOxJ0DVZIQVICBsLaiGk4lwlWyq2GaSZ4KwmQXFmfM/uoSZOkjFGYEQQhGFhR3GOEQQowrAbHCMIAjCIUyQKTJogpi90TmO+65w6mfZNhH2ZssvQ2Klha4dD9E9TEMjO8w1ok/3QMbUPhcA6SBY6zpbiub7X181ZmEpSe7Ia7cXVXH4ejZ9SeCya3I9qxr3+jZoYJS8j9fsv1u0Ae/LQpPcet3dGgEqWhha7K4rOoOYwsLXTlkGWm4BndwWpsDZzcM0CxeQM7uJ3gcGrYqYq2t0vDoowal7H59fLInF9GM3GjeVwNJ37VjQT8Lnz/A24Ho33XeYygHEzvm4ssPCdnBRf3jHnQiHbpjQjotOXHKTXwYsWWEFL5rg38VicrC7WBYcSbNHmSEWz6WRgBudXHi43J9SsR9Q5g125wcecae8ei06eNG9N9ii+SqGFvEzEQY6KQYiTZWaDHNFojmD81g12q8cdke3/AIdT6ZovLLfNcL/WVamLa1wGR38jj7wpgDUcDGRo/mPkNB1Ugc4mcgI1sfzQVsQCQ1rHB2rpEADrvWHRSTyq02/ydb6hBx07UWkvx+idzUyEOKRK9AeTBJUbk73x1UT+Z9ENh0NVqAKq503OiaqZMBCPE4NGiB8sPiMbL9OnAhEUklrqjl77dihJKUlVE3GYiCEImrAd9hBG1AETSrSAYYRBCEQRoVJhOHzVg1ABdQBSsZfMddwTY9GXJ2BjAAwvP3Rmv+7f6Lk+xlI1cUaj7lodUJO97jEn+ZxW/wBpq2XDVDxAaP4iAfaVn9gKPhqv4lrB5Ak/1BZcqTzRNmFtYWdYEiLISU+5aUZmRkITRlTM+ScNuisDaU6uDHBVTs0TqR0WuQo3D5qcMp2jGdTdSJI8TTaJh26w43AV1mMayA9lTTSHEfzCQowz7QF9zJy8hoPqrrzKx5fp+Octzvk6On+rZcUdqSdFWmKmfOH5AdGEBwA5xofOFYFIyXOcXE+Q6AKJ1SNQn77gn49Njx8xXJny67NmtSfHdEpeonVFE56jykprM6sN1YdTwVetXJtojqODRAuVXmLnVLkOivY73QIGp1UmCbJ6fWyg5q7gm+GePyFkWJXITqp7cbJyUsyYhNC10cmMmPKZMkqoPczPCIFCEQK5x6VhBECgCIIkAwwpAhaiCsWw2G8KR9QAST+ar1W2tqFDTbmMkpiZnlFXZk9r8UTSa3QOdMf7QfzC1uyFHLhW/vFzj6wPZoUuJpU3jK9jXdRp0OoVjBNbTY1jbNEgb986nqk+N+TcOWRPHtouOCFrkJqeIg2IiQbG+lkzn3TlyJfAYdB6oyVE641QsrbiiBbolDkLnIHFM56tIBsq4o/aeQn1Kss0UL/i6ojUhELXbJDzVepZA+sShB4oWMSDaOKaviYs1Q1Kw0CryglIfCPyPm4pwCULWyp6QhLSsOTojPAhaVKMojSAqBEkA8QPdaMbgtGFdnO10uEgCUgncEIC0nOV2FZMlBSVBmcESSS5iPVMIIgkkiQpkjUaSSgthMVY/EUkkwSx96sM+FJJURdFnbX/ADVL/wAal/XUQO/JJJL038aHar+Rj00DtUklpRkkG9A7RMkrAYDd3RNVSSRAohbr+uCirb0kktj4+iFqFJJJNK6JqalCdJGhUuyOn8Teo+a0SkktGHo52t/6X4BciCSSaYodhpJJKjQf/9k=" className="d-block w-100" alt="..."/>
                                </div>
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