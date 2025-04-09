import { useState, useMemo, useEffect, useContext } from "react";

import PropTypes from 'prop-types';
import { Box, FormControl, Grid2, RadioGroup, Radio, FormControlLabel, Typography, FormHelperText, Divider } from "@mui/material";
import { i18nContext as I18nContext, doI18n } from "pithekos-lib";

import FontShortlistCheckboxItem from "./FontShortlistCheckboxItem";

export default function FontShortlist(fontShortlistProps) {
  const { i18nRef } = useContext(I18nContext);
  const {
    selectedFontClass,
    selectedBaseFontClassSubstr,
    setSelectedBaseFontClassSubstr,
    selectedHebrewFontClassSubstr,
    setSelectedHebrewFontClassSubstr,
    selectedGreekFontClassSubstr,
    setSelectedGreekFontClassSubstr,
    selectedMyanmarFontClassSubstr,
    setSelectedMyanmarFontClassSubstr,
    selectedArabicUrduFontClassSubstr,
    setSelectedArabicUrduFontClassSubstr,
    arabicUrduFontDisplayName,
    myanmarFontDisplayName,
    greekFontDisplayName,
    hebrewFontDisplayName,
    // setArabicUrduFfsId,  // in child
    setArabicUrduFontDisplayName,
    setArabicUrduFontName,    
    setMyanmarFfsId,
    setMyanmarFontDisplayName,
    setMyanmarFontName,
    setBaseFfsId,
    setBaseFontDisplayName,
    setBaseFontName,
    baseFontDisplayName,
    webFontsArabicUrduShortlist,
    webFontsMyanmarShortlist,
    webFontsGreekShortlist,
    webFontsHebrewShortlist,
    webFontsBaseShortlist,
  } = fontShortlistProps;

  const handleChange = (event) => {
    if (event.target.value === 'default') {
      setSelectedHebrewFontClassSubstr('Pankosmia-EzraSIL');
      setSelectedGreekFontClassSubstr('Pankosmia-Cardo');
      setSelectedMyanmarFontClassSubstr('Pankosmia-Padauk');
      setSelectedArabicUrduFontClassSubstr('Pankosmia-AwamiNastaliqPankosmia-NotoNastaliqUrdu');
      setSelectedBaseFontClassSubstr('Pankosmia-GentiumPlus');
    }
  };

  const [radioRightMargin, setRadioRightMargin] = useState('16px');
  const [radioLeftMargin, setRadioLeftMargin] = useState('-11px');

  //tmp
  const labelDir = 'ltr';

  useEffect(() => {
    if (labelDir === 'rtl') {
      setRadioRightMargin('-11px')
      setRadioLeftMargin('16px')
    } else if (labelDir === 'ltr') {
      setRadioRightMargin('16px') // MUI's current default
      setRadioLeftMargin('-11px') // MUI's current default
    }
  }, [labelDir]);

  // This sx is the same as adding to const theme a components:{MuiTypography:{styleOverrides:{root:{"&.MuiTypography-root":{css_goes_here}}}}}
  const labelStyle = ({
    lineHeight: 1.5,
    fontSize: '100%',
    alignSelf: 'flex-start',
  });

  const radioColor = useMemo(() => ({
    "& .MuiSvgIcon-root": {
      fontSize: 28,
      color: 'purple',
    },
  }),[]);

  const isCurrentDefault = selectedFontClass === "fonts-Pankosmia-CardoPankosmia-EzraSILPankosmia-PadaukPankosmia-AwamiNastaliqPankosmia-NotoNastaliqUrduPankosmia-GentiumPlus";
  const isArabicUrduOn = selectedArabicUrduFontClassSubstr.length !== 0;
  const isMyanmarOn = selectedMyanmarFontClassSubstr.length !== 0;
  const isGreekOn = selectedGreekFontClassSubstr.length !== 0;
  const isHebrewOn = selectedHebrewFontClassSubstr.length !== 0;
  const isRangedOn = selectedArabicUrduFontClassSubstr.length + selectedMyanmarFontClassSubstr.length + selectedGreekFontClassSubstr.length + selectedHebrewFontClassSubstr.length !== 0;

  let rangedSet = [];
  if (isRangedOn) {
    isArabicUrduOn && rangedSet.push(isArabicUrduOn && doI18n("pages:core-settings:select_arabicurduscript", i18nRef.current) + ': ' + arabicUrduFontDisplayName);
    isMyanmarOn && rangedSet.push(isMyanmarOn && doI18n("pages:core-settings:select_myanmarscript", i18nRef.current) + ': ' + myanmarFontDisplayName);
    isGreekOn && rangedSet.push(isGreekOn && doI18n("pages:core-settings:select_greekscript", i18nRef.current) + ': ' + greekFontDisplayName);
    isHebrewOn && rangedSet.push(isHebrewOn && doI18n("pages:core-settings:select_hebrewscript", i18nRef.current) +': ' + hebrewFontDisplayName);
  }
  const rangedSetString = rangedSet.join('; ');

  const isArabicUrduSetDiff = selectedArabicUrduFontClassSubstr.toString() !== '' && webFontsArabicUrduShortlist.filter(item => item.id.includes(selectedArabicUrduFontClassSubstr)).length === 0;
  const isBaseSetDiff = selectedBaseFontClassSubstr.toString() !== '' && webFontsBaseShortlist.filter(item => item.id.includes(selectedBaseFontClassSubstr)).length === 0;

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

  const handleOnHebrewChange = (event) => {
    setSelectedHebrewFontClassSubstr(event.target.value);
  };
  
  const handleOnGreekChange = (event) => {
    setSelectedGreekFontClassSubstr(event.target.value);
  };
  
  const handleOnBaseChange = (event) => {
    setSelectedBaseFontClassSubstr(event.target.value);
    const selectedBaseSettingId = webFontsBaseShortlist.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
    setBaseFfsId(selectedBaseSettingId);
    const baseDisplayName = webFontsBaseShortlist.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
    setBaseFontDisplayName(baseDisplayName);
    const baseName = webFontsBaseShortlist.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
    setBaseFontName(baseName);
  };

  const fontShortlistCheckboxItemProps = {
    selectedFontClass,
    radioRightMargin, 
    radioLeftMargin,
  };
  
  /** Build dropdown menus */
  const WebFontsArabicUrduShortlist =
    webFontsArabicUrduShortlist.map((font, index) => (
      <div key={index} value={font.id} dense>
          <FontShortlistCheckboxItem font={font} {...fontShortlistCheckboxItemProps}/>
      </div>
  ));
  const WebFontsMyanmarShortlist =
    webFontsMyanmarShortlist.map((font, index) => (
      <div key={index} value={font.id} dense>
          <FontShortlistCheckboxItem font={font} {...fontShortlistCheckboxItemProps}/>
      </div>
  ));
  const WebFontsGreekShortlist =
  webFontsGreekShortlist.map((font, index) => (
      <div key={index} value={font.id} dense>
          <FontShortlistCheckboxItem font={font} {...fontShortlistCheckboxItemProps}/>
      </div>
  ));
  const WebFontsHebrewShortlist =
  webFontsHebrewShortlist.map((font, index) => (
      <div key={index} value={font.id} dense>
          <FontShortlistCheckboxItem font={font} {...fontShortlistCheckboxItemProps}/>
      </div>
  ));
  const WebFontsBaseShortlist =
  webFontsBaseShortlist.map((font, index) => (
      <div key={index} value={font.id} dense>
          <FontShortlistCheckboxItem font={font} {...fontShortlistCheckboxItemProps}/>
      </div>
  ));
  const none = (label) => 
    (<div>
      <FormControlLabel
        sx={{marginRight: radioRightMargin, marginLeft: radioLeftMargin}} 
        value={''}
        style={{}}
        control={<Radio sx={{alignSelf: 'flex-start', padding: '1px 9px'}} />}
        label=<div className={selectedFontClass} style={{ fontSize: '100%'}}>{label}</div>
      />
    </div>);

  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <FormControl  component="fieldset" style={{ direction: labelDir }}>
        <Grid2 container sx={{}}>
          <Grid2 item>
            <div className={selectedFontClass} style={{ fontSize: '100%'}}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{display: 'flex', flexDirection: 'row', padding: '0px 9px', whiteSpace:'nowrap'}}>
                  <div style={{fontWeight: 'bold'}}>
                    {doI18n("pages:core-settings:base_font", i18nRef.current)}
                  </div>
                  <div style={{padding: '0px 2px', fontWeight: 'normal'}}>
                    {isBaseSetDiff && `(${baseFontDisplayName}):`}
                  </div>
                </div>
                <RadioGroup
                  row={true}
                  aria-labelledby='baseScript-label'
                  defaultValue={selectedBaseFontClassSubstr.toString()}
                  value={selectedBaseFontClassSubstr.toString()}
                  name='baseScript'
                  onChange={handleOnBaseChange}
                  sx={radioColor}
                >
                  {WebFontsBaseShortlist}
                </RadioGroup>
              </div>
              <br />
              <div style={{padding: '0px 9px'}}>
                <Divider />
                <br />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{display: 'flex', flexDirection: 'row', padding: '0px 9px', whiteSpace:'nowrap'}}>
                    <div style={{fontWeight: 'bold'}}>
                      {doI18n("pages:core-settings:select_arabicurduscript", i18nRef.current)}
                    </div>
                    <div style={{padding: '0px 2px', fontWeight: 'normal'}}>
                    {isArabicUrduSetDiff && `(${arabicUrduFontDisplayName}):`}
                    </div>
                  </div>
                  <RadioGroup
                    row={true}
                    defaultValue={selectedArabicUrduFontClassSubstr.toString()}
                    value={selectedArabicUrduFontClassSubstr.toString()}
                    name='arabicUrduScript'
                    onChange={handleOnArabicUrduChange}
                    sx={radioColor}
                  >
                    {WebFontsArabicUrduShortlist}
                    {none(`${doI18n("pages:core-settings:base_font", i18nRef.current)} (${doI18n("pages:core-settings:currently", i18nRef.current)}: ${baseFontDisplayName})`)}
                  </RadioGroup>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{padding: '0px 9px', fontWeight: 'bold'}}>
                    {doI18n("pages:core-settings:select_myanmarscript", i18nRef.current)}
                  </div>
                  <RadioGroup
                    row={true}
                    aria-labelledby='myanmarScript-label'
                    defaultValue={selectedMyanmarFontClassSubstr.toString()}
                    value={selectedMyanmarFontClassSubstr.toString()}
                    name='myanmarScript'
                    onChange={handleOnMyanmarChange}
                    sx={radioColor}
                  >
                    {WebFontsMyanmarShortlist}
                    {none(`${doI18n("pages:core-settings:base_font", i18nRef.current)} (${doI18n("pages:core-settings:currently", i18nRef.current)}: ${baseFontDisplayName})`)}
                  </RadioGroup>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{padding: '0px 9px', fontWeight: 'bold'}}>
                    {doI18n("pages:core-settings:select_greekscript", i18nRef.current)}
                  </div>
                  <RadioGroup
                    row={true}
                    aria-labelledby='greekScript-label'
                    defaultValue={selectedGreekFontClassSubstr.toString()}
                    value={selectedGreekFontClassSubstr.toString()}
                    name='greekScript'
                    onChange={handleOnGreekChange}
                    sx={radioColor}
                  >
                    {WebFontsGreekShortlist}
                    {none(`${doI18n("pages:core-settings:base_font", i18nRef.current)} (${doI18n("pages:core-settings:currently", i18nRef.current)}: ${baseFontDisplayName})`)}
                  </RadioGroup>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{padding: '0px 9px', fontWeight: 'bold'}}>
                    {doI18n("pages:core-settings:select_hebrewscript", i18nRef.current)}
                  </div>
                  <RadioGroup
                    row={true}
                    aria-labelledby='hebrewScript-label'
                    defaultValue={selectedHebrewFontClassSubstr.toString()}
                    value={selectedHebrewFontClassSubstr.toString()}
                    name='hebrewScript'
                    onChange={handleOnHebrewChange}
                    sx={radioColor}
                  >
                    {WebFontsHebrewShortlist}
                    {none(`${doI18n("pages:core-settings:base_font", i18nRef.current)} (${doI18n("pages:core-settings:currently", i18nRef.current)}: ${baseFontDisplayName})`)}
                  </RadioGroup>
                </div>
              </div>
            </div>
            <br />
            <Divider />
            <br />
            <RadioGroup
              aria-labelledby='baseFont-label'
              defaultValue='current'
              name='settings'
              value={isCurrentDefault ? 'default' : 'current'}
              onChange={handleChange}
              sx={radioColor}
            >
              {!isCurrentDefault && <FormControlLabel
                sx={{marginRight: radioRightMargin, marginLeft: radioLeftMargin}} 
                value='current'
                style={{}}
                control={<Radio sx={{alignSelf: 'flex-start', padding: '1px 9px'}} />}
                label={<Typography sx={labelStyle}>
                  <div className={selectedFontClass} style={{ fontSize: '100%'}}>
                    Current Settings:
                    <div style={{margin: '0px 9px 6px 9px'}}>
                      {doI18n("pages:core-settings:base_font", i18nRef.current)}: {baseFontDisplayName}
                      {isRangedOn && <br />}
                      {rangedSetString}
                    </div>
                  </div>
                </Typography>}
              />}
              <FormControlLabel
                sx={{marginRight: radioRightMargin, marginLeft: radioLeftMargin}} 
                value='default'
                style={{}}
                control={<Radio sx={{alignSelf: 'flex-start', padding: '1px 9px'}} />}
                label={<Typography sx={labelStyle}>
                  <div className={selectedFontClass} style={{ fontSize: '100%'}}>
                  {isCurrentDefault ? `${doI18n("pages:core-settings:current_settings", i18nRef.current)} (${doI18n("pages:core-settings:factory_settings", i18nRef.current)})` : `${doI18n("pages:core-settings:factory_settings", i18nRef.current)}`}:
                    <div style={{margin: '0px 9px 6px 9px'}}>
                      {doI18n("pages:core-settings:base_font", i18nRef.current)}: Gentium Plus 6.200<br />
                      {doI18n("pages:core-settings:select_arabicurduscript", i18nRef.current)}: Awami Nastaliq 3.300*; {doI18n("pages:core-settings:select_myanmarscript", i18nRef.current)}: Padauk 5.100; {doI18n("pages:core-settings:select_greekscript", i18nRef.current)}: Cardo 1.0451; {doI18n("pages:core-settings:select_hebrewscript", i18nRef.current)}: Ezra SIL 2.51
                    </div>
                  </div>
                </Typography>}
              />
            </RadioGroup>
            <br />
            <Divider />
            <FormHelperText>
              {doI18n("pages:core-settings:replaceawamiifnotfirefox", i18nRef.current)}
            </FormHelperText>
          </Grid2>
        </Grid2>
      </FormControl>
    </Box>
  )
}

