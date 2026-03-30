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
carsRouter.get('', getCars)
carsRouter.get('/:id', getCarById)
carsRouter.post('', createCar)
carsRouter.put('/:id', updateCar)
carsRouter.delete('/:id', deleteCar)

export default carsRouter