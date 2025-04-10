import { useContext, useState } from "react";

import PropTypes from 'prop-types';
import { Grid2, Box, InputLabel, MenuItem, FormControl, Select, Stack, TextareaAutosize } from "@mui/material";
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
    // greekFfsId,
    // setGreekFfsId,
    // greekFontDisplayName,
    // setGreekFontDisplayName,
    // ffsArr,
    unicodeRanges,
  } = blendedFontGreekSelectionProps;

  /** There is not a possibility of Hebrew script or Greek script font-feature-settings the time of programming this page. */
  // Available font font-feature-setting (Ffs) by selection
  // const [greekFfsArr, setGreekFfsArr] = useState([]);
  
  // Default settings (ideally the user's last settings, eventually, maybe...)
  // const [greekFontSettings, setGreekFontSettings] = useState([]);

  // Font-feature-settings CSS (string for application in css)
  // const [greekFfsCss, setGreekFfsCss] = useState('');

  // Example text
  const [exampleGreek, setExampleGreek] = useState('Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.');
  
  /** Set INITIAL options array (FfsArr), where applicable. */
  /** Not yet applicable to Greek.
   * useEffect(() => {
   *    const selectedGreekSettingsArr = ffsArr.filter(item => greekFfsId.includes(item.name));
   *    setGreekFfsArr(selectedGreekSettingsArr);
   *  },[ffsArr, greekFfsId]);
   */

  /** Set SELECTED:
   *    - font class name substrings
   *    - font display name (Not yet applicable to Greek.)
   *    - font name
   *    - and where applicable (Not yet applicable to Greek.):
   *        - font-feature-settings id (FfsId)
   *        - options array (FfsArr)
   */
  const handleChangeGreek = (event) => {
    setSelectedGreekFontClassSubstr(event.target.value);
    // const selectedGreekSettingId = webFontsGreek.filter(font => font.id === event.target.value).map((font, index) => (font.settings_id));
    // setGreekFfsId(selectedGreekSettingId);
    // const selectedGreekSettingsId = ffsArr.filter(item => selectedGreekSettingId.includes(item.name));
    // setGreekFfsArr(selectedGreekSettingsId);
    // const greekDisplayName = webFontsGreek.filter(font => font.id === event.target.value).map((font, index) => (font.display_name));
    // setGreekFontDisplayName(greekDisplayName);
    const greekName = webFontsGreek.filter(font => font.id === event.target.value).map((font, index) => (font.name));
    setGreekFontName(greekName);
  };

  const WebFontsSelectableGreek =
  webFontsGreek.map((font, index) => (
      <MenuItem key={index} value={font.id} dense>
          <FontMenuItem font={font}/>
      </MenuItem>
  ));
  
  /** Not yet applicable to Greek.
   * useEffect(() => {
   *  if (greekFontSettings.length !== 0) {
   *     const greekFfsJsx = greekFontSettings.map((obj, index) => (
   *       <div key={index}> ~{obj.name}~ {obj.value},</div>
   *     ));
   *     // convert jsx return to string and remove html tags and attributes (e.g., div's)
   *     const greekFfsStr = renderToString(greekFfsJsx).replace(/(<([^>]+)>)/ig, '').replace(/~/gm, '"');
   *     // remove the last comma, change ~ to "
   *     setGreekFfsCss(greekFfsStr.substring(0, greekFfsStr.length - 1).replace(/~/gm, '"'));
   *   } else {
   *     setGreekFfsCss("");
   *   }
   * },[greekFontSettings, setGreekFfsCss])
   */
 
  const unicodeRangeGreek = selectedGreekFontClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Greek')).map((script, index) => (script.unicode_range));
  const neutralScope = ' ';
  const regexGreek = RegExp(`[^(${unicodeRangeGreek}||${neutralScope})]`, 'ugm');

  const handleExampleGreek = (event) => {
    const result = event.target.value.replace(regexGreek, '');
    setExampleGreek(result);
  };

  const greekFontSize = '200%';
  const greekLineHeight = '1.3';

  /** Not yet applicable to Greek.
   * const fontFeaturesGreekProps = {
   *  greekFontSettings, // [] then default then selected
   *  setGreekFontSettings,
   *  ffsId: greekFfsId,
   *  fontName: greekFontName,
   *  fontDisplayName: greekFontDisplayName,
   *  fontSize: greekFontSize,
   *  lineHeight: greekLineHeight,
   *  isGraphiteAssumed,
   *  ffsArr: greekFfsArr,  // Options
   *  exampleRegex: regexGreek,
   *  setExampleGreek,
   * };
   *
   * // Generate assumed filenames
   * const greekFfsCssFilename = greekFontName.toString().replace(/^P/, 'p');
   *
   * const greekCss = (
   *   <div>
   *     <br />
   *     <b><em>To update <em>{greekFontDisplayName}</em> font-feature-settings, set all instances of font-features-settings, -moz-font-feature-settings, and -webkit-font-feature-setting...:</em></b>
   *     <ul>
   *       <li> <b>in: </b><em>~/pankosmia_working/{greekFfsCssFilename}.css</em>' <b>to:</b> {greekFfsCss};</li>
   *     </ul>
   *   </div>
   * );
   */

  const exampleGreekDir = useDetectDir({ text: exampleGreek, isMarkup: false, ratioThreshold: .51 });

  // const showGreekFeatures = greekFfsArr.length > 0;
  const showGreekTextArea = selectedGreekFontClassSubstr.length !== 0;
  // const showGreekCss = greekFontSettings.length > 0 && selectedGreekFontClassSubstr.length !== 0;

  return (
    <Grid2 container spacing={2}>
      <Grid2  size={12}>
        <div item style={{maxWidth: 350, padding: "1.25em 0 0 0"}}>
            <Box sx={{minWidth: 350}}>
              <Stack direction="row">
                  <FormControl fullWidth style={{maxWidth: 325}} size="small">
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
                {/** showGreekFeatures && <FontFeaturesGreek {...fontFeaturesGreekProps} /> */}
              </Stack>
            </Box>
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
              style= {{
                fontFamily: greekFontName,
                fontSize: greekFontSize,
                lineHeight: greekLineHeight,
                padding: '10pt 3pt',
                width: '50%',
                borderColor: "purple",
                direction: exampleGreekDir,
                /** fontFeatureSettings: greekFfsCss !== '' && greekFfsCss,
                MozFontFeatureSettings: greekFfsCss !== '' && greekFfsCss,
                WebkitFontFeatureSettings: greekFfsCss !== '' && greekFfsCss, */
                }}
              value={showGreekTextArea && exampleGreek}
            />
          }
          {/** showGreekCss ? greekCss : (<div><br /></div>) */}
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
  /** Font-feature-settings (Ffs) id for settings lookup */
  // greekFfsId: PropTypes.array.isRequired,
  /** Set Font-feature-settings (Ffs) id for settings lookup */
  // setGreekFfsId: PropTypes.func.isRequired,
  /** Font Display Name for font-feature-settings heading */
  // greekFontDisplayName: PropTypes.array.isRequired,
  /** Set Font Display Name for font-feature-settings heading and shortlist */
  // setGreekFontDisplayName: PropTypes.func.isRequired,
  /** Font Feature Settings Array (Options)*/
  // ffsArr: PropTypes.array.isRequired,
  /** Unicode ranges for RegEx by script type for editable examples */
  unicodeRanges: PropTypes.array.isRequired,
};