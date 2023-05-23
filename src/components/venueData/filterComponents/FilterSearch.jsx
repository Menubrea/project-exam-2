import { Typography, Box } from '@mui/joy';
import { MainThemeButton, MainThemeInput } from '../../../styles/GlobalStyles';
import SearchIcon from '@mui/icons-material/Search';

export default function FilterSearch({ search, setSearch, handleSearch }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography level='body3' htmlFor='search-input' component={'label'}>
        Search
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <MainThemeInput
          endDecorator={<SearchIcon />}
          fullWidth
          id='search-input'
          onChange={handleSearch}
          size='sm'
          placeholder={'Search by name'}
        />
        {search.length > 0 && (
          <MainThemeButton
            onClick={() => {
              setSearch('');
              document.getElementById('search-input').value = '';
            }}
            size='sm'
            variant='plain'>
            Clear
          </MainThemeButton>
        )}
      </Box>
    </Box>
  );
}
