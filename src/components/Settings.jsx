import { useContext, useState } from "react"
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Grid2, Switch } from "@mui/material";
import { debugContext, i18nContext, doI18n, getJson } from "pithekos-lib";
import BlendedFontsPage from "./BlendedFontsPage";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Settings() {
  const [value, setValue] = useState(0);
  const {debugRef} = useContext(debugContext);
  const i18n = useContext(i18nContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"        
          aria-label="basic tabs example"
        >
          <Tab label={doI18n("pages:core-settings:debug_prompt", i18n)} {...a11yProps(0)} />
          <Tab label={doI18n("pages:core-settings:fonts", i18n)} {...a11yProps(1)} />
          <Tab label={doI18n("pages:core-settings:language", i18n)} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <Grid2 container>
          <Grid2 item size={1}>
            <b>{doI18n("pages:core-settings:debug_prompt", i18n)}</b>
          </Grid2>
          <Grid2 item size={11}>
            <Switch
                checked={debugRef.current}
                color="secondary"
                onChange={() =>
                    debugRef.current ?
                        getJson("/debug/disable", debugRef.current) :
                        getJson("/debug/enable", debugRef.current)
                }
            />
          </Grid2>
        </Grid2>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BlendedFontsPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Select Language Page
      </CustomTabPanel>
    </Box>
  );
}
