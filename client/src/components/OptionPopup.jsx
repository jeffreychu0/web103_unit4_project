import React, { useState } from 'react'
import '../App.css'

const OptionPopup = ({ label, options, selected, onSelect, imageMap }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='option-popup'>
      <div className='option-popup-header'>
        <span>{label}</span>
        <button type='button' onClick={() => setOpen(true)} className='option-popup-button'>Choose</button>
      </div>

      <div className='option-preview'>
        {selected && (
          <img
            src={imageMap[selected] || imageMap.default}
            alt={`${label} ${selected}`}
            className='option-preview-image'
          />
        )}
        <span>{selected}</span>
      </div>

      {open && (
        <div className='option-popup-overlay'>
          <div className='option-popup-content'>
            <div className='option-top-section'>
                <h3>Select {label}</h3>
                <button type='button' className='close-btn' onClick={() => setOpen(false)}>x</button>
            </div>
            <div className='option-grid'>
              {options.map((option) => (
                <button
                  key={option}
                  type='button'
                  className={`option-card ${selected === option ? 'selected' : ''}`}
                  onClick={() => {
                    onSelect(option)
                    setOpen(false)
                  }}
                >
                  <img
                    src={imageMap[option] || imageMap.default}
                    alt={option}
                    className='option-card-img'
                  />
                  <div>{option}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OptionPopup
