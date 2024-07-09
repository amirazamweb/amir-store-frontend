import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import {Toaster} from 'react-hot-toast';
import BgComponent from './components/BgComponent';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
    <Toaster/>
    <ScrollToTop/>
    <Header/>
    <main className='min-h-[calc(100vh-40px-64px)]'>
    <Outlet/>
    </main>
    <Footer/>
    <BgComponent/>
    </>
  );
}

export default App;
