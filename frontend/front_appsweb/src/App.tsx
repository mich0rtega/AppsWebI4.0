import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import UserForm from './modules/user/userForm';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/users">Usuarios</Link></li>
            <li><Link to="/products">Productos</Link></li>
            <li><Link to="/orders">Órdenes</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/users" element={<UserForm />} />
          <Route path="/products" element={<productForm/>} />
          <Route path="/orders" element={<orderForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
