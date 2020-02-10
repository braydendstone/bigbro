const express = require('express')
const app = express()
var neo4j = require('neo4j-driver')

const dotenv = require('dotenv')
dotenv.config()

var driver = neo4j.driver(
	'bolt://localhost:7687',
	neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
)

app.get('/', (req, res) => {
	let people = []
	let session = driver.session()
	session
		.run('MATCH (n:Person) return n{.*}')
		.then(result => {
			people = result.records.map(record => record._fields[0])
			res.send(people)
		})
		.catch(error => {
			console.log(error)
		})
		.then(() => session.close())
})

app.listen(3000, () => console.log(`Gator app listening on port 3000!`))
