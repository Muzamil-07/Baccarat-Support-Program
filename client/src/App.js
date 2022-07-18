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
import Dashboard from './components/Dashboard';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='/' element={<Signup />} />
          <Route path='admin' element={<Admin />} />
          <Route path='dashboard' element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
