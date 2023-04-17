import { CssBaseline } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
import { theme } from './theme';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/UI/Layout';
import { Home } from './pages/Home';
import { Venue } from './pages/Venue';
import { Profile } from './pages/Profile';

function App() {
  return (
    <CssVarsProvider defaultMode='system' theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/venue' element={<Venue />} />
        </Route>
      </Routes>
    </CssVarsProvider>
  );
}

export default App;
