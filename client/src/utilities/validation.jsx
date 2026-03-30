export const validateCar = (car) => {
  const errors = []

  if (!car.name || car.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters')
  }

  if (typeof car.convertible !== 'boolean') {
    errors.push('Convertible must be true or false')
  }

  if (!car.color) {
    errors.push('Color is required')
  }

  if (!car.roof) {
    errors.push('Roof option is required')
  }

  if (!car.wheels) {
    errors.push('Wheel option is required')
  }

  if (!car.interior) {
    errors.push('Interior option is required')
  }

  if (car.roof === 'dual roof' && !car.convertible) {
    errors.push('Dual roof is only allowed with convertible')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
