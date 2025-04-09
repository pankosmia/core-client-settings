import { useEffect, useContext, useState } from "react";

import PropTypes from 'prop-types';
import { Grid2, Box, InputLabel, MenuItem, FormControl, Select, Stack, TextareaAutosize } from "@mui/material";
import { i18nContext as I18nContext, doI18n } from "pithekos-lib";
import { useDetectDir } from "font-detect-rhl";
import { renderToString } from 'react-dom/server';

import FontMenuItem from "./FontMenuItem";
import sx from "./Selection.styles";
import FontFeaturesMyanmar from "./FontFeaturesMyanmar";

export default function BlendedFontMyanmarSelection(blendedFontMyanmarSelectionProps) {
  const { i18nRef } = useContext(I18nContext);
  const {
    isGraphiteAssumed,
    selectedMyanmarFontClassSubstr,
    setSelectedMyanmarFontClassSubstr,
    myanmarFontName,
    setMyanmarFontName,
    webFontsMyanmar,
    myanmarFfsId,
    setMyanmarFfsId,
    myanmarFontDisplayName,
    setMyanmarFontDisplayName,
    ffsArr,
    unicodeRanges,
  } = blendedFontMyanmarSelectionProps;

  // Available font font-feature-setting (Ffs) by selection
  const [myanmarFfsArr, setMyanmarFfsArr] = useState([]);
  
  // Default settings (ideally the user's last settings, eventually, maybe...)
  const [myanmarFontSettings, setMyanmarFontSettings] = useState([]);

  // Font-feature-settings CSS (string for application in css)
  const [myanmarFfsCss, setMyanmarFfsCss] = useState('');

  // Example text
  const [exampleMyanmar, setExampleMyanmar] = useState('အစဦး၌ နှုတ်ကပတ်တော်ရှိ၏။ နှုတ်ကပတ်တော်သည် ဘုရားသခင်နှင့်အတူရှိ၏။ နှုတ်ကပတ်တော် သည်လည်း ဘုရားသခင်ဖြစ်တော်မူ၏။');
  
  /** Set INITIAL options array (FfsArr) */
  useEffect(() => {
      const selectedMyanmarSettingsArr = ffsArr.filter(item => myanmarFfsId.includes(item.name));
      setMyanmarFfsArr(selectedMyanmarSettingsArr);
  },[ffsArr, myanmarFfsId]);

  /** Set SELECTED..
   *    - font class name substrings
   *    - font display name for font-feature-settings heading
   *    - font name
   *    - and where applicable:
   *        - font-feature-settings id (FfsId)
   *        - options array (FfsArr)
   */
    const handleChangeMyanmar = (event) => {
      setSelectedMyanmarFontClassSubstr(event.target.value);
      const selectedMyanmarSettingId = webFontsMyanmar.filter(font => font.id === event.target.value).map((font, index) => (font.settings_id));
      setMyanmarFfsId(selectedMyanmarSettingId);
      const selectedMyanmarSettingsId = ffsArr.filter(item => selectedMyanmarSettingId.includes(item.name));
      setMyanmarFfsArr(selectedMyanmarSettingsId);
      const myanmarDisplayName = webFontsMyanmar.filter(font => font.id === event.target.value).map((font, index) => (font.display_name));
      setMyanmarFontDisplayName(myanmarDisplayName);
      const myanmarName = webFontsMyanmar.filter(font => font.id === event.target.value).map((font, index) => (font.name));
      setMyanmarFontName(myanmarName);
    };

  /** Build dropdown menus */
  const WebFontsSelectableMyanmar =
    webFontsMyanmar.map((font, index) => (
        <MenuItem key={index} value={font.id} dense>
            <FontMenuItem font={font}/>
        </MenuItem>
    ));
  
  useEffect(() => {
    if (myanmarFontSettings.length !== 0) {
      const myanmarFfsJsx = myanmarFontSettings.map((obj, index) => (
        <div key={index}> ~{obj.name}~ {obj.value},</div>
      ));
      // convert jsx return to string and remove html tags and attributes (e.g., div's)
      const myanmarFfsStr = renderToString(myanmarFfsJsx).replace(/(<([^>]+)>)/ig, '').replace(/~/gm, '"');
      // remove the last comma, change ~ to "
      setMyanmarFfsCss(myanmarFfsStr.substring(0, myanmarFfsStr.length - 1).replace(/~/gm, '"'));
    } else {
      setMyanmarFfsCss("");
    }
  },[myanmarFontSettings, setMyanmarFfsCss])
 
  const unicodeRangeMyanmar = selectedMyanmarFontClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Myanmar')).map((script, index) => (script.unicode_range));
  const neutralScope = ' ';
  const regexMyanmar = RegExp(`[^(${unicodeRangeMyanmar}||${neutralScope})]`, 'ugm');

  const handleExampleMyanmar = (event) => {
    const result = event.target.value.replace(regexMyanmar, '');
    setExampleMyanmar(result);
  };

  const myanmarFontSize = '250%';
  const myanmarLineHeight = '1.5';

  const fontFeaturesMyanmarProps = {
    myanmarFontSettings, // [] then default then selected
    setMyanmarFontSettings,
    ffsId: myanmarFfsId,
    fontName: myanmarFontName,
    fontDisplayName: myanmarFontDisplayName,
    fontSize: myanmarFontSize,
    lineHeight: myanmarLineHeight,
    isGraphiteAssumed,
    ffsArr: myanmarFfsArr,  // Options
    exampleRegex: regexMyanmar,
    setExampleMyanmar,
  };

  /** Generate assumed filenames */
  const myanmarFfsCssFilename = myanmarFontName.toString().replace(/^P/, 'p');

  const exampleMyanmarDir = useDetectDir({ text: exampleMyanmar, isMarkup: false, ratioThreshold: .51 });

  const myanmarCss = (
    <div>
      <br />
      <b><em>To update <em>{myanmarFontDisplayName}</em> font-feature-settings, set all instances of font-features-settings, -moz-font-feature-settings, and -webkit-font-feature-setting...:</em></b>
      <ul>
        <li> <b>in: </b><em>~/pankosmia_working/{myanmarFfsCssFilename}.css</em>' <b>to:</b> {myanmarFfsCss};</li>
      </ul>
    </div>
  );

  const showMyanmarFeatures = myanmarFfsArr.length > 0;
  const showMyanmarTextArea = selectedMyanmarFontClassSubstr.length !== 0;
  const showMyanmarCss = myanmarFontSettings.length > 0 && selectedMyanmarFontClassSubstr.length !== 0;

  return (
    <Grid2 container spacing={2}>
      <Grid2  size={12}>
        <div item style={{maxWidth: 350, padding: "1.25em 0 0 0"}}>
            <Box sx={{minWidth: 350}}>
              <Stack direction="row">
                <FormControl fullWidth style={{maxWidth: 325}} size="small">
                    <InputLabel id="select-myanmar-font-label" htmlFor="select-myanmar-font-id" sx={sx.inputLabel}>
                      {doI18n("pages:core-settings:select_myanmarscriptfont", i18nRef.current)}
                    </InputLabel>
                    <Select
                        variant="outlined"
                        labelId="select-myanmar-font-label"
                        name="select-myanmar-font-name"
                        inputProps={{
                            id: "select-myanmar-font-id",
                        }}
                        value={selectedMyanmarFontClassSubstr}
                        label={doI18n("pages:core-settings:select_myanmarscriptfont", i18nRef.current)}
                        onChange={handleChangeMyanmar}
                        sx={sx.select}
                    >
                      {WebFontsSelectableMyanmar}
                    </Select>
                </FormControl>
                {showMyanmarFeatures && <FontFeaturesMyanmar {...fontFeaturesMyanmarProps} />}
              </Stack>
            </Box>
        </div>
      </Grid2>
      <Grid2 size={12}>
        <Box sx={{ padding: '10pt 0 5pt 20pt' }}>
          {showMyanmarTextArea &&
            <TextareaAutosize
              minRows={2}
              id="exampleMyanmar"
              type="text"
              onChange={handleExampleMyanmar}
              name="exampleMyanmar"
              style= {{
                fontFamily: myanmarFontName,
                fontSize: myanmarFontSize,
                lineHeight: myanmarLineHeight,
                width: '50%',
                borderColor: "purple",
                direction: exampleMyanmarDir,
                fontFeatureSettings: myanmarFfsCss !== '' && myanmarFfsCss,
                MozFontFeatureSettings: myanmarFfsCss !== '' && myanmarFfsCss,
                WebkitFontFeatureSettings: myanmarFfsCss !== '' && myanmarFfsCss,
                }}
              value={showMyanmarTextArea && exampleMyanmar}
            />
          }
          {showMyanmarCss ? myanmarCss : (<div><br /></div>)}
        </Box>
      </Grid2>
      <br />
    </Grid2>
  );
}

