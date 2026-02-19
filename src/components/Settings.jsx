import { useContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Tabs, Tab, Box } from "@mui/material";
import { doI18n, getAndSetJson, postEmptyJson, getJson } from "pithekos-lib";
import { i18nContext,debugContext } from "pankosmia-rcl";

import BlendedFontsPage from "./BlendedFontsPage";
import LanguageSelection from "./LanguageSelection";
import GraphiteTest from "./GraphiteTest";
import AboutViewServer from "./AboutViewServer";

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
  const { i18nRef } = useContext(i18nContext);
  const [languageLookup, setLanguageLookup] = useState([]);

  const [languageChoices, setLanguageChoices] = useState(['en']);
  const [usedLanguages, setUsedLanguages] = useState(['en']);
  const [usedEndonyms, setUsedEndonyms] = useState([]);

  const [fontMenu, setFontMenu] = useState('shortlist');
  const [dataServer, setDataServer] = useState();
  const [nameServer, setNameServer] = useState();
  const getServerVersion = async () => {
    const summariesResponse = await getJson(`/version`, debugContext.current);
    if (summariesResponse.ok) {
      const data = summariesResponse.json;
      setDataServer(data);
      setNameServer(data.product_name);
    } else {
      console.error(`error fetching data`);
    }
  };

  useEffect(
    () => {
      getServerVersion();
    },
    []
  );

  useEffect(() =>
    getAndSetJson({
      url: "/settings/languages",
      setter: setLanguageChoices
    }).then(),
    []
  );

  useEffect(() =>
    getAndSetJson({
      url: "/i18n/used-languages",
      setter: setUsedLanguages
    }).then(),
    []
  );

  useEffect(() => {
    fetch('/app-resources/lookups/languages.json') // ISO_639-1 plus grc
      .then(r => r.json())
      .then(data => setLanguageLookup(data));
  }, []);

  useEffect(() => {
    setUsedEndonyms(languageLookup.filter(item => usedLanguages.includes(item.id)));
  }, [languageLookup, usedLanguages]);

  useEffect(() => {
    if (!languageChoices.some(item => (item === 'en'))) {
      const languageString = languageChoices.join('/') + '/en';
      postEmptyJson(`/settings/languages/${languageString}`).then();
      setLanguageChoices(previous => [...previous, 'en',])
    }
  }, [languageChoices])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isGraphite = GraphiteTest()

  const blendedFontsPageProps = {
    fontMenu,
    setFontMenu,
    isGraphite,
  };

  const onClickFontMenu = (event) => {
    setFontMenu('shortlist');
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
          <Tab label={doI18n("pages:core-settings:language", i18nRef.current)} {...a11yProps(0)} />
          <Tab onClick={onClickFontMenu} label={doI18n("pages:core-settings:fonts", i18nRef.current)} {...a11yProps(1)} />
          <Tab label={`${doI18n("pages:core-settings:about_server", i18nRef.current)} ${nameServer || null}`} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <LanguageSelection
          languageChoices={languageChoices}
          setLanguageChoices={setLanguageChoices}
          usedLanguages={usedEndonyms}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BlendedFontsPage {...blendedFontsPageProps} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AboutViewServer dataServer={dataServer} />
      </CustomTabPanel>
    </Box>
  );
}
