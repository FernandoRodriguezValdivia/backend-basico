const http = require('http')
const lowdDB = require('lowdb');
const FyleSync = require('lowdb/adapters/FileSync')
const adapter = new FyleSync('src/database.json')
const db = lowdDB(adapter)
const app = http.createServer((req,res)=>{

	const {method, url} = req
	switch(method){
		case "GET":
			if(url==="/"){
				res.writeHead(200, {'Content-Type': 'application/json'})
				res.write(JSON.stringify({message: "Hola Mundo"}))
				res.end()
			}
			if(url==="/tasks"){
				res.writeHead(200, {'Content-Type': 'application/json'})

				res.write(JSON.stringify(db.get('tasks').value()))
				res.end()
			}
			break
		case "POST":
			if(url==="/create"){
				let data = ""
				req
					.on('data', chunk=>{
						data += chunk
					})
					.on('end', ()=>{
						req.body = JSON.parse(data)
						const id = db.get('tasks').value().length + 1
						db.get('tasks').push({id: id, ...req.body}).write()
						res.writeHead(200, {'Content-Type': 'application/json'})
						res.write(JSON.stringify({message: "succes", db: db.get('tasks').value()}))
						res.end()
					})
					.on('error', err =>{
						console.log(err)
					})
			}
			break
		case "PUT":
			var query = url.split('?')[1]
			var id = query.split('=')[1]
			let data = ""
				req
					.on('data', chunk=>{
						data += chunk
					})
					.on('end', ()=>{
						req.body = JSON.parse(data)
						db.get('tasks').find({id: parseInt(id, 10)}).assign(req.body).value()
						res.writeHead(200, {'Content-Type': 'application/json'})
						res.write(JSON.stringify({message: "succes", db: db.get('tasks').value()}))
						res.end()
					})
					.on('error', err =>{
						console.log(err)
					})
			break
		case "DELETE":
			var query = url.split('?')[1]
			var id = query.split('=')[1]
			db.get('tasks').remove({id: parseInt(id, 10)}).write()
			res.writeHead(200, {'Content-Type': 'application/json'})
			res.write(JSON.stringify({message: "succes", db: db.get('tasks').value()}))
			res.end()
			break
	}
})

module.exports = { app, db }