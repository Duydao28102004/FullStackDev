import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDetail from './pages/UserDetail'
import Group from './pages/Group';
import Search from './pages/Search';

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
              path="/group"
              element={<Group/>}
            />
            <Route
            path="/search"
            element={<Search/>}
          />
        </Routes>
      </div>     
      </BrowserRouter>
    </div>
  );
}

export default App;