import Home from '../pages/Home';
import Index from '../pages/Index';
import ProtectedRoute from '../components/ProtectedRoute';

const Root = () => {
    const isAuthorized = ProtectedRoute();

    if (isAuthorized == null){
        return <h1>Loading...</h1>
    }
    return isAuthorized ? <Index />: <Home />
}

export default Root