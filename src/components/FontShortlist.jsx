import { useState, useMemo, useEffect, useContext } from "react";

import PropTypes from 'prop-types';
import { Box, FormControl, Grid2, RadioGroup, Radio, FormControlLabel, Typography, FormHelperText, MenuItem, Select, InputLabel, Stack } from "@mui/material";
import { i18nContext as I18nContext, doI18n } from "pithekos-lib";

import FontShortlistMenuItem from "./FontShortlistMenuItem";
import sx from "./Selection.styles";

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
      setBaseFfsId('Gentium Plus');
      setBaseFontDisplayName('Gentium Plus 6.200');
      setBaseFontName('Pankosmia-Gentium Plus');
      // setArabicUrduFfsId('Awami Nastaliq');
      setArabicUrduFontDisplayName('Awami Nastaliq 3.300*');
      setArabicUrduFontName('Pankosmia-Awami Nastaliq');
      setMyanmarFfsId('Padauk');
      setMyanmarFontDisplayName('Padauk 5.100');
      setMyanmarFontName('Pankosmia-Padauk');
    };
  }

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

  const fontShortlistMenuItemProps = {
    selectedFontClass,
  };
  
  /** Build dropdown menus */
  const WebFontsArabicUrduShortlist =
    webFontsArabicUrduShortlist.map((font, index) => (
     <MenuItem key={index} value={font.id} dense>
       <FontShortlistMenuItem font={font} {...fontShortlistMenuItemProps}/>
     </MenuItem>
  ));
  const WebFontsMyanmarShortlist =
    webFontsMyanmarShortlist.map((font, index) => (
     <MenuItem key={index} value={font.id} dense>
      <FontShortlistMenuItem font={font} {...fontShortlistMenuItemProps}/>
     </MenuItem>
  ));
  const WebFontsGreekShortlist =
    webFontsGreekShortlist.map((font, index) => (
      <MenuItem key={index} value={font.id} dense>
        <FontShortlistMenuItem font={font} {...fontShortlistMenuItemProps}/>
      </MenuItem>
  ));
  const WebFontsHebrewShortlist =
    webFontsHebrewShortlist.map((font, index) => (
      <MenuItem key={index} value={font.id} dense>
        <FontShortlistMenuItem font={font} {...fontShortlistMenuItemProps}/>
      </MenuItem>
  ));
  const WebFontsBaseShortlist =
    webFontsBaseShortlist.map((font, index) => (
      <MenuItem key={index} value={font.id} dense>
        <FontShortlistMenuItem font={font} {...fontShortlistMenuItemProps}/>
      </MenuItem>
  ));

  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <FormControl  component="fieldset" style={{ direction: labelDir }}>
        <Grid2 container sx={{}}>
          <Grid2 item>
            <div className={selectedFontClass} style={{ fontSize: '100%'}}>
              <Stack direction="column" spacing={2}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControl fullWidth style={{maxWidth: 400}} size="small">
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
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControl fullWidth style={{maxWidth: 400}} size="small">
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
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControl fullWidth style={{maxWidth: 400}} size="small">
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
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControl fullWidth style={{maxWidth: 400}} size="small">
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
                    >
                      {WebFontsArabicUrduShortlist}
                    </Select>
                  </FormControl>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControl fullWidth style={{maxWidth: 400}} size="small">
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
                </div>
              </Stack>
            </div>
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