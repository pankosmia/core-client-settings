import { useState, useMemo, useEffect, useContext } from "react";

import PropTypes from 'prop-types';
import { Box, FormControl, Grid2, RadioGroup, Radio, FormControlLabel, Typography, FormHelperText, Divider } from "@mui/material";
import { i18nContext as I18nContext, doI18n } from "pithekos-lib";

import FontPresetsCheckboxItem from "./FontPresetsCheckboxItem";

export default function FontPresets(fontPresetsProps) {
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
    webFontsArabicUrduPresets,
    webFontsMyanmarPresets,
    webFontsGreekPresets,
    webFontsHebrewPresets,
    webFontsBasePresets,
  } = fontPresetsProps;

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

  const isArabicUrduSetDiff = selectedArabicUrduFontClassSubstr.toString() !== '' && webFontsArabicUrduPresets.filter(item => item.id.includes(selectedArabicUrduFontClassSubstr)).length === 0;
  const isBaseSetDiff = selectedBaseFontClassSubstr.toString() !== '' && webFontsBasePresets.filter(item => item.id.includes(selectedBaseFontClassSubstr)).length === 0;

    const handleOnArabicUrduChange = (event) => {
    setSelectedArabicUrduFontClassSubstr(event.target.value);
    // const selectedArabicUrduSettingId = webFontsArabicUrduPresets.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
    // setArabicUrduFfsId(selectedArabicUrduSettingId);
    const arabicUrduDisplayName = webFontsArabicUrduPresets.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
    setArabicUrduFontDisplayName(arabicUrduDisplayName);
    const arabicUrduName = webFontsArabicUrduPresets.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
    setArabicUrduFontName(arabicUrduName);
  };
  
  const handleOnMyanmarChange = (event) => {
      setSelectedMyanmarFontClassSubstr(event.target.value);
      const selectedMyanmarSettingId = webFontsMyanmarPresets.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
      setMyanmarFfsId(selectedMyanmarSettingId);
      const myanmarDisplayName = webFontsMyanmarPresets.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
      setMyanmarFontDisplayName(myanmarDisplayName);
      const myanmarName = webFontsMyanmarPresets.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
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
    const selectedBaseSettingId = webFontsBasePresets.filter((font) => font.id === event.target.value).map((font, index) => (font.settings_id));
    setBaseFfsId(selectedBaseSettingId);
    const baseDisplayName = webFontsBasePresets.filter((font) => font.id === event.target.value).map((font, index) => (font.display_name));
    setBaseFontDisplayName(baseDisplayName);
    const baseName = webFontsBasePresets.filter((font) => font.id === event.target.value).map((font, index) => (font.name));
    setBaseFontName(baseName);
  };

  const fontPresetsCheckboxItemProps = {
    selectedFontClass,
    radioRightMargin, 
    radioLeftMargin,
  };
  
  /** Build dropdown menus */
  const WebFontsArabicUrduPresets =
    webFontsArabicUrduPresets.map((font, index) => (
      <div key={index} value={font.id} dense>
          <FontPresetsCheckboxItem font={font} {...fontPresetsCheckboxItemProps}/>
      </div>
  ));
  const WebFontsMyanmarPresets =
    webFontsMyanmarPresets.map((font, index) => (
      <div key={index} value={font.id} dense>
          <FontPresetsCheckboxItem font={font} {...fontPresetsCheckboxItemProps}/>
      </div>
  ));
  const WebFontsGreekPresets =
  webFontsGreekPresets.map((font, index) => (
      <div key={index} value={font.id} dense>
          <FontPresetsCheckboxItem font={font} {...fontPresetsCheckboxItemProps}/>
      </div>
  ));
  const WebFontsHebrewPresets =
  webFontsHebrewPresets.map((font, index) => (
      <div key={index} value={font.id} dense>
          <FontPresetsCheckboxItem font={font} {...fontPresetsCheckboxItemProps}/>
      </div>
  ));
  const WebFontsBasePresets =
  webFontsBasePresets.map((font, index) => (
      <div key={index} value={font.id} dense>
          <FontPresetsCheckboxItem font={font} {...fontPresetsCheckboxItemProps}/>
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
            <RadioGroup
              aria-labelledby='baseFont-label'
              defaultValue='current'
              name='preset'
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
                      {rangedSetString}
                      {isRangedOn && <br />}
                      {doI18n("pages:core-settings:base_font", i18nRef.current)}: {baseFontDisplayName}
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
                  {isCurrentDefault ? 'Current Settings (Pankosmia Default)' : 'Pankosmia Default'}:
                    <div style={{margin: '0px 9px 6px 9px'}}>
                      {doI18n("pages:core-settings:select_arabicurduscript", i18nRef.current)}: Awami Nastaliq 3.300*; {doI18n("pages:core-settings:select_myanmarscript", i18nRef.current)}: Padauk 5.100; {doI18n("pages:core-settings:select_greekscript", i18nRef.current)}: Cardo 1.0451; {doI18n("pages:core-settings:select_hebrewscript", i18nRef.current)}: Ezra SIL 2.51<br />
                      {doI18n("pages:core-settings:base_font", i18nRef.current)}: Gentium Plus 6.200
                    </div>
                  </div>
                </Typography>}
              />
            </RadioGroup>
            <br />
            <Divider />
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
                  {WebFontsBasePresets}
                </RadioGroup>
              </div>
              <br />
              <div style={{padding: '0px 9px'}}>
                <Divider />
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
                    {WebFontsArabicUrduPresets}
                    {none(doI18n("pages:core-settings:base_font", i18nRef.current))}
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
                    {WebFontsMyanmarPresets}
                    {none(doI18n("pages:core-settings:base_font", i18nRef.current))}
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
                    {WebFontsGreekPresets}
                    {none(doI18n("pages:core-settings:base_font", i18nRef.current))}
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
                    {WebFontsHebrewPresets}
                    {none(doI18n("pages:core-settings:base_font", i18nRef.current))}
                  </RadioGroup>
                </div>
              </div>
              <br />
              <Divider />
              <FormHelperText>
                {doI18n("pages:core-settings:replaceawamiifnotfirefox", i18nRef.current)}
              </FormHelperText>
            </div>
          </Grid2>
        </Grid2>
      </FormControl>
    </Box>
  )
}

FontPresets.propTypes = {
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
  /** Arabic / Urdu Script Preset Fonts */
  webFontsArabicUrduPresets: PropTypes.array.isRequired,
  /** Myanmar Script Preset Fonts */
  webFontsMyanmarPresets: PropTypes.array.isRequired,
  /** Greek Script Preset Fonts */
  webFontsGreekPresets: PropTypes.array.isRequired,
  /** Hebrew Script Preset Fonts */
  webFontsHebrewPresets: PropTypes.array.isRequired,
  /** Base Scripts Preset Fonts */
  webFontsBasePresets: PropTypes.func.isRequired,
};