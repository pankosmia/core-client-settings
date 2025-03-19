import { useEffect, useContext, useState } from "react";

import PropTypes from 'prop-types';
import { Grid2, Box, InputLabel, MenuItem, FormControl, Select, Stack, TextareaAutosize } from "@mui/material";
import { i18nContext as I18nContext, doI18n } from "pithekos-lib";
import { useDetectDir } from "font-detect-rhl";
import { renderToString } from 'react-dom/server';

import FontMenuItem from "./FontMenuItem";
import sx from "./Selection.styles";
import FontFeaturesOther from "./FontFeaturesOther";
import FontFeaturesFallback from "./FontFeaturesFallback";

export default function BlendedFontOtherFallbackSelection(blendedFontOtherFallbackSelectionProps) {
  const { i18nRef } = useContext(I18nContext);
  const {
    isGraphiteAssumed,
    selectedOtherFontClassSubstr,
    setSelectedOtherFontClassSubstr,
    selectedFallbackFontClassSubstr,
    setSelectedFallbackFontClassSubstr,
    selectedHebrewFontClassSubstr,
    selectedGreekFontClassSubstr,
    selectedMyanmarFontClassSubstr,
    selectedArabicUrduFontClassSubstr,
    otherFontName,
    setOtherFontName,
    fallbackFontName,
    setFallbackFontName,
    webFontsOther,
    webFontsFallback,
    otherFfsId,
    setOtherFfsId,
    fallbackFfsId,
    setFallbackFfsId,
    otherFontDisplayName,
    setOtherFontDisplayName,
    fallbackFontDisplayName,
    setFallbackFontDisplayName,
    ffsArr,
    unicodeRanges,
    isOtherOn,
  } = blendedFontOtherFallbackSelectionProps;

  // Available font font-feature-setting (Ffs) by selection
  const [otherFfsArr, setOtherFfsArr] = useState([]);
  const [fallbackFfsArr, setFallbackFfsArr] = useState([]);
  
  // Default settings (ideally the user's last settings, eventually, maybe...)
  const [otherFontSettings, setOtherFontSettings] = useState([]);
  const [fallbackFontSettings, setFallbackFontSettings] = useState([]);

  // Font-feature-settings CSS (string for application in css)
  const [otherFfsCss, setOtherFfsCss] = useState('');
  const [fallbackFfsCss, setFallbackFfsCss] = useState('');

  // Example text
  const [exampleOtherFallback, setExampleOtherFallback] = useState('Au commencement... / In the beginning...');
  
  /** Set INITIAL options array (FfsArr) */
  useEffect(() => {
    const selectedOtherSettingsArr = ffsArr.filter(item => otherFfsId.includes(item.name));
    setOtherFfsArr(selectedOtherSettingsArr);
    const selectedFallbackSettingsArr = ffsArr.filter(item => fallbackFfsId.includes(item.name));
    setFallbackFfsArr(selectedFallbackSettingsArr);
},[fallbackFfsId, ffsArr, otherFfsId]);

  /** Set SELECTED:
   *    - font class name substrings
   *    - font display name for font-feature-settings heading
   *    - font name
   *    - and where applicable:
   *        - font-feature-settings id (FfsId)
   *        - options array (FfsArr)
   */
  // Other
    const handleChangeOther = (event) => {
      setSelectedOtherFontClassSubstr(event.target.value);
      const selectedOtherSettingId = webFontsOther.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
      setOtherFfsId(selectedOtherSettingId);
      const selectedOtherSettingsId = ffsArr.filter(item => selectedOtherSettingId.includes(item.name));
      setOtherFfsArr(selectedOtherSettingsId);
      const otherDisplayName = webFontsOther.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
      setOtherFontDisplayName(otherDisplayName);
      const otherName = webFontsOther.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
      setOtherFontName(otherName);
    };
  // Fallback
    const handleChangeFallback = (event) => {
      setSelectedFallbackFontClassSubstr(event.target.value);
      const selectedFallbackSettingId = webFontsFallback.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
      setFallbackFfsId(selectedFallbackSettingId);
      const selectedFallbackSettingsId = ffsArr.filter(item => selectedFallbackSettingId.includes(item.name));
      setFallbackFfsArr(selectedFallbackSettingsId);
      const fallbackDisplayName = webFontsFallback.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
      setFallbackFontDisplayName(fallbackDisplayName);
      const fallbackName = webFontsFallback.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
      setFallbackFontName(fallbackName);
    };

  /** Build dropdown menus */
  const WebFontsSelectableOther =
    webFontsOther.map((font, index) => (
        <MenuItem key={index} value={font.id} dense>
            <FontMenuItem font={font}/>
        </MenuItem>
    ));
  const WebFontsSelectableFallback =
    webFontsFallback.map((font, index) => (
        <MenuItem key={index} value={font.id} dense>
            <FontMenuItem font={font}/>
        </MenuItem>
    ));
  
  useEffect(() => {
    if (otherFontSettings.length !== 0) {
      const otherFfsJsx = otherFontSettings.map((obj, index) => (
        <div key={index}> ~{obj.name}~ {obj.value},</div>
      ));
      // convert jsx return to string and remove html tags and attributes (e.g., div's)
      const otherFfsStr = renderToString(otherFfsJsx).replace(/(<([^>]+)>)/ig, '').replace(/~/gm, '"');
      // remove the last comma, change ~ to "
      setOtherFfsCss(otherFfsStr.substring(0, otherFfsStr.length - 1).replace(/~/gm, '"'));
    } else {
      setOtherFfsCss("");
    }
  },[otherFontSettings, setOtherFfsCss])

  useEffect(() => {
    if (fallbackFontSettings.length !== 0) {
      const fallbackFfsJsx = fallbackFontSettings.map((obj, index) => (
        <div key={index}> ~{obj.name}~ {obj.value},</div>
      ));
      // Convert jsx return to string and remove html tags and attributes (e.g., div's)
      const fallbackFfsStr = renderToString(fallbackFfsJsx).replace(/(<([^>]+)>)/ig, '').replace(/~/gm, '"');
      // remove the last comma, change ~ to "
      setFallbackFfsCss(fallbackFfsStr.substring(0, fallbackFfsStr.length - 1).replace(/~/gm, '"'));
    } else {
      setFallbackFfsCss("");
    }
  },[fallbackFontSettings, setFallbackFfsCss])
 
  const unicodeRangeHebrew = selectedHebrewFontClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Hebrew')).map((script, index) => (script.unicode_range));
  const unicodeRangeGreek = selectedGreekFontClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Greek')).map((script, index) => (script.unicode_range));
  const unicodeRangeMyanmar = selectedMyanmarFontClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Myanmar')).map((script, index) => (script.unicode_range));
  const unicodeRangeArabicUrdu = selectedArabicUrduFontClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Arabic/Urdu')).map((script, index) => (script.unicode_range));

  const regexOtherFallback = RegExp(`[${unicodeRangeHebrew}${unicodeRangeGreek}${unicodeRangeMyanmar}${unicodeRangeArabicUrdu}]`, 'ugm');

  // Other and Fallback are combined into one example
  const handleExampleOtherFallback = (event) => { 
    const result = event.target.value.replace(regexOtherFallback, '');
    setExampleOtherFallback(result);
  };

  const otherFontSize = '150%';
  const otherLineHeight = '1.2';
  const fallbackFontSize = '125%';
  const fallbackLineHeight = '1.4';

  const fontFeaturesOtherProps = {
    otherFontSettings, // [] then default then selected
    setOtherFontSettings,
    ffsId: otherFfsId,
    fontName: otherFontName,
    fontDisplayName: otherFontDisplayName,
    fontSize: otherFontSize,
    lineHeight: otherLineHeight,
    isGraphiteAssumed,
    ffsArr: otherFfsArr, // Options
    // exampleRegex: regexOtherFallback,
    // setExampleOther,
  };
  const fontFeaturesFallbackProps = {
    fallbackFontSettings, // [] then default then selected
    setFallbackFontSettings,
    ffsId: fallbackFfsId,
    fontName: fallbackFontName,
    fontDisplayName: fallbackFontDisplayName,
    fontSize: fallbackFontSize,
    lineHeight: fallbackLineHeight,
    isGraphiteAssumed,
    ffsArr: fallbackFfsArr, // Options
    exampleRegex: regexOtherFallback,
    setExampleOtherFallback,
    isOtherOn,
  };  

  /** Generate assumed filenames */
  const otherFfsCssFilename = otherFontName.toString().replace(/^P/, 'p');
  const fallbackFfsCssFilename = fallbackFontName.toString().replace(/^P/, 'p');

  // Other and Fallback are combined into a single example
  const exampleOtherFallbackDir = useDetectDir({ text: exampleOtherFallback, isMarkup: false, ratioThreshold: .51 });

  const otherCss = (
    <div>
      <br />
      <b><em>To update <em>{otherFontDisplayName}</em> font-feature-settings, set all instances of font-features-settings, -moz-font-feature-settings, and -webkit-font-feature-setting...:</em></b>
      <ul>
        <li> <b>in: </b><em>~/pankosmia_working/{otherFfsCssFilename}.css</em>' <b>to:</b> {otherFfsCss};</li>
      </ul>
    </div>
  );
  const fallbackCss = (
    <div>
      <br />
      <b><em>To update <em>{fallbackFontDisplayName}</em> font-feature-settings, set all instances of font-features-settings, -moz-font-feature-settings, and -webkit-font-feature-setting...:</em></b>
      <ul>
        <li> <b>in: </b><em>~/pankosmia_working/{fallbackFfsCssFilename}.css</em>' <b>to:</b> {fallbackFfsCss};</li>
      </ul>
    </div>
  );

  const showOtherFeatures = otherFfsArr.length > 0;
  const showOtherCss = otherFontSettings.length > 0 && selectedOtherFontClassSubstr.length !== 0;

  const otherFallbackExampleFontName = isOtherOn ? `${otherFontName}, ${fallbackFontName}` : fallbackFontName;
  const otherFallbackExampleCss = isOtherOn ? otherFfsCss : fallbackFfsCss;

  const showFallbackFeatures = fallbackFfsArr.length > 0;
  const showFallbackCss = fallbackFfsArr.length > 0;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Stack>
          <div item style={{maxWidth: 350, padding: "1.25em 0 0"}}>
              <Box sx={{minWidth: 350}}>
                <Stack direction="row">
                  <FormControl fullWidth style={{maxWidth: 325}} size="small">
                      <InputLabel id="select-other-font-label" htmlFor="select-other-font-id" sx={sx.inputLabel}>
                        {doI18n("pages:core-settings:select_otherscriptfont", i18nRef.current)}
                      </InputLabel>
                      <Select
                          variant="outlined"
                          labelId="select-other-font-label"
                          name="select-other-font-name"
                          inputProps={{
                              id: "select-other-font-id",
                          }}
                          value={selectedOtherFontClassSubstr}
                          label={doI18n("pages:core-settings:select_otherscriptfont", i18nRef.current)}
                          onChange={handleChangeOther}
                          sx={sx.select}
                      >
                        {WebFontsSelectableOther}
                      </Select>
                  </FormControl>
                  {showOtherFeatures && <FontFeaturesOther {...fontFeaturesOtherProps} />}
                </Stack>
              </Box>
          </div>
          <div item style={{maxWidth: 350, padding: "1.25em 0"}}>
              <Box sx={{minWidth: 350}}>
                <Stack direction="row">
                  <FormControl fullWidth style={{maxWidth: 325}} size="small">
                      <InputLabel id="select-fallback-font-label" htmlFor="select-fallback-font-id" sx={sx.inputLabel}>
                        {doI18n("pages:core-settings:select_fallbackscriptfont", i18nRef.current)}
                      </InputLabel>
                      <Select
                          variant="outlined"
                          labelId="select-fallback-font-label"
                          name="select-fallback-font-name"
                          inputProps={{
                              id: "select-fallback-font-id",
                          }}
                          value={selectedFallbackFontClassSubstr}
                          label={doI18n("pages:core-settings:select_fallbackscriptfont", i18nRef.current)}
                          onChange={handleChangeFallback}
                          sx={sx.select}
                      >
                        {WebFontsSelectableFallback}
                      </Select>
                  </FormControl>
                  {showFallbackFeatures && <FontFeaturesFallback {...fontFeaturesFallbackProps} />}
                </Stack>
              </Box>
            </div>
          </Stack>
        <Grid2 size={12}>
        <Box sx={{ padding: '10pt 0 5pt 20pt' }}>
            <TextareaAutosize
              minRows={2}
              id="exampleOtherFallback"
              type="text"
              onChange={handleExampleOtherFallback}
              name="exampleOtherFallback"
              style= {{
                fontFamily: otherFallbackExampleFontName,
                fontSize: fallbackFontSize,
                lineHeight: fallbackLineHeight,
                width: '50%',
                borderColor: "purple",
                direction: exampleOtherFallbackDir,
                fontFeatureSettings:  otherFallbackExampleCss,
                MozFontFeatureSettings: otherFallbackExampleCss,
                WebkitFontFeatureSettings: otherFallbackExampleCss,
                }}
              value={exampleOtherFallback}
              />
            {showOtherCss && otherCss}
            {showFallbackCss && fallbackCss}
          </Box>
        </Grid2>
      </Grid2>
      <br />
    </Grid2>
  );
}

