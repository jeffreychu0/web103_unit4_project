import express from 'express'
import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} from '../controllers/cars.js'

const carsRouter = express.Router()

// define routes to get, create, edit, and delete items
carsRouter.get('/api/cars', getCars)
carsRouter.get('/api/cars/:id', getCarById)
carsRouter.post('/api/cars', createCar)
carsRouter.put('/api/cars/:id', updateCar)
carsRouter.delete('/api/cars/:id', deleteCar)

export default carsRouter