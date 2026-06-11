import { useContext } from "react";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { doI18n } from "pithekos-lib";
import { i18nContext } from "pankosmia-rcl";

export default function AboutViewServer({ dataServer }) {
  const { i18nRef } = useContext(i18nContext);
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography>
          {dataServer ? (
            <Stack spacing={1}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {doI18n("pages:core-settings:about_server", i18nRef.current)}
              </Typography>
              <Typography fullWidth size="small">
                {doI18n("pages:core-settings:version", i18nRef.current)}{" "}
                {dataServer.product_version}
              </Typography>
              <Typography fullWidth size="small">
                {doI18n("pages:core-settings:built", i18nRef.current)}{" "}
                {dataServer.product_date_time}
              </Typography>
            </Stack>
          ) : null}
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {doI18n("pages:core-settings:credit", i18nRef.current)}
          </Typography>
          <Typography
            fullWidth
            size="small"
            dangerouslySetInnerHTML={{
              __html: doI18n("pages:core-settings:text_git", i18nRef.current)
                .replace(
                  "{Git Logo}",
                  `${doI18n("pages:core-settings:git_logo", i18nRef.current)}`,
                )
                .replace(
                  "{Creative Commons Attribution 3.0 Unported License}",
                  `${doI18n("pages:core-settings:license_creative_commons", i18nRef.current)}`,
                ),
            }}
          />
        </Stack>
      </Grid2>
    </Grid2>
  );
}
