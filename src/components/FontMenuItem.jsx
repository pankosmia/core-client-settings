import { PropTypes } from "prop-types";
import { Typography } from "@mui/material";

export default function FontShortlistMenuItem(fontCheckboxItemProps) {
  const { font, adjSelectedFontClass } = fontCheckboxItemProps;

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

  const adjHeight = font.name.includes("Awami Nastaliq") ? '1.75' : '';

  return (
    <div style={(styles.menuItem)}>
      <div
        style={styles.menuItem}
      >
        <Typography
          class={adjSelectedFontClass}
          style={{ fontSize: '100%'}}
          noWrap
          variant="body2"
          component="div"
        >
          {font.display_name}
        </Typography>
        <hr style={styles.hr} />
        <Typography
          style={{ fontSize: '100%', fontFamily: font.name, lineHeight: adjHeight}}
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
  /** Font */
  font: PropTypes.shape({
    display_name: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    settings_id: PropTypes.string,
    example: PropTypes.string,
  }),
  /** Adjusted Selected Font Class */
  adjSelectedFontClass: PropTypes.string,
};