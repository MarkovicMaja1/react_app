import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductsView from './pages/Home/ProductsView';
import CreateProduct from './pages/Create/CreateProduct';
import EditProduct from './pages/Edit/EditProduct';
import Navbar from './pages/Navbar/Navbar';
import './index.css'
import About from './pages/About/About';
import Chart from './pages/Charts/Chart';

function App(): JSX.Element {
  return (
    <Router>
      <div className="container">
        <div className="navbar-container"> 
          <Navbar />
        </div>
        <div className="content-container"> 
          <Routes>
            <Route path="/" element={<Navigate to="/productview" replace />} />
            <Route path="/productview" element={<ProductsView />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/about" element={<About />} />
            <Route path="/charts" element={<Chart/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
