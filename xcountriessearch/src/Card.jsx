import React from 'react'
import styles from './Card.module.css'

export default function Card({country, flag}) {
  return (
    <div className={styles.countryCard}>
        <img src={flag} alt={country} />
        {country}
    </div>
  )
}
