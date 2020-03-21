import React, { createContext, useState } from 'react'
import axios from 'axios'

export const PeopleContext = createContext()

var config = {
	headers: {'Access-Control-Allow-Origin': '*'},
	'content-type': 'application/json'
};

export const PeopleProvider = ({ children }) => {
    const [people, setPeople] = useState([])
    
    const fetchPeople = () => {
        axios
        .get('http://localhost:3000/people/', config)
        .then(response => {
            console.log('response', response)
            // handle success
            setPeople(response.data || [])
        })
        .catch(error => {
            // handle error
            console.error('Error fetching people', error)
        })
    }

    const peopleContext = {
        people,
        fetchPeople
    }
    
	return <PeopleContext.Provider value={peopleContext}>{children}</PeopleContext.Provider>
}

export const { Consumer: PeopleConsumer } = PeopleContext
