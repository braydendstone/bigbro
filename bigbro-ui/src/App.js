import React, { Component } from 'react'
import './App.css'
import PersonList from './components/PersonList/PersonList'
import {PeopleProvider} from './context/PeopleContext'

class App extends Component {
	render() {
		return (
			<div className='App'>
				<PeopleProvider>
					<PersonList />
				</PeopleProvider>
			</div>
		)
	}
}

export default App
