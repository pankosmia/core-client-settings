import { Grid2, Box } from "@mui/material";
import Settings from "./components/Settings";


function App() {

  return (
        <Box sx={{mb: 2, position: 'fixed', top: '64px', bottom: 0, right: 0, overflow: 'scroll', width: '100%' }}>
          <Grid2 container sx={{ mx: 2 }}>
              <Grid2 item size={12}>
                <Settings />
              </Grid2>
          </Grid2>
        </Box>
  )
}

export default App;
