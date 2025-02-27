import { useState, useEffect } from "react"
import { Toolbar, Box } from "@mui/material";
import { getAndSetJson } from "pithekos-lib";
import BlendedFontSelection from "./BlendedFontSelection";

export default function BlendedFontsPage() {

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

  const [fontClass, setFontClass] = useState([]);
  useEffect(
    () => {
        getAndSetJson({
            url: "/settings/typography",
            setter: setFontClass
        }).then()},
    []
  );
  useEffect( () => {
    setSelectedFontClass(fontClass.font_set);
  },[fontClass.font_set]);

  const activeFontClass = fontClass.font_set;

  const blendedFontSelectionProps = {
    activeFontClass,
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
          <h1>font_set</h1>
          <b>Active font_set:</b> {fontClass.font_set}<br/><br/>
          {fontClass.font_set !== selectedFontClass &&
            <Box>
              <b>Change font_set Instructions:</b>
              <ol>
                <li>Change font_set in <em>~/pankosmia_working/user_settings.json</em>
                  <ul>
                    <li><b>from:</b> "font_set": "{fontClass.font_set}",</li>
                    <li><b>to:{"   "}</b> "font_set": "{selectedFontClass}",</li>
                  </ul>
                </li>
                <li>Save <em>~/pankosmia_working/user_settings.json.</em></li>
                <li>Restart the Pithekos web server.</li>
                <li>Reopen <em>http://localhost:8000</em> in Firefox.</li>
              </ol>
            </Box>
          }
          <BlendedFontSelection {...blendedFontSelectionProps} />  
        </Box>
      </Toolbar>
    </div>
  );
}
