import { useContext, useEffect, useState } from "react";

import { Grid2, Box, InputLabel, FormControl, Select, MenuItem } from "@mui/material";
import { i18nContext, doI18n, getAndSetJson } from "pithekos-lib";
import sx from "./Selection.styles";
import LanguageMenuItem from "./LanguageMenuItem";

export default function LanguageSelection() {

  const i18n = useContext(i18nContext);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [usedLanguages, setUsedLanguages] = useState([]);
    useEffect(
      () => {
          getAndSetJson({
              url: "/i18n/used-languages",
              setter: setUsedLanguages
          }).then()},
      []
    );

  console.log(selectedLanguage);

  const handleChangeLanguage = (event) => {
    setSelectedLanguage(event.target.value);
  };

  /** Build dropdown menus */
  const UsedLanguages =
    usedLanguages.map((languageId, index) => (
        <MenuItem key={index} value={languageId} dense>
            <LanguageMenuItem languageId={languageId}/>
        </MenuItem>
  ));

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12} sx={{ borderTop: 1, borderColor: 'purple' }}>
        <div item style={{maxWidth: 350, padding: "1.25em 0 0 0"}}>
            <Box sx={{minWidth: 350}}>
                <FormControl fullWidth style={{maxWidth: 325}} size="small">
                    <InputLabel id="select-language-label" htmlFor="select-language" sx={sx.inputLabel}>
                      {doI18n("pages:core-settings:language", i18n)}
                    </InputLabel>
                    <Select
                        variant="outlined"
                        labelId="select-language-label"
                        name="select-language"
                        inputProps={{
                            id: "select-language",
                        }}
                        value={selectedLanguage}
                        label={doI18n("pages:core-settings:language", i18n)}
                        onChange={handleChangeLanguage}
                        sx={sx.select}
                    >
                      {UsedLanguages}
                    </Select>
                </FormControl>
            </Box>
        </div>
      </Grid2>
    </Grid2>
  );
}
