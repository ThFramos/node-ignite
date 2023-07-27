import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';
import { Database } from "./database.js"

const database = new Database();
export const routes = [
    {
        method: "GET",
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const tasks = database.select('tasks')
            console.log("TASKS")
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: "POST",
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const { title, description } = req.body

            if (!title || !description)
                return res.writeHead(404).end(JSON.stringify({ message: "Title and description are required" }))


            const task = {
                id: randomUUID(),
                title,
                description,
                created_at: new Date(),
                completed_at: null,
                updateted_at: null
            }

            const tasks = database.insert('tasks', task)
            return res.writeHead(201).end(JSON.stringify(tasks))
        }
    },
    {
        method: "PUT",
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { title, description } = req.body
            const { id } = req.params

            if (!title || !description)
                return res.writeHead(404).end(JSON.stringify({ message: "Title and description are required" }))

            if (!database.selectOne('tasks', id))
                return res.writeHead(404).end()

            database.update('tasks', id, {
                title, description,
                updateted_at: new Date()
            })

            return res.writeHead(204).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params

            if (database.selectOne('tasks', id))
                return res.writeHead(404).end()

            database.delete('tasks', id)

            return res.writeHead(204).end()

        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params
            const hasData = database.selectOne('tasks', id)
            if (!hasData)
                return res.writeHead(404).end()

            const completed_at = hasData.completed_at ? null : new Date();
            database.update('tasks', id, { completed_at })

            return res.writeHead(204).end()

        }

    }

]