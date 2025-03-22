import { PropTypes } from "prop-types";
import { FormControlLabel, Radio } from "@mui/material";

export default function FontPresetsCheckboxItem(fontCheckboxItemProps) {
  const { font, selectedFontClass, radioRightMargin, radioLeftMargin } = fontCheckboxItemProps;

  return (
    <FormControlLabel
      sx={{marginRight: radioRightMargin, marginLeft: radioLeftMargin}} 
      value={font.id}
      style={{}}
      control={<Radio sx={{alignSelf: 'flex-start', padding: '1px 9px'}} />}
      label=<div className={selectedFontClass} style={{ fontSize: '100%'}}>{font.display_name}</div>
    />
  );
}

FontPresetsCheckboxItem.propTypes = {
  font: PropTypes.shape({
    display_name: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    settings_id: PropTypes.string,
  }),
};