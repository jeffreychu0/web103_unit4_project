import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import OptionPopup from '../components/OptionPopup.jsx'
import { createCar } from '../services/CarsAPI.jsx'
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

const initialForm = {
  name: '',
  convertible: false,
  color: COLORS[0],
  roof: ROOF_OPTIONS[0],
  wheels: WHEEL_OPTIONS[0],
  interior: INTERIOR_OPTIONS[0],
  price: 0
}

const CreateCar = () => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState([])
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const derivedPrice = useMemo(() => calcPrice(form), [form])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fullCar = { ...form}
    const validation = validateCar(fullCar)

    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    setSaving(true)
    try {
      await createCar(fullCar)
      navigate('/customcars')
    } catch (err) {
      setErrors([err.message])
    } finally {
      setSaving(false)
    }
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

  return (
    <div className='page'>
      <h2>Create Custom Car</h2>
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
        <button type='submit' disabled={saving}>{saving ? 'Saving...' : 'Create Car'}</button>
      </form>
    </div>
  )
}

export default CreateCar