BlendedFontMyanmarSelection.propTypes = {
  /** Is Graphite Assumed? */
  isGraphiteAssumed: PropTypes.bool.isRequired,
  /** Selected Myanmar Font Class Substring */
  selectedMyanmarFontClassSubstr: PropTypes.string,
  /** Set Selected Myanmar Font Class Substring */
  setSelectedMyanmarFontClassSubstr: PropTypes.func.isRequired,
  /** Myanmar Font Name */
  myanmarFontName: PropTypes.string,
  /** Set Myanmar Font Name */
  setMyanmarFontName: PropTypes.func.isRequired,
  /** Available Myanmar Fonts */
  webFontsMyanmar: PropTypes.array.isRequired,
  /** Font-feature-settings (Ffs) id for settings lookup */
  myanmarFfsId: PropTypes.array.isRequired,
  /** Set Font-feature-settings (Ffs) id for settings lookup */
  setMyanmarFfsId: PropTypes.func.isRequired,
  /** Font Display Name for font-feature-settings heading */
  myanmarFontDisplayName: PropTypes.array.isRequired,
  /** Set Font Display Name for font-feature-settings heading and shortlist */
  setMyanmarFontDisplayName: PropTypes.func.isRequired,
  /** Font Feature Settings Array (Options)*/
  ffsArr: PropTypes.array.isRequired, // Current unicode ranges always result in 'punc 2' (Latin); Removing that option for now (awamiFfsLessPunc)
  /** Unicode ranges for RegEx by script type for editable examples */
  unicodeRanges: PropTypes.array.isRequired,
};