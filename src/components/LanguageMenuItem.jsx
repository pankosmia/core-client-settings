import { PropTypes } from "prop-types";
import { Typography } from "@mui/material";

export default function LanguageMenuItem(languageMenuItemProps) {
  const { languageId } = languageMenuItemProps;

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
          {languageId}
        </Typography>
      </div>
    </div>
  );
}

LanguageMenuItem.propTypes = {
  languageId: PropTypes.shape({
    index: PropTypes.string,
  }),
};