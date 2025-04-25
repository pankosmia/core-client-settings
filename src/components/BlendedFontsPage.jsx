import { useState, useEffect, useContext, Fragment } from "react"

import PropTypes from 'prop-types';
import { Box, FormControl, Grid2, MenuItem, Select, InputLabel, Stack, Tooltip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import WarningSharpIcon from '@mui/icons-material/WarningSharp';
import RestoreIcon from '@mui/icons-material/Restore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { fontFeatureSettings, useAssumeGraphite } from "font-detect-rhl";
import { postEmptyJson, typographyContext, i18nContext as I18nContext, doI18n } from "pithekos-lib";

import UsePrevious from "./helpers/UsePrevious";
import FontMenuItem from "./FontMenuItem";
import sx from "./Selection.styles";
import BlendedFontArabicUrduSelection from "./BlendedFontArabicUrduSelection";
import BlendedFontMyanmarSelection from "./BlendedFontMyanmarSelection";
import BlendedFontGreekSelection from "./BlendedFontGreekSelection";
import BlendedFontHebrewSelection from "./BlendedFontHebrewSelection"; 
import BlendedFontBaseSelection from "./BlendedFontBaseSelection";

export default function BlendedFontsPage(blendedFontsPageProps) {
  const { typographyRef } = useContext(typographyContext);
  const { i18nRef } = useContext(I18nContext);
  const {
    fontMenu,
    setFontMenu,
  } = blendedFontsPageProps;

  // Font Class Substrings
  const [selectedHebrewFontClassSubstr, setSelectedHebrewFontClassSubstr] = useState('');
  const [selectedGreekFontClassSubstr, setSelectedGreekFontClassSubstr] = useState('');
  const [selectedMyanmarFontClassSubstr, setSelectedMyanmarFontClassSubstr] = useState('');
  const [selectedArabicUrduFontClassSubstr, setSelectedArabicUrduFontClassSubstr] = useState('');
  const [selectedBaseFontClassSubstr, setSelectedBaseFontClassSubstr] = useState('');
  const [selectedFontClass, setSelectedFontClass] = useState('');

  // An array of id's extracted from the font_set string in user_settings.json
  const [fontClassIdsArr, setFontClassIdsArr] = useState([]);

  // Font Name
  const [hebrewFontName, setHebrewFontName] = useState([]);
  const [greekFontName, setGreekFontName] = useState([]);
  const [myanmarFontName, setMyanmarFontName] = useState([]);
  const [arabicUrduFontName, setArabicUrduFontName] = useState([]);
  const [baseFontName, setBaseFontName] = useState([]);

  // Font-feature-settings (Ffs) id for settings lookup, where applicable
  const [myanmarFfsId, setMyanmarFfsId] = useState([]);
  // const [arabicUrduFfsId, setArabicUrduFfsId] = useState([]); // in Child
  // const [hebrewFfsId, setHebrewFfsId] = useState([]); // Not currently applicable
  // const [greekFfsId, setGreekFfsId] = useState([]); // Not currently applicable
  const [baseFfsId, setBaseFfsId] = useState([]);

  // Font Display Name for shortlist and for font-feature-settings heading where applicable
  const [myanmarFontDisplayName, setMyanmarFontDisplayName] = useState([]);
  const [arabicUrduFontDisplayName, setArabicUrduFontDisplayName] = useState([]); // in Child
  // eslint-disable-next-line no-unused-vars
  const [hebrewFontDisplayName, setHebrewFontDisplayName] = useState([]); // Not currently applicable
  // eslint-disable-next-line no-unused-vars
  const [greekFontDisplayName, setGreekFontDisplayName] = useState([]); // Not currently applicable
  const [baseFontDisplayName, setBaseFontDisplayName] = useState([]);

  const prevBaseFontDisplayName = UsePrevious(baseFontDisplayName);
  const prevArabicUrduFontDisplayName = UsePrevious(arabicUrduFontDisplayName);

  // Available fonts
  const [webFontsHebrew, setWebFontsHebrew] = useState([]);
  const [webFontsGreek, setWebFontsGreek] = useState([]);
  const [webFontsMyanmar, setWebFontsMyanmar] = useState([]);
  const [webFontsArabicUrdu, setWebFontsArabicUrdu] = useState([]);
  const [webFontsBase, setWebFontsBase] = useState([]);

  /** 
   * Arrays of Fonts by script type:
   *  id = substring in font_class
   *  settings_id = lookup in fontFeatureSettings
   */
  useEffect(() => {
    if (!webFontsHebrew.length || !baseFontDisplayName.length || prevBaseFontDisplayName !== baseFontDisplayName) {
      setWebFontsHebrew([
        { display_name: 'Ezra SIL 2.51', id: 'Pankosmia-EzraSIL', name: 'Pankosmia-Ezra SIL', settings_id: '', shortlist: true, example: 'דוּגמָה' },
        { display_name: 'Ezra SIL SR 2.51', id: 'Pankosmia-EzraSILSR',name: 'Pankosmia-Ezra SIL SR', settings_id: '', shortlist: true, example: 'דוּגמָה' },
        { display_name: `${doI18n("pages:core-settings:base_font", i18nRef.current)} (${baseFontDisplayName})`, id: '', name: '', settings_id: '', shortlist: true, example: 'דוּגמָה' },
      ]);
    }
  },[baseFontDisplayName, i18nRef, prevBaseFontDisplayName, webFontsHebrew.length]);
  useEffect(() => {
    if (!webFontsGreek.length || !baseFontDisplayName.length || prevBaseFontDisplayName !== baseFontDisplayName) {
      setWebFontsGreek([
        { display_name: 'Cardo 1.0451', id: 'Pankosmia-Cardo', name: 'Pankosmia-Cardo', settings_id: '', shortlist: true, example: 'παράδειγμα' },
        { display_name: 'Galatia SIL 2.1', id: 'Pankosmia-GalatiaSIL', name: 'Pankosmia-Galatia SIL', settings_id: '', shortlist: true, example: 'παράδειγμα' },
        { display_name: `${doI18n("pages:core-settings:base_font", i18nRef.current)} (${baseFontDisplayName})`, id: '', name: '', settings_id: '', shortlist: true, example: 'παράδειγμα' },
      ]);
    }
  },[baseFontDisplayName, i18nRef, prevBaseFontDisplayName, webFontsGreek.length]);
  useEffect(() => {
    if (!webFontsMyanmar.length || !baseFontDisplayName.length || prevBaseFontDisplayName !== baseFontDisplayName) {
      setWebFontsMyanmar([
        { display_name: 'Padauk 5.100', id: 'Pankosmia-Padauk', name: 'Pankosmia-Padauk', settings_id: 'Padauk', shortlist: true, example: 'ဥပမာ' },
        { display_name: 'Padauk Book 5.100', id: 'Pankosmia-PadaukBook', name: 'Pankosmia-Padauk Book', settings_id: 'Padauk', shortlist: true, example: 'ဥပမာ' },
        { display_name: `${doI18n("pages:core-settings:base_font", i18nRef.current)} (${baseFontDisplayName})`, id: '', name: '', settings_id: '', shortlist: true, example: 'ဥပမာ' },
      ]);
    }
  },[baseFontDisplayName, i18nRef, prevBaseFontDisplayName, webFontsMyanmar.length]);
  const isGraphiteAssumed = useAssumeGraphite({}); // Tests for Firefox; A different test can show if Graphite is enabled.
  useEffect(() => {
    if (!webFontsArabicUrdu.length || !baseFontDisplayName.length || prevBaseFontDisplayName !== baseFontDisplayName|| !arabicUrduFontDisplayName.length || prevArabicUrduFontDisplayName !== arabicUrduFontDisplayName) {
      setWebFontsArabicUrdu([
        { display_name: isGraphiteAssumed ? 'Awami Nastaliq 3.300' : 'Noto Nastaliq Urdu 4.000', id: 'Pankosmia-AwamiNastaliqPankosmia-NotoNastaliqUrdu', name: 'Pankosmia-Awami Nastaliq', settings_id: 'Awami Nastaliq', shortlist: isGraphiteAssumed || ( !isGraphiteAssumed && selectedArabicUrduFontClassSubstr.toString() !== 'Pankosmia-AwamiNastaliqMediumPankosmia-NotoNastaliqUrdu' && selectedArabicUrduFontClassSubstr.toString() !== 'Pankosmia-AwamiNastaliqSemiBoldPankosmia-NotoNastaliqUrdu' && selectedArabicUrduFontClassSubstr.toString() !== 'Pankosmia-AwamiNastaliqExtraBoldPankosmia-NotoNastaliqUrdu' ), example: 'مثال'},
        { display_name: isGraphiteAssumed ? 'Awami Nastaliq Medium 3.300' : 'Noto Nastaliq Urdu 4.000', id: 'Pankosmia-AwamiNastaliqMediumPankosmia-NotoNastaliqUrdu', name: 'Pankosmia-Awami Nastaliq Medium', settings_id: 'Awami Nastaliq', shortlist: selectedArabicUrduFontClassSubstr.toString() === 'Pankosmia-AwamiNastaliqMediumPankosmia-NotoNastaliqUrdu', example: 'مثال' },
        { display_name: isGraphiteAssumed ? 'Awami Nastaliq Semi Bold 3.300' : 'Noto Nastaliq Urdu 4.000', id: 'Pankosmia-AwamiNastaliqSemiBoldPankosmia-NotoNastaliqUrdu', name: 'Pankosmia-Awami Nastaliq Semi Bold', settings_id: 'Awami Nastaliq', shortlist: selectedArabicUrduFontClassSubstr.toString() === 'Pankosmia-AwamiNastaliqSemiBoldPankosmia-NotoNastaliqUrdu', example: 'مثال' },
        { display_name: isGraphiteAssumed ? 'Awami Nastaliq Extra Bold 3.300' : 'Noto Nastaliq Urdu 4.000', id: 'Pankosmia-AwamiNastaliqExtraBoldPankosmia-NotoNastaliqUrdu', name: 'Pankosmia-Awami Nastaliq Extra Bold', settings_id: 'Awami Nastaliq', shortlist: selectedArabicUrduFontClassSubstr.toString() === 'Pankosmia-AwamiNastaliqExtraBoldPankosmia-NotoNastaliqUrdu', example: 'مثال' },
        { display_name: 'Noto Naskh Arabic 2.018', id: 'Pankosmia-NotoNaskhArabic', name: 'Pankosmia-Noto Naskh Arabic', settings_id: '', shortlist: true, example: 'مثال' },
        { display_name: `${doI18n("pages:core-settings:base_font", i18nRef.current)} (${baseFontDisplayName})`, id: '', name: '', settings_id: '', shortlist: true, example: 'مثال' },
      ]);
    }
  },[arabicUrduFontDisplayName, baseFontDisplayName, i18nRef, isGraphiteAssumed, prevArabicUrduFontDisplayName, prevBaseFontDisplayName, selectedArabicUrduFontClassSubstr, webFontsArabicUrdu.length]);
  useEffect(() => {
    if (!webFontsBase.length || !baseFontDisplayName.length || prevBaseFontDisplayName !== baseFontDisplayName) {
      setWebFontsBase([
        { display_name: 'Andika 6.200', id: 'Pankosmia-AndikaPankosmia-GentiumPlus', name: 'Pankosmia-Andika', settings_id: 'Andika', shortlist: true, example: 'ABCabc123' },
        { display_name: 'Charis SIL 6.200', id: 'Pankosmia-CharisSILPankosmia-GentiumPlus', name: 'Pankosmia-Charis SIL', settings_id: 'Charis SIL', shortlist: true, example: 'ABCabc123' },
        { display_name: 'Gentium Plus 6.200', id: 'Pankosmia-GentiumPlus', name: 'Pankosmia-Gentium Plus', settings_id: 'Gentium Plus', shortlist: true, example: 'ABCabc123' },
        { display_name: 'Gentium Book Plus 6.200', id: 'Pankosmia-GentiumBookPlus', name: 'Pankosmia-Gentium Book Plus', settings_id: 'Gentium Plus', shortlist: true, example: 'ABCabc123' },
        { display_name: 'Open Sans 3.003', id: 'Pankosmia-OpenSansPankosmia-GentiumPlus', name: 'Pankosmia-Open Sans', settings_id: '', shortlist: true, example: 'ABCabc123' },
        { display_name: 'Roboto 2.137', id: 'Pankosmia-RobotoPankosmia-GentiumPlus', name: 'Pankosmia-Roboto', settings_id: '', shortlist: true, example: 'ABCabc123' },
        { display_name: 'Roboto Black 2.137', id: 'Pankosmia-RobotoBlackPankosmia-GentiumPlus', name: 'Pankosmia-Roboto Black', settings_id: '', shortlist: baseFontDisplayName.toString() === 'Roboto Black 2.137', example: 'ABCabc123' },
        { display_name: 'Roboto Light 2.137', id: 'Pankosmia-RobotoLightPankosmia-GentiumPlus', name: 'Pankosmia-Roboto Light', settings_id: '', shortlist: baseFontDisplayName.toString() === 'Roboto Light 2.137', example: 'ABCabc123' },
        { display_name: 'Roboto Medium 2.137', id: 'Pankosmia-RobotoMediumPankosmia-GentiumPlus', name: 'Pankosmia-Roboto Medium', settings_id: '', shortlist: baseFontDisplayName.toString() === 'Roboto Medium 2.137', example: 'ABCabc123' },
        { display_name: 'Roboto Thin 2.137', id: 'Pankosmia-RobotoThinPankosmia-GentiumPlus', name: 'Pankosmia-Roboto Thin', settings_id: '', shortlist: baseFontDisplayName.toString() === 'Roboto Thin 2.137', example: 'ABCabc123' },
      ]);
    }
  },[baseFontDisplayName, prevBaseFontDisplayName, webFontsBase.length]);

  /** Create an array of font_class substrings, consisting of Font Class IDs extracted from the font_set string. */
  useEffect(() => {
    if (!fontClassIdsArr.length) {
      setFontClassIdsArr(selectedFontClass !== '' ? selectedFontClass.replace(/Pankosmia-/g,'~Pankosmia-').split('~') : []);
    }
  },[selectedFontClass, fontClassIdsArr.length])

  /** ASSUMPTION: Base Font Substring will always include either Pankosmia-GentiumPlus or Pankosmia-GentiumBookPlus.
   *  If it includes Pankosmia-GentiumPlus, then an additional preceding substring could also exist but is not required.
   */

  /** For each script type, set INITIAL:
   *    - font class name substrings
   *    - font-feature-settings id (FfsId), where applicable
   *    - font display name for font-feature-settings heading, where applicable
   *    - font name
   */
  useEffect(() => {
    if (selectedBaseFontClassSubstr.toString() === '') {
    // Hebrew
      const selectedHebrewId = webFontsHebrew.filter(item => fontClassIdsArr.includes(item.id)).map((font, index) => (font.id));
      setSelectedHebrewFontClassSubstr(selectedHebrewId);
      // const selectedHebrewSettingsId = webFontsHebrew.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.settings_id));
      // setHebrewFfsId(selectedHebrewSettingsId);
      const hebrewDisplayName = webFontsHebrew.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.display_name));
      setHebrewFontDisplayName(hebrewDisplayName);
      const hebrewName = webFontsHebrew.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.name));
      setHebrewFontName(hebrewName);
    // Greek
      const selectedGreekId = webFontsGreek.filter(item => fontClassIdsArr.includes(item.id)).map((font, index) => (font.id));
      setSelectedGreekFontClassSubstr(selectedGreekId);
      // const selectedGreekSettingsId = webFontsGreek.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.settings_id));
      // setGreekFfsId(selectedGreekSettingsId);
      const greekDisplayName = webFontsGreek.filter(item => fontClassIdsArr.includes(item.id))?.map((font, index) => (font.display_name));
      setGreekFontDisplayName(greekDisplayName);
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
    // Arabic/Urdu (*** Pattern differs because Awami Nastaliq requires Graphite, ***)
      const selectedArabicUrduIds = webFontsArabicUrdu.map((font, index) => (font.id));
      const fontClassAwamiToAdj = fontClassIdsArr.filter(item => item.includes('AwamiNastaliq'));
      const selectedArabicUrduIdAdj = (fontClassAwamiToAdj.toString() !== '' ? fontClassAwamiToAdj + 'Pankosmia-NotoNastaliqUrdu' : fontClassIdsArr.filter(item => selectedArabicUrduIds.includes(item)));
      const selectedArabicUrduAdjId = (selectedArabicUrduIdAdj === 'Pankosmia-NotoNastaliqUrdu' ? '' : selectedArabicUrduIdAdj);
      setSelectedArabicUrduFontClassSubstr(selectedArabicUrduAdjId);
      const arabicUrduDisplayName = webFontsArabicUrdu.filter(font => font.id === selectedArabicUrduAdjId)?.map((font, index) => (font.display_name));
      setArabicUrduFontDisplayName(arabicUrduDisplayName);
      const arabicUrduName = webFontsArabicUrdu.filter(font => font.id === selectedArabicUrduAdjId.toString())?.map((font, index) => (font.name));
      setArabicUrduFontName(arabicUrduName);
    // Base (*** Pattern differs because of added fallback font except where a Gentium font is selected. ***)
      const selectedBaseGentiums = webFontsBase.filter(item => item.name.includes('Gentium')).map((font, index) => (font.id));
      const selectedBaseIds = webFontsBase.filter(item => !item.name.includes('Gentium')).map((font, index) => (font.id));
      const fontClassIdsAdjStr = fontClassIdsArr.join('Pankosmia-GentiumPlus,');
      const fontClassIdsArrAdj = fontClassIdsAdjStr.split(',');
      const selectedBaseIdToAdj = selectedBaseIds.filter(item => fontClassIdsArrAdj.includes(item)).map((substr, index) => (substr));
      const selectedBaseGentiumId = selectedBaseGentiums.filter(item => fontClassIdsArr.includes(item)).map((substr, index) => (substr));
      const selectedBaseId = selectedBaseIdToAdj.length !== 0 ? selectedBaseIdToAdj : selectedBaseGentiumId;
      setSelectedBaseFontClassSubstr(selectedBaseId);
      const selectedBaseSettingsId = webFontsBase.filter(font => font.id === selectedBaseId.toString())?.map((font, index) => (font.settings_id));
      setBaseFfsId(selectedBaseSettingsId);
      const baseDisplayName = webFontsBase.filter(font => font.id === selectedBaseId.toString())?.map((font, index) => (font.display_name));
      setBaseFontDisplayName(baseDisplayName);
      const baseName = webFontsBase.filter(font => font.id === selectedBaseId.toString())?.map((font, index) => (font.name));
      setBaseFontName(baseName);
    }
  },[fontClassIdsArr, selectedBaseFontClassSubstr, webFontsArabicUrdu, webFontsBase, webFontsGreek, webFontsHebrew, webFontsMyanmar]);

  const fontSetStr = 'fonts-' + selectedGreekFontClassSubstr + selectedHebrewFontClassSubstr + selectedMyanmarFontClassSubstr + selectedArabicUrduFontClassSubstr + selectedBaseFontClassSubstr;

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

  // All available font-feature-setting (Ffs)
  const [ffsArr, setFfsArr] = useState([]);

  /** Awami Nastaliq requires Graphite, and Padauk has some Graphite-only features. */
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
    { name: 'Base', id: 'base', unicode_range: '' },
  ];

  const isCurrentDefault = selectedFontClass === "fonts-Pankosmia-CardoPankosmia-EzraSILPankosmia-PadaukPankosmia-AwamiNastaliqPankosmia-NotoNastaliqUrduPankosmia-GentiumPlus"  || ( !isGraphiteAssumed && (selectedFontClass === "fonts-Pankosmia-CardoPankosmia-EzraSILPankosmia-PadaukPankosmia-AwamiNastaliqMediumPankosmia-NotoNastaliqUrduPankosmia-GentiumPlus" || selectedFontClass === "fonts-Pankosmia-CardoPankosmia-EzraSILPankosmia-PadaukPankosmia-AwamiNastaliqSemiBoldPankosmia-NotoNastaliqUrduPankosmia-GentiumPlus" || selectedFontClass === "fonts-Pankosmia-CardoPankosmia-EzraSILPankosmia-PadaukPankosmia-AwamiNastaliqExtraBoldPankosmia-NotoNastaliqUrduPankosmia-GentiumPlus" ));

  const webFontsBaseShortlist = webFontsBase.filter(font => font.shortlist);
  const webFontsArabicUrduShortlist = webFontsArabicUrdu.filter(font => font.shortlist);
  const webFontsMyanmarShortlist = webFontsMyanmar.filter(font => font.shortlist);
  const webFontsGreekShortlist = webFontsGreek.filter(font => font.shortlist);
  const webFontsHebrewShortlist = webFontsHebrew.filter(font => font.shortlist);


  const handleOnBaseChange = (event) => {
    setSelectedBaseFontClassSubstr(event.target.value);
    const selectedBaseSettingId = webFontsBaseShortlist.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
    setBaseFfsId(selectedBaseSettingId);
    const baseDisplayName = webFontsBaseShortlist.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
    setBaseFontDisplayName(baseDisplayName);
    const baseName = webFontsBaseShortlist.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
    setBaseFontName(baseName);
  };

  const handleOnGreekChange = (event) => {
    setSelectedGreekFontClassSubstr(event.target.value);
    const greekName = webFontsGreekShortlist.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
    setGreekFontName(greekName);
  };

  const handleOnHebrewChange = (event) => {
    setSelectedHebrewFontClassSubstr(event.target.value);
    const hebrewName = webFontsHebrewShortlist.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
    setHebrewFontName(hebrewName);
  };

  const handleOnArabicUrduChange = (event) => {
    setSelectedArabicUrduFontClassSubstr(event.target.value);
    // const selectedArabicUrduSettingId = webFontsArabicUrduShortlist.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
    // setArabicUrduFfsId(selectedArabicUrduSettingId);
    const arabicUrduDisplayName = webFontsArabicUrduShortlist.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
    setArabicUrduFontDisplayName(arabicUrduDisplayName);
    const arabicUrduName = webFontsArabicUrduShortlist.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
    setArabicUrduFontName(arabicUrduName);
  };
  
  const handleOnMyanmarChange = (event) => {
      setSelectedMyanmarFontClassSubstr(event.target.value);
      const selectedMyanmarSettingId = webFontsMyanmarShortlist.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
      setMyanmarFfsId(selectedMyanmarSettingId);
      const myanmarDisplayName = webFontsMyanmarShortlist.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
      setMyanmarFontDisplayName(myanmarDisplayName);
      const myanmarName = webFontsMyanmarShortlist.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
      setMyanmarFontName(myanmarName);
  };

  const fontMenuItemProps = {
    selectedFontClass,
  };

  /** Build dropdown menus */
  const WebFontsArabicUrduShortlist =
    webFontsArabicUrduShortlist.map((font, index) => (
      <MenuItem key={index} value={font.id} dense>
        <FontMenuItem font={font} {...fontMenuItemProps}/>
      </MenuItem>
  ));
  const WebFontsMyanmarShortlist =
    webFontsMyanmarShortlist.map((font, index) => (
      <MenuItem key={index} value={font.id} dense>
      <FontMenuItem font={font} {...fontMenuItemProps}/>
      </MenuItem>
  ));
  const WebFontsGreekShortlist =
    webFontsGreekShortlist.map((font, index) => (
      <MenuItem key={index} value={font.id} dense>
        <FontMenuItem font={font} {...fontMenuItemProps}/>
      </MenuItem>
  ));
  const WebFontsHebrewShortlist =
    webFontsHebrewShortlist.map((font, index) => (
      <MenuItem key={index} value={font.id} dense>
        <FontMenuItem font={font} {...fontMenuItemProps}/>
      </MenuItem>
  ));
  const WebFontsBaseShortlist =
    webFontsBaseShortlist.map((font, index) => (
      <MenuItem key={index} value={font.id} dense>
        <FontMenuItem font={font} {...fontMenuItemProps}/>
      </MenuItem>
  ));

  const isBaseDefault = selectedBaseFontClassSubstr.toString() === "Pankosmia-GentiumPlus";
  const isGreekDefault = selectedGreekFontClassSubstr.toString() === "Pankosmia-Cardo";
  const isHebrewDefault = selectedHebrewFontClassSubstr.toString() === "Pankosmia-EzraSIL";
  const isArabicUrduDefault = selectedArabicUrduFontClassSubstr.toString() === "Pankosmia-AwamiNastaliqPankosmia-NotoNastaliqUrdu" || ( !isGraphiteAssumed && (selectedArabicUrduFontClassSubstr.toString() === 'Pankosmia-AwamiNastaliqMediumPankosmia-NotoNastaliqUrdu' || selectedArabicUrduFontClassSubstr.toString() === 'Pankosmia-AwamiNastaliqSemiBoldPankosmia-NotoNastaliqUrdu' || selectedArabicUrduFontClassSubstr.toString() === 'Pankosmia-AwamiNastaliqExtraBoldPankosmia-NotoNastaliqUrdu' ));
  const isMyanmarDefault = selectedMyanmarFontClassSubstr.toString() === "Pankosmia-Padauk";

  const handleClickBase = () => {
    setSelectedBaseFontClassSubstr('Pankosmia-GentiumPlus');
    setBaseFfsId('Gentium Plus');
    setBaseFontDisplayName('Gentium Plus 6.200');
    setBaseFontName('Pankosmia-Gentium Plus');
  };

  const handleClickGreek = () => {
    setSelectedGreekFontClassSubstr('Pankosmia-Cardo');
  };

  const handleClickHebrew = () => {
    setSelectedHebrewFontClassSubstr('Pankosmia-EzraSIL');
  };

  const handleClickArabicUrdu = () => {
    setSelectedArabicUrduFontClassSubstr('Pankosmia-AwamiNastaliqPankosmia-NotoNastaliqUrdu');
    // setArabicUrduFfsId('Awami Nastaliq');
    setArabicUrduFontDisplayName('Awami Nastaliq 3.300');
    setArabicUrduFontName('Pankosmia-Awami Nastaliq');
  };

  const handleClickMyanmar = () => {
    setSelectedMyanmarFontClassSubstr('Pankosmia-Padauk');
    setMyanmarFfsId('Padauk');
    setMyanmarFontDisplayName('Padauk 5.100');
    setMyanmarFontName('Pankosmia-Padauk');
  };

  const handleClickAll = () => {
    handleClickBase();
    handleClickGreek();
    handleClickHebrew();
    handleClickArabicUrdu();
    handleClickMyanmar();
  };

  const handleClickBaseMore = (event) => {
    setFontMenu('moreBase');
  }

  const handleClickGreekMore = (event) => {
    setFontMenu('moreGreek');
  }

  const handleClickHebrewMore = (event) => {
    setFontMenu('moreHebrew');
  }

  const handleClickArabicUrduMore = (event) => {
    setFontMenu('moreArabicUrdu');
  }

  const handleClickMyanmarMore = (event) => {
    setFontMenu('moreMyanmar');
  }

  const isAwami = selectedArabicUrduFontClassSubstr.toString() !== '' && selectedArabicUrduFontClassSubstr.toString() !== 'Pankosmia-NotoNaskhArabic';
  const adjHeight = arabicUrduFontDisplayName.toString().includes("Awami Nastaliq") ? '1.75' : '';

  /** ArabicUrdu props patterns differ. */
  const blendedFontArabicUrduSelectionProps = {
    isGraphiteAssumed,
    selectedArabicUrduFontClassSubstr,
    setSelectedArabicUrduFontClassSubstr,
    arabicUrduFontName,
    setArabicUrduFontName,
    webFontsArabicUrdu,
    arabicUrduFontDisplayName,
    setArabicUrduFontDisplayName,
    ffsArr,
    unicodeRanges,
    selectedFontClass,
    isArabicUrduDefault,
    isAwami,
    handleClickArabicUrdu,
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
    selectedFontClass,
    isMyanmarDefault,
    handleClickMyanmar,
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
    selectedFontClass,
    isGreekDefault,
    handleClickGreek,
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
    selectedFontClass,
    isHebrewDefault,
    handleClickHebrew,
  };
  const blendedFontBaseSelectionProps = {
    isGraphiteAssumed,
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
    selectedFontClass,
    isBaseDefault,
    handleClickBase,
  };
  
  return (
    <div>
      {fontMenu === 'shortlist' &&
        <div>
          <h1>{doI18n("pages:core-settings:current_settings", i18nRef.current)}{isCurrentDefault && ` (${doI18n("pages:core-settings:factory_settings", i18nRef.current)})`}</h1>
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <FormControl  component="fieldset">
              <Grid2 container sx={{}}>
                <Grid2 item>
                  <div className={selectedFontClass} style={{ fontSize: '100%'}}>
                    <Stack direction="column" spacing={2}>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                              value={selectedBaseFontClassSubstr.toString()}
                              label={doI18n("pages:core-settings:base_font", i18nRef.current)}
                              onChange={handleOnBaseChange}
                              sx={sx.select}
                          >
                            {WebFontsBaseShortlist}
                          </Select>
                        </FormControl>
                        {!isBaseDefault &&  
                          <Tooltip
                            title="Gentium Plus"
                            placement="right"
                            arrow
                          >
                            <RestoreIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickBase} />
                          </Tooltip>
                        }
                        <MoreHorizIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickBaseMore} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                              value={selectedGreekFontClassSubstr.toString()}
                              label={doI18n("pages:core-settings:select_greekscriptfont", i18nRef.current)}
                              onChange={handleOnGreekChange}
                              sx={sx.select}
                          >
                            {WebFontsGreekShortlist}
                          </Select>
                        </FormControl>
                        {!isGreekDefault &&  
                          <Tooltip 
                            title="Cardo"
                            placement="right"
                            arrow
                          >
                            <RestoreIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickGreek} />
                          </Tooltip>
                        }
                        <MoreHorizIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickGreekMore} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <FormControl fullWidth style={{maxWidth: 400, minWidth: 400}} size="small">
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
                              value={selectedHebrewFontClassSubstr.toString()}
                              label={doI18n("pages:core-settings:select_hebrewscriptfont", i18nRef.current)}
                              onChange={handleOnHebrewChange}
                              sx={sx.select}
                          >
                            {WebFontsHebrewShortlist}
                          </Select>
                        </FormControl>
                        {!isHebrewDefault &&  
                          <Tooltip 
                            title="Ezra SIL"
                            placement="right"
                            arrow
                          >
                            <RestoreIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickHebrew} />
                          </Tooltip>
                        }
                        <MoreHorizIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickHebrewMore} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                              value={selectedArabicUrduFontClassSubstr.toString()}
                              label={doI18n("pages:core-settings:select_arabicurduscriptfont", i18nRef.current)}
                              onChange={handleOnArabicUrduChange}
                              sx={sx.select}
                              style={{lineheight: adjHeight}}
                          >
                            {WebFontsArabicUrduShortlist}
                          </Select>
                        </FormControl>
                        {!isArabicUrduDefault &&  
                          <Tooltip 
                            title={`Awami Nastaliq (${doI18n("pages:core-settings:if_not_firefox", i18nRef.current)})`}
                            placement="right"
                            arrow
                          >
                            <RestoreIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickArabicUrdu} />
                          </Tooltip>
                        }
                        <MoreHorizIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickArabicUrduMore} />
                        {isAwami &&
                          <Tooltip
                            title={isGraphiteAssumed ? doI18n("pages:core-settings:replace_awami", i18nRef.current) : doI18n("pages:core-settings:replace_noto", i18nRef.current)}
                            placement="right"
                          >
                            { isGraphiteAssumed ?
                              <InfoIcon style={{ color: "purple", paddingLeft: '9px', margin: 'auto 0' }} />
                              :
                              <WarningSharpIcon style={{ color: 'yellow', background: 'black', margin: 'auto 9px' }} />
                            }
                          </Tooltip>
                        }
                        {isAwami && !isGraphiteAssumed && <div className={selectedFontClass} style={{margin: 'auto 0',fontSize: '100%' }}>{doI18n("pages:core-settings:best_with", i18nRef.current)}</div>}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                              onChange={handleOnMyanmarChange}
                              sx={sx.select}
                          >
                            {WebFontsMyanmarShortlist}
                          </Select>
                        </FormControl>
                        {!isMyanmarDefault &&  
                          <Tooltip 
                            title="Padauk"
                            placement="right"
                            arrow
                          >
                            <RestoreIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickMyanmar} />
                          </Tooltip>
                        }
                        <MoreHorizIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClickMyanmarMore} />
                      </div>
                      <div className={selectedFontClass} style={{ display: 'flex', flexDirection: 'row', fontSize: '100%' }}>
                        {!isCurrentDefault &&  
                          <Tooltip 
                            title={
                              <Fragment>
                                  {doI18n("pages:core-settings:base_font", i18nRef.current)}: Gentium Plus<br /><br />
                                  {doI18n("pages:core-settings:select_greekscript", i18nRef.current)}: Cardo<br /><br />
                                  {doI18n("pages:core-settings:select_hebrewscript", i18nRef.current)}: Ezra SIL<br /><br />
                                  {doI18n("pages:core-settings:select_arabicurduscript", i18nRef.current)}: {`Awami Nastaliq (${doI18n("pages:core-settings:if_not_firefox", i18nRef.current)})`}<br /><br />
                                  {doI18n("pages:core-settings:select_myanmarscript", i18nRef.current)}: Padauk
                              </Fragment>
                            }
                            placement="right"
                            arrow
                          >
                            <RestoreIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", padding: '0px 9px', margin: 'auto 0' }} onClick={handleClickAll} />
                          </Tooltip>}
                        {!isCurrentDefault && <div style={{margin: 'auto 0'}}>{doI18n("pages:core-settings:factory_settings", i18nRef.current)}</div>}
                      </div>
                    </Stack>
                  </div>
                </Grid2>
              </Grid2>
            </FormControl>
          </Box>
        </div>
      }
      {fontMenu === 'moreBase' &&
        <div>
          <h1>{doI18n("pages:core-settings:base_font", i18nRef.current)}</h1>
          <div key="toolbar" style={{ width: '100%' }} >
            <Box>
              {fontSetStr !== 'fonts-' && <BlendedFontBaseSelection {...blendedFontBaseSelectionProps} />}
            </Box>
          </div>
        </div>
      }
      {fontMenu === 'moreGreek' &&
        <div>
          <h1>{doI18n("pages:core-settings:select_greekscript", i18nRef.current)}</h1>
          <div key="toolbar" style={{ width: '100%' }} >
            <Box>
              {fontSetStr !== 'fonts-' && <BlendedFontGreekSelection {...blendedFontGreekSelectionProps} />}
            </Box>
          </div>
        </div>
      }
      {fontMenu === 'moreHebrew' &&
        <div>
          <h1>{doI18n("pages:core-settings:select_hebrewscript", i18nRef.current)}</h1>
          <div key="toolbar" style={{ width: '100%' }} >
            <Box>
              {fontSetStr !== 'fonts-' && <BlendedFontHebrewSelection {...blendedFontHebrewSelectionProps} />}
            </Box>
          </div>
        </div>
      }
      {fontMenu === 'moreArabicUrdu' &&
        <div>
          <h1>{doI18n("pages:core-settings:select_arabicurduscript", i18nRef.current)}</h1>
          <div key="toolbar" style={{ width: '100%' }} >
            <Box>
              {fontSetStr !== 'fonts-' && <BlendedFontArabicUrduSelection {...blendedFontArabicUrduSelectionProps} />}
            </Box>
          </div>
        </div>
      }
      {fontMenu === 'moreMyanmar' &&
        <div>
          <h1>{doI18n("pages:core-settings:select_myanmarscript", i18nRef.current)}</h1>
          <div key="toolbar" style={{ width: '100%' }} >
            <Box>
              {fontSetStr !== 'fonts-' && <BlendedFontMyanmarSelection {...blendedFontMyanmarSelectionProps} />}
            </Box>
          </div>
        </div>
      }
    </div>
  )
}

BlendedFontsPage.propTypes = {
  /** Font Menu */
  fontMenu: PropTypes.string.isRequired,
  /** Set Font Menu */
  setFontMenu: PropTypes.func.isRequired,
}

BlendedFontsPage.defaultProps = {
  fontMenu: 'shortlist',
};