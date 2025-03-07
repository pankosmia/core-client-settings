import {useContext, useEffect, useState} from "react";

import {InputLabel, FormControl, Select, MenuItem, Stack} from "@mui/material";
import {i18nContext, doI18n, getAndSetJson, postEmptyJson} from "pithekos-lib";
import sx from "./Selection.styles";

const LanguageSelector = ({usedLanguages, languageChoices, setLanguageChoices, langN, selectedLanguage, doChange}) => {
    const {i18nRef} = useContext(i18nContext);
    return <Stack direction="row">
        <FormControl size="small">
            <InputLabel id="select-language-label" htmlFor="select-language" sx={sx.inputLabel}>
                {doI18n("pages:core-settings:language", i18nRef.current)}{" "}{langN}
            </InputLabel>
            <Select
                variant="outlined"
                labelId="select-language-label"
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
                    usedLanguages.map((language, n) => <MenuItem key={n} value={language} dense>
                            {language}
                        </MenuItem>
                    )
                }
            </Select>
        </FormControl>
    </Stack>
}

const LangSelectors = ({usedLanguages, languageChoices, setLanguageChoices, doChange}) => {
    let selectorSpecs = [];
    let usedHereLanguages = new Set([]);
    for (const [n, lang] of languageChoices.entries()) {
        selectorSpecs.push(
            {
                n,
                selectedLanguage: lang,
                usedLanguages: usedLanguages.filter(l => !usedHereLanguages.has(l))
            }
        );
        usedHereLanguages.add(lang);
    }
    return <>
        {selectorSpecs.map((s, n) => <LanguageSelector
            key={n}
            langN={n}
            selectedLanguage={s.selectedLanguage}
            usedLanguages={s.usedLanguages}
            languageChoices={languageChoices}
            setLanguageChoices={setLanguageChoices}
            doChange={doChange}/>)
        }
    </>
}

const doChange = (allLanguages, choice, langN, setLanguageChoices) => {
    let newLanguages = [];
    for (const [n, lang] of allLanguages.entries()) {
        if (n === langN) {
            newLanguages.push(choice);
            if (choice ===  "en") {
                break;
            }
            continue;
        }
        if (lang === "en") {
            newLanguages.push("en");
            break;
        }
        if (newLanguages.includes(lang)) {
            continue;
        }
        newLanguages.push(lang);
    }
    if (newLanguages[newLanguages.length - 1] !== "en") {
        newLanguages.push("en");
    }
    const languageString = newLanguages.join('/');
    postEmptyJson(`/settings/languages/${languageString}`).then();
    setLanguageChoices(newLanguages);
}

export default function LanguageSelection2() {

    const [languageChoices, setLanguageChoices] = useState(['en']);
    const [usedLanguages, setUsedLanguages] = useState(['en']);

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

    return <Stack>
        <LangSelectors
            usedLanguages={usedLanguages}
            languageChoices={languageChoices}
            setLanguageChoices={setLanguageChoices}
            doChange={doChange}
        />
    </Stack>;
}