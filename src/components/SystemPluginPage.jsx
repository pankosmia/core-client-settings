import { useState, useEffect, useContext } from "react";
import { Button, LinearProgress, Typography, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { i18nContext, netContext } from "pankosmia-rcl";
import { doI18n } from "pankosmia-lib/i18n";
import AssetDownloadButton from "./AssetDownloadButton";

export default function SystemPluginPage() {
  const { i18nRef } = useContext(i18nContext);

  return (
    <Stack spacing={2}>
      <Typography variant="body1">
        Some functionalities rely on external utilities you need to install to
        use.
      </Typography>

      {/* FFmpeg for audio */}
      <Stack spacing={1}>
        <Typography sx={{ fontWeight: "bold" }}>FFmpeg for audio</Typography>
        <Typography variant="body2">
          FFmpeg is a multimedia framework. It is used for the audio editor, to
          generate final audio files or to export Open Bible Stories videos.
        </Typography>

        <AssetDownloadButton asset="ffmpeg" />
      </Stack>

      {/* Firefox for pdf */}
      <Stack spacing={1}>
        <Typography sx={{ fontWeight: "bold" }}>
          Render engine for PDF
        </Typography>
        <Typography variant="body2">
          This render engine is used to generate large PDFs with complex fonts.
        </Typography>

        <AssetDownloadButton asset="firefox" />
      </Stack>
    </Stack>
  );
}
