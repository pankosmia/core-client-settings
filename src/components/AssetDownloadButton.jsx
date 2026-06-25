import { useState, useEffect } from "react";
import { Button, LinearProgress, Typography, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckOutlined";
import ErrorIcon from "@mui/icons-material/ErrorOutlined";
import DownloadIcon from "@mui/icons-material/SaveAltOutlined";

export default function AssetDownloadButton({ asset }) {
  const [installed, setInstalled] = useState(false);
  const [status, setStatus] = useState("checking"); // checking | idle | downloading | complete | error | unavailable
  const [progress, setProgress] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    if (!window.electronAPI) {
      setIsElectron(false);
      return;
    } else {
      setIsElectron(true);
    }

    let cancelled = false;

    switch (asset) {
      case "ffmpeg":
        window.electronAPI.checkFfmpegInstalled().then((installed) => {
          if (!cancelled) {
            setInstalled(installed);
            setStatus(installed ? "complete" : "idle");
          }
        });
        break;
      case "firefox":
        window.electronAPI.checkFirefoxInstalled().then((installed) => {
          if (!cancelled) {
            setInstalled(installed);
            setStatus(installed ? "complete" : "idle");
          }
        });
        break;
      default:
        return;
    }

    return () => {
      cancelled = true;
    };
  }, [setInstalled, asset]);

  useEffect(() => {
    if (!window.electronAPI) {
      return;
    }

    switch (asset) {
      case "ffmpeg":
        const removeProgressFfmpeg =
          window.electronAPI.onFfmpegDownloadProgress((percent) => {
            if (typeof percent === "number" && !Number.isNaN(percent)) {
              setProgress(Math.max(0, Math.min(100, percent)));
            }
          });

        const removeCompleteFfmpeg =
          window.electronAPI.onFfmpegDownloadComplete(
            (success, errorMessage) => {
              setStatus(success ? "complete" : "error");
              setInstalled(!!success);

              if (success) {
                setProgress(100);
                setErrorMessage(null);
              } else {
                setErrorMessage(errorMessage || null);
              }
            },
          );

        return () => {
          removeProgressFfmpeg();
          removeCompleteFfmpeg();
        };
        break;
      case "firefox":
        const removeProgressFirefox = window.electronAPI.onDownloadProgress(
          (percent, downloadedBytes, totalBytes) => {
            console.log(
              "onDownloadProgress",
              percent,
              downloadedBytes,
              totalBytes,
            );
            if (typeof percent === "number" && !Number.isNaN(percent)) {
              setProgress(Math.max(0, Math.min(100, percent)));
            }
          },
        );
        const removeCompleteFirefox = window.electronAPI.onDownloadComplete(
          (success, errorMessage) => {
            setStatus(success ? "complete" : "error");
            setInstalled(!!success);
          },
        );
        return () => {
          removeProgressFirefox();
          removeCompleteFirefox();
        };
        break;
      default:
        console.error("Invalid asset", asset);
        return;
    }
  }, [setInstalled, asset]);

  const handleInstall = () => {
    if (!window.electronAPI || !asset) {
      return;
    }
    setStatus("downloading");
    setProgress(null);
    setErrorMessage(null);

    switch (asset) {
      case "ffmpeg":
        window.electronAPI.downloadFfmpeg();
        break;
      case "firefox":
        window.electronAPI.downloadFirefox();
        break;
      default:
        console.error("Invalid asset", asset);
        return;
    }
  };

  const hasProgress = typeof progress === "number";

  return (
    <>
      <Stack sx={{ maxWidth: 200 }}>
        <Button
          variant="contained"
          startIcon={
            status === "complete" ? (
              <CheckCircleIcon />
            ) : status === "error" ? (
              <ErrorIcon />
            ) : (
              <DownloadIcon />
            )
          }
          onClick={() => handleInstall(asset)}
          disabled={
            status === "checking" ||
            status === "downloading" ||
            status === "complete" ||
            !isElectron
          }
          color={
            status === "complete"
              ? "success"
              : status === "error"
                ? "error"
                : "primary"
          }
          title={!isElectron ? "Unavailable in web browser" : "Download"}
        >
          {status === "checking" && !isElectron && "Unavailable"}
          {status === "checking" && isElectron && "Checking…"}
          {status === "idle" && "Download"}
          {status === "downloading" && "Downloading…"}
          {status === "complete" && "Installed"}
          {status === "error" && "Retry Download"}
        </Button>

        {status === "downloading" && (
          <>
            <LinearProgress
              variant={hasProgress ? "determinate" : "indeterminate"}
              value={hasProgress ? progress : undefined}
            />
            <Typography variant="body2" color="text.secondary">
              {hasProgress
                ? `${Math.round(progress)}% complete`
                : "Downloading…"}
            </Typography>
          </>
        )}

        {status === "error" && (
          <Typography variant="body2" color="error">
            Download failed{errorMessage ? `: ${errorMessage}` : ""}.
          </Typography>
        )}
      </Stack>
    </>
  );
}
