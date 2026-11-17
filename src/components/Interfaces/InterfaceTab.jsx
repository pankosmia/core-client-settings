import { Box } from "@mui/material";
import { i18nContext } from "pankosmia-rcl";
import { useContext } from "react";
import LanguageSection from "./LanguageSection";
import DisplayDirection from "./DisplayDirection";

export default function InterfaceTab({
  languageChoices,
  usedLanguages,
  setLanguageChoices,
}) {
  const { i18nRef } = useContext(i18nContext);

  return (
    <Box sx={{ gap: "16px", display: "flex", flexDirection: "column" }}>
      <LanguageSection
        languageChoices={languageChoices}
        usedLanguages={usedLanguages}
        setLanguageChoices={setLanguageChoices}
        i18nRef={i18nRef}
      />
      <DisplayDirection i18nRef={i18nRef} />
    </Box>
  );
}
