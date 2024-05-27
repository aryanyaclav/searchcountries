import React from 'react'
import './Card.css'

export default function Card({country, flag}) {
  return (
    <div className='countryCard'>
        <img src={flag} alt={country} />
        <div>{country}</div>
    </div>
  )
}
