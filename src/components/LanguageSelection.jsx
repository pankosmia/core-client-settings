import { useContext, useState } from "react";

import { Grid2, Box, InputLabel, FormControl, Select, MenuItem, Stack, Button, Typography } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { i18nContext, doI18n, postEmptyJson } from "pithekos-lib";
import sx from "./Selection.styles";
import LanguageMenuItem from "./LanguageMenuItem";

const LanguageSelector = ({usedLanguages, languageChoices, setLanguageChoices, langN, selectedLanguage, doChange, selectIsOpen, setSelectIsOpen}) => {
  const {i18nRef} = useContext(i18nContext);

  return (
        <div item style={{padding: "1.25em 0 0 0"}}>
          <Box>
            <Stack direction="row">
              <FormControl size="small">
                  <InputLabel id="select-language-label" htmlFor="select-language" sx={sx.inputLabel}>
                      {doI18n("pages:core-settings:language", i18nRef.current)}{" "}{langN + 1}
                  </InputLabel>
                  <Select
                      variant="outlined"
                      labelId="select-language-label"
                      open={selectIsOpen}
                      onClose={() => setSelectIsOpen(false)}
                      onOpen={() => setSelectIsOpen(true)}
                      name="select-language"
                      inputProps={{
                          id: "select-language",
                      }}
                      value={selectedLanguage}
                      label={doI18n("pages:core-settings:language", i18nRef.current)}
                      onChange={ev => doChange(languageChoices, ev.target.value, langN, setLanguageChoices)}
                      sx={sx.select}
                  >
                      {
                          usedLanguages.filter(item => !languageChoices.slice(0, langN).includes(item.id)).map((language, n) => <MenuItem key={n} value={language.id} dense>
                                  <LanguageMenuItem language={language}/>
                              </MenuItem>
                          )
                      }
                  </Select>
              </FormControl>
              <div style={{margin: '8px auto auto 4px'}}>
                {selectedLanguage !== 'en' && <RemoveCircleIcon color="secondary" onClick={ev => doChange(languageChoices, selectedLanguage, langN, setLanguageChoices, langN)}  />}
              </div>
            </Stack>
          </Box>
        </div>
  );
}

const LangSelectors = ({languageChoices, setLanguageChoices, usedLanguages, doChange}) => {

  const {i18nRef} = useContext(i18nContext);
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  let selectorSpecs = [];
  let usedHereLanguages = new Set([]);
  for (const [n, lang] of languageChoices.entries()) {
      selectorSpecs.push(
          {
              n,
              selectedLanguage: lang,
              usedLanguages: usedLanguages
          }
      );
      usedHereLanguages.add(lang);
  }
  return <div>
      <Button variant='outlined' color='secondary' sx={{ display: 'block', mt: 2 }} onClick={() => setSelectIsOpen(true)}>
        {doI18n("pages:core-settings:add", i18nRef.current)}
      </Button>
      {selectorSpecs.map((s, n) => <LanguageSelector
          key={n}
          langN={n}
          selectedLanguage={s.selectedLanguage}
          usedLanguages={s.usedLanguages}
          languageChoices={languageChoices}
          setLanguageChoices={setLanguageChoices}
          doChange={doChange}
          selectIsOpen={n === selectorSpecs.length - 1 ? selectIsOpen : undefined}
          setSelectIsOpen={n === selectorSpecs.length - 1 ? setSelectIsOpen : undefined}/>)
      }
  </div>
}

const doChange = (allLanguages, choice, langN, setLanguageChoices, remove) => {
  let newLanguages = [];
  for (const [n, lang] of allLanguages.entries()) {
      if (newLanguages.includes(lang)) {
          continue;
      }
      if (n === langN) {
          if (newLanguages.includes(choice)) {
              continue;
          }
          if (n !== remove) {
            newLanguages.push(choice);
          }
          if (choice ===  "en") {
              // break; // No options after English
              continue
          }
          continue;
      }
      if (lang === "en") {
          newLanguages.push("en");
          // break; // No options after English
      }
      if (newLanguages.includes(lang)) {
          continue;
      }
      newLanguages.push(lang);
  }
  // if (newLanguages[newLanguages.length - 1] !== "en") { // Always have English last
  if (!newLanguages.includes("en")) { // English must appear somewhere
       newLanguages.push("en");
  }
  const languageString = newLanguages.join('/');
  postEmptyJson(`/settings/languages/${languageString}`).then();
  setLanguageChoices(newLanguages);
}

export default function LanguageSelection(languageSelectionProps) {
  const {i18nRef} = useContext(i18nContext);
  const {
    languageChoices,
    setLanguageChoices,
    usedLanguages
  } = languageSelectionProps;

  return (
    <Grid2 container spacing={1.5}>
      <Grid2 size={12}>
        <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 1 }} >{doI18n("pages:core-settings:user_interface_title", i18nRef.current)}</Typography>
        <Typography variant='body1' >{doI18n("pages:core-settings:user_interface_desc", i18nRef.current)}</Typography>
      </Grid2>
      <Grid2 size={12}>
        <LangSelectors
            languageChoices={languageChoices}
            setLanguageChoices={setLanguageChoices}
            usedLanguages={usedLanguages}
            doChange={doChange}
        />
      </Grid2>
    </Grid2>
  );
}
