import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Detail from './pages/Detail'
import Group from './pages/Group'

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
              path="/detail"
              element={<Detail/>}
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