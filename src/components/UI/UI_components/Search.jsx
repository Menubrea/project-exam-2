import { MainThemeInput } from '../../../styles/GlobalStyles';

export function Search() {
  return (
    <>
      <MainThemeInput
        size='sm'
        placeholder={'Search'}
        sx={{
          paddingX: 1,
          minWidth: '200px',
          maxWidth: '350px',
        }}
      />
    </>
  );
}
