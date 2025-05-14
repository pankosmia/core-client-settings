import { useContext, useState } from "react";

import PropTypes from 'prop-types';
import { Grid2, Box, InputLabel, MenuItem, FormControl, Select, Stack, TextareaAutosize, Tooltip } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { i18nContext as I18nContext, doI18n } from "pithekos-lib";
import { useDetectDir } from "font-detect-rhl";

import FontMenuItem from "./FontMenuItem";
import sx from "./Selection.styles";

export default function BlendedFontGreekSelection(blendedFontGreekSelectionProps) {
  const { i18nRef } = useContext(I18nContext);
  const {
    selectedGreekFontClassSubstr,
    setSelectedGreekFontClassSubstr,
    greekFontName,
    setGreekFontName,
    webFontsGreek,
    unicodeRanges,
    selectedFontClass,
    isGreekDefault,
    handleClickGreek,
  } = blendedFontGreekSelectionProps;

  // Example text
  const [exampleGreek, setExampleGreek] = useState('Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.');
  
  /** Set SELECTED:
   *    - font class name substrings
   *    - font name
   */
  const handleChangeGreek = (event) => {
    setSelectedGreekFontClassSubstr(event.target.value);
    const greekName = webFontsGreek.filter(font => font.id === event.target.value).map((font, index) => (font.name));
    setGreekFontName(greekName);
  };

  const fontMenuItemProps = {
    selectedFontClass,
  };
  
  const WebFontsSelectableGreek =
  webFontsGreek.map((font, index) => (
    <MenuItem key={index} value={font.id} dense>
      <FontMenuItem font={font} {...fontMenuItemProps} />
    </MenuItem>
  ));
  
  const unicodeRangeGreek = selectedGreekFontClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Greek')).map((script, index) => (script.unicode_range));
  const neutralScope = ' ';
  const regexGreek = RegExp(`[^(${unicodeRangeGreek}||${neutralScope})]`, 'ugm');

  const handleExampleGreek = (event) => {
    const result = event.target.value.replace(regexGreek, '');
    setExampleGreek(result);
  };

  const greekFontSize = '200%';
  const greekLineHeight = '1.3';

  const exampleGreekDir = useDetectDir({ text: exampleGreek, isMarkup: false, ratioThreshold: .51 });

  const showGreekTextArea = selectedGreekFontClassSubstr.length !== 0;

  return (
    <Grid2 container spacing={2}>
      <Grid2  size={12}>
        <div className={selectedFontClass} style={{ fontSize: '100%'}}>
          <Stack direction="row">
            <FormControl fullWidth style={{maxWidth: 400, minWidth: 400}} size="small">
                <InputLabel shrink={true} id="select-greek-font-label" htmlFor="select-greek-font-id" sx={sx.inputLabel}>
                  {doI18n("pages:core-settings:select_greekscriptfont", i18nRef.current)}
                </InputLabel>
                <Select
                    variant="outlined"
                    labelId="select-greek-font-label"
                    name="select-greek-font-name"
                    inputProps={{
                        id: "select-greek-font-id",
                    }}
                    displayEmpty={true}
                    value={selectedGreekFontClassSubstr}
                    label={doI18n("pages:core-settings:select_greekscriptfont", i18nRef.current)}
                    onChange={handleChangeGreek}
                    sx={sx.select}
                >
                  {WebFontsSelectableGreek}
                </Select>
            </FormControl>
            {!isGreekDefault &&  
              <Tooltip 
                title="Cardo"
                placement="right"
                arrow
              >
                <RestoreIcon color="secondary" sx={{ cursor: 'pointer' }} style={{paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickGreek} />
              </Tooltip>
            }
          </Stack>
        </div>
      </Grid2>
      <Grid2 size={12}>
        <Box sx={{ padding: '10pt 0 5pt 20pt' }}>
          {showGreekTextArea &&
            <TextareaAutosize
              minRows={2}
              id="exampleGreek"
              type="text"
              onChange={handleExampleGreek}
              name="exampleGreek"
              color="secondary"
              style= {{
                fontFamily: greekFontName,
                fontSize: greekFontSize,
                lineHeight: greekLineHeight,
                padding: '10pt 3pt',
                width: '50%',
                direction: exampleGreekDir,
                }}
              value={showGreekTextArea && exampleGreek}
            />
          }
        </Box>
      </Grid2>
      <br />
    </Grid2>
  );
}

BlendedFontGreekSelection.propTypes = {  
  /** Selected Greek Font Class Substring */
  selectedGreekFontClassSubstr: PropTypes.string,
  /** Set Selected Greek Font Class Substring */
  setSelectedGreekFontClassSubstr: PropTypes.func.isRequired,
  /** Greek Font Name */
  greekFontName: PropTypes.string,
  /** Set Greek Font Name */
  setGreekFontName: PropTypes.func.isRequired,
  /** Unicode ranges for RegEx by script type for editable examples */
  unicodeRanges: PropTypes.array.isRequired,
  /** Selected Font Class */
  selectedFontClass: PropTypes.string.isRequired,
  /** Is Greek set to Default? */
  isGreekDefault: PropTypes.bool.isRequired,
  /** Handle Click Greek Reset to Default */
  handleClickGreek:  PropTypes.func.isRequired,
};