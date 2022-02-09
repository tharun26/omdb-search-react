import React from 'react';
import './OverLay.scss';

/**
 * @function Overlay
 * @desc Render the Overlay component
 * @returns {JSX}
 */
const Overlay = ({ color, handleClick }) => {
  if (!color) {
    return null;
  }
  const style = { backgroundColor: color };
  return (
    <div
      className='overlay'
      style={style}
      onClick={(e) => {
        handleClick(e);
      }}
    ></div>
  );
};

export default Overlay;
