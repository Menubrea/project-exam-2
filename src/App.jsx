import { Box, CssBaseline, Typography } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import { theme } from "./theme";

function App() {
  return (
    <CssVarsProvider defaultMode="system" theme={theme}>
      <CssBaseline />
      <Typography sx={{ fontFamily: "amatic-sc, sans-serif" }} level="h1">
        Hello World
      </Typography>
    </CssVarsProvider>
  );
}

export default App;
