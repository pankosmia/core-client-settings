import { useContext, useState } from "react";

import PropTypes from 'prop-types';
import { Grid2, Box, InputLabel, MenuItem, FormControl, Select, Stack, TextareaAutosize, Tooltip } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { i18nContext as I18nContext, doI18n } from "pithekos-lib";
import { useDetectDir } from "font-detect-rhl";

import FontMenuItem from "./FontMenuItem";
import sx from "./Selection.styles";

export default function BlendedFontHebrewSelection(blendedFontHebrewSelectionProps) {
  const { i18nRef } = useContext(I18nContext);
  const {
    selectedHebrewFontClassSubstr,
    setSelectedHebrewFontClassSubstr,
    hebrewFontName,
    setHebrewFontName,
    webFontsHebrew,
    unicodeRanges,
    adjSelectedFontClass,
    isHebrewDefault,
    handleClickHebrew,
  } = blendedFontHebrewSelectionProps;

  // Example text
  const [exampleHebrew, setExampleHebrew] = useState('וַיֹּ֣אמֶר אֱלֹהִ֗ים יִקָּו֨וּ הַמַּ֜יִם מִתַּ֤חַת הַשָּׁמַ֙יִם֙ אֶל־מָק֣וֹם אֶחָ֔ד וְתֵרָאֶ֖ה הַיַּבָּשָׁ֑ה וַֽיְהִי־כֵֽן׃');
 
  /** Set SELECTED:
   *    - font class name substrings
   *    - font name
   */
    const handleChangeHebrew = (event) => {
      setSelectedHebrewFontClassSubstr(event.target.value);
      const hebrewName = webFontsHebrew.filter(font => font.id === event.target.value).map((font, index) => (font.name));
      setHebrewFontName(hebrewName);
    };

  const fontMenuItemProps = {
    adjSelectedFontClass,
  };

  /** Build dropdown menus */
  const WebFontsSelectableHebrew =
    webFontsHebrew.map((font, index) => (
      <MenuItem key={index} value={font.id} dense>
        <FontMenuItem font={font} {...fontMenuItemProps} />
      </MenuItem>
    ));
 
  const unicodeRangeHebrew = selectedHebrewFontClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Hebrew')).map((script, index) => (script.unicode_range));
  const neutralScope = ' ';
  const regexHebrew = RegExp(`[^(${unicodeRangeHebrew}||${neutralScope})]`, 'ugm');

  const handleExampleHebrew = (event) => {
    const result = event.target.value.replace(regexHebrew, '');
    setExampleHebrew(result);    
  };

  const hebrewFontSize = '200%';
  const hebrewLineHeight = '1.4';

  const exampleHebrewDir = useDetectDir({ text: exampleHebrew, isMarkup: false, ratioThreshold: .51 });

  const showHebrewTextArea = selectedHebrewFontClassSubstr.length !== 0;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12} color="secondary" sx={{ borderTop: 1}}>
        <div className={adjSelectedFontClass} style={{ fontSize: '100%'}}>
          <Stack direction="row">
            <FormControl fullWidth style={{maxWidth: 400, minWidth: 400}} size="small">
                <InputLabel shrink={true} id="select-hebrew-font-label" htmlFor="select-hebrew-font-id" sx={sx.inputLabel}>
                  {doI18n("pages:core-settings:select_hebrewscriptfont", i18nRef.current)}
                </InputLabel>
                <Select
                    variant="outlined"
                    labelId="select-hebrew-font-label"
                    name="select-hebrew-font-name"
                    inputProps={{
                        id: "select-hebrew-font-id",
                    }}
                    displayEmpty={true}
                    value={selectedHebrewFontClassSubstr}
                    label={doI18n("pages:core-settings:select_hebrewscriptfont", i18nRef.current)}
                    onChange={handleChangeHebrew}
                    sx={sx.select}
                >
                  {WebFontsSelectableHebrew}
                </Select>
            </FormControl>
            {!isHebrewDefault &&  
              <Tooltip 
                title="Ezra SIL"
                placement="right"
                arrow
              >
                <RestoreIcon color="secondary" sx={{ cursor: 'pointer' }} style={{paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickHebrew} />
              </Tooltip>
            }
          </Stack>
        </div>
      </Grid2>
      <Grid2 size={12}>
        <Box sx={{ padding: '10pt 0 5pt 20pt' }}>
          {showHebrewTextArea &&
            <TextareaAutosize
              minRows={2}
              id="exampleHebrew"
              type="text"
              onChange={handleExampleHebrew}
              name="exampleHebrew"
              color="secondary"
              style= {{
                fontFamily: hebrewFontName,
                fontSize: hebrewFontSize,
                lineHeight: hebrewLineHeight,
                width: '50%',
                direction: exampleHebrewDir,
                }}
              value={showHebrewTextArea && exampleHebrew}
            />
          }
        </Box>
      </Grid2>
      <br />
    </Grid2>
  );
}

BlendedFontHebrewSelection.propTypes = {
  /** Selected Hebrew Font Class Substring */
  selectedHebrewFontClassSubstr: PropTypes.string,
  /** Set Selected Hebrew Font Class Substring */
  setSelectedHebrewFontClassSubstr: PropTypes.func.isRequired,
  /** Hebrew Font Name */
  hebrewFontName: PropTypes.string,
  /** Set Hebrew Font Name */
  setHebrewFontName: PropTypes.func.isRequired,
  /** Available Hebrew Fonts */
  webFontsHebrew: PropTypes.array.isRequired,
  /** Unicode ranges for RegEx by script type for editable examples */
  unicodeRanges: PropTypes.array.isRequired,
  /** Selected Font Class */
  adjSelectedFontClass: PropTypes.string.isRequired,
  /** Is Hebrew set to Default? */
  isHebrewDefault: PropTypes.bool.isRequired,
  /** Handle Click Hebrew Reset to Default */
  handleClickHebrew:  PropTypes.func.isRequired,
};