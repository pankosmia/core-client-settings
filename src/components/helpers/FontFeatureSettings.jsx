import { useMemo } from "react";
import PropTypes from "prop-types";
import { FormLabel, FormControlLabel, RadioGroup, Radio, Typography, Tooltip } from "@mui/material";
import DOMPurify from 'dompurify';

export default function FontFeatureSettings(fontFeatureSettingsProps) {
  const {
    fontDisplayName,
    fontSettings,  // Initially default settings, then options as selected
    handleChange,
    placementDir,
    radioRightMargin,
    radioLeftMargin,
    labelStyle,
    diffStyle,
    isGraphite,
    ffsArr, // Possible options for the ffsId from fontFeatureSettings from font-detect-rhl 
  } = fontFeatureSettingsProps;

  const labelDivStyle = useMemo(() => ({
    fontFamily: 'sans-serif',
    fontStyle: 'bold',
    borderBottom: '1px solid #000',
    marginBottom: '20px',
  }),[]);

  const labelMarkStyle = useMemo(() => ({
    backgroundColor: 'inherit',
    color: 'grey',
    padding: '0.11em .21em',
    borderRadius: '2px',
  }),[]);

  const radioColor = useMemo(() => ({
    "& .MuiSvgIcon-root": {
      fontSize: 28,
    },
  }),[]);

  const tooltipPosition = useMemo(() => ({
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, -12],
        },
      },
    ],
  }), []);

  // The ffsArr is received as needed, already filtered.
  let count = -1;
  const featureSettings = useMemo(() => ffsArr.map((font, fontIndex) => (
    <div key={fontIndex}>
      {font.categories.map((categories, categoriesIndex) => {
        return (<div key={categoriesIndex}>
          {font.categories[categoriesIndex].category.filter(item => isGraphite ? item.opentype_render_required !== true : item.graphite_render_required !== true).map((category, categoryIndex) => {
            return (<div key={categoryIndex}>
              <h1 style={{ textAlign: 'center', color:'purple'}}>{fontDisplayName}: {category.name}</h1>
              {category.sets.map((sets, setsIndex) => {
                return (<div key={setsIndex}>
                  {category.sets[setsIndex].set.filter(item => isGraphite ? item.opentype_render_required !== true : item.graphite_render_required !== true).map((set, setIndex) => {
                    return (<div key={setIndex}>
                      <FormLabel id={set.id}><div style={labelDivStyle}><mark style={labelMarkStyle}><br />{set.title}</mark></div></FormLabel>
                      <RadioGroup
                        aria-labelledby={set.id}
                        defaultValue={set.default}
                        name={set.name}
                        value={fontSettings.length === 0 ? set.default : fontSettings[++count].value}
                        onChange={handleChange}
                        sx={radioColor}
                      >
                        {set.options.map((option, optionIndex) => {
                          return (<div key={optionIndex}>
                            <Tooltip title={option.tip} placement={placementDir} slotProps={tooltipPosition} arrow={true}>
                              <FormControlLabel
                                sx={{ marginRight: radioRightMargin, marginLeft: radioLeftMargin }}
                                value={option.value}
                                style={{ fontFeatureSettings: '"' + set.name + '" ' + option.value, MozFontFeatureSettings: '"' + set.name + '" ' + option.value, WebkitFontFeatureSettings: '"' + set.name + '" ' + option.value }}
                                control={<Radio />}
                                label={<Typography sx={labelStyle}><div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(set.label).replaceAll('{diffStyle}', diffStyle) }} /></Typography>}
                              />
                            </Tooltip>
                          </div>)
                        })}
                      </RadioGroup>
                    </div>)
                  })}
                </div>)
              })}
            </div>)
          })}
        </div>)
      })}
    </div>
  )), [count, diffStyle, ffsArr, fontDisplayName, fontSettings, handleChange, isGraphite, labelDivStyle, labelMarkStyle, labelStyle, placementDir, radioColor, radioLeftMargin, radioRightMargin, tooltipPosition]);

  return featureSettings;
}

FontFeatureSettings.propTypes = {
  /** Font Display Name */
  fontDisplayName: PropTypes.string.isRequired,
  /** Font Settings Array of Objects */
  fontSettings: PropTypes.array.isRequired,
  /** Handle Change Function */
  handleChange: PropTypes.func.isRequired,
  /** Placement Direction */
  placementDir: PropTypes.string,
  /** Radio Right Margin */
  radioRightMargin: PropTypes.string,
  /** Radio Left Margin */
  radioLeftMargin: PropTypes.string,
  /** Label Style */
  labelStyle: PropTypes.object,
  /** Difference Style */
  diffStyle: PropTypes.string,
  /** Is Rendering in Graphite? */
  isGraphite: PropTypes.bool.isRequired,
  /** Array of Font Feature Settings Options */
  ffsArr: PropTypes.array.isRequired,
};