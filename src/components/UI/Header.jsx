import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/profile'}>Profile</Link>
          </li>
          <li>
            <Link to={'/venue'}>Venue</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
