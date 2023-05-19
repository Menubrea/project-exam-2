import { Box, Typography } from '@mui/joy';

export function Footer() {
  return (
    <Box sx={{ paddingY: 1 }} component={'footer'}>
      <Typography level='body1' textAlign={'center'}>
        Menubrea | All Rights Reserved
      </Typography>
    </Box>
  );
}
