import { useContext } from "react";
import { Typography, Stack } from "@mui/material";
import { i18nContext, AssetDownloadButton } from "pankosmia-rcl";
import { doI18n } from "pankosmia-lib/i18n";
import { findFieldsInClientConfig } from "../utils/findFieldsInClientConfig";
export default function SystemPluginPage({ clientConfig }) {
  const { i18nRef } = useContext(i18nContext);

  return (
    <Stack spacing={2}>
      <Typography variant="body1">
        {doI18n("pages:core-settings:system_plugins_intro", i18nRef.current)}
      </Typography>

      {/* FFmpeg for audio */}
      {clientConfig && findFieldsInClientConfig(clientConfig, "ffmpeg") && (
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
      {clientConfig && findFieldsInClientConfig(clientConfig, "firefox") && (
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
