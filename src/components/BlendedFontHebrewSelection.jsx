import { useContext, useState } from "react";

import PropTypes from 'prop-types';
import { Grid2, Box, InputLabel, MenuItem, FormControl, Select, Stack, TextareaAutosize } from "@mui/material";
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
    // hebrewFfsId,
    // setHebrewFfsId,
    // hebrewFontDisplayName,
    // setHebrewFontDisplayName,
    // ffsArr,
    unicodeRanges,
  } = blendedFontHebrewSelectionProps;

  /** There is not a possibility of Hebrew script or Greek script font-feature-settings the time of programming this page.
   * // Available font font-feature-setting (Ffs) by selection
   * const [hebrewFfsArr, setHebrewFfsArr] = useState([]);
   *
   * // Default settings (ideally the user's last settings, eventually, maybe...)
   * const [hebrewFontSettings, setHebrewFontSettings] = useState([]);
   *
   * // Font-feature-settings CSS (string for application in css)
   * const [hebrewFfsCss, setHebrewFfsCss] = useState('');
   */

  // Example text
  const [exampleHebrew, setExampleHebrew] = useState('וַיֹּ֣אמֶר אֱלֹהִ֗ים יִקָּו֨וּ הַמַּ֜יִם מִתַּ֤חַת הַשָּׁמַ֙יִם֙ אֶל־מָק֣וֹם אֶחָ֔ד וְתֵרָאֶ֖ה הַיַּבָּשָׁ֑ה וַֽיְהִי־כֵֽן׃');
 
  /** Set INITIAL options array (FfsArr), where applicable. */
  /** Not yet applicable to Hebrew.
   * useEffect(() => {
   *    const selectedHebrewSettingsArr = ffsArr.filter(item => hebrewFfsId.includes(item.name));
   *    setHebrewFfsArr(selectedHebrewSettingsArr);
   *  },[ffsArr, hebrewFfsId]);
   */

  /** Set SELECTED:
   *    - font class name substrings
   *    - font display name (Not yet applicable to Hebrew.)
   *    - font name
   *    - and where applicable (Not yet applicable to Hebrew.):
   *        - font-feature-settings id (FfsId)
   *        - options array (FfsArr)
   */
    const handleChangeHebrew = (event) => {
      setSelectedHebrewFontClassSubstr(event.target.value);
      // const selectedHebrewSettingId = webFontsHebrew.filter(font => font.id === event.target.value).map((font, index) => (font.settings_id));
      // setHebrewFfsId(selectedHebrewSettingId);
      // const selectedHebrewSettingsId = ffsArr.filter(item => selectedHebrewSettingId.includes(item.name));
      // setHebrewFfsArr(selectedHebrewSettingsId);
      // const hebrewDisplayName = webFontsHebrew.filter(font => font.id === event.target.value).map((font, index) => (font.display_name));
      // setHebrewFontDisplayName(hebrewDisplayName);
      const hebrewName = webFontsHebrew.filter(font => font.id === event.target.value).map((font, index) => (font.name));
      setHebrewFontName(hebrewName);
    };

  /** Build dropdown menus */
  const WebFontsSelectableHebrew =
    webFontsHebrew.map((font, index) => (
        <MenuItem key={index} value={font.id} dense>
            <FontMenuItem font={font}/>
        </MenuItem>
    ));
  
  /** Not yet applicable to Hebrew.
   *  useEffect(() => {
   *    if (hebrewFontSettings.length !== 0) {
   *      const hebrewFfsJsx = hebrewFontSettings.map((obj, index) => (
   *        <div key={index}> ~{obj.name}~ {obj.value},</div>
   *      ));
   *      // convert jsx return to string and remove html tags and attributes (e.g., div's)
   *      const hebrewFfsStr = renderToString(hebrewFfsJsx).replace(/(<([^>]+)>)/ig, '').replace(/~/gm, '"');
   *      // remove the last comma, change ~ to "
   *      setHebrewFfsCss(hebrewFfsStr.substring(0, hebrewFfsStr.length - 1).replace(/~/gm, '"'));
   *    } else {
   *        setHebrewFfsCss("");
   *    }
   *  },[hebrewFontSettings, setHebrewFfsCss])
   */
 
  const unicodeRangeHebrew = selectedHebrewFontClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Hebrew')).map((script, index) => (script.unicode_range));
  const neutralScope = ' ';
  const regexHebrew = RegExp(`[^(${unicodeRangeHebrew}||${neutralScope})]`, 'ugm');

  const handleExampleHebrew = (event) => {
    const result = event.target.value.replace(regexHebrew, '');
    setExampleHebrew(result);    
  };

  const hebrewFontSize = '200%';
  const hebrewLineHeight = '1.4';

  /** Not yet applicable to Hebrew.
   * const fontFeaturesHebrewProps = {
   *  hebrewFontSettings, // [] then default then selected
   *  setHebrewFontSettings,
   *  ffsId: hebrewFfsId,
   *  fontName: hebrewFontName,
   *  fontDisplayName: hebrewFontDisplayName,
   *  fontSize: hebrewFontSize,
   *  lineHeight: hebrewLineHeight,
   *  isGraphiteAssumed,
   *  ffsArr: hebrewFfsArr,  // Options
   *  exampleRegex: regexHebrew,
   *  setExampleHebrew,
   * };
   *
   *
   * // Generate assumed filenames
   * const hebrewFfsCssFilename = hebrewFontName.toString().replace(/^P/, 'p');
   *
   * const hebrewCss = (
   *   <div>
   *     <br />
   *     <b><em>To update <em>{hebrewFontDisplayName}</em> font-feature-settings, set all instances of font-features-settings, -moz-font-feature-settings, and -webkit-font-feature-setting...:</em></b>
   *     <ul>
   *       <li> <b>in: </b><em>~/pankosmia_working/{hebrewFfsCssFilename}.css</em>' <b>to:</b> {hebrewFfsCss};</li>
   *     </ul>
   *   </div>
   * );
   */

  const exampleHebrewDir = useDetectDir({ text: exampleHebrew, isMarkup: false, ratioThreshold: .51 });

  // const showHebrewFeatures = hebrewFfsArr.length > 0;
  const showHebrewTextArea = selectedHebrewFontClassSubstr.length !== 0;
  // const showHebrewCss = hebrewFfsCss !== '' && selectedHebrewFontClassSubstr.length !== 0;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12} sx={{ borderTop: 1, borderColor: 'purple' }}>
        <div item style={{maxWidth: 350, padding: "1.25em 0 0 0"}}>
            <Box sx={{minWidth: 350}}>
              <Stack direction="row">
                <FormControl fullWidth style={{maxWidth: 325}} size="small">
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
                {/** showHebrewFeatures && <FontFeaturesHebrew {...fontFeaturesHebrewProps} /> */}
              </Stack>
            </Box>
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
              style= {{
                fontFamily: hebrewFontName,
                fontSize: hebrewFontSize,
                lineHeight: hebrewLineHeight,
                width: '50%',
                borderColor: "purple",
                direction: exampleHebrewDir,
                /** fontFeatureSettings: hebrewFfsCss !== '' && hebrewFfsCss,
                MozFontFeatureSettings: hebrewFfsCss !== '' && hebrewFfsCss,
                WebkitFontFeatureSettings: hebrewFfsCss !== '' && hebrewFfsCss, */
                }}
              value={showHebrewTextArea && exampleHebrew}
            />
          }
          {/** showHebrewCss ? hebrewCss : (<div><br /></div>) */}
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
  /** Font-feature-settings (Ffs) id for settings lookup */
  // hebrewFfsId: PropTypes.array.isRequired,
  /** Set Font-feature-settings (Ffs) id for settings lookup */
  // setHebrewFfsId: PropTypes.func.isRequired,
  /** Font Display Name for font-feature-settings heading */
  // hebrewFontDisplayName: PropTypes.array.isRequired,
  /** Set Font Display Name for font-feature-settings heading and shortlist */
  // setHebrewFontDisplayName: PropTypes.func.isRequired,
  /** Font Feature Settings Array (Options)*/
  // ffsArr: PropTypes.array.isRequired,
  /** Unicode ranges for RegEx by script type for editable examples */
  unicodeRanges: PropTypes.array.isRequired,
};