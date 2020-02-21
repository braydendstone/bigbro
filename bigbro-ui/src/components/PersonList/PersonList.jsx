import React, { useState, useEffect } from 'react'
// import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import PersonCard from '../PersonCard/PersonCard'
import './PersonList.css'
import axios from 'axios'

const columns = [
	{
		Header: 'Name',
		accessor: 'name'
	},
	{
		Header: 'Gender',
		accessor: 'gender'
	},
	{
		Header: 'Birthday',
		accessor: 'birthDate'
	},
	{
		Header: 'Phone Number',
		accessor: 'phoneNumber'
	},
	{
		Header: 'Email',
		accessor: 'email'
	}
]

var config = {
    headers: {'Access-Control-Allow-Origin': '*'}
};

const PersonList = () => {
	const [peopleData, setPeopleData] = useState([])
	const [fullPeopleData, setFullPeopleData] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => {
		// Make a request for a user with a given ID
		axios
			.get('http://localhost:3000/people/', config)
			.then(response => {
				// handle success
				setFullPeopleData(response.data || [])
			})
			.catch(error => {
				// handle error
				console.error(error)
			})
	}, [])

	useEffect(() => {
		console.log(fullPeopleData)
		const filteredPeople = fullPeopleData.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
		setPeopleData(filteredPeople)
	}, [filter, fullPeopleData])

	return (
		<div>
			<div className='header'>
				<input onChange={e => setFilter(e.target.value)} />
			</div>
			<div className='cardsContainer'>
				{peopleData.map(person => (
					<PersonCard key={person.name} person={person} />
				))}
				{/* <ReactTable data={data.Person} columns={columns} /> */}
			</div>
		</div>
	)
}
export default PersonList
