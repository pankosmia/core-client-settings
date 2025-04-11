import { useContext, Fragment } from "react";

import PropTypes from 'prop-types';
import { Box, FormControl, Grid2, MenuItem, Select, InputLabel, Stack, Tooltip } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import EmergencyIcon from '@mui/icons-material/Emergency';
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
    // setArabicUrduFfsId,  // in child
    setArabicUrduFontDisplayName,
    setArabicUrduFontName,    
    setMyanmarFfsId,
    setMyanmarFontDisplayName,
    setMyanmarFontName,
    setBaseFfsId,
    setBaseFontDisplayName,
    setBaseFontName,
    webFontsArabicUrduShortlist,
    webFontsMyanmarShortlist,
    webFontsGreekShortlist,
    webFontsHebrewShortlist,
    webFontsBaseShortlist,
    isCurrentDefault,
  } = fontShortlistProps;

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
    setArabicUrduFontDisplayName('Awami Nastaliq 3.300*');
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

  const isBaseDefault = selectedBaseFontClassSubstr.toString() === "Pankosmia-GentiumPlus";
  const isGreekDefault = selectedGreekFontClassSubstr.toString() === "Pankosmia-Cardo";
  const isHebrewDefault = selectedHebrewFontClassSubstr.toString() === "Pankosmia-EzraSIL";
  const isArabicUrduDefault = selectedArabicUrduFontClassSubstr.toString() === "Pankosmia-AwamiNastaliqPankosmia-NotoNastaliqUrdu";
  const isMyanmarDefault = selectedMyanmarFontClassSubstr.toString() === "Pankosmia-Padauk";

  const isAwami = selectedArabicUrduFontClassSubstr.toString() !== '' && selectedArabicUrduFontClassSubstr.toString() !== 'Pankosmia-NotoNaskhArabic';

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
                      title="Gentium Plus 6.200"
                      placement="right"
                      arrow
                    >
                      <RestoreIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto' }} onClick={handleClickBase} />
                    </Tooltip>}
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
                      title="Cardo 1.0451"
                      placement="right"
                      arrow
                    >
                      <RestoreIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto' }} onClick={handleClickGreek} />
                    </Tooltip>}
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
                      title="Ezra SIL 2.51"
                      placement="right"
                      arrow
                    >
                      <RestoreIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto' }} onClick={handleClickHebrew} />
                    </Tooltip>}
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
                    >
                      {WebFontsArabicUrduShortlist}
                    </Select>
                  </FormControl>
                  {!isArabicUrduDefault &&  
                    <Tooltip 
                      title="Awami Nastaliq 3.300*"
                      placement="right"
                      arrow
                    >
                      <RestoreIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto' }} onClick={handleClickArabicUrdu} />
                    </Tooltip>
                  }
                  {isAwami &&
                    <Tooltip
                      title={doI18n("pages:core-settings:replaceawamiifnotfirefox", i18nRef.current)}
                      placement="right"
                    >
                      <EmergencyIcon sx={{ fontSize: 10 }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto 0' }} />
                    </Tooltip>
                  }
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
                      title="Padauk 5.100"
                      placement="right"
                      arrow
                    >
                      <RestoreIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto' }} onClick={handleClickMyanmar} />
                    </Tooltip>}
                </div>
                <div className={selectedFontClass} style={{ display: 'flex', flexDirection: 'row', fontSize: '100%' }}>
                  {!isCurrentDefault &&  
                    <Tooltip 
                      title={
                        <Fragment>
                            {doI18n("pages:core-settings:base_font", i18nRef.current)}: Gentium Plus 6.200<br /><br />
                            {doI18n("pages:core-settings:select_greekscript", i18nRef.current)}: Cardo 1.0451<br /><br />
                            {doI18n("pages:core-settings:select_hebrewscript", i18nRef.current)}: Ezra SIL 2.51<br /><br />
                            {doI18n("pages:core-settings:select_arabicurduscript", i18nRef.current)}: Awami Nastaliq 3.300*<br /><br />
                            {doI18n("pages:core-settings:select_myanmarscript", i18nRef.current)}: Padauk 5.100
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
  /** Are Current Setting Default Settings? */
  isCurrentDefault: PropTypes.bool.isRequired,
};