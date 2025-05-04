import { useState, useCallback, useEffect } from "react"
import { Grid2 } from "@mui/material";
import Settings from "./components/Settings";


function App() {
  const [maxWindowHeight, setMaxWindowHeight] = useState(window.innerHeight - 80);
  const handleWindowResize = useCallback(event => {
    setMaxWindowHeight(window.innerHeight - 80);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
        window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
          <Grid2 container sx={{ maxHeight: maxWindowHeight }}>
              <Grid2 item size={12}>
                <Settings />
              </Grid2>
          </Grid2>
  )
}

export default App;
