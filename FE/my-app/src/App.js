
import './App.css';
import Checkout from './components/Checkout/Ckeckout';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
        <NavBar/>
  {/* <Checkout /> */}
   <Home/>
   <Footer/>
    </div>
  );
}

export default App;