BlendedFontOtherFallbackSelection.propTypes = {
  /** Is Graphite Assumed? */
  isGraphiteAssumed: PropTypes.bool.isRequired,
  /** Selected Other Font Class Substring */
  selectedOtherFontClassSubstr: PropTypes.string,
  /** Set Selected Other Font Class Substring */
  setSelectedOtherFontClassSubstr: PropTypes.func.isRequired,
  /** Selected Fallback Font Class Substring */
  selectedFallbackFontClassSubstr: PropTypes.string,
  /** Set Selected Fallback Font Class Substring */
  setSelectedFallbackFontClassSubstr: PropTypes.func.isRequired,
  /** Selected Hebrew Font Class Substring */
  selectedHebrewFontClassSubstr: PropTypes.string,
  /** Selected Greek Font Class Substring */
  selectedGreekFontClassSubstr: PropTypes.string,
  /** Selected Myanmar Font Class Substring */
  selectedMyanmarFontClassSubstr: PropTypes.string,
  /** Selected ArabicUrdu Font Class Substring */
  selectedArabicUrduFontClassSubstr: PropTypes.string,
  /** Other Font Name */
  otherFontName: PropTypes.string,
  /** Set Other Font Name */
  setOtherFontName: PropTypes.func.isRequired,
  /** Fallback Font Name */
  fallbackFontName: PropTypes.string,
  /** Set Fallback Font Name */
  setFallbackFontName: PropTypes.func.isRequired,
  /** Available Other Fonts */
  webFontsOther: PropTypes.array.isRequired,
  /** Available Fallback Fonts */
  webFontsFallback: PropTypes.array.isRequired,
  /** Font-feature-settings (Ffs) id for settings lookup */
  otherFfsId: PropTypes.array.isRequired,
  /** Font-feature-settings (Ffs) id for settings lookup */
  fallbackFfsId: PropTypes.array.isRequired,
  /** Set Font-feature-settings (Ffs) id for settings lookup */
  setOtherFfsId: PropTypes.func.isRequired,
  /** Set Font-feature-settings (Ffs) id for settings lookup */
  setFallbackFfsId: PropTypes.func.isRequired,
  /** Font Display Name for font-feature-settings heading */
  otherFontDisplayName: PropTypes.array.isRequired,
  /** Set Font Display Name for font-feature-settings heading */
  setOtherFontDisplayName: PropTypes.func.isRequired,
  /** Font Display Name for font-feature-settings heading */
  fallbackFontDisplayName: PropTypes.array.isRequired,
  /** Set Font Display Name for font-feature-settings heading */
  setFallbackFontDisplayName: PropTypes.func.isRequired,
  /** Font Feature Settings Array (Options)*/
  ffsArr: PropTypes.array.isRequired, // Current unicode ranges always result in 'punc 2' (Latin); Removing that option for now (awamiFfsLessPunc)
  /** Unicode ranges for RegEx by script type for editable examples */
  unicodeRanges: PropTypes.array.isRequired,
  /** Is a font set for Other? */
  isOtherOn: PropTypes.bool.isRequired,
};