import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Sidebar from '../components/Layout/Sidebar';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="ml-64 flex-1 p-4 bg-gray-900 text-white">
            <Component {...pageProps} />
          </main>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default MyApp;