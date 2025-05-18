import { useEffect, useContext, useState } from "react";

import PropTypes from 'prop-types';
import { Grid2, Box, InputLabel, MenuItem, FormControl, Select, Stack, TextareaAutosize, Tooltip } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import InfoIcon from '@mui/icons-material/Info';
import { i18nContext as I18nContext, doI18n, postEmptyJson } from "pithekos-lib";
import { useDetectDir } from "font-detect-rhl";
import { renderToString } from 'react-dom/server';

import FontMenuItem from "./FontMenuItem";
import sx from "./Selection.styles";
import FontFeaturesMyanmar from "./FontFeaturesMyanmar";

export default function BlendedFontMyanmarSelection(blendedFontMyanmarSelectionProps) {
  const { i18nRef } = useContext(I18nContext);
  const {
    isGraphite,
    isFirefox,
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
    adjSelectedFontClass,
    isMyanmarDefault,
    isPadauk,
    handleClickMyanmar,
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
   *    - reset font settings array and css string
   *    - font display name for font-feature-settings heading
   *    - font name
   *    - and where applicable:
   *        - font-feature-settings id (FfsId)
   *        - options array (FfsArr)
   */
    const handleChangeMyanmar = (event) => {
      setSelectedMyanmarFontClassSubstr(event.target.value);
      setMyanmarFontSettings([]);
      setMyanmarFfsCss('');
      const selectedMyanmarSettingId = webFontsMyanmar.filter(font => font.id === event.target.value).map((font, index) => (font.settings_id));
      setMyanmarFfsId(selectedMyanmarSettingId);
      const selectedMyanmarSettingsId = ffsArr.filter(item => selectedMyanmarSettingId.includes(item.name));
      setMyanmarFfsArr(selectedMyanmarSettingsId);
      const myanmarDisplayName = webFontsMyanmar.filter(font => font.id === event.target.value).map((font, index) => (font.display_name));
      setMyanmarFontDisplayName(myanmarDisplayName);
      const myanmarName = webFontsMyanmar.filter(font => font.id === event.target.value).map((font, index) => (font.name));
      setMyanmarFontName(myanmarName);
    };

  const fontMenuItemProps = {
    adjSelectedFontClass,
  };

  /** Build dropdown menus */
  const WebFontsSelectableMyanmar =
    webFontsMyanmar.map((font, index) => (
        <MenuItem key={index} value={font.id} dense>
            <FontMenuItem font={font} {...fontMenuItemProps} />
        </MenuItem>
    ));
  
  const ffsMyanmarFontName = myanmarFontName.toString().replace('Pankosmia-','').replace(/ /g, '_');

  useEffect(() => {
    if (myanmarFontSettings.length !== 0) {
      const myanmarFfsJsx = myanmarFontSettings.map((obj, index) => (
        <div key={index}> ~{obj.name}~ {obj.value},</div>
      ));
      // convert jsx return to string and remove html tags and attributes (e.g., div's)
      const myanmarFfsStr = renderToString(myanmarFfsJsx).replace(/(<([^>]+)>)/ig, '').replace(/~/gm, '"');
      // remove the last comma, change ~ to "
      const myanmarFfsCssStrNext = myanmarFfsStr.substring(0, myanmarFfsStr.length - 1).replace(/~/gm, '"');
      const nextMyanmarFfsCssArr = myanmarFfsCssStrNext.split(',');
      if (myanmarFfsCss !== '') {
        const prevMyanmarFfsCssArr = myanmarFfsCss.split(',');
        for (let i = 0; i < prevMyanmarFfsCssArr.length; i++) {
          if (nextMyanmarFfsCssArr[i] !== prevMyanmarFfsCssArr[i]) {
            const ffsStr = renderToString(nextMyanmarFfsCssArr[i]).replace(' &quot;','').replace('&quot; ','/')
            postEmptyJson(`/settings/typography-feature/${ffsMyanmarFontName}/${ffsStr}`).then();
          }
        }
      }
      setMyanmarFfsCss(myanmarFfsCssStrNext);
    }
  },[ffsMyanmarFontName, myanmarFfsCss, myanmarFontSettings])
 
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
    isGraphite,
    ffsArr: myanmarFfsArr,  // Options
    exampleRegex: regexMyanmar,
    setExampleMyanmar,
  };

  const exampleMyanmarDir = useDetectDir({ text: exampleMyanmar, isMarkup: false, ratioThreshold: .51 });

  const showMyanmarFeatures = myanmarFfsArr.length > 0;
  const showMyanmarTextArea = selectedMyanmarFontClassSubstr.length !== 0;

  return (
    <Grid2 container spacing={2}>
      <Grid2  size={12}>
        <div className={adjSelectedFontClass} style={{ fontSize: '100%'}}>
          <Stack direction="row">
            <FormControl fullWidth style={{maxWidth: 400, minWidth: 400}} size="small">
                <InputLabel shrink={true} id="select-myanmar-font-label" htmlFor="select-myanmar-font-id" sx={sx.inputLabel}>
                  {doI18n("pages:core-settings:select_myanmarscriptfont", i18nRef.current)}
                </InputLabel>
                <Select
                    variant="outlined"
                    labelId="select-myanmar-font-label"
                    name="select-myanmar-font-name"
                    inputProps={{
                        id: "select-myanmar-font-id",
                    }}
                    displayEmpty={true}
                    value={selectedMyanmarFontClassSubstr.toString()}
                    label={doI18n("pages:core-settings:select_myanmarscriptfont", i18nRef.current)}
                    onChange={handleChangeMyanmar}
                    sx={sx.select}
                >
                  {WebFontsSelectableMyanmar}
                </Select>
            </FormControl>
            {!isMyanmarDefault &&  
              <Tooltip 
                title="Padauk"
                placement="right"
                arrow
              >
                <RestoreIcon color="secondary" sx={{ cursor: 'pointer' }} style={{ paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickMyanmar} />
              </Tooltip>
            }
            {!isGraphite && isPadauk &&
              <Tooltip
                title={doI18n("pages:core-settings:padauk_tip", i18nRef.current) + " " + (isFirefox ? doI18n("pages:core-settings:graphite_is_off", i18nRef.current) : doI18n("pages:core-settings:graphite_support", i18nRef.current))}
                placement="right"
              >
                <InfoIcon color="secondary" style={{ paddingLeft: '9px', margin: 'auto 0' }} />
              </Tooltip>
            }
            {showMyanmarFeatures && <FontFeaturesMyanmar {...fontFeaturesMyanmarProps} />}
          </Stack>
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
              color="secondary"
              style= {{
                fontFamily: myanmarFontName,
                fontSize: myanmarFontSize,
                lineHeight: myanmarLineHeight,
                width: '50%',
                direction: exampleMyanmarDir,
                fontFeatureSettings: myanmarFfsCss !== '' && myanmarFfsCss,
                MozFontFeatureSettings: myanmarFfsCss !== '' && myanmarFfsCss,
                WebkitFontFeatureSettings: myanmarFfsCss !== '' && myanmarFfsCss,
                }}
              value={showMyanmarTextArea && exampleMyanmar}
            />
          }
        </Box>
      </Grid2>
      <br />
    </Grid2>
  );
}

BlendedFontMyanmarSelection.propTypes = {
  /** Is Rendering in Graphite? */
  isGraphite: PropTypes.bool.isRequired,
  /** Is the Browser Firefox? */
  isFirefox: PropTypes.bool.isRequired,
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
  /** Selected Font Class */
  adjSelectedFontClass: PropTypes.string.isRequired,
  /** Is Myanmar set to Default? */
  isMyanmarDefault: PropTypes.bool.isRequired,
  /** Is a Padaul Font Selected? */
  isPadauk: PropTypes.bool.isRequired,
  /** Handle Click Myanmar Reset to Default */
  handleClickMyanmar:  PropTypes.func.isRequired,
};