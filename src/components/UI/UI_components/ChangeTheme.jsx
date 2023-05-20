import { useColorScheme, Button, IconButton, Tooltip } from '@mui/joy';
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
      aria-label='Change theme color'
      variant='contained'
      size='sm'
      onClick={handleThemeChange}>
      {mode === 'light' ? (
        <Tooltip
          color='primary'
          title='Change to dark mode theme'
          arrow
          placement='bottom'>
          <DarkModeIcon aria-label='Change to dark mode' />
        </Tooltip>
      ) : (
        <Tooltip color='primary' title='Change to light mode theme' arrow>
          <LightModeIcon aria-label='Change to light mode' />
        </Tooltip>
      )}
    </IconButton>
  );
}
