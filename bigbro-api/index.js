const express = require('express')
const app = express()
var cors = require('cors')
var neo4j = require('neo4j-driver')

const dotenv = require('dotenv')
dotenv.config()

var driver = neo4j.driver(
	'bolt://localhost:7687',
	neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
)

app.use(cors());

app.get('/people', (req, res) => {
	let people = []
	let session = driver.session()
	session
		.run(`MATCH (n:Person) OPTIONAL MATCH (n)-[:HAS_TAG]->(t:Tag) return n{.*, tags: collect(t{.*})}`)
		.then(result => {
			people = result.records.map(record => record._fields[0])
			res.send(people)
		})
		.catch(error => {
			console.log(error)
		})
		.then(() => session.close())
})

app.post('/people/tag', (req, res) => {
	let session = driver.session()
	session
		.run(`MATCH (n:Person {id: ${req.personId}}) MERGE (t:Tag {name: ${req.tagName}, data: ${req.tagDate}})<-[:HAS_TAG]-(p)`)
		.then(result => {
			people = result.records.map(record => record._fields[0])
			res.send(people)
		})
		.catch(error => {
			console.log(error)
		})
		.then(() => session.close())
})

app.get('/tags', (req, res) => {
	let tags = []
	let session = driver.session()
	session
		.run('MATCH (t:Tag) return t{.*}')
		.then(result => {
			tags = result.records.map(record => record._fields[0])
			res.send(tags)
		})
		.catch(error => {
			console.log(error)
		})
		.then(() => session.close())
})

app.listen(3000, () => console.log(`BigBro app listening on port 3000!`))
