import { useMemo } from "react";
import PropTypes from "prop-types";
import { renderToString } from 'react-dom/server';

export default function FontFeatureDefaults(FontFeatureDefaultsProps) {
  const {
    ffsArr,
    isGraphiteAssumed,
  } = FontFeatureDefaultsProps;

  // This creates an array of font settings names and default values
  const fontSettingsJsx = useMemo(() => ffsArr.map((font, fontIndex) => (
    <div key={fontIndex}>
      {font.categories.map((categories, categoriesIndex) => {
        return (<div key={categoriesIndex}>
          {font.categories[categoriesIndex].category.filter(item => isGraphiteAssumed ? item.opentype_render_required !== true : item.graphite_render_required !== true).map((category, categoryIndex) => {
            return (<div key={categoryIndex}>
              {category.sets.map((sets, setsIndex) => {
                return (<div key={setsIndex}>
                  {category.sets[setsIndex].set.filter(item => isGraphiteAssumed ? item.opentype_render_required !== true : item.graphite_render_required !== true).map((set, setIndex) => {
                      return (<div key={setIndex}>
                        [~name~: ~{set.name}~, ~value~: {set.default}],
                      </div>)
                    })}
                </div>)
              })}
            </div>)
          })}
      </div>)
      })}
    </div>
  )), [ffsArr, isGraphiteAssumed]);
  // convert jsx return to string and remove html tags and attributes (e.g., div's)
  const fontSettingsStr = renderToString(fontSettingsJsx).replace(/(<([^>]+)>)/ig, '');
  // remove the last comma, change [] to {} and ~ to " and convert string to an array of objects
  const fontSettingsAdj = '[' + fontSettingsStr.substring(0, fontSettingsStr.length - 1).replace(/\[/gm, "{").replace(/\]/gm, "}").replace(/~/gm, '"') + ']';

  return JSON.parse(fontSettingsAdj);
}

FontFeatureDefaults.propTypes = {
  /** Is Graphite Assumed? */
  isGraphiteAssumed: PropTypes.bool.isRequired,
  /** Array of Font Feature Settings Options */
  ffsArr: PropTypes.array.isRequired,
};