import { useEffect, useContext, useState } from "react";

import PropTypes from 'prop-types';
import { Grid2, Box, InputLabel, MenuItem, FormControl, Select, Stack, TextareaAutosize, Tooltip } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { i18nContext as I18nContext, doI18n, postEmptyJson } from "pithekos-lib";
import { useDetectDir } from "font-detect-rhl";
import { renderToString } from 'react-dom/server';

import FontMenuItem from "./FontMenuItem";
import sx from "./Selection.styles";
import FontFeaturesBase from "./FontFeaturesBase";

export default function BlendedFontBaseSelection(blendedFontBaseSelectionProps) {
  const { i18nRef } = useContext(I18nContext);
  const {
    isGraphite,
    selectedBaseFontClassSubstr,
    setSelectedBaseFontClassSubstr,
    selectedHebrewFontClassSubstr,
    selectedGreekFontClassSubstr,
    selectedMyanmarFontClassSubstr,
    selectedArabicUrduFontClassSubstr,
    baseFontName,
    setBaseFontName,
    webFontsBase,
    baseFfsId,
    setBaseFfsId,
    baseFontDisplayName,
    setBaseFontDisplayName,
    ffsArr,
    unicodeRanges,
    adjSelectedFontClass,
    isBaseDefault,
    handleClickBase,
  } = blendedFontBaseSelectionProps;

  // Available font font-feature-setting (Ffs) by selection
  const [baseFfsArr, setBaseFfsArr] = useState([]);
  
  // Default settings (ideally the user's last settings, eventually, maybe...)
  const [baseFontSettings, setBaseFontSettings] = useState([]);

  // Font-feature-settings CSS (string for application in css)
  const [baseFfsCss, setBaseFfsCss] = useState('');

  // Example text
  const [exampleBase, setExampleBase] = useState('Au commencement... / In the beginning...');
  
  /** Set INITIAL options array (FfsArr) */
  useEffect(() => {
    const selectedBaseSettingsArr = ffsArr.filter(item => baseFfsId.includes(item.name));
    setBaseFfsArr(selectedBaseSettingsArr);
},[ffsArr, baseFfsId]);

  /** Set SELECTED:
   *    - font class name substrings
   *    - reset font settings array and css string
   *    - font display name for font-feature-settings heading
   *    - font name
   *    - and where applicable:
   *        - font-feature-settings id (FfsId)
   *        - options array (FfsArr)
   */
  // Base
    const handleChangeBase = (event) => {
      setSelectedBaseFontClassSubstr(event.target.value);
      setBaseFontSettings([]);
      setBaseFfsCss('');
      const selectedBaseSettingId = webFontsBase.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
      setBaseFfsId(selectedBaseSettingId);
      const selectedBaseSettingsId = ffsArr.filter(item => selectedBaseSettingId.includes(item.name));
      setBaseFfsArr(selectedBaseSettingsId);
      const baseDisplayName = webFontsBase.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
      setBaseFontDisplayName(baseDisplayName);
      const baseName = webFontsBase.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
      setBaseFontName(baseName);
    };

  const fontMenuItemProps = {
    adjSelectedFontClass,
  };

  /** Build dropdown menus */
  const WebFontsSelectableBase =
    webFontsBase.map((font, index) => (
        <MenuItem key={index} value={font.id} dense>
            <FontMenuItem font={font} {...fontMenuItemProps} />
        </MenuItem>
    ));
  
  const ffsBaseFontName = baseFontName.toString().replace('Pankosmia-','').replace(/ /g, '_');

  useEffect(() => {
    if (baseFontSettings.length !== 0) {
      const baseFfsJsx = baseFontSettings.map((obj, index) => (
        <div key={index}> ~{obj.name}~ {obj.value},</div>
      ));
      // convert jsx return to string and remove html tags and attributes (e.g., div's)
      const baseFfsStr = renderToString(baseFfsJsx).replace(/(<([^>]+)>)/ig, '').replace(/~/gm, '"');
      // remove the last comma, change ~ to "
      const baseFfsCssStrNext = baseFfsStr.substring(0, baseFfsStr.length - 1).replace(/~/gm, '"');
      const nextBaseFfsCssArr = baseFfsCssStrNext.split(',');
      if (baseFfsCss !== '') {
        const prevBaseFfsCssArr = baseFfsCss.split(',');
        for (let i = 0; i < prevBaseFfsCssArr.length; i++) {
          if (nextBaseFfsCssArr[i] !== prevBaseFfsCssArr[i]) {
            const ffsStr = renderToString(nextBaseFfsCssArr[i]).replace(' &quot;','').replace('&quot; ','/')
            postEmptyJson(`/settings/typography-feature/${ffsBaseFontName}/${ffsStr}`).then();
          }
        }
      }
      setBaseFfsCss(baseFfsCssStrNext);
    }
  },[baseFfsCss, baseFontSettings, ffsBaseFontName])

  const unicodeRangeHebrew = selectedHebrewFontClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Hebrew')).map((script, index) => (script.unicode_range));
  const unicodeRangeGreek = selectedGreekFontClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Greek')).map((script, index) => (script.unicode_range));
  const unicodeRangeMyanmar = selectedMyanmarFontClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Myanmar')).map((script, index) => (script.unicode_range));
  const unicodeRangeArabicUrdu = selectedArabicUrduFontClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Arabic/Urdu')).map((script, index) => (script.unicode_range));

  const regexBase = RegExp(`[${unicodeRangeHebrew}${unicodeRangeGreek}${unicodeRangeMyanmar}${unicodeRangeArabicUrdu}]`, 'ugm');

  const handleExampleBase = (event) => { 
    const result = event.target.value.replace(regexBase, '');
    setExampleBase(result);
  };

  const baseFontSize = '150%'; //old Fallback used to be 125%. Check 150%.
  const baseLineHeight = '1.2'; //old Fallback used to be 1.4. Check 1.2.

  const fontFeaturesBaseProps = {
    baseFontSettings, // [] then default then selected
    setBaseFontSettings,
    ffsId: baseFfsId,
    fontName: baseFontName,
    fontDisplayName: baseFontDisplayName,
    fontSize: baseFontSize,
    lineHeight: baseLineHeight,
    isGraphite,
    ffsArr: baseFfsArr, // Options
    exampleRegex: regexBase,
    setExampleBase,
  };

  const exampleBaseDir = useDetectDir({ text: exampleBase, isMarkup: false, ratioThreshold: .51 });

  const showBaseFeatures = baseFfsArr.length > 0;

  // Add Gentium if "baseFontName" is not 'Pankosmia-Gentium' or 'Pankosmia-Gentium Book'.
  const baseExampleFontName = baseFontName.toString().includes('Pankosmia-Gentium') ? baseFontName : `${baseFontName}, 'Pankosmia-Gentium'`;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <div className={adjSelectedFontClass} style={{ fontSize: '100%'}}>
          <Stack direction="row">
            <FormControl fullWidth style={{maxWidth: 400, minWidth: 400}} size="small">
                <InputLabel id="select-base-font-label" htmlFor="select-base-font-id" sx={sx.inputLabel}>
                  {doI18n("pages:core-settings:base_font", i18nRef.current)}
                </InputLabel>
                <Select
                    variant="outlined"
                    labelId="select-base-font-label"
                    name="select-base-font-name"
                    inputProps={{
                        id: "select-base-font-id",
                    }}
                    value={selectedBaseFontClassSubstr}
                    label={doI18n("pages:core-settings:base_font", i18nRef.current)}
                    onChange={handleChangeBase}
                    sx={sx.select}
                >
                  {WebFontsSelectableBase}
                </Select>
            </FormControl>
            {!isBaseDefault &&  
              <Tooltip
                title="Gentium"
                placement="right"
                arrow
              >
                <RestoreIcon color="secondary" sx={{ cursor: 'pointer' }} style={{paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickBase} />
              </Tooltip>
            }
            {showBaseFeatures && <FontFeaturesBase {...fontFeaturesBaseProps} />}
          </Stack>
        </div>
      <Grid2 size={12}>
        <Box sx={{ padding: '10pt 0 5pt 20pt' }}>
            <TextareaAutosize
              minRows={2}
              id="exampleBase"
              type="text"
              onChange={handleExampleBase}
              name="exampleBase"
              color="secondary"
              style= {{
                fontFamily: baseExampleFontName,
                fontSize: baseFontSize,
                lineHeight: baseLineHeight,
                width: '50%',
                direction: exampleBaseDir,
                fontFeatureSettings:  baseFfsCss,
                MozFontFeatureSettings: baseFfsCss,
                WebkitFontFeatureSettings: baseFfsCss,
                }}
              value={exampleBase}
              />
          </Box>
        </Grid2>
      </Grid2>
      <br />
    </Grid2>
  );
}

