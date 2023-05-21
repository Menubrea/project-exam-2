import { MainThemeButton, MainThemeInput } from '../../../styles/GlobalStyles';
import SearchIcon from '@mui/icons-material/Search';

export default function FilterSearch({ search, setSearch, handleSearch }) {
  return (
    <>
      <MainThemeInput
        endDecorator={<SearchIcon />}
        fullWidth
        id='search-input'
        onChange={handleSearch}
        size='md'
        placeholder={'Search'}
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
    </>
  );
}
