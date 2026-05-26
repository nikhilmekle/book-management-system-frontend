import { Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '@/components/Navbar';
import HomePage from '@/pages/HomePage';
import AddBookPage from '@/pages/AddBookPage';
import EditBookPage from '@/pages/EditBookPage';

function NotFound() {
  return (
    <div className="page-bg flex items-center justify-center px-4 min-h-[calc(100vh-64px)]">
      <div className="max-w-md text-center animate-in fade-in duration-500">
        <p className="font-serif text-8xl font-black leading-none mb-2 gradient-text">404</p>
        <h2 className="font-serif text-3xl font-bold text-text mb-3">Page not found</h2>
        <p className="text-muted mb-8">This page seems to have wandered off the shelf.</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center h-10 px-6 bg-amber text-white font-semibold rounded-lg hover:bg-amber-dark transition-colors"
        >
          Back to Library
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddBookPage />} />
          <Route path="/edit/:id" element={<EditBookPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
