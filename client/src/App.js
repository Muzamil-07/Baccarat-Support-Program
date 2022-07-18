import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Admin from './components/Admin/Admin';


function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Admin/>}/>
    <Route path='login' element={<Login/>} />
    <Route path='signup' element={<Signup/>} />
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