BlendedFontBaseSelection.propTypes = {
  /** Is Rendering in Graphite? */
  isGraphite: PropTypes.bool.isRequired,
  /** Selected Base Font Class Substring */
  selectedBaseFontClassSubstr: PropTypes.string,
  /** Set Selected Base Font Class Substring */
  setSelectedBaseFontClassSubstr: PropTypes.func.isRequired,
  /** Selected Hebrew Font Class Substring */
  selectedHebrewFontClassSubstr: PropTypes.string,
  /** Selected Greek Font Class Substring */
  selectedGreekFontClassSubstr: PropTypes.string,
  /** Selected Myanmar Font Class Substring */
  selectedMyanmarFontClassSubstr: PropTypes.string,
  /** Selected ArabicUrdu Font Class Substring */
  selectedArabicUrduFontClassSubstr: PropTypes.string,
  /** Base Font Name */
  baseFontName: PropTypes.string,
  /** Set Base Font Name */
  setBaseFontName: PropTypes.func.isRequired,
  /** Available Base Fonts */
  webFontsBase: PropTypes.array.isRequired,
  /** Font-feature-settings (Ffs) id for settings lookup */
  baseFfsId: PropTypes.array.isRequired,
  /** Set Font-feature-settings (Ffs) id for settings lookup */
  setBaseFfsId: PropTypes.func.isRequired,
  /** Font Display Name for font-feature-settings heading */
  baseFontDisplayName: PropTypes.array.isRequired,
  /** Set Font Display Name for font-feature-settings heading */
  setBaseFontDisplayName: PropTypes.func.isRequired,
  /** Font Feature Settings Array (Options)*/
  ffsArr: PropTypes.array.isRequired, // Current unicode ranges always result in 'punc 2' (Latin); Removing that option for now (awamiFfsLessPunc)
  /** Unicode ranges for RegEx by script type for editable examples */
  unicodeRanges: PropTypes.array.isRequired,
  /** Is a font set for Base? */
  isBaseOn: PropTypes.bool.isRequired,
  /** Selected Font Class */
  adjSelectedFontClass: PropTypes.string.isRequired,
  /** Is Base Font set to Default? */
  isBaseDefault: PropTypes.bool.isRequired,
  /** Handle Click Base Font Reset to Default */
  handleClickBase:  PropTypes.func.isRequired,
};