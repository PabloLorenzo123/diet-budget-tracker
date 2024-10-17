import NavBar from '../components/NavBar';
import Day from '../components/Diary/Day';
import '../styles/index.css';

const Index = () => {

    return(
        <>
            <NavBar />
            <div>
                <main id="app">
                    <Day />
                </main>
            </div>
        </>
    )
}

export default Index