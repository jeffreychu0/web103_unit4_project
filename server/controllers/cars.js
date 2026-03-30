import { pool } from '../config/database.js'

export const getCars = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM CustomItem ORDER BY id')
    res.json(result.rows)
  } catch (error) {
    console.error('Error getting cars', error)
    res.status(500).json({ error: 'Failed to get cars' })
  }
}

export const getCarById = async (req, res) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid car id' })
  }

  try {
    const result = await pool.query('SELECT * FROM CustomItem WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error getting car by id', error)
    res.status(500).json({ error: 'Failed to get car' })
  }
}

export const createCar = async (req, res) => {
  const { name, convertible, color, roof, wheels, interior } = req.body

  if (
    !name ||
    convertible === undefined ||
    !color ||
    !roof ||
    wheels === undefined ||
    !interior
  ) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO CustomItem (name, convertible, color, roof, wheels, interior)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, convertible, color, roof, wheels, interior]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating car', error)
    res.status(500).json({ error: 'Failed to create car' })
  }
}

export const updateCar = async (req, res) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid car id' })
  }

  const { name, convertible, color, roof, wheels, interior } = req.body

  if (
    !name ||
    convertible === undefined ||
    !color ||
    !roof ||
    wheels === undefined ||
    !interior
  ) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const result = await pool.query(
      `UPDATE CustomItem
       SET name = $1,
           convertible = $2,
           color = $3,
           roof = $4,
           wheels = $5,
           interior = $6,
       WHERE id = $7
       RETURNING *`,
      [name, convertible, color, roof, wheels, interior, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Error updating car', error)
    res.status(500).json({ error: 'Failed to update car' })
  }
}

export const deleteCar = async (req, res) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'Invalid car id' })
  }

  try {
    const result = await pool.query('DELETE FROM CustomItem WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found' })
    }
    res.json({ message: 'Car deleted', car: result.rows[0] })
  } catch (error) {
    console.error('Error deleting car', error)
    res.status(500).json({ error: 'Failed to delete car' })
  }
}