FontShortlist.propTypes = {
  /** Selected Font Class */
  selectedFontClass: PropTypes.string,
  /** Selected Base Font Class Substring */
  selectedBaseFontClassSubstr: PropTypes.string,
  /** Set Selected Base Font Class Substring */
  setSelectedBaseFontClassSubstr: PropTypes.func.isRequired,
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
  /** Selected Arabic / Urdu Font Class Substring */
  selectedArabicUrduFontClassSubstr: PropTypes.string,
  /** Set Selected Arabic / Urdu Font Class Substring */
  setSelectedArabicUrduFontClassSubstr: PropTypes.func.isRequired,
  /** Arabic / Urdu Font Display Name */
  arabicUrduFontDisplayName: PropTypes.string,
  /** Myanmar Font Display Name */
  myanmarFontDisplayName: PropTypes.string,
  /** Greek Font Display Name */
  greekFontDisplayName: PropTypes.string,
  /** Hebrew Font Display Name */
  hebrewFontDisplayName: PropTypes.string,
  /** Base Font Display Name */
  baseFontDisplayName: PropTypes.string,
  /** Arabic / Urdu Script Shortlist Fonts */
  webFontsArabicUrduShortlist: PropTypes.array.isRequired,
  /** Myanmar Script Shortlist Fonts */
  webFontsMyanmarShortlist: PropTypes.array.isRequired,
  /** Greek Script Shortlist Fonts */
  webFontsGreekShortlist: PropTypes.array.isRequired,
  /** Hebrew Script Shortlist Fonts */
  webFontsHebrewShortlist: PropTypes.array.isRequired,
  /** Base Scripts Shortlist Fonts */
  webFontsBaseShortlist: PropTypes.func.isRequired,
};