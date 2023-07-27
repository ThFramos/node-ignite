import fs from 'node:fs/promises'

const databasePath = new URL("../db.json", import.meta.url)


export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then((data) => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table) {
        let data = this.#database[table] ?? []

        return data;
    }
    selectOne(table, id) {
       return this.#database[table].find(row => row.id === id)
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)

        } else {
            this.#database[table] = [data]
        }
        this.#persist()
        return data;
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if (rowIndex >= 0) {

            const lastData = this.#database[table][rowIndex]
            this.#database[table][rowIndex] = { ...lastData, ...data }
            this.#persist()
        }
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if (rowIndex >= 0) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()

        }
   }

    completed(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if (rowIndex >= 0) {
            const lastData = this.#database[table][rowIndex]
            this.#database[table][rowIndex] = { ...lastData, ...data}
            this.#persist()
        }

    }


}