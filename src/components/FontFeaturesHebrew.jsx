import { useState, useCallback, useMemo, useEffect } from "react";

import PropTypes from 'prop-types';
import { Box, ClickAwayListener, FormControl, createTheme, ThemeProvider, Grid2 } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { renderToString } from 'react-dom/server';
import { useDetectDir } from "font-detect-rhl";

import FontFeatureDefaults from "./helpers/FontFeatureDefaults";
import RadioLabelText from "./helpers/RadioLabelText";
import FontFeatureSettings from "./helpers/FontFeatureSettings";

export default function FontFeaturesHebrew(fontFeaturesHebrewProps) {
  const {
    hebrewFontSettings, // Selected options (initially default)
    setHebrewFontSettings,
    ffsId,
    fontName,
    fontDisplayName,
    fontSize,
    lineHeight,
    isGraphiteAssumed,
    ffsArr, // Options
    exampleRegex,
    setExampleHebrew, // Example text
  } = fontFeaturesHebrewProps;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const [maxWindowHeight, setMaxWindowHeight] = useState(window.innerHeight - 75);
  const [maxWindowWidth, setMaxWindowWidth] = useState(window.innerWidth - 175);
  const handleWindowResize = useCallback(event => {
    setMaxWindowHeight(window.innerHeight - 75);
    setMaxWindowWidth(window.innerWidth - 175);
    // setLeftPosition(window.innerWidth > 1103 ? -781 : -100);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
        window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  const styles = {
    position: 'fixed',
    top: 49,
    right: 250,
    zIndex: 1,
    border: '1px solid purple',
    p: 1,
    bgcolor: 'background.paper',
    backgroundColor: "whitesmoke",
    borderRadius: '8px',
    maxHeight: maxWindowHeight,
    maxWidth: maxWindowWidth,
    overflow: "scroll",
  };

  // The diffStyle constant is for emphasis in Awami Nastliq labels.
  // eslint-disable-next-line no-unused-vars
  const diffStyle = "color: purple;";

  const fontSettingsArrProps = {
    ffsArr, 
    isGraphiteAssumed,
  };

  const fontSettingsArr = FontFeatureDefaults(fontSettingsArrProps);

  useEffect(() => {
    if (fontSettingsArr.length !== 0) {
      setHebrewFontSettings(fontSettingsArr);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ffsId]);

  // Get radio label text
  const labelJsxText = RadioLabelText(fontSettingsArrProps);

  // identify text dir, and also use text in the font feature settings container
  // convert jsx return to string, replace quote and apostrophe html special entities, and remove html tags and attributes
  const labelStr = useMemo(() => renderToString(labelJsxText).replace(/&quot;/ig, '"').replace(/&#x27;/ig, "'").replace(/(<([^>]+)>)/ig, ''),[labelJsxText]);
  const labelDir = useDetectDir({ text: labelStr, isMarkup: false, ratioThreshold: .51 });
  
  useEffect(() => {
    if (fontSettingsArr.length !== 0) {
      // eslint-disable-next-line no-control-regex
      const exampleStr = 'וַיֹּ֣אמֶר אֱלֹהִ֗ים יִקָּו֨וּ הַמַּ֜יִם מִתַּ֤חַת הַשָּׁמַ֙יִם֙ אֶל־מָק֣וֹם אֶחָ֔ד וְתֵרָאֶ֖ה הַיַּבָּשָׁ֑ה וַֽיְהִי־כֵֽן׃ ' + labelStr.replace(exampleRegex, '');
      setExampleHebrew(exampleStr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ffsId]);

  const handleChange = useMemo(() => (event) => {
    const newState = hebrewFontSettings.map(obj => {
      if (obj.name === event.target.name) {
        return {...obj, value: +event.target.value};
      }
      // otherwise return the object as is
      return obj;
    });
      setHebrewFontSettings(newState);
  },[hebrewFontSettings, setHebrewFontSettings]);
  const [placementDir, setPlacementDir] = useState('left');
  const [radioRightMargin, setRadioRightMargin] = useState('16px');
  const [radioLeftMargin, setRadioLeftMargin] = useState('-11px');

  useEffect(() => {
    if (labelDir === 'rtl') {
      setPlacementDir('right')
      setRadioRightMargin('-11px')
      setRadioLeftMargin('16px')
    } else if (labelDir === 'ltr') {
      setPlacementDir('left')
      setRadioRightMargin('16px') // MUI's current default
      setRadioLeftMargin('-11px') // MUI's current default
    }
  }, [labelDir]);

  const theme =  useMemo(() => createTheme({
    typography: {
      fontFamily: [
        '"' + fontName + '"',
      ].join(','),
    },
    box: {
      dir: labelDir,
      textAlign: placementDir,
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: ".85em",
            color: "purple",
            backgroundColor: "#dcdcdc",
            border: '1px solid black', 
            fontFamily: 'sans-serif',
            "& .MuiTooltip-arrow": {
              "&::before": {
                backgroundColor: "purple",
              },
            },
          }
        }
      },
    }
  }), [labelDir, placementDir, fontName]);

  // This sx is the same as adding to const theme a components:{MuiTypography:{styleOverrides:{root:{"&.MuiTypography-root":{css_goes_here}}}}}
  const labelStyle = useMemo(() => ({
    lineHeight: lineHeight,
    fontSize: fontSize,
  }),[fontSize, lineHeight]);

  const fontFeatureSettingsProps = {
    fontDisplayName,
    fontSettings: hebrewFontSettings,
    handleChange,
    placementDir,
    radioRightMargin,
    radioLeftMargin,
    labelStyle,
    diffStyle,
    isGraphiteAssumed,
    ffsArr,
  };

  const DrawerList = (
      <FormControl style={{ direction: labelDir }}>
        <Grid2 container sx={{ maxWidth: 500 }}>
          <Grid2 item>
            <div style={{marginRight: 25, marginLeft: 25}}>
              <FontFeatureSettings {...fontFeatureSettingsProps} />
            </div>
          </Grid2>
        </Grid2>
      </FormControl>
  );

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <AddCircleIcon sx={{ cursor: 'pointer' }} style={{ color: "purple", paddingLeft: '9px', margin: 'auto 0' }} onClick={handleClick} />
          {open ? (
            <ThemeProvider theme={theme}>
              <div dir={labelDir} style={{textAlign:placementDir}}>
                <Box sx={styles}>
                  {DrawerList}
                </Box>
              </div>
            </ThemeProvider>
          ) : null}
        </Box>
      </ClickAwayListener>
    </>
  )
}

FontFeaturesHebrew.propTypes = {
  /** Hebrew Font Settings (initially default) */
  hebrewFontSettings: PropTypes.array,
  /** Set Hebrew Font Settings */
  setHebrewFontSettings: PropTypes.func.isRequired,
  /** Font Feature Settings ID  */
  ffsId: PropTypes.string,
  /** Font Name */
  fontName: PropTypes.string,
  /** Font Display Name */
  fontDisplayName: PropTypes.string.isRequired,
  /** Font Size */
  fontSize: PropTypes.string,
  /** Line Height */
  lineHeight: PropTypes.string,
  /** Is Graphite Assumed? */
  isGraphiteAssumed: PropTypes.bool.isRequired,
  /** Font Feature Settings Array (Options)*/
  ffsArr: PropTypes.array.isRequired,
  /** Example Regular Expression */
  exampleRegex: PropTypes.func.isRequired,
  /** Set Example Hebrew Text */
  setExampleHebrew: PropTypes.func.isRequired,
};