
import './App.css';
// import Checkout from './components/Checkout/Ckeckout';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

// import Home from './pages/Home';

import Home from './pages/Home';

import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <div className="App">
      
        <NavBar/>
  {/* <Checkout /> */}
  <AllRoutes/>
   <Footer/>
    </div>
  );
}

export default App;
