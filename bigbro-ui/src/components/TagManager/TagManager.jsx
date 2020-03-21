import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import './TagManager.css'

import {PeopleContext} from '../../context/PeopleContext'

const useStyles = makeStyles({
	tagInput: {
	  backgroundColor: 'white',
	  width: '70%',
	  borderRadius: '5px'
	},
  });

const filter = createFilterOptions()

var config = {
	headers: {'Access-Control-Allow-Origin': '*'},
	'content-type': 'application/json'
};

const TagManager = ({ person, tagOptions }) => {
	const { fetchPeople } = useContext(PeopleContext)

	const [addingTag, setAddingTag] = useState(false)
	const [tagInput, setTagInput] = useState('')
	const classes = useStyles()

	const saveTag = () => {
		axios
		.post('http://localhost:3000/people/tag', { ...tagInput, personName: person.name}, config).then(response => {
			setAddingTag(false)
			fetchPeople()
		}).catch(error => {
			console.error(error)
		})
	}

	return (
		<div className='tags'>
			{person.tags.map(tag => (
				<span
					style={{
						backgroundColor: tag.color,
						padding: '2px 5px 2px 5px'
					}}
					key={tag}
				>
					{tag.name}
				</span>
			))}
			<div>
				{!addingTag ? (
					<Button style={{ color: '#fff' }} onClick={() => setAddingTag(true)}>
						Add Tag
					</Button>
				) : (
					<div style={{ width: '90%', display: 'flex' }}>
						<Autocomplete
							onChange={(event, newValue) => {
								console.log(newValue)
								if (newValue && newValue.inputValue) {
									setTagInput({name: newValue.inputValue})
									return
								}
								else if (newValue) setTagInput({...newValue})
							}}
							filterOptions={(options, params) => {
								const filtered = filter(options, params)

								if (params.inputValue !== '') {
									filtered.push({
										inputValue: params.inputValue,
										name: `Add "${params.inputValue}"`
									})
								}

								return filtered
							}}
							id='tag-input'
							options={tagOptions}
							getOptionLabel={option => {
								// e.g value selected with enter, right from the input
								if (typeof option === 'string') {
									return option
								}
								if (option.inputValue) {
									return option.inputValue
								}
								return option.name
							}}
							renderOption={option => option.name}
							style={{ width: 200 }}
							freeSolo
							renderInput={params => <TextField {...params} className={classes.tagInput} label='Tag' variant='filled' />}
						/>

						<Button disabled={!tagInput.name} style={{ color: '#fff', width: '30%', backgroundColor: '#ee4540' }} onClick={() => saveTag()}>
							Add
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default TagManager
