
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import User from './components/User';
import Register from './components/Register';
import MainPage from './components/MainPage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/main' element={<MainPage/>}/>
        <Route path='/Register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
