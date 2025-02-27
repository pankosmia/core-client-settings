import { useEffect, useContext, useState } from "react";

import PropTypes from 'prop-types';
import { Grid2, FormHelperText, Box, InputLabel, MenuItem, FormControl, Select, Stack, TextareaAutosize } from "@mui/material";
import { i18nContext as I18nContext, doI18n } from "pithekos-lib";
import { fontFeatureSettings, useAssumeGraphite, useDetectDir } from "font-detect-rhl";
import { renderToString } from 'react-dom/server';

import FontMenuItem from "./FontMenuItem";
import sx from "./Selection.styles";
import FontFeaturesHebrew from "./FontFeaturesHebrew";
import FontFeaturesGreek from "./FontFeaturesGreek";
import FontFeaturesMyanmar from "./FontFeaturesMyanmar";
import FontFeaturesArabicUrdu from "./FontFeaturesArabicUrdu";
import FontFeaturesOther from "./FontFeaturesOther";
import FontFeaturesFallback from "./FontFeaturesFallback";

export default function BlendedFontSelection(blendedFontSelectionProps) {
  const i18n = useContext(I18nContext);
  const {
    activeFontClass,
    setSelectedFontClass,
    selectedHebrewFontClassSubstr,
    setSelectedHebrewFontClassSubstr,
    selectedGreekFontClassSubstr,
    setSelectedGreekFontClassSubstr,
    selectedMyanmarFontClassSubstr,
    setSelectedMyanmarFontClassSubstr,
    selectedArabicUrduFontClassSubstr,
    setSelectedArabicUrduFontClassSubstr,
    selectedOtherFontClassSubstr,
    setSelectedOtherFontClassSubstr,
    selectedFallbackFontClassSubstr,
    setSelectedFallbackFontClassSubstr,
    hebrewFontName,
    setHebrewFontName,
    greekFontName,
    setGreekFontName,
    myanmarFontName,
    setMyanmarFontName,
    arabicUrduFontName,
    setArabicUrduFontName,
    otherFontName,
    setOtherFontName,
    fallbackFontName,
    setFallbackFontName,
  } = blendedFontSelectionProps;

  // An array of id's extracted from the font_set string in user_settings.json
  const [fontClassIdsArr, setFontClassIdsArr] = useState([]);

  // Font classname substrings extracted from the font_set string in user_settings.json
  const [activeHebrewFontClassSubstr, setActiveHebrewFontClassSubstr] = useState('');
  const [activeGreekFontClassSubstr, setActiveGreekFontClassSubstr] = useState('');
  const [activeMyanmarFontClassSubstr, setActiveMyanmarFontClassSubstr] = useState('');
  const [activeArabicUrduFontClassSubstr, setActiveArabicUrduFontClassSubstr] = useState('');
  const [activeOtherFontClassSubstr, setActiveOtherFontClassSubstr] = useState('');
  const [activeFallbackFontClassSubstr, setActiveFallbackFontClassSubstr] = useState('');
  
  // Font Display Name
  const [hebrewFontDisplayName, setHebrewFontDisplayName] = useState([]);
  const [greekFontDisplayName, setGreekFontDisplayName] = useState([]);
  const [myanmarFontDisplayName, setMyanmarFontDisplayName] = useState([]);
  const [arabicUrduFontDisplayName, setArabicUrduFontDisplayName] = useState([]);
  const [otherFontDisplayName, setOtherFontDisplayName] = useState([]);
  const [fallbackFontDisplayName, setFallbackFontDisplayName] = useState([]);

  // Is à change selected?
  const [isHebrewSelected, setIsHebrewSelected] = useState(false);
  const [isGreekSelected, setIsGreekSelected] = useState(false);
  const [isMyanmarSelected, setIsMyanmarSelected] = useState(false);
  const [isArabicUrduSelected, setIsArabicUrduSelected] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [isFallbackSelected, setIsFallbackSelected] = useState(false);

  /** There is not a possibility of Hebrew script or Greek script font-feature-settings the time of programming this page.
   *  However, this is set up such that if they were added they would work.
   */
  // Available font font-feature-setting (Ffs) by selection
  const [hebrewFfsArr, setHebrewFfsArr] = useState([]);
  const [greekFfsArr, setGreekFfsArr] = useState([]);
  const [myanmarFfsArr, setMyanmarFfsArr] = useState([]);
  const [arabicUrduFfsArr, setArabicUrduFfsArr] = useState([]);
  const [otherFfsArr, setOtherFfsArr] = useState([]);
  const [fallbackFfsArr, setFallbackFfsArr] = useState([]);
  
  // Available fonts
  const [webFontsHebrew, setWebFontsHebrew] = useState([]);
  const [webFontsGreek, setWebFontsGreek] = useState([]);
  const [webFontsMyanmar, setWebFontsMyanmar] = useState([]);
  const [webFontsArabicUrdu, setWebFontsArabicUrdu] = useState([]);
  const [webFontsOther, setWebFontsOther] = useState([]);
  const [webFontsFallback, setWebFontsFallback] = useState([]);

  // All available font-feature-setting (Ffs)
  const [ffsArr, setFfsArr] = useState([]);

  // Font-feature-settings (Ffs) id (for lookup)
  const [hebrewFfsId, setHebrewFfsId] = useState([]);
  const [greekFfsId, setGreekFfsId] = useState([]);
  const [myanmarFfsId, setMyanmarFfsId] = useState([]);
  const [arabicUrduFfsId, setArabicUrduFfsId] = useState([]);
  const [otherFfsId, setOtherFfsId] = useState([]);
  const [fallbackFfsId, setFallbackFfsId] = useState([]);

  // For settings as set by user (initially default settings)
  const [hebrewFontSettings, setHebrewFontSettings] = useState([]);
  const [greekFontSettings, setGreekFontSettings] = useState([]);
  const [myanmarFontSettings, setMyanmarFontSettings] = useState([]);
  const [arabicUrduFontSettings, setArabicUrduFontSettings] = useState([]);
  const [otherFontSettings, setOtherFontSettings] = useState([]);
  const [fallbackFontSettings, setFallbackFontSettings] = useState([]);

  // Font-feature-settings CSS (string for application in css)
  const [hebrewFfsCss, setHebrewFfsCss] = useState('');
  const [greekFfsCss, setGreekFfsCss] = useState('');
  const [myanmarFfsCss, setMyanmarFfsCss] = useState('');
  const [arabicUrduFfsCss, setArabicUrduFfsCss] = useState('');
  const [otherFfsCss, setOtherFfsCss] = useState('');
  const [fallbackFfsCss, setFallbackFfsCss] = useState('');

  // Example text
  const [exampleHebrew, setExampleHebrew] = useState('וַיֹּ֣אמֶר אֱלֹהִ֗ים יִקָּו֨וּ הַמַּ֜יִם מִתַּ֤חַת הַשָּׁמַ֙יִם֙ אֶל־מָק֣וֹם אֶחָ֔ד וְתֵרָאֶ֖ה הַיַּבָּשָׁ֑ה וַֽיְהִי־כֵֽן׃');
  const [exampleGreek, setExampleGreek] = useState('Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.');
  const [exampleMyanmar, setExampleMyanmar] = useState('အစဦး၌ နှုတ်ကပတ်တော်ရှိ၏။ နှုတ်ကပတ်တော်သည် ဘုရားသခင်နှင့်အတူရှိ၏။ နှုတ်ကပတ်တော် သည်လည်း ဘုရားသခင်ဖြစ်တော်မူ၏။');
  const [exampleArabicUrdu, setExampleArabicUrdu] = useState('في البدء كان الكلمة والكلمة كان عند الله وكان الكلمة الله.');
  const [exampleOtherFallback, setExampleOtherFallback] = useState('Au commencement... / In the beginning...');

  /** Awami Nastaliq requires Graphite, and Padauk has some Graphite-only features. */
  const isGraphiteAssumed = useAssumeGraphite({}); // Tests for Firefox; A different test can show if Graphite is enabled.
  useEffect(() => {
    if (!ffsArr.length) {
      setFfsArr(isGraphiteAssumed ? fontFeatureSettings : fontFeatureSettings.filter((name) => name.name !== 'Awami Nastaliq'));
    }
  },[isGraphiteAssumed, ffsArr.length]);
  
  /** Create an array of active font_class substrings */
  useEffect(() => {
    if (!fontClassIdsArr.length) {
      setFontClassIdsArr(activeFontClass !== undefined ? activeFontClass.replace(/Pankosmia-/g,'~Pankosmia-').split('~') : []);
    }
  },[activeFontClass, fontClassIdsArr.length])

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
  },[i18n, webFontsGreek.length]);
  useEffect(() => {
    if (!webFontsMyanmar.length) {
      setWebFontsMyanmar([
        { display_name: 'Padauk 5.100', id: 'Pankosmia-Padauk', name: 'Pankosmia-Padauk', settings_id: 'Padauk' },
        { display_name: 'Padauk Book 5.100', id: 'Pankosmia-PadaukBook', name: 'Pankosmia-Padauk Book', settings_id: 'Padauk' },
      ]);
    }
  },[i18n, webFontsMyanmar.length]);
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
  },[i18n, webFontsArabicUrdu.length]);
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
  },[i18n, webFontsOther.length]);
  useEffect(() => {
    if (!webFontsFallback.length) {
      setWebFontsFallback([
        { display_name: 'Gentium Plus 6.200', id: 'Pankosmia-GentiumPlus', name: 'Pankosmia-Gentium Plus', settings_id: 'Gentium Plus' },
        { display_name: 'Gentium Book Plus 6.200', id: 'Pankosmia-GentiumBookPlus', name: 'Pankosmia-Gentium Book Plus', settings_id: 'Gentium Plus' },
      ]);
    }
  },[webFontsFallback.length]);

  /** Add not-applicable options to script-specific arrays above. */
  const otherFallbackFont = doI18n("pages:core-settings:other-fallback", i18n);
  useEffect(() => {
    if (otherFallbackFont !== 'pages:core-settings:other-fallback') {
      setWebFontsHebrew(previous => [...previous, { display_name: '- ' + otherFallbackFont + ' -', id: '', name: '', settings_id: '' },])
      setWebFontsGreek(previous => [...previous, { display_name: '- ' + otherFallbackFont + ' -', id: '', name: '', settings_id: '' },])
      setWebFontsMyanmar(previous => [...previous, { display_name: '- ' + otherFallbackFont + ' -', id: '', name: '', settings_id: '' },])
      setWebFontsArabicUrdu(previous => [...previous, { display_name: '- ' + otherFallbackFont + ' -', id: '', name: '', settings_id: '' },])
    }
  },[otherFallbackFont]);

  /** Add not-applicable options to the "Other" array above. */
  const fallbackFont = doI18n("pages:core-settings:fallback", i18n);
  useEffect(() => {
    if (fallbackFont !== 'pages:core-settings:fallback') {
      setWebFontsOther(previous => [...previous, { display_name: '- ' + fallbackFont + ' -', id: '', name: '', settings_id: '' },])
    }
  },[fallbackFont])
  
  /** For each script type, set ACTIVE...
   *    - font class name substrings
   *    - font display name
   *    - font name
   *    - and where applicable:
   *        - font-feature-settings id (FfsId)
   *        - options array (FfsArr)
   */
  useEffect(() => {
    // Hebrew
      const activeHebrewId = webFontsHebrew.filter(item => fontClassIdsArr.includes(item.id)).map((font, index) => (font.id));
      setActiveHebrewFontClassSubstr(activeHebrewId);
      const activeHebrewSettingsId = webFontsHebrew.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.settings_id));
      setHebrewFfsId(activeHebrewSettingsId);
      const activeHebrewSettingsArr = ffsArr.filter(item => activeHebrewSettingsId.includes(item.name));
      setHebrewFfsArr(activeHebrewSettingsArr);
      const hebrewDisplayName = webFontsHebrew.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.display_name));
      setHebrewFontDisplayName(hebrewDisplayName);
      const hebrewName = webFontsHebrew.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.name));
      setHebrewFontName(hebrewName);
    // Greek
      const activeGreekId = webFontsGreek.filter(item => fontClassIdsArr.includes(item.id)).map((font, index) => (font.id));
      setActiveGreekFontClassSubstr(activeGreekId);
      const activeGreekSettingsId = webFontsGreek.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.settings_id));
      setGreekFfsId(activeGreekSettingsId);
      const activeGreekSettingsArr = ffsArr.filter(item => activeGreekSettingsId.includes(item.name));
      setGreekFfsArr(activeGreekSettingsArr);
      const greekDisplayName = webFontsGreek.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.display_name));
      setGreekFontDisplayName(greekDisplayName);
      const greekName = webFontsGreek.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.name));
      setGreekFontName(greekName);
    // Myanmar
      const activeMyanmarId = webFontsMyanmar.filter(item => fontClassIdsArr.includes(item.id)).map((font, index) => (font.id));
      setActiveMyanmarFontClassSubstr(activeMyanmarId);
      const activeMyanmarSettingsId = webFontsMyanmar.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.settings_id));
      setMyanmarFfsId(activeMyanmarSettingsId);
      const activeMyanmarSettingsArr = ffsArr.filter(item => activeMyanmarSettingsId.includes(item.name));
      setMyanmarFfsArr(activeMyanmarSettingsArr);
      const myanmarDisplayName = webFontsMyanmar.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.display_name));
      setMyanmarFontDisplayName(myanmarDisplayName);
      const myanmarName = webFontsMyanmar.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.name));
      setMyanmarFontName(myanmarName);
    // Arabic/Urdu (*** Pattern differs because Awami Nastaliq requires Graphite ***)
      const activeArabicUrduIds = webFontsArabicUrdu.map((font, index) => (font.id));
      const fontClassAwamiToAdj = fontClassIdsArr.filter(item => item.includes('AwamiNastaliq'));
      const activeArabicUrduIdAdj = (fontClassAwamiToAdj !== '' ? fontClassAwamiToAdj + 'Pankosmia-NotoNastaliqUrdu' : fontClassIdsArr.filter(item => activeArabicUrduIds.includes(item)));
      const activeArabicUrduAdjId = (activeArabicUrduIdAdj === 'Pankosmia-NotoNastaliqUrdu' ? '' : activeArabicUrduIdAdj);
      setActiveArabicUrduFontClassSubstr(activeArabicUrduAdjId);
      const activeArabicUrduSettingsId = webFontsArabicUrdu.filter((font) => font.id === activeArabicUrduAdjId)?.map((font, index) => (font.settings_id));
      setArabicUrduFfsId(activeArabicUrduSettingsId);
      const activeArabicUrduSettingsArr = ffsArr.filter(item => activeArabicUrduSettingsId.includes(item.name));
      setArabicUrduFfsArr(activeArabicUrduSettingsArr);
      const arabicUrduDisplayName = webFontsArabicUrdu.filter((font) => font.id === activeArabicUrduAdjId)?.map((font, index) => (font.display_name));
      setArabicUrduFontDisplayName(arabicUrduDisplayName);
      const arabicUrduName = webFontsArabicUrdu.filter((font) => font.id === activeArabicUrduAdjId)?.map((font, index) => (font.name));
      setArabicUrduFontName(arabicUrduName);
    // Other
      const activeOtherId = webFontsOther.filter(item => fontClassIdsArr.includes(item.id)).map((font, index) => (font.id));
      setActiveOtherFontClassSubstr(activeOtherId);
      const activeOtherSettingsId = webFontsOther.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.settings_id));
      setOtherFfsId(activeOtherSettingsId);
      const activeOtherSettingsArr = ffsArr.filter(item => activeOtherSettingsId.includes(item.name));
      setOtherFfsArr(activeOtherSettingsArr);
      const otherDisplayName = webFontsOther.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.display_name));
      setOtherFontDisplayName(otherDisplayName);
      const otherName = webFontsOther.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.name));
    setOtherFontName(otherName);
    // Fallback
      const activeFallbackId = webFontsFallback.filter(item => fontClassIdsArr.includes(item.id)).map((font, index) => (font.id));
      setActiveFallbackFontClassSubstr(activeFallbackId);
      const activeFallbackSettingsId = webFontsFallback.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.settings_id));
      setFallbackFfsId(activeFallbackSettingsId);
      const activeFallbackSettingsArr = ffsArr.filter(item => activeFallbackSettingsId.includes(item.name));
      setFallbackFfsArr(activeFallbackSettingsArr);
      const fallbackDisplayName = webFontsFallback.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.display_name));
      setFallbackFontDisplayName(fallbackDisplayName);
      const fallbackName = webFontsFallback.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.name));
      setFallbackFontName(fallbackName);
  },[ffsArr, fontClassIdsArr, setArabicUrduFontName, setFallbackFontName, setGreekFontName, setHebrewFontName, setMyanmarFontName, setOtherFontName, webFontsArabicUrdu, webFontsFallback, webFontsGreek, webFontsHebrew, webFontsMyanmar, webFontsOther]);

  const isOtherOn = activeOtherFontClassSubstr !== '' && selectedOtherFontClassSubstr !== '';

  /** Set new selections while maintaining an active set that match font_set */
  const hebrewClassSubstr = isHebrewSelected ? selectedHebrewFontClassSubstr : activeHebrewFontClassSubstr;
  const greekClassSubstr = isGreekSelected ? selectedGreekFontClassSubstr : activeGreekFontClassSubstr;
  const myanmarClassSubstr = isMyanmarSelected ? selectedMyanmarFontClassSubstr : activeMyanmarFontClassSubstr;
  const arabicUrduClassSubstr = isArabicUrduSelected ? selectedArabicUrduFontClassSubstr : activeArabicUrduFontClassSubstr;
  const otherClassSubstr = isOtherSelected ? selectedOtherFontClassSubstr : activeOtherFontClassSubstr;
  const fallbackClassSubstr = isFallbackSelected ? selectedFallbackFontClassSubstr : activeFallbackFontClassSubstr;

  const reAssembled2ActiveFontClass = `fonts-${greekClassSubstr}${hebrewClassSubstr}${myanmarClassSubstr}${arabicUrduClassSubstr}${otherClassSubstr}${fallbackClassSubstr}`
  const [ranOnce, setRanOnce] = useState(false);
  const [isActiveLoaded, setIsActiveLoaded] = useState(false);

  useEffect (() => {
    if (!ranOnce && activeFontClass === reAssembled2ActiveFontClass) {
        setIsActiveLoaded(true);
        setRanOnce(true);
      }
  },[activeFontClass, ranOnce, reAssembled2ActiveFontClass])

  /** For each script type, set SELECTED..
   *    - font class
   *    - font class name substrings
   *    - font display name
   *    - font name
   *    - and where applicable:
   *        - font-feature-settings id (FfsId)
   *        - options array (FfsArr)
   */
  // Hebrew
    const handleChangeHebrew = (event) => {
      setIsHebrewSelected(true);
      setSelectedHebrewFontClassSubstr(event.target.value);
      setSelectedFontClass('fonts-' + greekClassSubstr + event.target.value + myanmarClassSubstr + arabicUrduClassSubstr + otherClassSubstr + fallbackClassSubstr);
      const selectedHebrewSettingId = webFontsHebrew.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
      setHebrewFfsId(selectedHebrewSettingId);
      const selectedHebrewSettingsId = ffsArr.filter(item => selectedHebrewSettingId.includes(item.name));
      setHebrewFfsArr(selectedHebrewSettingsId);
      const hebrewDisplayName = webFontsHebrew.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
      setHebrewFontDisplayName(hebrewDisplayName);
      const hebrewName = webFontsHebrew.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
      setHebrewFontName(hebrewName);
    };
  // Greek
    const handleChangeGreek = (event) => {
      setIsGreekSelected(true);
      setSelectedGreekFontClassSubstr(event.target.value);
      setSelectedFontClass('fonts-' + event.target.value + hebrewClassSubstr + myanmarClassSubstr + arabicUrduClassSubstr + otherClassSubstr + fallbackClassSubstr);
      const selectedGreekSettingId = webFontsGreek.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
      setGreekFfsId(selectedGreekSettingId);
      const selectedGreekSettingsId = ffsArr.filter(item => selectedGreekSettingId.includes(item.name));
      setGreekFfsArr(selectedGreekSettingsId);
      const greekDisplayName = webFontsGreek.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
      setGreekFontDisplayName(greekDisplayName);
      const greekName = webFontsGreek.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
      setGreekFontName(greekName);
    };
  // Myanmar
    const handleChangeMyanmar = (event) => {
      setIsMyanmarSelected(true);
      setSelectedMyanmarFontClassSubstr(event.target.value);
      setSelectedFontClass('fonts-' + greekClassSubstr + hebrewClassSubstr + event.target.value + arabicUrduClassSubstr + otherClassSubstr + fallbackClassSubstr);
      const selectedMyanmarSettingId = webFontsMyanmar.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
      setMyanmarFfsId(selectedMyanmarSettingId);
      const selectedMyanmarSettingsId = ffsArr.filter(item => selectedMyanmarSettingId.includes(item.name));
      setMyanmarFfsArr(selectedMyanmarSettingsId);
      const myanmarDisplayName = webFontsMyanmar.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
      setMyanmarFontDisplayName(myanmarDisplayName);
      const myanmarName = webFontsMyanmar.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
      setMyanmarFontName(myanmarName);
    };
  // Arabic/Urdu (*** Pattern differs because Awami Nastaliq requires Graphite ***)
    const handleChangeArabicUrdu = (event) => {
      setIsArabicUrduSelected(true);
      setSelectedArabicUrduFontClassSubstr(event.target.value);
      setSelectedFontClass('fonts-' + greekClassSubstr + hebrewClassSubstr + myanmarClassSubstr + event.target.value + otherClassSubstr + fallbackClassSubstr);
      const selectedArabicUrduSettingId = webFontsArabicUrdu.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
      setArabicUrduFfsId(selectedArabicUrduSettingId);
      const selectedArabicUrduSettingsId = ffsArr.filter(item => selectedArabicUrduSettingId.includes(item.name));
      setArabicUrduFfsArr(selectedArabicUrduSettingsId);
      const arabicUrduDisplayName = webFontsArabicUrdu.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
      setArabicUrduFontDisplayName(arabicUrduDisplayName);
      const arabicUrduName = webFontsArabicUrdu.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
      setArabicUrduFontName(arabicUrduName);
    };
  // Other
    const handleChangeOther = (event) => {
      setIsOtherSelected(true);
      setSelectedOtherFontClassSubstr(event.target.value);
      setSelectedFontClass('fonts-' + greekClassSubstr + hebrewClassSubstr + myanmarClassSubstr + arabicUrduClassSubstr + event.target.value + fallbackClassSubstr);
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
      setIsFallbackSelected(true);
      setSelectedFallbackFontClassSubstr(event.target.value);
      setSelectedFontClass('fonts-' + greekClassSubstr + hebrewClassSubstr + myanmarClassSubstr + arabicUrduClassSubstr + otherClassSubstr + event.target.value);
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
  const WebFontsSelectableHebrew =
    webFontsHebrew.map((font, index) => (
        <MenuItem key={index} value={font.id} dense>
            <FontMenuItem font={font}/>
        </MenuItem>
    ));
  const WebFontsSelectableGreek =
  webFontsGreek.map((font, index) => (
      <MenuItem key={index} value={font.id} dense>
          <FontMenuItem font={font}/>
      </MenuItem>
  ));
  const WebFontsSelectableMyanmar =
    webFontsMyanmar.map((font, index) => (
        <MenuItem key={index} value={font.id} dense>
            <FontMenuItem font={font}/>
        </MenuItem>
    ));
  const WebFontsSelectableArabicUrdu =
    webFontsArabicUrdu.map((font, index) => (
        <MenuItem key={index} value={font.id} dense>
            <FontMenuItem font={font}/>
        </MenuItem>
    ));
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
    if (hebrewFontSettings.length !== 0) {
      const hebrewFfsJsx = hebrewFontSettings.map((obj, index) => (
        <div key={index}> ~{obj.name}~ {obj.value},</div>
      ));
      // convert jsx return to string and remove html tags and attributes (e.g., div's)
      const hebrewFfsStr = renderToString(hebrewFfsJsx).replace(/(<([^>]+)>)/ig, '').replace(/~/gm, '"');
      // remove the last comma, change ~ to "
      setHebrewFfsCss(hebrewFfsStr.substring(0, hebrewFfsStr.length - 1).replace(/~/gm, '"'));
    } else {
      setHebrewFfsCss("");
    }
  },[hebrewFontSettings, setHebrewFfsCss])

  useEffect(() => {
    if (greekFontSettings.length !== 0) {
      const greekFfsJsx = greekFontSettings.map((obj, index) => (
        <div key={index}> ~{obj.name}~ {obj.value},</div>
      ));
      // convert jsx return to string and remove html tags and attributes (e.g., div's)
      const greekFfsStr = renderToString(greekFfsJsx).replace(/(<([^>]+)>)/ig, '').replace(/~/gm, '"');
      // remove the last comma, change ~ to "
      setGreekFfsCss(greekFfsStr.substring(0, greekFfsStr.length - 1).replace(/~/gm, '"'));
    } else {
      setGreekFfsCss("");
    }
  },[greekFontSettings, setGreekFfsCss])

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

  useEffect(() => {
    if (arabicUrduFontSettings.length !== 0) {
      const arabicUrduFfsJsx = arabicUrduFontSettings.map((obj, index) => (
        <div key={index}> ~{obj.name}~ {obj.value},</div>
      ));
      // convert jsx return to string and remove html tags and attributes (e.g., div's)
      const arabicUrduFfsStr = renderToString(arabicUrduFfsJsx).replace(/(<([^>]+)>)/ig, '').replace(/~/gm, '"');
      // remove the last comma, change ~ to "
      setArabicUrduFfsCss(arabicUrduFfsStr.substring(0, arabicUrduFfsStr.length - 1).replace(/~/gm, '"'));
    } else {
      setArabicUrduFfsCss("");
    }
  },[arabicUrduFontSettings, setArabicUrduFfsCss])

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
 
  /** Unicode ranges for RegEx by script type for editable examples */
  const unicodeRanges = [
    { name: 'Hebrew', id: 'hebrew', unicode_range: '\\u{0590}-\\u{05FF}\\u{FB00}-\\u{FB4F}' },
    { name: 'Greek', id: 'greek', unicode_range: '\\u{0370}-\\u{03FF}\\u{1F00}-\\u{1FFF}\\u{10140}-\\u{1018F}' },
    { name: 'Myanmar', id: 'myanmar', unicode_range: '\\u{1000}-\\u{109F}\\u{AA60}-\\u{AA7F}\\u{A9E0}-\\u{A9FF}\\u{116D0}-\\u{116FF}\\u{A900}-\\u{A92F}' },
    { name: 'Arabic/Urdu', id: 'arabic-urdu', unicode_range: '\\u{0600}-\\u{06FF}\\u{0750}-\\u{077F}\\u{FB50}-\\u{FDFF}\\u{FE70}-\\u{FEFF}\\u{08A0}-\\u{08FF}\\u{0870}-\\u{089F}\\u{10EC0}-\\u{10EFF}' },
    { name: 'Other', id: 'other', unicode_range: '' },
    { name: 'Fallback', id: 'fallback', unicode_range: '' },
  ];
  const unicodeRangeHebrew = hebrewClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Hebrew')).map((script, index) => (script.unicode_range));
  const unicodeRangeGreek = greekClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Greek')).map((script, index) => (script.unicode_range));
  const unicodeRangeMyanmar = myanmarClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Myanmar')).map((script, index) => (script.unicode_range));
  const unicodeRangeArabicUrdu = arabicUrduClassSubstr === '' ? '' : unicodeRanges.filter(item => (item.name === 'Arabic/Urdu')).map((script, index) => (script.unicode_range));

  const neutralScope = ' ';

  const regexHebrew = RegExp(`[^(${unicodeRangeHebrew}||${neutralScope})]`, 'ugm');
  const regexGreek = RegExp(`[^(${unicodeRangeGreek}||${neutralScope})]`, 'ugm');
  const regexMyanmar = RegExp(`[^(${unicodeRangeMyanmar}||${neutralScope})]`, 'ugm');
  const regexArabicUrdu = RegExp(`[^(${unicodeRangeArabicUrdu}||${neutralScope})]`, 'ugm');
  const regexOtherFallback = RegExp(`[${unicodeRangeHebrew}${unicodeRangeGreek}${unicodeRangeMyanmar}${unicodeRangeArabicUrdu}]`, 'ugm');

  const handleExampleHebrew = (event) => {
    const result = event.target.value.replace(regexHebrew, '');
    setExampleHebrew(result);    
  };
  const handleExampleGreek = (event) => {
    const result = event.target.value.replace(regexGreek, '');
    setExampleGreek(result);
  };
  const handleExampleMyanmar = (event) => {
    const result = event.target.value.replace(regexMyanmar, '');
    setExampleMyanmar(result);
  };
  const handleExampleArabicUrdu = (event) => {
    const result = event.target.value.replace(regexArabicUrdu, '');
    setExampleArabicUrdu(result);
  };
  // Other and Fallback are combined into one example
  const handleExampleOtherFallback = (event) => { 
    const result = event.target.value.replace(regexOtherFallback, '');
    setExampleOtherFallback(result);
  };

  const hebrewFontSize = '200%';
  const hebrewLineHeight = '1.4';
  const greekFontSize = '200%';
  const greekLineHeight = '1.3';
  const myanmarFontSize = '250%';
  const myanmarLineHeight = '1.5';
  const arabicUrduFontSize = '250%';
  const arabicUrduLineHeight = '3';
  const otherFontSize = '150%';
  const otherLineHeight = '1.2';
  const fallbackFontSize = '125%';
  const fallbackLineHeight = '1.4';

  const fontFeaturesHebrewProps = {
    hebrewFontSettings, // [] then default then selected
    setHebrewFontSettings,
    ffsId: hebrewFfsId,
    fontName: hebrewFontName,
    fontDisplayName: hebrewFontDisplayName,
    fontSize: hebrewFontSize,
    lineHeight: hebrewLineHeight,
    isGraphiteAssumed,
    ffsArr: hebrewFfsArr,  // Options
    exampleRegex: regexHebrew,
    setExampleHebrew,
  };
  const fontFeaturesGreekProps = {
    greekFontSettings, // [] then default then selected
    setGreekFontSettings,
    ffsId: greekFfsId,
    fontName: greekFontName,
    fontDisplayName: greekFontDisplayName,
    fontSize: greekFontSize,
    lineHeight: greekLineHeight,
    isGraphiteAssumed,
    ffsArr: greekFfsArr,  // Options
    exampleRegex: regexGreek,
    setExampleGreek,
  };
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
  const fontFeaturesArabicUrduProps = {
    arabicUrduFontSettings, // [] then default then selected
    setArabicUrduFontSettings,
    ffsId: arabicUrduFfsId,
    fontName: arabicUrduFontName,
    fontDisplayName: arabicUrduFontDisplayName,
    fontSize: arabicUrduFontSize,
    lineHeight: arabicUrduLineHeight,
    isGraphiteAssumed,
    ffsArr: arabicUrduFfsArr, // Possible options
    exampleRegex: regexArabicUrdu,
    setExampleArabicUrdu,
  };
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
  const hebrewFfsCssFilename = hebrewFontName.toString().replace(/^P/, 'p');
  const greekFfsCssFilename = greekFontName.toString().replace(/^P/, 'p');
  const myanmarFfsCssFilename = myanmarFontName.toString().replace(/^P/, 'p');
  const arabicUrduFfsCssFilename = arabicUrduFontName.toString().replace(/^P/, 'p');
  const otherFfsCssFilename = otherFontName.toString().replace(/^P/, 'p');
  const fallbackFfsCssFilename = fallbackFontName.toString().replace(/^P/, 'p');

  const exampleHebrewDir = useDetectDir({ text: exampleHebrew, isMarkup: false, ratioThreshold: .51 });
  const exampleGreekDir = useDetectDir({ text: exampleGreek, isMarkup: false, ratioThreshold: .51 });
  const exampleMyanmarDir = useDetectDir({ text: exampleMyanmar, isMarkup: false, ratioThreshold: .51 });
  const exampleArabicUrduDir = useDetectDir({ text: exampleArabicUrdu, isMarkup: false, ratioThreshold: .51 });
  // Other and Fallback are combined into a single example
  const exampleOtherFallbackDir = useDetectDir({ text: exampleOtherFallback, isMarkup: false, ratioThreshold: .51 });

  const hebrewCss = (
    <div>
      <br />
      <b><em>To update <em>{myanmarFontDisplayName}</em> font-feature-settings, set all instances of font-features-settings, -moz-font-feature-settings, and -webkit-font-feature-setting...:</em></b>
      <ul>
        <li> <b>in: </b><em>~/pankosmia_working/{hebrewFfsCssFilename}.css</em>' <b>to:</b> {hebrewFfsCss};</li>
      </ul>
    </div>
  );
  const greekCss = (
    <div>
      <br />
      <b><em>To update <em>{greekFontDisplayName}</em> font-feature-settings, set all instances of font-features-settings, -moz-font-feature-settings, and -webkit-font-feature-setting...:</em></b>
      <ul>
        <li> <b>in: </b><em>~/pankosmia_working/{greekFfsCssFilename}.css</em>' <b>to:</b> {greekFfsCss};</li>
      </ul>
    </div>
  );
  const myanmarCss = (
    <div>
      <br />
      <b><em>To update <em>{myanmarFontDisplayName}</em> font-feature-settings, set all instances of font-features-settings, -moz-font-feature-settings, and -webkit-font-feature-setting...:</em></b>
      <ul>
        <li> <b>in: </b><em>~/pankosmia_working/{myanmarFfsCssFilename}.css</em>' <b>to:</b> {myanmarFfsCss};</li>
      </ul>
    </div>
  );
  const arabicUrduCss = (
    <div>
      <br />
      <b><em>To update <em>{arabicUrduFontDisplayName}</em> font-feature-settings, set all instances of font-features-settings, -moz-font-feature-settings, and -webkit-font-feature-setting...:</em></b>
      <ul>
        <li> <b>in: </b><em>~/pankosmia_working/{arabicUrduFfsCssFilename}.css</em>' <b>to:</b> {arabicUrduFfsCss};</li>
      </ul>
    </div>
  );
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

  const showHebrewFeatures = isActiveLoaded && hebrewFfsArr.length > 0;
  const showHebrewTextArea = isActiveLoaded && hebrewClassSubstr !== '';
  const showHebrewCss = isActiveLoaded && hebrewFfsCss !== '' && hebrewClassSubstr !== '';

  const showGreekFeatures = isActiveLoaded && greekFfsArr.length > 0;
  const showGreekTextArea = isActiveLoaded && greekClassSubstr !== '';
  const showGreekCss = isActiveLoaded && greekFontSettings.length > 0 && greekClassSubstr !== '';

  const showMyanmarFeatures = isActiveLoaded && myanmarFfsArr.length > 0;
  const showMyanmarTextArea = isActiveLoaded && myanmarClassSubstr !== '';
  const showMyanmarCss = isActiveLoaded && myanmarFontSettings.length > 0 && myanmarClassSubstr !== '';

  const showArabicUrduFeatures = isActiveLoaded && arabicUrduFfsArr.length > 0;
  const showArabicUrduTextArea = isActiveLoaded && arabicUrduClassSubstr !== '';
  const showArabicUrduCss = isActiveLoaded && arabicUrduFontSettings.length > 0 && arabicUrduClassSubstr !== '';

  const showOtherFeatures = isActiveLoaded && otherFfsArr.length > 0;
  const showOtherCss = isActiveLoaded && otherFontSettings.length > 0 && otherClassSubstr !== '';

  const otherFallbackExampleFontName = isOtherOn ? `${otherFontName}, ${fallbackFontName}` : fallbackFontName;
  const otherFallbackExampleCss = isOtherOn ? otherFfsCss : fallbackFfsCss;

  const showFallbackFeatures = isActiveLoaded && fallbackFfsArr.length > 0;
  const showFallbackCss = isActiveLoaded && fallbackFfsArr.length > 0;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12} sx={{ borderTop: 1, borderColor: 'purple' }}>
        <h1>{doI18n("pages:core-settings:select_hebrewscriptfont", i18n)}</h1>
        <div item style={{maxWidth: 350, padding: "1.25em 0 0 0"}}>
            <Box sx={{minWidth: 350}}>
              <Stack direction="row">
                <FormControl fullWidth style={{maxWidth: 325}} size="small">
                    <InputLabel id="select-hebrew-font-label" htmlFor="select-hebrew-font-id" sx={sx.inputLabel}>
                      {doI18n("pages:core-settings:select_hebrewscriptfont", i18n)}
                    </InputLabel>
                    <Select
                        variant="outlined"
                        labelId="select-hebrew-font-label"
                        name="select-hebrew-font-name"
                        inputProps={{
                            id: "select-hebrew-font-id",
                        }}
                        value={isActiveLoaded && hebrewClassSubstr}
                        label={doI18n("pages:core-settings:select_hebrewscriptfont", i18n)}
                        onChange={handleChangeHebrew}
                        sx={sx.select}
                    >
                      {WebFontsSelectableHebrew}
                    </Select>
                </FormControl>
                {showHebrewFeatures && <FontFeaturesHebrew {...fontFeaturesHebrewProps} />}
              </Stack>
            </Box>
        </div>
      </Grid2>
      <Grid2 size={12} sx={{ borderBottom: 1, borderColor: 'purple' }}>
        <Box sx={{ padding: '10pt 0 5pt 20pt' }}>
          {showHebrewTextArea &&
            <TextareaAutosize
              minRows={2}
              id="exampleHebrew"
              type="text"
              onChange={handleExampleHebrew}
              name="exampleHebrew"
              style= {{
                fontFamily: isActiveLoaded && hebrewFontName,
                fontSize: hebrewFontSize,
                lineHeight: hebrewLineHeight,
                width: '50%',
                borderColor: "purple",
                direction: exampleHebrewDir,
                fontFeatureSettings: hebrewFfsCss !== '' && hebrewFfsCss,
                MozFontFeatureSettings: hebrewFfsCss !== '' && hebrewFfsCss,
                WebkitFontFeatureSettings: hebrewFfsCss !== '' && hebrewFfsCss,
                }}
              value={showHebrewTextArea && exampleHebrew}
            />
          }
          {showHebrewCss ? hebrewCss : (<div><br /></div>)}
        </Box>
      </Grid2>
      <Grid2  size={12}>
        <h1>{doI18n("pages:core-settings:select_greekscriptfont", i18n)}</h1>
        <div item style={{maxWidth: 350, padding: "1.25em 0 0 0"}}>
            <Box sx={{minWidth: 350}}>
              <Stack direction="row">
                  <FormControl fullWidth style={{maxWidth: 325}} size="small">
                      <InputLabel id="select-greek-font-label" htmlFor="select-greek-font-id" sx={sx.inputLabel}>
                        {doI18n("pages:core-settings:select_greekscriptfont", i18n)}
                      </InputLabel>
                      <Select
                          variant="outlined"
                          labelId="select-greek-font-label"
                          name="select-greek-font-name"
                          inputProps={{
                              id: "select-greek-font-id",
                          }}
                          value={isActiveLoaded && greekClassSubstr}
                          label={doI18n("pages:core-settings:select_greekscriptfont", i18n)}
                          onChange={handleChangeGreek}
                          sx={sx.select}
                      >
                        {WebFontsSelectableGreek}
                      </Select>
                  </FormControl>
                {showGreekFeatures && <FontFeaturesGreek {...fontFeaturesGreekProps} />}
              </Stack>
            </Box>
        </div>
      </Grid2>
      <Grid2 size={12} sx={{ borderBottom: 1, borderColor: 'purple' }}>
        <Box sx={{ padding: '10pt 0 5pt 20pt' }}>
          {showGreekTextArea &&
            <TextareaAutosize
              minRows={2}
              id="exampleGreek"
              type="text"
              onChange={handleExampleGreek}
              name="exampleGreek"
              style= {{
                fontFamily: isActiveLoaded && greekFontName,
                fontSize: greekFontSize,
                lineHeight: greekLineHeight,
                padding: '10pt 3pt',
                width: '50%',
                borderColor: "purple",
                direction: exampleGreekDir,
                fontFeatureSettings: greekFfsCss !== '' && greekFfsCss,
                MozFontFeatureSettings: greekFfsCss !== '' && greekFfsCss,
                WebkitFontFeatureSettings: greekFfsCss !== '' && greekFfsCss,
                }}
              value={showGreekTextArea && exampleGreek}
            />
          }
          {showGreekCss ? greekCss : (<div><br /></div>)}
        </Box>
      </Grid2>
      <Grid2  size={12}>
        <h1>{doI18n("pages:core-settings:select_myanmarscriptfont", i18n)}</h1>
        <div item style={{maxWidth: 350, padding: "1.25em 0 0 0"}}>
            <Box sx={{minWidth: 350}}>
              <Stack direction="row">
                <FormControl fullWidth style={{maxWidth: 325}} size="small">
                    <InputLabel id="select-myanmar-font-label" htmlFor="select-myanmar-font-id" sx={sx.inputLabel}>
                      {doI18n("pages:core-settings:select_myanmarscriptfont", i18n)}
                    </InputLabel>
                    <Select
                        variant="outlined"
                        labelId="select-myanmar-font-label"
                        name="select-myanmar-font-name"
                        inputProps={{
                            id: "select-myanmar-font-id",
                        }}
                        value={isActiveLoaded && myanmarClassSubstr}
                        label={doI18n("pages:core-settings:select_myanmarscriptfont", i18n)}
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
      <Grid2 size={12} sx={{ borderBottom: 1, borderColor: 'purple' }}>
        <Box sx={{ padding: '10pt 0 5pt 20pt' }}>
          {showMyanmarTextArea &&
            <TextareaAutosize
              minRows={2}
              id="exampleMyanmar"
              type="text"
              onChange={handleExampleMyanmar}
              name="exampleMyanmar"
              style= {{
                fontFamily: isActiveLoaded && myanmarFontName,
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
      <Grid2  size={12}>
        <h1>{doI18n("pages:core-settings:select_arabicurduscriptfont", i18n)}</h1>
        <div item style={{maxWidth: 350, padding: "1.25em 0 0 0"}}>
            <Box sx={{minWidth: 350}}>
              <Stack direction="row">
                <FormControl fullWidth style={{maxWidth: 325}} size="small">
                    <InputLabel id="select-arabic-urdu-font-label" htmlFor="select-arabic-urdu-font-id" sx={sx.inputLabel}>
                      {doI18n("pages:core-settings:select_arabicurduscriptfont", i18n)}
                    </InputLabel>
                    <Select
                        variant="outlined"
                        labelId="select-arabic-urdu-font-label"
                        name="select-arabic-urdu-font-name"
                        inputProps={{
                            id: "select-arabic-urdu-font-id",
                        }}
                        value={isActiveLoaded && arabicUrduClassSubstr}
                        label={doI18n("pages:core-settings:select_arabicurduscriptfont", i18n)}
                        onChange={handleChangeArabicUrdu}
                        sx={sx.select}
                    >
                      {WebFontsSelectableArabicUrdu}
                    </Select>
                    <FormHelperText>{arabicUrduClassSubstr.includes('AwamiNastaliq') && doI18n("pages:core-settings:replaceawamiifnotfirefox", i18n)}</FormHelperText>
                </FormControl>
                {showArabicUrduFeatures && <FontFeaturesArabicUrdu {...fontFeaturesArabicUrduProps} />}
              </Stack>
            </Box>
        </div>
      </Grid2>
      <Grid2 size={12} sx={{ borderBottom: 1, borderColor: 'purple' }}>
        <Box sx={{ padding: '10pt 0 5pt 20pt' }}>
          {showArabicUrduTextArea &&
            <TextareaAutosize
              minRows={isGraphiteAssumed ? 4 : 1}
              id="exampleArabicUrdu"
              type="text"
              onChange={handleExampleArabicUrdu}
              name="exampleArabicUrdu"
              style= {{
                fontFamily: isActiveLoaded && `${arabicUrduFontName}, 'Pankosmia-Noto Nastaliq Urdu'`,
                fontSize: arabicUrduFontSize,
                lineHeight: arabicUrduLineHeight,
                width: '50%',
                borderColor: "purple",
                direction: exampleArabicUrduDir,
                fontFeatureSettings: arabicUrduFfsCss !== '' && arabicUrduFfsCss,
                MozFontFeatureSettings: arabicUrduFfsCss !== '' && arabicUrduFfsCss,
                WebkitFontFeatureSettings: arabicUrduFfsCss !== '' && arabicUrduFfsCss,
                }}
              value={showArabicUrduTextArea && exampleArabicUrdu}
            />
          }
          {showArabicUrduCss ? arabicUrduCss : (<div><br /></div>)}
        </Box>
      </Grid2>
      <Grid2 size={12}>
        <h1>{doI18n("pages:core-settings:select_otherscriptfont", i18n)} / {doI18n("pages:core-settings:select_fallbackscriptfont", i18n)}</h1>
        <Stack>
          <div item style={{maxWidth: 350, padding: "1.25em 0 0"}}>
              <Box sx={{minWidth: 350}}>
                <Stack direction="row">
                  <FormControl fullWidth style={{maxWidth: 325}} size="small">
                      <InputLabel id="select-other-font-label" htmlFor="select-other-font-id" sx={sx.inputLabel}>
                        {doI18n("pages:core-settings:select_otherscriptfont", i18n)}
                      </InputLabel>
                      <Select
                          variant="outlined"
                          labelId="select-other-font-label"
                          name="select-other-font-name"
                          inputProps={{
                              id: "select-other-font-id",
                          }}
                          value={isActiveLoaded && otherClassSubstr}
                          label={doI18n("pages:core-settings:select_otherscriptfont", i18n)}
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
                        {doI18n("pages:core-settings:select_fallbackscriptfont", i18n)}
                      </InputLabel>
                      <Select
                          variant="outlined"
                          labelId="select-fallback-font-label"
                          name="select-fallback-font-name"
                          inputProps={{
                              id: "select-fallback-font-id",
                          }}
                          value={isActiveLoaded && fallbackClassSubstr}
                          label={doI18n("pages:core-settings:select_fallbackscriptfont", i18n)}
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
        <Grid2 size={12} sx={{ borderBottom: 1, borderColor: 'purple' }}>
        <Box sx={{ padding: '10pt 0 5pt 20pt' }}>
            <TextareaAutosize
              minRows={2}
              id="exampleOtherFallback"
              type="text"
              onChange={handleExampleOtherFallback}
              name="exampleOtherFallback"
              style= {{
                fontFamily: isActiveLoaded && otherFallbackExampleFontName,
                fontSize: fallbackFontSize,
                lineHeight: fallbackLineHeight,
                width: '50%',
                borderColor: "purple",
                direction: exampleOtherFallbackDir,
                fontFeatureSettings:  isActiveLoaded && otherFallbackExampleCss,
                MozFontFeatureSettings: isActiveLoaded && otherFallbackExampleCss,
                WebkitFontFeatureSettings: isActiveLoaded && otherFallbackExampleCss,
                }}
              value={isActiveLoaded && exampleOtherFallback}
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

BlendedFontSelection.propTypes = {
    /** Active Font Class */
    activeFontClass: PropTypes.string,
    /** Set Selected Font Set CSS Name */
    setSelectedFontClass: PropTypes.func.isRequired,
    /** Selected Hebrew Font Class Substring */
    selectedHebrewFontClassSubstr: PropTypes.string,
    /** Set Selected Hebrew Font Class Substring */
    setSelectedHebrewFontClassSubstr: PropTypes.func.isRequired,
    /** Selected Greek Font Class Substring */
    selectedGreekFontClassSubstr: PropTypes.string,
    /** Set Selected Greek Font Class Substring */
    setSelectedGreekFontClassSubstr: PropTypes.func.isRequired,
    /** Selected Myanmar Font Class Substring */
    selectedMyanmarFontClassSubstr: PropTypes.string,
    /** Set Selected Myanmar Font Class Substring */
    setSelectedMyanmarFontClassSubstr: PropTypes.func.isRequired,
    /** Selected Arabic/Urdu Font Class Substring */
    selectedArabicUrduFontClassSubstr: PropTypes.string,
    /** Set Selected Arabic/Urdu Font Class Substring */
    setSelectedArabicUrduFontClassSubstr: PropTypes.func.isRequired,
    /** Selected Other Font Class Substring */
    selectedOtherFontClassSubstr: PropTypes.string,
    /** Set Selected Other Font Class Substring */
    setSelectedOtherFontClassSubstr: PropTypes.func.isRequired,
    /** Selected Fallback Font Class Substring */
    selectedFallbackFontClassSubstr: PropTypes.string,
    /** Set Selected Fallback Font Class Substring */
    setSelectedFallbackFontClassSubstr: PropTypes.func.isRequired,
    /** Hebrew Font Name */
    hebrewFontName: PropTypes.string,
    /** Set Hebrew Font Name */
    setHebrewFontName: PropTypes.func.isRequired,
    /** Greek Font Name */
    greekFontName: PropTypes.string,
    /** Set Greek Font Name */
    setGreekFontName: PropTypes.func.isRequired,
    /** Myanmar Font Name */
    myanmarFontName: PropTypes.string,
    /** Set Myanmar Font Name */
    setMyanmarFontName: PropTypes.func.isRequired,
    /** Arabic/Urdu Font Name */
    arabicUrduFontName: PropTypes.string,
    /** Set Arabic/Urdu Font Name */
    setArabicUrduFontName: PropTypes.func.isRequired,
    /** Other Font Name */
    otherFontName: PropTypes.string,
    /** Set Other Font Name */
    setOtherFontName: PropTypes.func.isRequired,
    /** Fallback Font Name */
    fallbackFontName: PropTypes.string,
    /** Set Fallback Font Name */
    setFallbackFontName: PropTypes.func.isRequired,
};