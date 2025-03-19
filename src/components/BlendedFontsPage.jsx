import { useState, useEffect, useContext } from "react"

import PropTypes from 'prop-types';
import { Tabs, Tab, Toolbar, Box } from "@mui/material";
import { fontFeatureSettings, useAssumeGraphite } from "font-detect-rhl";
import { postEmptyJson, typographyContext, i18nContext as I18nContext, doI18n } from "pithekos-lib";

import BlendedFontArabicUrduSelection from "./BlendedFontArabicUrduSelection";
import BlendedFontMyanmarSelection from "./BlendedFontMyanmarSelection";
import BlendedFontGreekSelection from "./BlendedFontGreekSelection";
import BlendedFontHebrewSelection from "./BlendedFontHebrewSelection"; 
import BlendedFontOtherFallbackSelection from "./BlendedFontOtherFallbackSelection";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BlendedFontsPage() {
  const { typographyRef } = useContext(typographyContext);
  const { i18nRef } = useContext(I18nContext);

  // Tabs
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Font Class Substrings
  const [selectedHebrewFontClassSubstr, setSelectedHebrewFontClassSubstr] = useState('');
  const [selectedGreekFontClassSubstr, setSelectedGreekFontClassSubstr] = useState('');
  const [selectedMyanmarFontClassSubstr, setSelectedMyanmarFontClassSubstr] = useState('');
  const [selectedArabicUrduFontClassSubstr, setSelectedArabicUrduFontClassSubstr] = useState('');
  const [selectedOtherFontClassSubstr, setSelectedOtherFontClassSubstr] = useState('');
  const [selectedFallbackFontClassSubstr, setSelectedFallbackFontClassSubstr] = useState('');
  const [selectedFontClass, setSelectedFontClass] = useState('');

  // An array of id's extracted from the font_set string in user_settings.json
  const [fontClassIdsArr, setFontClassIdsArr] = useState([]);

  // Font Name
  const [hebrewFontName, setHebrewFontName] = useState([]);
  const [greekFontName, setGreekFontName] = useState([]);
  const [myanmarFontName, setMyanmarFontName] = useState([]);
  const [arabicUrduFontName, setArabicUrduFontName] = useState([]);
  const [otherFontName, setOtherFontName] = useState([]);
  const [fallbackFontName, setFallbackFontName] = useState([]);

  // Font-feature-settings (Ffs) id for settings lookup, where applicable
  const [myanmarFfsId, setMyanmarFfsId] = useState([]);
  // const [arabicUrduFfsId, setArabicUrduFfsId] = useState([]); // in Child
  // const [hebrewFfsId, setHebrewFfsId] = useState([]); // Not currently applicable
  // const [greekFfsId, setGreekFfsId] = useState([]); // Not currently applicable
  const [otherFfsId, setOtherFfsId] = useState([]);
  const [fallbackFfsId, setFallbackFfsId] = useState([]);

  // Font Display Name for font-feature-settings heading, where applicable
  const [myanmarFontDisplayName, setMyanmarFontDisplayName] = useState([]);
  // const [arabicUrduFontDisplayName, setArabicUrduFontDisplayName] = useState([]); // in Child
  // const [hebrewFontDisplayName, setHebrewFontDisplayName] = useState([]); // Not currently applicable
  // const [greekFontDisplayName, setGreekFontDisplayName] = useState([]); // Not currently applicable
  const [otherFontDisplayName, setOtherFontDisplayName] = useState([]);
  const [fallbackFontDisplayName, setFallbackFontDisplayName] = useState([]);

  // Available fonts
  const [webFontsHebrew, setWebFontsHebrew] = useState([]);
  const [webFontsGreek, setWebFontsGreek] = useState([]);
  const [webFontsMyanmar, setWebFontsMyanmar] = useState([]);
  const [webFontsArabicUrdu, setWebFontsArabicUrdu] = useState([]);
  const [webFontsOther, setWebFontsOther] = useState([]);
  const [webFontsFallback, setWebFontsFallback] = useState([]);

  /** 
   * Arrays of Fonts by script type:
   *  id = substring in font_class
   *  settings_id = lookup in fontFeatureSettings
   */
  useEffect(() => {
    if (!webFontsHebrew.length) {
      setWebFontsHebrew([
        { display_name: 'Ezra SIL 2.51', id: 'Pankosmia-EzraSIL', name: 'Pankosmia-Ezra SIL', settings_id: '' },
        { display_name: 'Ezra SIL SR 2.51', id: 'Pankosmia-EzraSILSR',name: 'Pankosmia-Ezra SIL SR', settings_id: '' },
      ]);
    }
  },[webFontsHebrew.length]);
  useEffect(() => {
    if (!webFontsGreek.length) {
      setWebFontsGreek([
        { display_name: 'Cardo 2011', id: 'Pankosmia-Cardo', name: 'Pankosmia-Cardo', settings_id: '' },
        { display_name: 'Galatia SIL 2.1', id: 'Pankosmia-GalatiaSIL', name: 'Pankosmia-Galatia SIL', settings_id: '' },
      ]);
    }
  },[webFontsGreek.length]);
  useEffect(() => {
    if (!webFontsMyanmar.length) {
      setWebFontsMyanmar([
        { display_name: 'Padauk 5.100', id: 'Pankosmia-Padauk', name: 'Pankosmia-Padauk', settings_id: 'Padauk' },
        { display_name: 'Padauk Book 5.100', id: 'Pankosmia-PadaukBook', name: 'Pankosmia-Padauk Book', settings_id: 'Padauk' },
      ]);
    }
  },[webFontsMyanmar.length]);
  useEffect(() => {
    if (!webFontsArabicUrdu.length) {
      setWebFontsArabicUrdu([
        { display_name: 'Awami Nastaliq 3.300*', id: 'Pankosmia-AwamiNastaliqPankosmia-NotoNastaliqUrdu', name: 'Pankosmia-Awami Nastaliq', settings_id: 'Awami Nastaliq' },
        { display_name: 'Awami Nastaliq Medium 3.300*', id: 'Pankosmia-AwamiNastaliqMediumPankosmia-NotoNastaliqUrdu', name: 'Pankosmia-Awami Nastaliq Medium', settings_id: 'Awami Nastaliq' },
        { display_name: 'Awami Nastaliq Semi Bold 3.300*', id: 'Pankosmia-AwamiNastaliqSemiBoldPankosmia-NotoNastaliqUrdu', name: 'Pankosmia-Awami Nastaliq Semi Bold', settings_id: 'Awami Nastaliq' },
        { display_name: 'Awami Nastaliq Extra Bold 3.300*', id: 'Pankosmia-AwamiNastaliqExtraBoldPankosmia-NotoNastaliqUrdu', name: 'Pankosmia-Awami Nastaliq Extra Bold', settings_id: 'Awami Nastaliq' },
        { display_name: 'Noto Naskh Arabic 2.018', id: 'Pankosmia-NotoNaskhArabic', name: 'Pankosmia-Noto Naskh Arabic', settings_id: '' },
      ]);
    }
  },[webFontsArabicUrdu.length]);
  useEffect(() => {
    if (!webFontsOther.length) {
      setWebFontsOther([
        { display_name: 'Andika 6.200', id: 'Pankosmia-Andika', name: 'Pankosmia-Andika', settings_id: 'Andika' },
        { display_name: 'Charis SIL 6.200', id: 'Pankosmia-CharisSIL', name: 'Pankosmia-Charis SIL', settings_id: 'Charis SIL' },
        { display_name: 'Open Sans 3.003', id: 'Pankosmia-OpenSans', name: 'Pankosmia-Open Sans', settings_id: '' },
        { display_name: 'Roboto 2.137', id: 'Pankosmia-Roboto', name: 'Pankosmia-Roboto', settings_id: '' },
        { display_name: 'Roboto Black 2.137', id: 'Pankosmia-RobotoBlack', name: 'Pankosmia-Roboto Black', settings_id: '' },
        { display_name: 'Roboto Light 2.137', id: 'Pankosmia-RobotoLight', name: 'Pankosmia-Roboto Light', settings_id: '' },
        { display_name: 'Roboto Medium 2.137', id: 'Pankosmia-RobotoMedium', name: 'Pankosmia-Roboto Medium', settings_id: '' },
        { display_name: 'Roboto Thin 2.137', id: 'Pankosmia-RobotoThin', name: 'Pankosmia-Roboto Thin', settings_id: '' },
      ]);
    }
  },[webFontsOther.length]);
  useEffect(() => {
    if (!webFontsFallback.length) {
      setWebFontsFallback([
        { display_name: 'Gentium Plus 6.200', id: 'Pankosmia-GentiumPlus', name: 'Pankosmia-Gentium Plus', settings_id: 'Gentium Plus' },
        { display_name: 'Gentium Book Plus 6.200', id: 'Pankosmia-GentiumBookPlus', name: 'Pankosmia-Gentium Book Plus', settings_id: 'Gentium Plus' },
      ]);
    }
  },[webFontsFallback.length]);

  /** Add not-applicable options to script-specific arrays above. */
  const otherFallbackFont = doI18n("pages:core-settings:other-fallback", i18nRef.current);
  useEffect(() => {
    if (otherFallbackFont !== 'pages:core-settings:other-fallback') {
      setWebFontsHebrew(previous => [...previous, { display_name: '- ' + otherFallbackFont + ' -', id: '', name: '', settings_id: '' },])
      setWebFontsGreek(previous => [...previous, { display_name: '- ' + otherFallbackFont + ' -', id: '', name: '', settings_id: '' },])
      setWebFontsMyanmar(previous => [...previous, { display_name: '- ' + otherFallbackFont + ' -', id: '', name: '', settings_id: '' },])
      setWebFontsArabicUrdu(previous => [...previous, { display_name: '- ' + otherFallbackFont + ' -', id: '', name: '', settings_id: '' },])
    }
  },[otherFallbackFont]);

  /** Add not-applicable options to the "Other" array above. */
  const fallbackFont = doI18n("pages:core-settings:fallback", i18nRef.current);
  useEffect(() => {
    if (fallbackFont !== 'pages:core-settings:fallback') {
      setWebFontsOther(previous => [...previous, { display_name: '- ' + fallbackFont + ' -', id: '', name: fallbackFont, settings_id: '' },])
    }
  },[fallbackFont])

  const fontSetStr = 'fonts-' + selectedGreekFontClassSubstr + selectedHebrewFontClassSubstr + selectedMyanmarFontClassSubstr + selectedArabicUrduFontClassSubstr + selectedOtherFontClassSubstr + selectedFallbackFontClassSubstr;

  /** For each script type, set INITIAL:
   *    - font class name substrings
   *    - font-feature-settings id (FfsId), where applicable
   *    - font display name for font-feature-settings heading, where applicable
   *    - font name
   */
  useEffect(() => {
    if (fontSetStr === 'fonts-') {
    // Hebrew
      const selectedHebrewId = webFontsHebrew.filter(item => fontClassIdsArr.includes(item.id)).map((font, index) => (font.id));
      setSelectedHebrewFontClassSubstr(selectedHebrewId);
      // const selectedHebrewSettingsId = webFontsHebrew.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.settings_id));
      // setHebrewFfsId(selectedHebrewSettingsId);
      // const hebrewDisplayName = webFontsHebrew.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.display_name));
      // setHebrewFontDisplayName(hebrewDisplayName);
      const hebrewName = webFontsHebrew.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.name));
      setHebrewFontName(hebrewName);
    // Greek
      const selectedGreekId = webFontsGreek.filter(item => fontClassIdsArr.includes(item.id)).map((font, index) => (font.id));
      setSelectedGreekFontClassSubstr(selectedGreekId);
      // const selectedGreekSettingsId = webFontsGreek.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.settings_id));
      // setGreekFfsId(selectedGreekSettingsId);
      // const greekDisplayName = webFontsGreek.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.display_name));
      // setGreekFontDisplayName(greekDisplayName);
      const greekName = webFontsGreek.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.name));
      setGreekFontName(greekName);
    // Myanmar
      const selectedMyanmarId = webFontsMyanmar.filter(item => fontClassIdsArr.includes(item.id)).map((font, index) => (font.id));
      setSelectedMyanmarFontClassSubstr(selectedMyanmarId);
      const selectedMyanmarSettingsId = webFontsMyanmar.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.settings_id));
      setMyanmarFfsId(selectedMyanmarSettingsId);
      const myanmarDisplayName = webFontsMyanmar.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.display_name));
      setMyanmarFontDisplayName(myanmarDisplayName);
      const myanmarName = webFontsMyanmar.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.name));
      setMyanmarFontName(myanmarName);
    // Arabic/Urdu (*** Pattern differs because Awami Nastaliq requires Graphite ***)
      const selectedArabicUrduIds = webFontsArabicUrdu.map((font, index) => (font.id));
      const fontClassAwamiToAdj = fontClassIdsArr.filter(item => item.includes('AwamiNastaliq'));
      const selectedArabicUrduIdAdj = (fontClassAwamiToAdj !== '' ? fontClassAwamiToAdj + 'Pankosmia-NotoNastaliqUrdu' : fontClassIdsArr.filter(item => selectedArabicUrduIds.includes(item)));
      const selectedArabicUrduAdjId = (selectedArabicUrduIdAdj === 'Pankosmia-NotoNastaliqUrdu' ? '' : selectedArabicUrduIdAdj);
      setSelectedArabicUrduFontClassSubstr(selectedArabicUrduAdjId);
    // Other
      const selectedOtherId = webFontsOther.filter(item => fontClassIdsArr.includes(item.id)).map((font, index) => (font.id));
      setSelectedOtherFontClassSubstr(selectedOtherId);
      const selectedOtherSettingsId = webFontsOther.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.settings_id));
      setOtherFfsId(selectedOtherSettingsId);
      const otherDisplayName = webFontsOther.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.display_name));
      setOtherFontDisplayName(otherDisplayName);
      const otherName = webFontsOther.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.name));
      setOtherFontName(otherName);
    // Fallback
      const selectedFallbackId = webFontsFallback.filter(item => fontClassIdsArr.includes(item.id)).map((font, index) => (font.id));
      setSelectedFallbackFontClassSubstr(selectedFallbackId);
      const selectedFallbackSettingsId = webFontsFallback.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.settings_id));
      setFallbackFfsId(selectedFallbackSettingsId);
      const fallbackDisplayName = webFontsFallback.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.display_name));
      setFallbackFontDisplayName(fallbackDisplayName);
      const fallbackName = webFontsFallback.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.name));
      setFallbackFontName(fallbackName);
    }
  },[fontClassIdsArr, fontSetStr, webFontsArabicUrdu, webFontsFallback, webFontsGreek, webFontsHebrew, webFontsMyanmar, webFontsOther]);

  useEffect( () => {
    setSelectedFontClass(typographyRef.current.font_set);
  },[typographyRef]);

  // Font Settings Changes
  useEffect( () => {
    if(fontSetStr !== 'fonts-' && typographyRef.current.font_set !== fontSetStr) {
      //#[post("/typography/<font_set>/<size>/<direction>")]
      const typographyStr = fontSetStr + '/medium/ltr';
      postEmptyJson(`/settings/typography/${typographyStr}`).then();
      setSelectedFontClass(fontSetStr);
    }
  },[fontSetStr, typographyRef])

  /** Create an array of font_class substrings, consisting of Font Class IDs extracted from the font_set string. */
  useEffect(() => {
    if (!fontClassIdsArr.length) {
      setFontClassIdsArr(selectedFontClass !== '' ? selectedFontClass.replace(/Pankosmia-/g,'~Pankosmia-').split('~') : []);
    }
  },[selectedFontClass, fontClassIdsArr.length])

  // All available font-feature-setting (Ffs)
  const [ffsArr, setFfsArr] = useState([]);

  /** Awami Nastaliq requires Graphite, and Padauk has some Graphite-only features. */
  const isGraphiteAssumed = useAssumeGraphite({}); // Tests for Firefox; A different test can show if Graphite is enabled.
  useEffect(() => {
    if (!ffsArr.length) {
      setFfsArr(isGraphiteAssumed ? fontFeatureSettings : fontFeatureSettings.filter((name) => name.name !== 'Awami Nastaliq'));
    }
  },[isGraphiteAssumed, ffsArr.length]);

  /** Unicode ranges for RegEx by script type for editable examples */
  const unicodeRanges = [
    { name: 'Hebrew', id: 'hebrew', unicode_range: '\\u{0590}-\\u{05FF}\\u{FB00}-\\u{FB4F}' },
    { name: 'Greek', id: 'greek', unicode_range: '\\u{0370}-\\u{03FF}\\u{1F00}-\\u{1FFF}\\u{10140}-\\u{1018F}' },
    { name: 'Myanmar', id: 'myanmar', unicode_range: '\\u{1000}-\\u{109F}\\u{AA60}-\\u{AA7F}\\u{A9E0}-\\u{A9FF}\\u{116D0}-\\u{116FF}\\u{A900}-\\u{A92F}' },
    { name: 'Arabic/Urdu', id: 'arabic-urdu', unicode_range: '\\u{0600}-\\u{06FF}\\u{0750}-\\u{077F}\\u{FB50}-\\u{FDFF}\\u{FE70}-\\u{FEFF}\\u{08A0}-\\u{08FF}\\u{0870}-\\u{089F}\\u{10EC0}-\\u{10EFF}' },
    { name: 'Other', id: 'other', unicode_range: '' },
    { name: 'Fallback', id: 'fallback', unicode_range: '' },
  ];

  const isOtherOn = fontSetStr !== 'fonts-' && selectedOtherFontClassSubstr.length !== 0;

  /** ArabicUrdu props patterns differ from other scripts*/
  const blendedFontArabicUrduSelectionProps = {
    isGraphiteAssumed,
    selectedArabicUrduFontClassSubstr,
    setSelectedArabicUrduFontClassSubstr,
    arabicUrduFontName,
    setArabicUrduFontName,
    webFontsArabicUrdu,
    ffsArr,
    unicodeRanges,
  };
  const blendedFontMyanmarSelectionProps = {
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
  };
  const blendedFontGreekSelectionProps = {
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
  };
  const blendedFontHebrewSelectionProps = {
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
  };
  const blendedFontOtherFallbackSelectionProps = {
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
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Box>
          If you have made font changes that you want to take effect every time you start pithekos, then:
          <ol style={{ marginTop: 0 }}>
            <li>Change font_set in <em>~/pankosmia_working/user_settings.json to:</em> "font_set": "{selectedFontClass}",</li>
            <li>Save <em>~/pankosmia_working/user_settings.json, restart the Pithekos web server, and reopen <em>http://localhost:8000</em> in Firefox.</em></li>
          </ol>
        </Box>
      </Box>
      <Box sx={{ border: '1 0', borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"        
          aria-label="basic tabs example"
        >
          <Tab label={doI18n("pages:core-settings:select_presets", i18nRef.current)} {...a11yProps(0)} />
          <Tab label={doI18n("pages:core-settings:select_arabicurduscript", i18nRef.current)} {...a11yProps(1)} />
          <Tab label={doI18n("pages:core-settings:select_myanmarscript", i18nRef.current)} {...a11yProps(2)} />
          <Tab label={doI18n("pages:core-settings:select_greekscript", i18nRef.current)} {...a11yProps(3)} />
          <Tab label={doI18n("pages:core-settings:select_hebrewscript", i18nRef.current)} {...a11yProps(4)} />
          <Tab label={doI18n("pages:core-settings:select_otherscripts", i18nRef.current)} {...a11yProps(5)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <h1>{doI18n("pages:core-settings:select_presets", i18nRef.current)}</h1>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <h1>{doI18n("pages:core-settings:select_arabicurduscript", i18nRef.current)}</h1>
        <div key="toolbar" style={{ width: '100%' }} >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box>
              {fontSetStr !== 'fonts-' && <BlendedFontArabicUrduSelection {...blendedFontArabicUrduSelectionProps} />}
            </Box>
          </Toolbar>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <h1>{doI18n("pages:core-settings:select_myanmarscript", i18nRef.current)}</h1>
        <div key="toolbar" style={{ width: '100%' }} >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box>
              {fontSetStr !== 'fonts-' && <BlendedFontMyanmarSelection {...blendedFontMyanmarSelectionProps} />}
            </Box>
          </Toolbar>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <h1>{doI18n("pages:core-settings:select_greekscript", i18nRef.current)}</h1>
        <div key="toolbar" style={{ width: '100%' }} >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box>
              {fontSetStr !== 'fonts-' && <BlendedFontGreekSelection {...blendedFontGreekSelectionProps} />}
            </Box>
          </Toolbar>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <h1>{doI18n("pages:core-settings:select_hebrewscript", i18nRef.current)}</h1>
        <div key="toolbar" style={{ width: '100%' }} >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box>
              {fontSetStr !== 'fonts-' && <BlendedFontHebrewSelection {...blendedFontHebrewSelectionProps} />}
            </Box>
          </Toolbar>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <h1>{doI18n("pages:core-settings:select_otherscripts", i18nRef.current)}</h1>
        <div key="toolbar" style={{ width: '100%' }} >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box>
              {fontSetStr !== 'fonts-' && <BlendedFontOtherFallbackSelection {...blendedFontOtherFallbackSelectionProps} />}
            </Box>
          </Toolbar>
        </div>
      </CustomTabPanel>
    </Box>
  );
}
