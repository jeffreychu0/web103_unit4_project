import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../App.css'
import { getCarById } from '../services/CarsAPI.jsx'
import { getPriceBreakdown } from '../utilities/calcprice.jsx'

const CarDetails = () => {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const result = await getCarById(id)
        setCar(result)
      } catch (err) {
        setError(err.message)
      }
    }
    load()
  }, [id])

  if (error) return <div className='page error-container'>{error}</div>
  if (!car) return <div className='page'>Loading...</div>

  const priceInfo = getPriceBreakdown(car)

  return (
    <div className='page'>
      <h2>{car.name}</h2>
      <p>Convertible: {car.convertible ? 'Yes' : 'No'}</p>
      <p>Color: {car.color}</p>
      <p>Roof: {car.roof}</p>
      <p>Wheels: {car.wheels}</p>
      <p>Interior: {car.interior}</p>
      <p>Price: ${Number(car.price).toFixed(2)}</p>

      <h3>Price Breakdown</h3>
      <ul>
        <li>Base: ${priceInfo.base}</li>
        <li>Color: ${priceInfo.color}</li>
        <li>Roof: ${priceInfo.roof}</li>
        <li>Wheels: ${priceInfo.wheels}</li>
        <li>Interior: ${priceInfo.interior}</li>
        <li>Total: ${priceInfo.total}</li>
      </ul>

      <Link to={`/edit/${car.id}`}>Edit this car</Link>
    </div>
  )
}

export default CarDetails