import { useContext, useEffect, useState } from "react";

import { Grid2, Box, InputLabel, FormControl, Select, MenuItem, Stack } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { i18nContext, doI18n, getAndSetJson, postEmptyJson} from "pithekos-lib";
import sx from "./Selection.styles";
import LanguageMenuItem from "./LanguageMenuItem";

export default function LanguageSelection() {

  const i18n = useContext(i18nContext);
  const [usedEndonyms, setUsedEndonyms] = useState([]);
  const [secondUsedEndonyms, setSecondUsedEndonyms] = useState([]);
  const [thirdUsedEndonyms, setThirdUsedEndonyms] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState('');
  const [firstSelectedLanguage, setFirstSelectedLanguage] = useState('');
  const [secondSelectedLanguage, setSecondSelectedLanguage] = useState('');
  const [thirdSelectedLanguage, setThirdSelectedLanguage] = useState('');
  const [fourthSelectedLanguage, setFourthSelectedLanguage] = useState('');
  const [usedLanguages, setUsedLanguages] = useState([]);
  useEffect(
    () => {
        getAndSetJson({
            url: "/i18n/used-languages",
            setter: setUsedLanguages
        }).then()
        getAndSetJson({
          url: "/settings/languages",
          setter: setSelectedLanguages
        }).then()},
    []
  );

  useEffect(() => {
    // ISO_639-1
    const languageLookup = [
      { id: 'ab', endonym: 'Аҧсуа; Apsua; აფსუა' },
      { id: 'aa', endonym: 'Qafar af' },
      { id: 'af', endonym: 'Afrikaans' },
      { id: 'ak', endonym: 'Ákán' },
      { id: 'sq', endonym: 'Shqip' },
      { id: 'am', endonym: 'አማርኛ (Amarəñña)' },
      { id: 'ar', endonym: 'اَلْعَرَبِيَّةُ (al-ʿarabiyyah)' },
      { id: 'an', endonym: 'Aragonés' },
      { id: 'hy', endonym: 'Հայերեն (Hayeren)' },
      { id: 'as', endonym: 'অসমীয়া (Ôxômiya)' },
      { id: 'av', endonym: 'Авар мацӏ; اوار ماض (Avar maz)' },
      { id: 'ae', endonym: 'Upastawakaēna' },
      { id: 'ay', endonym: 'Aymara' },
      { id: 'az', endonym: 'Azərbaycan dili; آذربایجان دیلی; Азәрбајҹан дили' },
      { id: 'bm', endonym: 'بَمَنَنكَن ;ߓߡߊߣߊ߲ߞߊ߲ (Bamanankan)' },
      { id: 'ba', endonym: 'Башҡорт теле; Başqort tele' },
      { id: 'eu', endonym: 'Euskara' },
      { id: 'be', endonym: 'Беларуская мова (Belaruskaâ mova)' },
      { id: 'bn', endonym: 'বাংলা (Bāŋlā)' },
      { id: 'bi', endonym: 'Bislama' },
      { id: 'bs', endonym: 'Босански (Bosanski)' },
      { id: 'br', endonym: 'Brezhoneg' },
      { id: 'bg', endonym: 'Български (Bulgarski)' },
      { id: 'my', endonym: 'မြန်မာစာ (Mrãmācā)' },
      { id: 'ca', endonym: 'Català; Valencià' },
      { id: 'km', endonym: 'ខេមរភាសា; (Khémôrôphéasa)' },
      { id: 'ch', endonym: 'Finu\' Chamoru' },
      { id: 'ce', endonym: 'Нохчийн мотт; (Noxçiyn mott)' },
      { id: 'ny', endonym: 'Chichewa; Chinyanja' },
      { id: 'zh', endonym: '中文 (Zhōngwén) 汉语; 漢語 (Hànyǔ)' },
      { id: 'cu', endonym: 'Славе́нскїй ѧ҆зы́къ' },
      { id: 'cv', endonym: 'Чӑвашла (Çăvaşla)' },
      { id: 'kw', endonym: 'Kernowek' },
      { id: 'co', endonym: 'Corsu' },
      { id: 'cr', endonym: 'ᓀᐦᐃᔭᐁᐧᐃᐧᐣ (Nehiyawewin)' },
      { id: 'hr', endonym: 'Hrvatski' },
      { id: 'cs', endonym: 'Čeština' },
      { id: 'da', endonym: 'Dansk' },
      { id: 'dv', endonym: 'ދިވެހި (Dhivehi)' },
      { id: 'nl', endonym: 'Nederlands' },
      { id: 'dz', endonym: 'རྫོང་ཁ་ (Dzongkha)' },
      { id: 'en', endonym: 'English' },
      { id: 'eo', endonym: 'Esperanto' },
      { id: 'et', endonym: 'Eesti keel' },
      { id: 'ee', endonym: 'Èʋegbe' },
      { id: 'fo', endonym: 'Føroyskt' },
      { id: 'fj', endonym: 'Na Vosa Vakaviti' },
      { id: 'fi', endonym: 'Suomi' },
      { id: 'fr', endonym: 'Français' },
      { id: 'ff', endonym: '𞤊𞤵𞤤𞤬𞤵𞤤𞤣𞤫 ;ࢻُلْࢻُلْدٜ; Fulfulde 𞤆𞤵𞤤𞤢𞥄𞤪 ;ݒُلَارْ; Pulaar' },
      { id: 'gd', endonym: 'Gàidhlig' },
      { id: 'gl', endonym: 'Galego' },
      { id: 'lg', endonym: 'Luganda' },
      { id: 'ka', endonym: 'ქართული (Kharthuli)' },
      { id: 'de', endonym: 'Deutsch' },
      { id: 'el', endonym: 'Νέα Ελληνικά; (Néa Ellêniká)' },
      { id: 'grc', endonym: 'Ἑλλάς'},
      { id: 'gn', endonym: 'Avañe\'ẽ' },
      { id: 'gu', endonym: 'ગુજરાતી (Gujarātī)' },
      { id: 'ht', endonym: 'Kreyòl ayisyen' },
      { id: 'ha', endonym: 'هَرْشٜن هَوْس (halshen Hausa)' },
      { id: 'he', endonym: 'עברית‎ (Ivrit)' },
      { id: 'hz', endonym: 'Otjiherero' },
      { id: 'hi', endonym: 'हिन्दी (Hindī)' },
      { id: 'ho', endonym: 'Hiri Motu' },
      { id: 'hu', endonym: 'Magyar nyelv' },
      { id: 'is', endonym: 'Íslenska' },
      { id: 'io', endonym: 'Ido' },
      { id: 'ig', endonym: 'ásụ̀sụ́ Ìgbò' },
      { id: 'id', endonym: 'bahasa Indonesia' },
      { id: 'ia', endonym: 'Interlingua' },
      { id: 'ie', endonym: 'Interlingue; Occidental' },
      { id: 'iu', endonym: 'ᐃᓄᒃᑎᑐᑦ (Inuktitut)' },
      { id: 'ik', endonym: 'Iñupiaq' },
      { id: 'ga', endonym: 'Gaeilge' },
      { id: 'it', endonym: 'Italiano' },
      { id: 'ja', endonym: '日本語 (Nihongo)' },
      { id: 'jv', endonym: 'ꦧꦱꦗꦮ; basa Jawa' },
      { id: 'kl', endonym: 'Kalaallisut' },
      { id: 'kn', endonym: 'ಕನ್ನಡ (Kannađa)' },
      { id: 'kr', endonym: 'كَنُرِيِه; Kànùrí' },
      { id: 'ks', endonym: 'कॉशुर; كأشُر (Kosher)' },
      { id: 'kk', endonym: 'Қазақша; Qazaqşa' },
      { id: 'ki', endonym: 'Gĩgĩkũyũ' },
      { id: 'rw', endonym: 'Ikinyarwanda' },
      { id: 'kv', endonym: 'Коми кыв' },
      { id: 'kg', endonym: 'Kikongo' },
      { id: 'ko', endonym: '한국어 (Hangugeo) 조선말 (Chosŏnmal)' },
      { id: 'kj', endonym: 'Oshikwanyama' },
      { id: 'ku', endonym: 'کوردی; Kurdî' },
      { id: 'ky', endonym: 'Кыргыз' },
      { id: 'lo', endonym: 'ພາສາລາວ (phasa Lao)' },
      { id: 'la', endonym: 'Latinum' },
      { id: 'lv', endonym: 'Latviski' },
      { id: 'li', endonym: 'Lèmburgs' },
      { id: 'ln', endonym: 'Lingála' },
      { id: 'lt', endonym: 'Lietuvių' },
      { id: 'lu', endonym: 'Kiluba' },
      { id: 'lb', endonym: 'Lëtzebuergesch' },
      { id: 'mk', endonym: 'Македонски (Makedonski)' },
      { id: 'mg', endonym: 'مَلَغَسِ; Malagasy' },
      { id: 'ms', endonym: 'بهاس ملايو (bahasa Melayu)' },
      { id: 'ml', endonym: 'മലയാളം (Malayāļã)' },
      { id: 'mt', endonym: 'Malti' },
      { id: 'gv', endonym: 'Gaelg; Gailck' },
      { id: 'mi', endonym: 'reo Māori' },
      { id: 'mr', endonym: 'मराठी (Marāṭhī)' },
      { id: 'mh', endonym: 'kajin M̧ajel‌̧' },
      { id: 'mn', endonym: 'ᠮᠣᠩᠭᠣᠯ ᠬᠡᠯᠡ; Монгол хэл (Mongol xel)' },
      { id: 'na', endonym: 'dorerin Naoe' },
      { id: 'nv', endonym: 'Diné bizaad; Naabeehó bizaad' },
      { id: 'ng', endonym: 'Ndonga' },
      { id: 'ne', endonym: 'नेपाली भाषा (Nepālī bhāśā)' },
      { id: 'nd', endonym: 'isiNdebele; saseNyakatho; Mthwakazi Ndebele' },
      { id: 'se', endonym: 'Davvisámegiella' },
      { id: 'no', endonym: 'Norsk' },
      { id: 'nb', endonym: 'Norsk Bokmål' },
      { id: 'nn', endonym: 'Norsk Nynorsk' },
      { id: 'oc', endonym: 'Occitan; Provençal' },
      { id: 'oj', endonym: 'ᐊᓂᔑᓈᐯᒧᐎᓐ (Anishinaabemowin)' },
      { id: 'or', endonym: 'ଓଡ଼ିଆ (Odia)' },
      { id: 'om', endonym: 'afaan Oromoo' },
      { id: 'os', endonym: 'дигорон Ӕвзаг (digoron Ævzag)' },
      { id: 'pi', endonym: 'Pāli' },
      { id: 'ps', endonym: 'پښتو (Pax̌tow)' },
      { id: 'fa', endonym: 'فارسی (Fārsiy)' },
      { id: 'pl', endonym: 'Polski' },
      { id: 'pt', endonym: 'Português' },
      { id: 'pa', endonym: 'ਪੰਜਾਬੀ; پنجابی (Pãjābī)' },
      { id: 'qu', endonym: 'Runa simi; kichwa simi; Nuna shimi' },
      { id: 'ro', endonym: 'Română; Ромынэ' },
      { id: 'rm', endonym: 'Rumantsch; Rumàntsch; Romauntsch; Romontsch' },
      { id: 'rn', endonym: 'Ikirundi' },
      { id: 'ru', endonym: 'Русский язык (Russkiĭ âzyk)' },
      { id: 'sm', endonym: 'gagana Sāmoa' },
      { id: 'sg', endonym: 'yângâ tî Sängö' },
      { id: 'sa', endonym: 'संस्कृतम् (Saṃskṛtam)' },
      { id: 'sc', endonym: 'Sardu' },
      { id: 'sr', endonym: 'Српски (Srpski)' },
      { id: 'sn', endonym: 'chiShona' },
      { id: 'ii', endonym: 'ꆈꌠꉙ (Nuosuhxop)' },
      { id: 'sd', endonym: 'سنڌي; सिन्धी (Sindhī)' },
      { id: 'si', endonym: 'සිංහල (Siṁhala)' },
      { id: 'sk', endonym: 'Slovenčina' },
      { id: 'sl', endonym: 'Slovenščina' },
      { id: 'so', endonym: 'Soomaali; 𐒈𐒝𐒑𐒛𐒐𐒘; سٝومالِ' },
      { id: 'nr', endonym: 'isiNdebele; sakwaNdzundza' },
      { id: 'st', endonym: 'Sesotho' },
      { id: 'es', endonym: 'Español; Castellano' },
      { id: 'su', endonym: 'basa Sunda; ᮘᮞ ᮞᮥᮔ᮪ᮓ; بَاسَا سُوْندَا' },
      { id: 'sw', endonym: 'Kiswahili; كِسوَحِيلِ' },
      { id: 'ss', endonym: 'siSwati' },
      { id: 'sv', endonym: 'Svenska' },
      { id: 'tl', endonym: 'Wikang Tagalog' },
      { id: 'ty', endonym: 'reo Tahiti' },
      { id: 'tg', endonym: 'Тоҷикӣ (Tojikī)' },
      { id: 'ta', endonym: 'தமிழ் (Tamiḻ)' },
      { id: 'tt', endonym: 'Татар теле; Tatar tele; تاتار تئلئ‎' },
      { id: 'te', endonym: 'తెలుగు (Telugu)' },
      { id: 'th', endonym: 'ภาษาไทย (Phasa Thai)' },
      { id: 'bo', endonym: 'བོད་སྐད་ (Bodskad); ལྷ་སའི་སྐད་ (Lhas\'iskad)' },
      { id: 'ti', endonym: 'ትግርኛ (Təgrəñña)' },
      { id: 'to', endonym: 'lea faka-Tonga' },
      { id: 'ts', endonym: 'Xitsonga' },
      { id: 'tn', endonym: 'Setswana' },
      { id: 'tr', endonym: 'Türkçe' },
      { id: 'tk', endonym: 'Türkmençe; Түркменче; تۆرکمنچه' },
      { id: 'tw', endonym: 'Twi' },
      { id: 'ug', endonym: 'ئۇيغۇر تىلى; Уйғур тили; Uyƣur tili' },
      { id: 'uk', endonym: 'Українська (Ukraїnska)' },
      { id: 'ur', endonym: 'اُردُو (Urduw)' },
      { id: 'uz', endonym: 'Ózbekça; ўзбекча; ئوزبېچه' },
      { id: 've', endonym: 'Tshivenḓa' },
      { id: 'vi', endonym: 'tiếng Việt' },
      { id: 'vo', endonym: 'Volapük' },
      { id: 'wa', endonym: 'Walon' },
      { id: 'cy', endonym: 'Cymraeg' },
      { id: 'fy', endonym: 'Frysk' },
      { id: 'wo', endonym: 'وࣷلࣷفْ' },
      { id: 'xh', endonym: 'isiXhosa' },
      { id: 'yi', endonym: 'ייִדיש (Yidiš)' },
      { id: 'yo', endonym: 'èdè Yorùbá' },
      { id: 'za', endonym: '話僮 (Vahcuengh)' },
      { id: 'zu', endonym: 'isiZulu' },
    ];
    
    setUsedEndonyms(languageLookup.filter(item => usedLanguages.includes(item.id)));
  
  },[usedLanguages]);

  useEffect( () => {
    setSecondUsedEndonyms(usedEndonyms.filter(item => (item.id !== firstSelectedLanguage)));
    setThirdUsedEndonyms(usedEndonyms.filter(item => ((item.id !== firstSelectedLanguage) && (item.id !== secondSelectedLanguage))));
  },[firstSelectedLanguage, secondSelectedLanguage, usedEndonyms]);

  useEffect(() => {
    setFirstSelectedLanguage(selectedLanguages[0]);
    setSecondSelectedLanguage(selectedLanguages[1]);
    setThirdSelectedLanguage(selectedLanguages[2]);
    setFourthSelectedLanguage(selectedLanguages[3]);
  },[selectedLanguages]);
  
  const handleFirstChangeLanguage = (event) => {
    const addEn = ((event.target.value !== 'en') && (secondSelectedLanguage !== 'en') && (thirdSelectedLanguage !== 'en') ? '/en' : '')
    const fallbackLanguages = (secondSelectedLanguage !== undefined ? '/' + secondSelectedLanguage : '') + (thirdSelectedLanguage !== undefined ? '/' + thirdSelectedLanguage : '')
    const postLanguage = event.target.value + fallbackLanguages.replace('/' + event.target.value, '') + addEn;
    postLanguageId(postLanguage);
  };

  const handleSecondChangeLanguage = (event) => {
    const addEn = ((firstSelectedLanguage !== 'en') && (event.target.value !== 'en') && (thirdSelectedLanguage !== 'en') ? '/en' : '')
    const fallbackLanguages = (thirdSelectedLanguage !== undefined ? '/' + thirdSelectedLanguage : '')
    const postLanguage = firstSelectedLanguage + '/' + event.target.value + fallbackLanguages.replace('/' + event.target.value, '') + addEn;
    postLanguageId(postLanguage);
  };

  const handleThirdChangeLanguage = (event) => {
    const addEn = ((firstSelectedLanguage !== 'en') && (secondSelectedLanguage !== 'en') && (event.target.value !== 'en') ? '/en' : '')
    const second = (secondSelectedLanguage !== undefined ? '/' + secondSelectedLanguage : '')
    const postLanguage = firstSelectedLanguage + second + '/' + event.target.value + addEn;
    postLanguageId(postLanguage);
  };

  const handleRemoveFirstLanguage = (event) => {
    const postLanguage = secondSelectedLanguage + (thirdSelectedLanguage !== undefined ? '/' + thirdSelectedLanguage : '') + (fourthSelectedLanguage !== undefined ? '/' + fourthSelectedLanguage : '')
    postLanguageId(postLanguage);
  };

  const handleRemoveSecondLanguage = (event) => {
    const postLanguage = firstSelectedLanguage + (thirdSelectedLanguage !== undefined ? '/' + thirdSelectedLanguage : '') + (fourthSelectedLanguage !== undefined ? '/' + fourthSelectedLanguage : '')
    postLanguageId(postLanguage);
  };

  const handleRemoveThirdLanguage = (event) => {
    const postLanguage = firstSelectedLanguage + '/' + secondSelectedLanguage + (fourthSelectedLanguage !== undefined ? '/' + fourthSelectedLanguage : '')
    postLanguageId(postLanguage);
  };

  const postLanguageId = async (iD) => { 
    await postEmptyJson('/settings/languages/' + iD);
    window.location.reload(false);
  };

  /** Build dropdown menus */
  const UsedEndonyms =
    usedEndonyms.map((language, index) => (
        <MenuItem key={index} value={language.id} dense>
            <LanguageMenuItem language={language}/>
        </MenuItem>
  ));
  const SecondUsedEndonyms =
  secondUsedEndonyms.map((language, index) => (
      <MenuItem key={index} value={language.id} dense>
          <LanguageMenuItem language={language}/>
      </MenuItem>
  ));
  const ThirdUsedEndonyms =
  thirdUsedEndonyms.map((language, index) => (
      <MenuItem key={index} value={language.id} dense>
          <LanguageMenuItem language={language}/>
      </MenuItem>
  ));

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12} sx={{ borderTop: 1, borderColor: 'purple' }}>
        <div item style={{padding: "1.25em 0 0 0"}}>
            <Box>
              <Stack direction="row">
                <FormControl size="small">
                    <InputLabel id="select-language-label" htmlFor="select-language" sx={sx.inputLabel}>
                      {doI18n("pages:core-settings:language", i18n)}
                    </InputLabel>
                    <Select
                        variant="outlined"
                        labelId="select-language-label"
                        name="select-language"
                        inputProps={{
                            id: "select-language",
                        }}
                        value={firstSelectedLanguage}
                        label={doI18n("pages:core-settings:language", i18n)}
                        onChange={handleFirstChangeLanguage}
                        sx={sx.select}
                    >
                      {UsedEndonyms}
                    </Select>
                </FormControl>
                {firstSelectedLanguage !== 'en' && <RemoveCircleIcon style={{ color: "purple" }} onClick={handleRemoveFirstLanguage}  />}
              </Stack>
            </Box>
        </div>
      </Grid2>
      {secondSelectedLanguage !== undefined &&
        <Grid2 size={12} sx={{ borderTop: 1, borderColor: 'purple' }}>
          <div item style={{padding: "1.25em 0 0 0"}}>
              <Box>
                <Stack direction="row">
                  <FormControl size="small">
                      <InputLabel id="select-language-label" htmlFor="select-language" sx={sx.inputLabel}>
                        {doI18n("pages:core-settings:language", i18n)}
                      </InputLabel>
                      <Select
                          variant="outlined"
                          labelId="select-language-label"
                          name="select-language"
                          inputProps={{
                              id: "select-language",
                          }}
                          value={secondSelectedLanguage}
                          label={doI18n("pages:core-settings:language", i18n)}
                          onChange={handleSecondChangeLanguage}
                          sx={sx.select}
                      >
                        {SecondUsedEndonyms}
                      </Select>
                  </FormControl>
                  {secondSelectedLanguage !== 'en' && <RemoveCircleIcon style={{ color: "purple" }} onClick={handleRemoveSecondLanguage}  />}
                </Stack>
              </Box>
          </div>
        </Grid2>
      }
      {thirdSelectedLanguage !== undefined &&
        <Grid2 size={12} sx={{ borderTop: 1, borderColor: 'purple' }}>
          <div item style={{padding: "1.25em 0 0 0"}}>
              <Box>
                <Stack direction="row">
                  <FormControl size="small">
                      <InputLabel id="select-language-label" htmlFor="select-language" sx={sx.inputLabel}>
                        {doI18n("pages:core-settings:language", i18n)}
                      </InputLabel>
                      <Select
                          variant="outlined"
                          labelId="select-language-label"
                          name="select-language"
                          inputProps={{
                              id: "select-language",
                          }}
                          value={thirdSelectedLanguage}
                          label={doI18n("pages:core-settings:language", i18n)}
                          onChange={handleThirdChangeLanguage}
                          sx={sx.select}
                      >
                        {ThirdUsedEndonyms}
                      </Select>
                  </FormControl>
                  {thirdSelectedLanguage !== 'en' && <RemoveCircleIcon style={{ color: "purple" }} onClick={handleRemoveThirdLanguage} />}
                </Stack>
              </Box>
          </div>
        </Grid2>
      }
    </Grid2>
  );
}
