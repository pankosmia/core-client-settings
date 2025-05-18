import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function UsePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  },[value]);
  return ref.current;
}

UsePrevious.propTypes = {
  /** Is Rendering in Graphite? */
  isGraphite: PropTypes.bool.isRequired,
  /** Array of Font Feature Settings Options */
  ffsArr: PropTypes.array.isRequired,
};