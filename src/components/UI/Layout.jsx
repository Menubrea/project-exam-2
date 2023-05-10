import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Search } from './UI_components';

export default function Layout({ venues }) {
  return (
    <>
      <Header venues={venues} />
      <Search venues={venues} />
      <Outlet />
      <Footer />
    </>
  );
}
