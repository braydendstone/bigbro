import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
// import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import PersonCard from '../PersonCard/PersonCard'
import './PersonList.css'

const FETCH_PEOPLE = gql`
	{
		Person {
			name
			birthDate
			gender
			phoneNumber
			email
		}
	}
`

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

const PersonList = () => {
	const { loading, error, data } = useQuery(FETCH_PEOPLE)
	const [peopleData, setPeopleData] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => {
		if(!data) return
		setPeopleData(data.Person.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
	}, [filter, data])

	if (loading) return <p> Loading... </p>
	if (error) return <p> Something went wrong... </p>

	return (
		<div>
			<div className='header'>
				<input onChange={e => setFilter(e.target.value)}/>
			</div>
			<div className='cardsContainer'>
				{peopleData.map(person => (
					<PersonCard key={person.name} person={person}/>
				))}
				{/* <ReactTable data={data.Person} columns={columns} /> */}
			</div>
		</div>
	)
}
export default PersonList
