import React, { useState, useEffect } from 'react'
import { Button, TextField } from '@material-ui/core'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import './TagManager.css'

const filter = createFilterOptions();

const TagManager = ({ person, tagOptions }) => {
	const [addingTag, setAddingTag] = useState(false)
	const [tagInput, setTagInput] = useState('')

	return (
		<div className='tags'>
			{person.tags.map(tag => (
				<span
					style={{
						backgroundColor: tag.color,
						padding: '2px 5px 2px 5px'
					}}
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
					<div style={{ width: '100%' }}>
						<Autocomplete
							onChange={(event, newValue) => {
								if (newValue && newValue.inputValue) {
									setTagInput(newValue.inputValue)

									return
								}

								setTagInput(newValue)
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
							renderInput={params => <TextField {...params} label='Free solo with text demo' variant='outlined' />}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default TagManager
