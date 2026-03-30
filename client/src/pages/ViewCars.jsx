import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { getAllCars, deleteCar } from '../services/CarsAPI.jsx'
import { calcPrice } from '../utilities/calcprice.jsx'

const ViewCars = () => {
  const navigate = useNavigate()
  const [cars, setCars] = useState([])
  const [error, setError] = useState(null)

  const loadCars = async () => {
    try {
      const data = await getAllCars()
      setCars(data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    loadCars()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this car?')) return
    try {
      await deleteCar(id)
      setCars((prev) => prev.filter((car) => car.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className='page'>
      <h2>All Custom Cars</h2>
      {error && <div className='error-container'>{error}</div>}
      <table className='cars-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Convertible</th>
            <th>Color</th>
            <th>Roof</th>
            <th>Wheels</th>
            <th>Interior</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td><Link to={`/customcars/${car.id}`}>{car.name}</Link></td>
              <td>{car.convertible ? 'yes' : 'no'}</td>
              <td>{car.color}</td>
              <td>{car.roof}</td>
              <td>{car.wheels}</td>
              <td>{car.interior}</td>
              <td>${Number(calcPrice(car.color, car.roof, car.wheels, car.interior)).toFixed(2)}</td>
              <td>
                <div className='action-buttons'>
                  <button onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
                  <button onClick={() => handleDelete(car.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewCars