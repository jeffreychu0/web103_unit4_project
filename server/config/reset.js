import { pool } from './database.js'
import './dotenv.js'

const createCarsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS CustomItem;

    CREATE TABLE IF NOT EXISTS CustomItem (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        convertible BOOLEAN NOT NULL,
        color TEXT NOT NULL,
        roof TEXT NOT NULL,
        wheels TEXT NOT NULL,
        interior TEXT NOT NULL
    )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 cars table created successfully')
    } catch (err) {
        console.error('⚠️ error creating cars table', err)
    }
}

const insertQuery = `
    INSERT INTO CustomItem (name, convertible, color, roof, wheels, interior)
    VALUES ($1, $2, $3, $4, $5, $6)
`

const values = ["MyFirstCar", true, "black", "bodyColor", "normal", "natural"]

const seedCarsTable = async () => {
    await createCarsTable()

    pool.query(insertQuery, values, (err, res) => {
        if (err) {
            console.error('⚠️ error inserting car', err)
            return
        }

        console.log(`✅ ${values[0]} added successfully`)
    })
}

seedCarsTable();
