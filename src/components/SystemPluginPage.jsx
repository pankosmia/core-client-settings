import { useState, useEffect, useContext } from "react";
import { Button, LinearProgress, Typography, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { i18nContext, netContext } from "pankosmia-rcl";
import { doI18n } from "pankosmia-lib/i18n";
import AssetDownloadButton from "./AssetDownloadButton";
import { getJson } from "pankosmia-lib/http";
import { enqueueSnackbar } from "notistack";

function findFields(clientConf, fieldToFind) {
  return Object.entries(clientConf).find(([k, v]) =>
    v.find((v2) => v2.fields.find((e) => e.id === fieldToFind && e.value)),
  );
}

export default function SystemPluginPage() {
  const { i18nRef } = useContext(i18nContext);
  const [clientConfig, setClientConfig] = useState(null);

  useEffect(() => {
    async function getClientConfig() {
      let clientConf = await getJson("/api/client-config");
      if (clientConf.ok) {
        setClientConfig(clientConf.json);
      } else {
        enqueueSnackbar(
          doI18n(`pages:core-client-settings:errorGet`, i18nRef.current) +
            " /api/client-config" +
            `${clientConf.status}): ${clientConf.error}`,
          { variant: "error" },
        );
      }
    }
    getClientConfig();
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="body1">
        {doI18n("pages:core-settings:system_plugins_intro", i18nRef.current)}
      </Typography>

      {/* FFmpeg for audio */}
      {clientConfig && findFields(clientConfig, "ffmpeg") && (
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: "bold" }}>
            {doI18n("pages:core-settings:ffmpeg_title", i18nRef.current)}
          </Typography>
          <Typography variant="body2">
            {doI18n("pages:core-settings:ffmpeg_desc", i18nRef.current)}
          </Typography>

          <AssetDownloadButton asset="ffmpeg" />
        </Stack>
      )}

      {/* Firefox for pdf */}
      {clientConfig && findFields(clientConfig, "firefox") && (
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: "bold" }}>
            {doI18n("pages:core-settings:pdf_engine_title", i18nRef.current)}
          </Typography>
          <Typography variant="body2">
            {doI18n("pages:core-settings:pdf_engine_desc", i18nRef.current)}
          </Typography>

          <AssetDownloadButton asset="firefox" />
        </Stack>
      )}
    </Stack>
  );
}
