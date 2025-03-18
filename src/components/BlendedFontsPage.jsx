import { useState, useEffect, useContext } from "react"
import { Toolbar, Box } from "@mui/material";
import { postEmptyJson, typographyContext } from "pithekos-lib";
import BlendedFontSelection from "./BlendedFontSelection";

export default function BlendedFontsPage() {
  const { typographyRef } = useContext(typographyContext);

  // Font Class Substrings
  const [selectedHebrewFontClassSubstr, setSelectedHebrewFontClassSubstr] = useState('');
  const [selectedGreekFontClassSubstr, setSelectedGreekFontClassSubstr] = useState('');
  const [selectedMyanmarFontClassSubstr, setSelectedMyanmarFontClassSubstr] = useState('');
  const [selectedArabicUrduFontClassSubstr, setSelectedArabicUrduFontClassSubstr] = useState('');
  const [selectedOtherFontClassSubstr, setSelectedOtherFontClassSubstr] = useState('');
  const [selectedFallbackFontClassSubstr, setSelectedFallbackFontClassSubstr] = useState('');
  const [selectedFontClass, setSelectedFontClass] = useState('');

  // Font Name
  const [hebrewFontName, setHebrewFontName] = useState([]);
  const [greekFontName, setGreekFontName] = useState([]);
  const [myanmarFontName, setMyanmarFontName] = useState([]);
  const [arabicUrduFontName, setArabicUrduFontName] = useState([]);
  const [otherFontName, setOtherFontName] = useState([]);
  const [fallbackFontName, setFallbackFontName] = useState([]);

  useEffect( () => {
    setSelectedFontClass(typographyRef.current.font_set);
  },[typographyRef]);

  useEffect( () => {
    if (selectedFontClass !== undefined && selectedFontClass !== '' && typographyRef.current.font_set !== selectedFontClass) {
      //#[post("/typography/<font_set>/<size>/<direction>")]
      const typographyStr = selectedFontClass + '/medium/ltr';
      postEmptyJson(`/settings/typography/${typographyStr}`).then();
    }
  },[selectedFontClass, typographyRef]);

  const blendedFontSelectionProps = {
    selectedFontClass,
    setSelectedFontClass,
    selectedHebrewFontClassSubstr,
    setSelectedHebrewFontClassSubstr,
    selectedGreekFontClassSubstr,
    setSelectedGreekFontClassSubstr,
    selectedMyanmarFontClassSubstr,
    setSelectedMyanmarFontClassSubstr,
    selectedArabicUrduFontClassSubstr,
    setSelectedArabicUrduFontClassSubstr,
    selectedOtherFontClassSubstr,
    setSelectedOtherFontClassSubstr,
    selectedFallbackFontClassSubstr,
    setSelectedFallbackFontClassSubstr,
    hebrewFontName,
    setHebrewFontName,
    greekFontName,
    setGreekFontName,
    myanmarFontName,
    setMyanmarFontName,
    arabicUrduFontName,
    setArabicUrduFontName,
    otherFontName,
    setOtherFontName,
    fallbackFontName,
    setFallbackFontName,
  };

  return (
    <div key="toolbar" style={{ width: '100%' }} >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ borderTop: 1 }}>
          <BlendedFontSelection {...blendedFontSelectionProps} />
          <h1>font_set</h1>
          <Box>
            <b>If you have made font changes that you want to use every time you start pithekos, then:</b>
            <ol>
              <li>Change font_set in <em>~/pankosmia_working/user_settings.json to:</em> "font_set": "{selectedFontClass}",</li>
              <li>Save <em>~/pankosmia_working/user_settings.json.</em></li>
              <li>Restart the Pithekos web server.</li>
              <li>Reopen <em>http://localhost:8000</em> in Firefox.</li>
            </ol>
          </Box>
        </Box>
      </Toolbar>
    </div>
  );
}
