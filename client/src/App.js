import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDetail from './pages/UserDetail'
import Group from './pages/Group'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Navbar/>
        <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/user/:userid"
              element={<UserDetail/>}
            />
            <Route
              path="/group"
              element={<Group/>}
            />
        </Routes>
      </div>     
      </BrowserRouter>
    </div>
  );
}

export default App;