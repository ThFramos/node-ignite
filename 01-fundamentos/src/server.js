import http from 'node:http';
import {randomUUID} from 'node:crypto'
import { Database } from './database.js';
import { json } from './middlewares/json.js';

const users = [];
const database = new Database();

const server = http.createServer(async (request, response) => {



    const { method, url } = request

    await json(request, response)

    if (method === 'GET' && url === '/users') {
        const data = database.select('users')

        return response
            .end(JSON.stringify(data))
    }

    if (method === 'POST' && url === '/users') {
        const { name, email } = request.body
        const data = {
            id: randomUUID(),
            name,
            email
        }
        database.insert('users', data)
        return response.writeHead(201).end()
    }
    return response.writeHead(404).end()

})


server.listen(3333)
