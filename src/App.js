//import Router from './routes/Router';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';

import { useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PrivateOutlet() {
  const { token } = useSelector(state => state.users);
  return token ? <Users /> : <Navigate to="/" />;
}

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/users" element={<PrivateOutlet />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
