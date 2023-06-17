import React from 'react'
import "./card.css"

function Card({brick}) {
  return (
    <div className='card'>
      <img src={brick.image} alt="" />
      <h3>Name: {brick.title}</h3>
      <h3>Material: {brick.material}</h3>
      <h3>Color: {brick.color}</h3>
      <h3>Price: {brick.price}</h3>
    </div>
  )
}

export default Card