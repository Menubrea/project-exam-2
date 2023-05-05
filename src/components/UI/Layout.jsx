import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export default function Layout({ venues }) {
  return (
    <>
      <Header venues={venues} />
      <Outlet />
      <Footer />
    </>
  );
}
