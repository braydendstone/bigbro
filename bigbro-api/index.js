const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors')
const moment = require('moment')
var neo4j = require('neo4j-driver')

const dotenv = require('dotenv')
dotenv.config()

// IMPORT
// LOAD CSV WITH HEADERS FROM 'file:///GRANDPeople.csv' as row CREATE (n:Person) set n = row, n.Id = apoc.create.uuid()

var driver = neo4j.driver(
	'bolt://localhost:7687',
	neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
)

app.use(cors());
app.use(bodyParser.json());

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
	let { name, color, personName } = req.body
	if(!color) {
		color = "#" + Math.random().toString(16).slice(2, 8)
	}
	let session = driver.session()
	session
		.run(`MATCH (p:Person {name: '${personName}'}) MERGE (t:Tag {name: '${name}', color: '${color}'})<-[:HAS_TAG {date: '${moment().toString()}'}]-(p)`)
		.then(result => {
			res.send(true)
		})
		.catch(error => {
			console.log(error)
			res.status(500).send(error)
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
