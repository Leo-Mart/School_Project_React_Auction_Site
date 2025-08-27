import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from '../pages/SearchPage.jsx';
import AuctionPage from '../pages/AuctionPage.jsx';
import Register from '../pages/Register.jsx';
import Home from '../pages/Home.jsx';
import UserPage from '../pages/UserPage.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Modal from './Modal.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import EditForm from './EditForm.jsx';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchPage/:categoryName" element={<SearchPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/userPage"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userPage/edit/:auctionId"
            element={
              <ProtectedRoute>
                <EditForm />
              </ProtectedRoute>
            }
          />

          <Route path="/auction/:auctionId" element={<AuctionPage />} />
        </Routes>
        <Footer />
        <Modal />
      </BrowserRouter>
    </>
  );
}
