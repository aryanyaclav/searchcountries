import React, { useEffect, useState } from 'react'
import styles from './FlagsComp.module.css'
import Card from './Card'

export default function FlagsComp() {
    let [countries, setCountries] = useState([])
    let [searchedCountries, setSearchedCountries] = useState([])
    let [searchQuery, setSearchQuery] = useState('')
    let [searched, setSearched] = useState(false)

    let countriesApi = "https://restcountries.com/v3.1/all"

    let fetchData = (url) => {
        fetch(url).then((res) => res.json()).then((data) => setCountries(data)).catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchData(countriesApi)
    })

    let handleSearch = (e) => {
        console.log(e.target.value)
        let searchedValue = e.target.value
        if(searchedValue.length > 0){
            setSearched(true)
        }else{
            setSearched(false)
        }
        setSearchQuery(e.target.value)
        let countrySearched = countries.filter(country => country.name.common.includes(searchedValue) )
        setSearchedCountries(countrySearched)
        
    }

  return (
    <div>
        <div className={styles.inputContainer}>
            <input type="text" onChange={handleSearch} value={searchQuery} placeholder="Search for countries"/>
        </div>
        <div className={styles.container}>
        {
            searched ? 
            searchedCountries.map((country) => {
                    return <Card country={country.name.common} flag={country.flags.png}/>
                }) : countries.map((country) => {
                    return <Card country={country.name.common} flag={country.flags.png}/>
                })
        }
        </div>
    </div>
  )
}
// added