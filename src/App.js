import logo from './logo.svg';
import './App.css';
import AllBlogs from './components/AllBlogs';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import UserDashboard from './components/UserDashboard';
import { ToastContainer } from 'react-toastify';
import ForgotPass from './components/ForgotPass';
import ResetPassword from './components/ResetPassword';
import SelectedBlog from './components/Selectedblog';
import Aboutpage from './components/Aboutpage';
import Newnavbar from './components/Newnavbar';
import { MdDashboard } from 'react-icons/md';
import Settings from './components/Settings';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import Signup from './components/Signup';
// import Navbar from './components/Navbar';

function App() {
  const userInfo = JSON.parse(localStorage.getItem('user'));
  return (
    <>
        
    <Router>
        {/* <Navbar/> */}
        <Newnavbar/>
      <Routes>

         <Route path="/allblogs" element={<AllBlogs />} />  Route to show all blogs
         
           
           {/* <Route path="/login" element={<Login />} />  Login route */}
           <Route path="/login" element={ userInfo?(<UserDashboard/>):(<Login/>) } />  {/* Login route */}
         
        <Route path="/dashboard" element={<UserDashboard/>} />  Dashboard route
        <Route path="/forgot-password" element={<ForgotPass/>} />  Dashboard route
        <Route path="/reset-password/:token" element={<ResetPassword/>} />  Dashboard route
        <Route path="/blog/:id" element={<SelectedBlog />} />
        <Route path='/about' element={<Aboutpage/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/signup' element={<Signup/>}/>
  
      </Routes>
      <Footer/>
    </Router>
        
    </>
  );
}

export default App;
