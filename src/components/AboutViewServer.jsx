import { useContext, useEffect, useState } from "react";
import { Box, Grid2, Typography } from "@mui/material";
import { i18nContext, doI18n, getJson, debugContext } from "pithekos-lib";


export default function AboutViewServer() {
  const { i18nRef } = useContext(i18nContext);
  const [dataServer, setDataServer] = useState();

  const getServerVersion = async () => {

    const summariesResponse = await getJson(`/version`, debugContext.current);
    if (summariesResponse.ok) {
      const data = summariesResponse.json;
      setDataServer(data);
    } else {
      console.error(`error fetching data`);
    }
  };

  useEffect(
    () => {
      getServerVersion();
    },
    []
  );

  return (
    <Grid2 container spacing={1.5}>
      <Grid2 size={12}>
        <Typography>
          {dataServer ? (
            <Box >
              <Typography
                variant='h6'
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                {dataServer.product_name} {doI18n("pages:core-settings:update", i18nRef.current)}

              </Typography>
              <Typography
                fullWidth
                size="small"
              >
                {doI18n("pages:core-settings:version", i18nRef.current)} {dataServer.product_version}
              </Typography>
            </Box>
          ) : null}

        </Typography>
      </Grid2>
    </Grid2>
  );
}