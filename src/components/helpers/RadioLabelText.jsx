import { useMemo } from "react";
import PropTypes from "prop-types";

export default function RadioLabelText(RadioLabelTextProps) {
  const {
    ffsArr,
    isGraphiteAssumed,
  } = RadioLabelTextProps;

  // Get radio label text
  const labelJsxText = useMemo(() => ffsArr.map((font, fontIndex) => (
    <div key={fontIndex}>
      {font.categories.map((categories, categoriesIndex) => {
        return (<div key={categoriesIndex}>
          {font.categories[categoriesIndex].category.filter(item => isGraphiteAssumed ? item.opentype_render_required !== true : item.graphite_render_required !== true).map((category, categoryIndex) => {
            return (<div key={categoryIndex}>
              {category.sets.map((sets, setsIndex) => {
                return (<div key={setsIndex}>
                  {category.sets[setsIndex].set.map((set, setIndex) => {
                      return (<div key={setIndex}>
                        {/** replace quote and apostrophe html special entities, and remove html tags and attributes */}
                        {set.label.replace(/&quot;/ig, '"').replace(/&apos;/ig, "'").replace(/(<([^>]+)>)/ig, '') + ' '}
                      </div>)
                    })}
                </div>)
              })}
            </div>)
          })}
      </div>)
      })}
    </div>
  )), [isGraphiteAssumed, ffsArr]);

  return labelJsxText;
}

RadioLabelText.propTypes = {
  /** Is Graphite Assumed? */
  isGraphiteAssumed: PropTypes.bool.isRequired,
  /** Array of Font Feature Settings Options */
  ffsArr: PropTypes.array.isRequired,
};