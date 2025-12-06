import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingCallButton from './components/FloatingCallButton';
import PrivateRoute from './components/PrivateRoute';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <OrderProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <FloatingCallButton />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <PrivateRoute adminOnly={true}>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </OrderProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
