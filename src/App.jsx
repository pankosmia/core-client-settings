import { Grid2, Box } from "@mui/material";
import Settings from "./components/Settings";
import { useContext } from "react";
import { productContext, ScrollableBody } from "pankosmia-rcl";
function App() {
  const { productRef } = useContext(productContext);
  let isAndroid =
    productRef && productRef.current && productRef.current.os === "android";

  return (
    <ScrollableBody isAndroid={isAndroid}>
      <Box
        sx={{
          mb: 2,
          position: "fixed",
          top: "64px",
          bottom: 0,
          right: 0,
          overflow: "auto",
          width: "100%",
        }}
      >
        <Grid2 container sx={{ mx: 2 }}>
          <Grid2 item size={12}>
            <Settings />
          </Grid2>
        </Grid2>
      </Box>
    </ScrollableBody>
  );
}

export default App;
