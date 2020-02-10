import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const PersonCard = ({ person }) => {
	if (!person) return <div>Loading</div>
	return (
		<Card style={{width: 275, margin: 20}}>
			<CardContent>
				<Typography variant='h5' component='h2'>
					{person.name}
				</Typography>
				<Typography color='textSecondary' gutterBottom>
					{person.phoneNumber}
				</Typography>
				<Typography color='textSecondary'>{person.email}</Typography>
			</CardContent>
			<CardActions>
				{/* <TagManager person={person}/> */}
			</CardActions>
		</Card>
	)
}

export default PersonCard
