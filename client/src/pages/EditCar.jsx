import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'
import OptionPopup from '../components/OptionPopup.jsx'
import { getCarById, updateCar } from '../services/CarsAPI.jsx'
import { COLORS, ROOF_OPTIONS, WHEEL_OPTIONS, INTERIOR_OPTIONS, calcPrice } from '../utilities/calcprice.jsx'
import { validateCar } from '../utilities/validation.jsx'
import blackImg from '../assets/colors/black.png'
import redImg from '../assets/colors/red.png'
import silverImg from '../assets/colors/silver.png'
import blueImg from '../assets/colors/blue.png'
import matteGrayImg from '../assets/colors/matteGray.png'

import bodyColorRoof from '../assets/roofs/bodyColor.png'
import sunRoof from '../assets/roofs/sunRoof.png'
import carbonFiberRoof from '../assets/roofs/carbonFiber.png'
import dualRoof from '../assets/roofs/dualRoof.png'

import normalWheel from '../assets/wheels/normal.png'
import bodyColorWheel from '../assets/wheels/bodyColor.png'
import carbonFiberWheel from '../assets/wheels/carbonFiber.png'
import silverWheel from '../assets/wheels/silver.png'

import naturalInterior from '../assets/interior/natural.png'
import racerInterior from '../assets/interior/racer.png'
import technicalInterior from '../assets/interior/technical.png'

const EditCar = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [errors, setErrors] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const existing = await getCarById(id)
        setForm({
          name: existing.name,
          convertible: existing.convertible,
          color: existing.color,
          roof: existing.roof,
          wheels: existing.wheels,
          interior: existing.interior,
          price: existing.price
        })
      } catch (err) {
        setErrors([err.message])
      }
    }
    load()
  }, [id])

  const derivedPrice = useMemo(() => form ? calcPrice(form) : 0, [form])

  if (!form) return <div className='page'>Loading...</div>

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const colorImages = {
    black: blackImg,
    red: redImg,
    silver: silverImg,
    blue: blueImg,
    'matte gray': matteGrayImg,
    default: blackImg
  }

  const roofImages = {
    'body color': bodyColorRoof,
    'sun roof': sunRoof,
    'carbon fiber': carbonFiberRoof,
    'dual roof': dualRoof,
    default: bodyColorRoof
  }

  const wheelImages = {
    normal: normalWheel,
    'carbon fiber': carbonFiberWheel,
    'body color': bodyColorWheel,
    'silver rim': silverWheel,
    default: normalWheel
  }

  const interiorImages = {
    natural: naturalInterior,
    racer: racerInterior,
    technical: technicalInterior,
    default: naturalInterior
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fullCar = { ...form, price: derivedPrice }
    const validation = validateCar(fullCar)
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    setSaving(true)
    try {
      await updateCar(id, fullCar)
      navigate('/customcars')
    } catch (err) {
      setErrors([err.message])
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='page'>
      <h2>Edit Custom Car</h2>

      {errors.length > 0 && (
        <div className='error-container'>
          <ul>{errors.map((msg) => <li key={msg}>{msg}</li>)}</ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className='form'>
        <label>
          Name
          <input name='name' value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Convertible
          <input name='convertible' type='checkbox' checked={form.convertible} onChange={handleChange} />
        </label>
        <OptionPopup
          label='Color'
          options={COLORS}
          selected={form.color}
          onSelect={(value) => setForm((prev) => ({ ...prev, color: value }))}
          imageMap={colorImages}
        />

        <OptionPopup
          label='Roof'
          options={ROOF_OPTIONS}
          selected={form.roof}
          onSelect={(value) => setForm((prev) => ({ ...prev, roof: value }))}
          imageMap={roofImages}
        />

        <OptionPopup
          label='Wheels'
          options={WHEEL_OPTIONS}
          selected={form.wheels}
          onSelect={(value) => setForm((prev) => ({ ...prev, wheels: value }))}
          imageMap={wheelImages}
        />

        <OptionPopup
          label='Interior'
          options={INTERIOR_OPTIONS}
          selected={form.interior}
          onSelect={(value) => setForm((prev) => ({ ...prev, interior: value }))}
          imageMap={interiorImages}
        />
        <div>Calculated Price: ${derivedPrice}</div>
        <button type='submit' disabled={saving}>{saving ? 'Saving...' : 'Update Car'}</button>
      </form>
    </div>
  )
}

export default EditCar