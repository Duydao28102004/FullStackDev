import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDetail from './pages/UserDetail'
import Group from './pages/Group';
import Search from './pages/Search';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
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
              path="/group/:groupid"
              element={<Group/>}
            />
            <Route
            path="/search"
            element={<Search/>}
          />
          <Route 
            path="/admin"
            element={<Admin />}
          />
        </Routes>
      </div>     
      </BrowserRouter>
    </div>
  );
}

export default App;