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
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route exact path="admin" element={
            <ProtectedRoute role={[ 'admin' ]}>  <Admin /> </ProtectedRoute>
          } />

          <Route exact path="dashboard" element={
            <ProtectedRoute role={[ 'user' ]}>  <Dashboard /> </ProtectedRoute>
          } />

          <Route path='login' element={<Login />} />
          <Route path='/' element={<Signup />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
