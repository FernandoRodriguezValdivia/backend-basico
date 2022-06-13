const { app, db }  = require('../src/app')
const request = require('supertest')

beforeEach(()=>{
	db.set('tasks', []).write()
})

it('only task "task1" is save in db', async()=>{
	const response = await request(app).post('/create').send({ title: "task1", description: "Some thing"})
	expect(response.body.db).toHaveLength(1)
})

it('task "task1" is save in db', async()=>{
	const response = await request(app).post('/create').send({ title: "task1", description: "Some thing"})
	const task = response.body.db[0]
	expect(task.title).toBe("task1")
})

it('get all task', async()=>{
	await request(app).post('/create').send({ title: "task1", description: "Some thing"})
	const response = await request(app).get('/tasks')
	expect(response.body).toHaveLength(1)
})

it('task is update', async()=>{
	await request(app).post('/create').send({ title: "task1", description: "Some thing"})
	const response = await request(app).put('/task?id=1').send({title: "other-title"})
	const task = response.body.db[0]
	expect(task.title).toBe("other-title")
})

it('task is delete', async()=>{
	await request(app).post('/create').send({ title: "task1", description: "Some thing"})
	const response = await request(app).delete('/task?id=1')
	expect(response.body.db).toHaveLength(0)
})