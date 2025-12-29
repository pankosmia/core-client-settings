import { useContext} from "react";
import { Box, Grid2, Typography } from "@mui/material";
import { i18nContext, doI18n} from "pithekos-lib";


export default function AboutViewServer({dataServer}) {
  const { i18nRef } = useContext(i18nContext);
  console.log('dataserver',dataServer)
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
               <Typography
                fullWidth
                size="small"
              >
                {doI18n("pages:core-settings:built", i18nRef.current)} {dataServer.product_date_time}
              </Typography>
            </Box>
          ) : null}

        </Typography>
      </Grid2>
    </Grid2>
  );
}