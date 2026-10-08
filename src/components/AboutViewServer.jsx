import { useContext } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { doI18n } from "pankosmia-lib/i18n";
import {
  i18nContext,
  netContext,
  debugContext,
  productContext,
} from "pankosmia-rcl";
import { useEffect, useState } from "react";
import { getJson } from "pankosmia-lib/http";

export default function AboutViewServer() {
  const { i18nRef } = useContext(i18nContext);
  const { enabledRef } = useContext(netContext);
  const [clientInterfaces, setClientInterfaces] = useState({});
  const { productRef } = useContext(productContext);
  console.log("🚀 ~ AboutViewServer ~ productRef:", productRef);

  function interpolate(text, replacements) {
    return text.split(/(\{[^}]+\})/).map((part) => {
      if (part === "{1}") return replacements[1];
      if (part === "{2}") return replacements[2];
      return part;
    });
  }
  useEffect(() => {
    getJson("/api/client-interfaces")
      .then((res) => res.json)
      .then((data) => setClientInterfaces(data))
      .catch((err) => console.error("Error :", err));
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography>
          {productRef.current && (
            <Stack spacing={1}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {doI18n("pages:core-settings:about", i18nRef.current)}
              </Typography>
              <Typography fullWidth size="small">
                {doI18n("pages:core-settings:version", i18nRef.current)}{" "}
                {productRef.current.product_version}
              </Typography>
              <Typography fullWidth size="small">
                {doI18n("pages:core-settings:built", i18nRef.current)}{" "}
                {productRef.current.product_date_time}
              </Typography>
            </Stack>
          )}
        </Typography>
      </Grid>
      {Object.keys(clientInterfaces).includes(
        "core-contenthandler_version_manager",
      ) && (
        <Grid size={12}>
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
        </Grid>
      )}
    </Grid>
  );
}
