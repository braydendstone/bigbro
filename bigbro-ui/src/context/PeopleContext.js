import React, { useState } from 'react'
import axios from 'axios'


var config = {
	headers: { 'Access-Control-Allow-Origin': '*' }
}

const PeopleContext = React.createContext()

const PeopleProvider = ({defaultPeopleData, children}) => {
    const [people, setPeople] = useState(defaultPeopleData ?? [])

    const fetchPeople = () => {
        axios
        .get('http://localhost:3000/people/', config)
        .then(response => {
            // handle success
            setPeople(response.data || [])
        })
        .catch(error => {
            // handle error
            console.error(error)
        })
    }

    return <PeopleContext.Provider value={{people, fetchPeople}}>
        {children}
    </PeopleContext.Provider>
}

export default PeopleContext

export { PeopleProvider }