import { PropTypes } from "prop-types";
import { Typography } from "@mui/material";

export default function FontShortlistMenuItem(fontCheckboxItemProps) {
  const { font, selectedFontClass } = fontCheckboxItemProps;

  const styles = {
    hr: {
      border: 'none',
      height: '0px',
      borderTop: '1px dotted black',
    },
    menuItem: {
      width: '100%',
      display: "flex",
      justifyContent: "space-around",
      color: 'DimGray',
    },
  };

  return (
    <div style={(styles.menuItem)}>
      <div
        style={styles.menuItem}
      >
        <Typography
          class={selectedFontClass}
          style={{ fontSize: '100%' }}
          noWrap
          variant="body2"
          component="div"
        >
          {font.display_name}
        </Typography>
        <hr style={styles.hr} />
        <Typography
          style={{ fontSize: '100%', fontFamily: font.name }}
          noWrap
          variant="body2"
          component="div"
        >
          {font.example}
        </Typography>
      </div>
    </div>
  );
}

FontShortlistMenuItem.propTypes = {
  font: PropTypes.shape({
    display_name: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    settings_id: PropTypes.string,
    example: PropTypes.string,
  }),
};