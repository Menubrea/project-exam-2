import { useColorScheme, Button, IconButton, Tooltip } from '@mui/joy';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

/**
 * Change theme component
 * @component
 * @returns {JSX.Element}
 */
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
          <DarkModeIcon color='primary' aria-label='Change to dark mode' />
        </Tooltip>
      ) : (
        <Tooltip color='primary' title='Change to light mode theme' arrow>
          <LightModeIcon
            sx={{ color: 'white' }}
            aria-label='Change to light mode'
          />
        </Tooltip>
      )}
    </IconButton>
  );
}
