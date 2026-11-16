import { useContext, useState } from "react";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { postEmpty } from "pankosmia-lib/http";
import { typographyContext } from "pankosmia-rcl";
import { doI18n } from "pankosmia-lib/i18n";
export default function DisplayDirection({ i18nRef }) {
  const { typographyRef } = useContext(typographyContext);
  const [direction, setDirection] = useState("ltr");

  const handleDirectionChange = (event) => {
    const value = event.target.value;

    setDirection(value);

    postEmpty(
      `/api/settings/typography/${typographyRef.current.font_set}/${typographyRef.current.size}/${value}`,
    );
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        {doI18n("pages:core-settings:displayDirection", i18nRef.current)}
      </Typography>

      <Box sx={{ width: 550 }}>
        <RadioGroup value={direction} onChange={handleDirectionChange}>
          <FormControlLabel
            value="ltr"
            control={<Radio />}
            label={doI18n("pages:core-settings:ltr", i18nRef.current)}
          />

          <FormControlLabel
            value="rtl"
            control={<Radio />}
            label={doI18n("pages:core-settings:rtl", i18nRef.current)}
          />
        </RadioGroup>
      </Box>
    </Box>
  );
}
