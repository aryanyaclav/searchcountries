import React, { useEffect, useState } from 'react'

import styles from './FlagsComp.module.css'
import Card from './Card'

export default function FlagsComp() {
    const [countries, setCountries] = useState([])
    const [searchedCountries, setSearchedCountries] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searched, setSearched] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const countriesApi = "https://restcountries.com/v3.1/all"

    useEffect(() => {
        fetch(countriesApi)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok')
                }
                return res.json()
            })
            .then((data) => {
                setCountries(data)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setError(err.message)
                setLoading(false)
            })
    }, [])

    const handleSearch = (e) => {
        const searchedValue = e.target.value
        setSearchQuery(searchedValue)
        setSearched(searchedValue.length > 0)

        const countrySearched = countries.filter(country => 
            country.name.common.toLowerCase().includes(searchedValue.toLowerCase())
        )
        setSearchedCountries(countrySearched)
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <div className={styles.inputContainer}>
                <input 
                    type="text" 
                    onChange={handleSearch} 
                    value={searchQuery} 
                    placeholder="Search for countries"
                />
            </div>
            <div className={styles.container}>
                {
                    searched ? 
                    searchedCountries.map((country) => (
                        <Card key={country.cca3} country={country.name.common} flag={country.flags.png} />
                    )) : 
                    countries.map((country) => (
                        <Card key={country.cca3} country={country.name.common} flag={country.flags.png} />
                    ))
                }
            </div>
        </div>
    )
}