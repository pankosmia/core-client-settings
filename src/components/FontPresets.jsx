import { useState, useMemo, useEffect, useContext } from "react";

import PropTypes from 'prop-types';
import { Box, FormControl, Grid2, RadioGroup, Radio, FormControlLabel, Typography, FormHelperText, Divider } from "@mui/material";
import { i18nContext as I18nContext, doI18n } from "pithekos-lib";

import FontPresetsCheckboxItem from "./FontPresetsCheckboxItem";

export default function FontPresets(fontPresetsProps) {
  const { i18nRef } = useContext(I18nContext);
  const {
    selectedFontClass,
    selectedOtherFontClassSubstr,
    setSelectedOtherFontClassSubstr,
    selectedFallbackFontClassSubstr,
    setSelectedFallbackFontClassSubstr,
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
    otherFontDisplayName,
    fallbackFontDisplayName,
    webFontsArabicUrduPresets,
    webFontsMyanmarPresets,
    webFontsGreekPresets,
    webFontsHebrewPresets,
    webFontsOtherPresets,
    webFontsFallbackPresets,
  } = fontPresetsProps;

  const handleChange = (event) => {
    if (event.target.value === 'default') {
      setSelectedHebrewFontClassSubstr('Pankosmia-EzraSIL');
      setSelectedGreekFontClassSubstr('Pankosmia-Cardo');
      setSelectedMyanmarFontClassSubstr('Pankosmia-Padauk');
      setSelectedArabicUrduFontClassSubstr('Pankosmia-AwamiNastaliqPankosmia-NotoNastaliqUrdu');
      setSelectedOtherFontClassSubstr('');
      setSelectedFallbackFontClassSubstr('Pankosmia-GentiumPlus');
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
  const isOtherOn = selectedOtherFontClassSubstr.length !== 0;

  let rangedSet = [];
  if (isRangedOn) {
    isArabicUrduOn && rangedSet.push(isArabicUrduOn && doI18n("pages:core-settings:select_arabicurduscript", i18nRef.current) + ': ' + arabicUrduFontDisplayName);
    isMyanmarOn && rangedSet.push(isMyanmarOn && doI18n("pages:core-settings:select_myanmarscript", i18nRef.current) + ': ' + myanmarFontDisplayName);
    isGreekOn && rangedSet.push(isGreekOn && doI18n("pages:core-settings:select_greekscript", i18nRef.current) + ': ' + greekFontDisplayName);
    isHebrewOn && rangedSet.push(isHebrewOn && doI18n("pages:core-settings:select_hebrewscript", i18nRef.current) +': ' + hebrewFontDisplayName);
  }
  const rangedSetString = rangedSet.join('; ');

  const isArabicUrduSetDiff = selectedArabicUrduFontClassSubstr.toString() !== '' && webFontsArabicUrduPresets.filter(item => item.id.includes(selectedArabicUrduFontClassSubstr)).length === 0;
  const isOtherSetDiff = selectedOtherFontClassSubstr.toString() !== '' && webFontsOtherPresets.filter(item => item.id.includes(selectedOtherFontClassSubstr)).length === 0;

  
  const handleOnArabicUrduChange = (event) => {
    setSelectedArabicUrduFontClassSubstr(event.target.value);
  };
  
  const handleOnMyanmarChange = (event) => {
      setSelectedMyanmarFontClassSubstr(event.target.value);
  };

  const handleOnHebrewChange = (event) => {
    setSelectedHebrewFontClassSubstr(event.target.value);
  };
  
  const handleOnGreekChange = (event) => {
    setSelectedGreekFontClassSubstr(event.target.value);
  };
  
  const handleOnOtherChange = (event) => {
    setSelectedOtherFontClassSubstr(event.target.value);
  };
  
  const handleOnFallbackChange = (event) => {
    setSelectedFallbackFontClassSubstr(event.target.value);
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
  const WebFontsOtherPresets =
  webFontsOtherPresets.map((font, index) => (
      <div key={index} value={font.id} dense>
          <FontPresetsCheckboxItem font={font} {...fontPresetsCheckboxItemProps}/>
      </div>
  ));
  const WebFontsFallbackPresets =
  webFontsFallbackPresets.map((font, index) => (
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
              aria-labelledby='set.id'
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
                      {doI18n("pages:core-settings:select_otherscripts", i18nRef.current)}: {isOtherOn ? otherFontDisplayName + ', ' : ''}{fallbackFontDisplayName}
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
                      {doI18n("pages:core-settings:select_otherscripts", i18nRef.current)}: Gentium Plus 6.200
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
                  {none(doI18n("pages:core-settings:other-fallback", i18nRef.current))}
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
                  {none(doI18n("pages:core-settings:other-fallback", i18nRef.current))}
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
                  {none(doI18n("pages:core-settings:other-fallback", i18nRef.current))}
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
                  {none(doI18n("pages:core-settings:other-fallback", i18nRef.current))}
                </RadioGroup>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{display: 'flex', flexDirection: 'row', padding: '0px 9px', whiteSpace:'nowrap'}}>
                  <div style={{fontWeight: 'bold'}}>
                    {doI18n("pages:core-settings:select_otherscripts", i18nRef.current)}
                  </div>
                  <div style={{padding: '0px 2px', fontWeight: 'normal'}}>
                    {isOtherSetDiff && `(${otherFontDisplayName}):`}
                  </div>
                </div>
                <RadioGroup
                  row={true}
                  aria-labelledby='otherScript-label'
                  defaultValue={selectedOtherFontClassSubstr.toString()}
                  value={selectedOtherFontClassSubstr.toString()}
                  name='otherScript'
                  onChange={handleOnOtherChange}
                  sx={radioColor}
                >
                  {WebFontsOtherPresets}
                  {none(doI18n("pages:core-settings:fallback", i18nRef.current))}
                </RadioGroup>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{padding: '0px 9px', fontWeight: 'bold'}}>
                  {doI18n("pages:core-settings:select_fallbackscriptfont", i18nRef.current)}
                </div>
                <RadioGroup
                  row={true}
                  aria-labelledby='fallbackScript-label'
                  defaultValue={selectedFallbackFontClassSubstr.toString()}
                  value={selectedFallbackFontClassSubstr.toString()}
                  name='fallbackScript'
                  onChange={handleOnFallbackChange}
                  sx={radioColor}
                >
                  {WebFontsFallbackPresets}
                </RadioGroup>
              </div>
            </div>
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

FontPresets.propTypes = {
  /** Selected Font Class */
  selectedFontClass: PropTypes.string,
  /** Selected Other Font Class Substring */
  selectedOtherFontClassSubstr: PropTypes.string,
  /** Set Selected Other Font Class Substring */
  setSelectedOtherFontClassSubstr: PropTypes.func.isRequired,
  /** Selected Fallback Font Class Substring */
  selectedFallbackFontClassSubstr: PropTypes.string,
  /** Set Selected Fallback Font Class Substring */
  setSelectedFallbackFontClassSubstr: PropTypes.func.isRequired,
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
  /** Other Font Display Name */
  otherFontDisplayName: PropTypes.string,
  /** Fallback Font Display Name */
  fallbackFontDisplayName: PropTypes.string,
  /** Arabic / Urdu Script Preset Fonts */
  webFontsArabicUrduPresets: PropTypes.array.isRequired,
  /** Myanmar Script Preset Fonts */
  webFontsMyanmarPresets: PropTypes.array.isRequired,
  /** Greek Script Preset Fonts */
  webFontsGreekPresets: PropTypes.array.isRequired,
  /** Hebrew Script Preset Fonts */
  webFontsHebrewPresets: PropTypes.array.isRequired,
  /** Other Scripts Preset Fonts */
  webFontsOtherPresets: PropTypes.func.isRequired,
  /** Fallback Preset Fonts */
  webFontsFallbackPresets: PropTypes.func.isRequired,
};