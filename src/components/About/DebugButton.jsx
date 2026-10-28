import { Button, Switch, Typography } from "@mui/material";
import { doI18n } from "pankosmia-lib/i18n";
import {
  debugContext,
  i18nContext,
  PanBasicDialog,
  PanDialogActionsArray,
} from "pankosmia-rcl";
import { useContext, useState } from "react";
import { getJson } from "pankosmia-lib/http";

export function DebugButton() {
  const { debugRef } = useContext(debugContext);
  const { i18nRef } = useContext(i18nContext);
  const [open, setOpen] = useState(false);

  const toggleDebug = (ev) => {
    getJson(`/api/debug/${debugRef.current ? "disable" : "enable"}`).then();
  };

  return (
    <>
      <Button
        variant="text"
        onClick={() => {
          if (debugRef.current) {
            toggleDebug();
          } else {
            setOpen(true);
          }
        }}
        sx={{
          gap: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "fit-content",
          minWidth: 0,
          padding: 0,
          color: "inherit",
          textTransform: "none",
          justifyContent: "flex-start",
        }}
      >
        <Switch
          edge="end"
          onChange={() => {
            if (debugRef.current) {
              toggleDebug();
            } else {
              setOpen(true);
            }
          }}
          checked={debugRef.current}
        />

        <Typography color="inherit">
          {doI18n("pages:core-settings:debugModeEnable", i18nRef.current)}
        </Typography>
      </Button>

      <PanBasicDialog
        titleLabel={doI18n(
          "pages:core-settings:SwitchToDebug",
          i18nRef.current,
        )}
        actionsButtonArray={PanDialogActionsArray({
          actionLabel: doI18n("components:header:accept", i18nRef.current),
          closeFn: () => setOpen(false),
          closeLabel: doI18n("library:pankosmia-rcl:cancel", i18nRef.current),
          actionFn: () => toggleDebug(),
        })}
        isOpen={open}
        closeFn={() => setOpen(false)}
      >
        <Typography>
          {doI18n("pages:core-settings:SureToDebug", i18nRef.current)}
        </Typography>
      </PanBasicDialog>
    </>
  );
}
