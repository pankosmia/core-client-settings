import { PropTypes } from "prop-types";
import { Typography } from "@mui/material";

export default function FontMenuItem(fontMenuItemProps) {
  const { font } = fontMenuItemProps;

  const styles = {
    menuItem: {
      display: "flex",
      justifyContent: "space-between",
      color: 'DimGray',
    },
  };

  return (
    <div style={(styles.menuItem)}>
      <div
        style={styles.menuItem}
      >
        <Typography
          style={{ width: "100%" }}
          noWrap
          variant="body2"
          component="div"
        >
          {font.display_name}
        </Typography>
      </div>
    </div>
  );
}

FontMenuItem.propTypes = {
  font: PropTypes.shape({
    display_name: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    settings_id: PropTypes.string,
  }),
};