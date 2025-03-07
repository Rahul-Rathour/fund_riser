import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Sidebar from '../components/Layout/Sidebar';
import { useState } from 'react';

// Wrapper component to handle layout and context
const AppLayout = ({ Component, pageProps }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 bg-gray-900 text-white">
          <Component {...pageProps} />
        </main>
      </div>
      <Footer />
    </div>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppLayout Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}

export default MyApp;