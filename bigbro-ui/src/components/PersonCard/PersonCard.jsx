import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TagManager from '../TagManager/TagManager'

const PersonCard = ({ person, tagOptions }) => {
	if (!person) return <div>Loading</div>
	return (
		<Card
			style={{
				width: 275,
				margin: 20,
				backgroundColor: '#333333',
				color: '#ffffff',
				borderLeft: '1px #ee4540 solid'
			}}
		>
			<CardContent>
				<Typography variant='h6' component='h2' color='#ffffff' align='left'>
					{person.name.split(',')[1] + ' ' + person.name.split(',')[0]}
				</Typography>
				<Typography gutterBottom color='#ee4540' align='left'>
					{person.phoneNumber}
				</Typography>
			</CardContent>
			<CardActions>
				<TagManager person={person} tagOptions={tagOptions}/>
			</CardActions>
		</Card>
	)
}

export default PersonCard
