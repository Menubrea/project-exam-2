import { useColorScheme, Button, IconButton } from '@mui/joy';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

// Component for changing the theme of the app
export default function ChangeTheme() {
  const { mode, setMode } = useColorScheme();

  const handleThemeChange = () => {
    return setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <IconButton
      variant='contained'
      size='sm'
      color='primary'
      onClick={handleThemeChange}>
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
