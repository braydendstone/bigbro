import React, { useState, useEffect, useContext } from 'react'
// import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import PersonCard from '../PersonCard/PersonCard'
import './PersonList.css'
import axios from 'axios'

import { PeopleContext } from '../../context/PeopleContext'

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
	headers: { 'Access-Control-Allow-Origin': '*' }
}

const PersonList = () => {
	const { people, fetchPeople } = useContext(PeopleContext)
	const [filteredPeopleData, setFilteredPeopleData] = useState([])
	const [allTags, setAllTags] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => {
		fetchPeople()
		axios
			.get('http://localhost:3000/tags', config)
			.then(response => {
				setAllTags(response.data || [])
			})
			.catch(error => {
				console.error(error)
			})
	}, [])

	useEffect(() => {
		const filteredPeople = people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
		setFilteredPeopleData(filteredPeople)
	}, [filter, people])

	return (
			<div>
				<div className='header'>
					<input onChange={e => setFilter(e.target.value)} />
				</div>
				<div className='cardsContainer'>
					{filteredPeopleData.map(person => (
						<PersonCard key={person.name} person={person} tagOptions={allTags} />
					))}
					{/* <ReactTable data={data.Person} columns={columns} /> */}
				</div>
			</div>
	)
}
export default PersonList
