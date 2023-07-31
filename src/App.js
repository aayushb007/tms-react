import './App.css';
import Navbar from './components/Navbar';
import Tasks from './components/tasks/Tasks';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import {
  BrowserRouter,
  
  Route,
  Routes,
} from "react-router-dom";
function App() {
  // const isAuthenticated = localStorage.getItem('token') ? true : false;

  return (
    <>
    
      
     
      {/* <h1>Task management System</h1> */}
         {/* <Tasks/> */}
      
    
    <BrowserRouter>
          <Navbar />
         
          <Routes>
            
            <Route path="/" element={<Tasks />}  />

            <Route path="/login" element={<Login />}   />

            <Route path="/signup" element={<Signup />}  />

          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
