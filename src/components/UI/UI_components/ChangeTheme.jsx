import { useColorScheme, Button } from '@mui/joy';

// Component for changing the theme of the app
export function ChangeTheme() {
  const { mode, setMode } = useColorScheme();

  const handleThemeChange = () => {
    return setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      fullWidth
      variant='contained'
      size='sm'
      color='primary'
      onClick={handleThemeChange}>
      {mode === 'light' ? 'Dark' : 'Light'} Theme
    </Button>
  );
}
