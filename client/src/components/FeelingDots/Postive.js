import React from 'react'
import positive from '../images/positive.png';

const Positive = () => {
  return (
    <img
      src={positive}
      style={{ width: '22px'}}
      alt='Positive'
      className='mood'
    />
  )
}

export default Positive