import { MainThemeInput } from '../../../styles/GlobalStyles';

export default function Search() {
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
