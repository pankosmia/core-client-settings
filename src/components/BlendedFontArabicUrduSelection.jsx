import { useEffect, useContext, useState } from "react";

import PropTypes from 'prop-types';
import { Grid2, Box, InputLabel, MenuItem, FormControl, Select, Stack, TextareaAutosize, Tooltip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import WarningSharpIcon from '@mui/icons-material/WarningSharp';
import RestoreIcon from '@mui/icons-material/Restore';
import { i18nContext as I18nContext, doI18n, postEmptyJson } from "pithekos-lib";
import { useDetectDir } from "font-detect-rhl";
import { renderToString } from 'react-dom/server';

import FontMenuItem from "./FontMenuItem";
import sx from "./Selection.styles";
import FontFeaturesArabicUrdu from "./FontFeaturesArabicUrdu";

export default function BlendedFontArabicUrduSelection(blendedFontArabicUrduSelectionProps) {
  const { i18nRef } = useContext(I18nContext);
  const {
    isGraphite,
    isFirefox,
    selectedArabicUrduFontClassSubstr,
    setSelectedArabicUrduFontClassSubstr,
    arabicUrduFontName,
    setArabicUrduFontName,
    webFontsArabicUrdu,
    arabicUrduFontDisplayName,
    setArabicUrduFontDisplayName,
    ffsArr,
    unicodeRanges,
    adjSelectedFontClass,
    isArabicUrduDefault,
    isAwami,
    handleClickArabicUrdu,
  } = blendedFontArabicUrduSelectionProps;

  // Available font font-feature-setting (Ffs) by selection
  const [arabicUrduFfsArr, setArabicUrduFfsArr] = useState([]);
  
  // Font-feature-settings (Ffs) id (for lookup)
  const [arabicUrduFfsId, setArabicUrduFfsId] = useState([]);
 
  // Default settings (ideally the user's last settings, eventually, maybe...)
  const [arabicUrduFontSettings, setArabicUrduFontSettings] = useState([]);
 
  // Font-feature-settings CSS (string for application in css)
  const [arabicUrduFfsCss, setArabicUrduFfsCss] = useState('');

  // Example text
  const [exampleArabicUrdu, setExampleArabicUrdu] = useState('في البدء كان الكلمة والكلمة كان عند الله وكان الكلمة الله.');
  
  /** Set INITIAL...
   *    - font display name for font-feature-settings heading
   *    - font name
   *    - and where applicable:
   *        - font-feature-settings id (FfsId)
   *        - options array (FfsArr)
   */
  useEffect(() => {
    // Arabic/Urdu (*** Pattern differs because Awami Nastaliq requires Graphite ***)
      const selectedArabicUrduSettingsId = webFontsArabicUrdu.filter(font => font.id === selectedArabicUrduFontClassSubstr)?.map((font, index) => (font.settings_id));
      setArabicUrduFfsId(selectedArabicUrduSettingsId);
      const selectedArabicUrduSettingsArr = ffsArr.filter(item => selectedArabicUrduSettingsId.includes(item.name));
      setArabicUrduFfsArr(selectedArabicUrduSettingsArr);
  },[ffsArr, selectedArabicUrduFontClassSubstr, setArabicUrduFontName, webFontsArabicUrdu]);

  /** For each script type, set SELECTED...
   *    - font class name substrings
   *    - reset font settings array and css string
   *    - font display name
   *    - font name
   *    - and where applicable:
   *        - font-feature-settings id (FfsId)
   *        - options array (FfsArr)
   */
  // Arabic/Urdu
    const handleChangeArabicUrdu = (event) => {
      setSelectedArabicUrduFontClassSubstr(event.target.value);
      setArabicUrduFontSettings([]);
      setArabicUrduFfsCss('');
      const selectedArabicUrduSettingId = webFontsArabicUrdu.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
      setArabicUrduFfsId(selectedArabicUrduSettingId);
      const selectedArabicUrduSettingsId = ffsArr.filter(item => selectedArabicUrduSettingId.includes(item.name));
      setArabicUrduFfsArr(selectedArabicUrduSettingsId);
      const arabicUrduDisplayName = webFontsArabicUrdu.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
      setArabicUrduFontDisplayName(arabicUrduDisplayName);
      const arabicUrduName = webFontsArabicUrdu.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
      setArabicUrduFontName(arabicUrduName);
    };

  const fontMenuItemProps = {
    adjSelectedFontClass,
  };
  
  /** Build dropdown menus */
  const WebFontsSelectableArabicUrdu =
    webFontsArabicUrdu.map((font, index) => (
      <MenuItem key={index} value={font.id} dense>
        <FontMenuItem font={font} {...fontMenuItemProps} />
      </MenuItem>
    ));

  const ffsArabicUrduFontName = arabicUrduFontName.toString().replace('Pankosmia-','').replace(/ /g, '_');

  useEffect(() => {
    if (arabicUrduFontSettings.length !== 0) {
      const arabicUrduFfsJsx = arabicUrduFontSettings.map((obj, index) => (
        <div key={index}> ~{obj.name}~ {obj.value},</div>
      ));
      // convert jsx return to string and remove html tags and attributes (e.g., div's)
      const arabicUrduFfsStr = renderToString(arabicUrduFfsJsx).replace(/(<([^>]+)>)/ig, '').replace(/~/gm, '"');
      // remove the last comma, change ~ to "
      const arabicUrduFfsCssStrNext = arabicUrduFfsStr.substring(0, arabicUrduFfsStr.length - 1).replace(/~/gm, '"');
      const nextArabicUrduFfsCssArr = arabicUrduFfsCssStrNext.split(',');
      if (arabicUrduFfsCss !== '') {
        const prevArabicUrduFfsCssArr = arabicUrduFfsCss.split(',');
        for (let i = 0; i < prevArabicUrduFfsCssArr.length; i++) {
          if (nextArabicUrduFfsCssArr[i] !== prevArabicUrduFfsCssArr[i]) {
            const ffsStr = renderToString(nextArabicUrduFfsCssArr[i]).replace(' &quot;','').replace('&quot; ','/')
            postEmptyJson(`/settings/typography-feature/${ffsArabicUrduFontName}/${ffsStr}`).then();
          }
        }
      }
      setArabicUrduFfsCss(arabicUrduFfsCssStrNext);
    }
  },[arabicUrduFfsCss, arabicUrduFontSettings, ffsArabicUrduFontName])

  const unicodeRangeArabicUrdu = selectedArabicUrduFontClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Arabic/Urdu')).map((script, index) => (script.unicode_range));
  const neutralScope = ' ';
  const regexArabicUrdu = RegExp(`[^(${unicodeRangeArabicUrdu}||${neutralScope})]`, 'ugm');

  const handleExampleArabicUrdu = (event) => {
    const result = event.target.value.replace(regexArabicUrdu, '');
    setExampleArabicUrdu(result);
  };

  const arabicUrduFontSize = '250%';
  const arabicUrduLineHeight = '3';

  const fontFeaturesArabicUrduProps = {
    arabicUrduFontSettings, // [] then default then selected
    setArabicUrduFontSettings,
    ffsId: arabicUrduFfsId,
    fontName: arabicUrduFontName,
    fontDisplayName: arabicUrduFontDisplayName,
    fontSize: arabicUrduFontSize,
    lineHeight: arabicUrduLineHeight,
    isGraphite,
    // ffsArr: arabicUrduFfsArr, // Removing wdsp and punc for now by using awamiFfsLessPuncAndSpacing.
    exampleRegex: regexArabicUrdu,
    setExampleArabicUrdu,
  };

  const exampleArabicUrduDir = useDetectDir({ text: exampleArabicUrdu, isMarkup: false, ratioThreshold: .51 });

  const adjHeight = arabicUrduFontDisplayName.toString().includes("Awami Nastaliq") ? '1.75' : '';

  const showArabicUrduFeatures = arabicUrduFfsArr.length > 0;
  const showArabicUrduTextArea = selectedArabicUrduFontClassSubstr.length !== 0;

  return (
    <Grid2 container spacing={2}>
      <Grid2  size={12}>
        <div className={adjSelectedFontClass} style={{ fontSize: '100%' }}>
          <Stack direction="row">
            <FormControl fullWidth style={{maxWidth: 400, minWidth: 400}} size="small">
                <InputLabel shrink={true} id="select-arabic-urdu-font-label" htmlFor="select-arabic-urdu-font-id" sx={sx.inputLabel}>
                  {doI18n("pages:core-settings:select_arabicurduscriptfont", i18nRef.current)}
                </InputLabel>
                <Select
                    variant="outlined"
                    labelId="select-arabic-urdu-font-label"
                    name="select-arabic-urdu-font-name"
                    inputProps={{
                        id: "select-arabic-urdu-font-id",
                    }}
                    displayEmpty={true}
                    value={selectedArabicUrduFontClassSubstr}
                    label={doI18n("pages:core-settings:select_arabicurduscriptfont", i18nRef.current)}
                    onChange={handleChangeArabicUrdu}
                    sx={sx.select}
                    style={{lineheight: adjHeight}}
                >
                  {WebFontsSelectableArabicUrdu}
                </Select>
            </FormControl>
            {!isArabicUrduDefault &&  
              <Tooltip 
                title={`Awami Nastaliq (${doI18n("pages:core-settings:replace_awami", i18nRef.current)})`}
                placement="right"
                arrow
              >
                <RestoreIcon color="secondary" sx={{ cursor: 'pointer' }} style={{ paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickArabicUrdu} />
              </Tooltip>
            }
            {isAwami &&
              <Tooltip
                title={(isGraphite ? doI18n("pages:core-settings:replace_awami", i18nRef.current) : doI18n("pages:core-settings:replace_noto", i18nRef.current)) + " " + (!isGraphite && isFirefox ? doI18n("pages:core-settings:graphite_is_off", i18nRef.current) : doI18n("pages:core-settings:graphite_support", i18nRef.current))}
                placement="right"
              >
                { isGraphite ?
                  <InfoIcon color="secondary" style={{paddingLeft: '9px', margin: 'auto 0' }} />
                  :
                  <WarningSharpIcon style={{ color: 'yellow', background: 'black', margin: 'auto 9px' }} />
                }
              </Tooltip>
            }
            {isAwami && !isGraphite && <div className={adjSelectedFontClass} style={{margin: 'auto 0',fontSize: '100%' }}>{doI18n("pages:core-settings:best_with", i18nRef.current)} {isFirefox && doI18n("pages:core-settings:graphite_is_off", i18nRef.current)}</div>}
            {showArabicUrduFeatures && <FontFeaturesArabicUrdu {...fontFeaturesArabicUrduProps} />}
          </Stack>
        </div>
      </Grid2>
      <Grid2 size={12}>
        <Box sx={{ padding: '10pt 0 5pt 20pt' }}>
          {showArabicUrduTextArea &&
            <TextareaAutosize
              minRows={isGraphite ? 4 : 1}
              id="exampleArabicUrdu"
              type="text"
              onChange={handleExampleArabicUrdu}
              name="exampleArabicUrdu"
              color="primary"
              style= {{
                fontFamily: `${arabicUrduFontName}, 'Pankosmia-Noto Nastaliq Urdu'`,
                fontSize: arabicUrduFontSize,
                lineHeight: arabicUrduLineHeight,
                width: '50%',
                direction: exampleArabicUrduDir,
                fontFeatureSettings: arabicUrduFfsCss !== '' && arabicUrduFfsCss,
                MozFontFeatureSettings: arabicUrduFfsCss !== '' && arabicUrduFfsCss,
                WebkitFontFeatureSettings: arabicUrduFfsCss !== '' && arabicUrduFfsCss,
                }}
              value={showArabicUrduTextArea && exampleArabicUrdu}
            />
          }
        </Box>
      </Grid2>
      <br />
    </Grid2>
  );
}

BlendedFontArabicUrduSelection.propTypes = {
  /** Is Rendering in Graphite? */
  isGraphite: PropTypes.bool.isRequired,
  /** Is the Browser Firefox? */
  isFirefox: PropTypes.bool.isRequired,
  /** Selected Arabic/Urdu Font Class Substring */
  selectedArabicUrduFontClassSubstr: PropTypes.string,
  /** Set Selected Arabic/Urdu Font Class Substring */
  setSelectedArabicUrduFontClassSubstr: PropTypes.func.isRequired,
  /** Arabic / Urdu Font Name */
  arabicUrduFontName: PropTypes.string,
  /** Set Arabic/Urdu Font Name */
  setArabicUrduFontName: PropTypes.func.isRequired,
  /** Available Arabic / Urdu Fonts */
  webFontsArabicUrdu: PropTypes.array.isRequired,
  /** Font Display Name for font-feature-settings heading */
  arabicUrduFontDisplayName: PropTypes.array.isRequired,
  /** Set Font Display Name for font-feature-settings heading and shortlist */
  setArabicUrduFontDisplayName: PropTypes.func.isRequired,
  /** Font Feature Settings Array (Options)*/
  ffsArr: PropTypes.array.isRequired, // Removing wdsp and punc for now by using awamiFfsLessPuncAndSpacing.
  /** Unicode ranges for RegEx by script type for editable examples */
  unicodeRanges: PropTypes.array.isRequired,
  /** Selected Font Class */
  adjSelectedFontClass: PropTypes.string.isRequired,
  /** Is ArabicUrdu set to Default? */
  isArabicUrduDefault: PropTypes.bool.isRequired,
  /** Is an Awami Nastaliq Font Selected? */
  isAwami: PropTypes.bool.isRequired,
  /** Handle Click Arabic Urdu Reset to Default */
  handleClickArabicUrdu:  PropTypes.func.isRequired,
};