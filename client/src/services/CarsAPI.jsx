const BASE_URL = 'http://localhost:3000/cars'

export const getAllCars = async () => {
  const res = await fetch(BASE_URL)
  if (!res.ok) {
    throw new Error('Failed to fetch cars')
  }
  return res.json()
}

export const getCarById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch car with id ${id}`)
  }
  return res.json()
}

export const createCar = async (carData) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData)
  })
  if (!res.ok) {
    throw new Error('Failed to create car')
  }
  return res.json()
}

export const updateCar = async (id, carData) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carData)
  })
  if (!res.ok) {
    throw new Error(`Failed to update car with id ${id}`)
  }
  return res.json()
}

export const deleteCar = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) {
    throw new Error(`Failed to delete car with id ${id}`)
  }
  return res.json()
}
