import { useContext } from "react";
import { Grid2, Stack, Typography } from "@mui/material";
import { doI18n } from "pankosmia-lib/i18n";
import { i18nContext, netContext } from "pankosmia-rcl";

export default function AboutViewServer({ dataServer }) {
  const { i18nRef } = useContext(i18nContext);
  const { enabledRef } = useContext(netContext);

  function interpolate(text, replacements) {
    return text.split(/(\{[^}]+\})/).map((part) => {
      if (part === "{1}") return replacements[1];
      if (part === "{2}") return replacements[2];
      return part;
    });
  }

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography>
          {dataServer ? (
            <Stack spacing={1}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {doI18n("pages:core-settings:about", i18nRef.current)}
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
          <Typography fullWidth size="small">
            {interpolate(
              doI18n("pages:core-settings:text_git", i18nRef.current),
              {
                1: (
                  <a
                    key="1"
                    href={
                      enabledRef.current
                        ? "https://git-scm.com/community/logos"
                        : undefined
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {doI18n("pages:core-settings:git_logo", i18nRef.current)}
                  </a>
                ),
                2: (
                  <a
                    key="2"
                    href={
                      enabledRef.current
                        ? "https://creativecommons.org/licenses/by/3.0/"
                        : undefined
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {doI18n(
                      "pages:core-settings:license_creative_commons",
                      i18nRef.current,
                    )}
                  </a>
                ),
              },
            )}
          </Typography>
        </Stack>
      </Grid2>
    </Grid2>
  );
}
