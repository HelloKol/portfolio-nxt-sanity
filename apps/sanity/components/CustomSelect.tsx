import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import sanityClient from '../lib/sanityClient'

const CustomNumberSelect = ({type, value, onChange}) => {
  const [availableNumbers, setAvailableNumbers] = useState([])

  useEffect(() => {
    // Fetch existing numbers from documents
    sanityClient
      .fetch(`*[_type == '${type.options.documentType}' && number != null && _id != $id]{number}`, {
        id: type.options.documentId,
      })
      .then((data) => {
        const existingNumbers = data.map((doc) => doc.number)
        const filteredNumbers = type.options.list.filter(
          (option) => !existingNumbers.includes(option.value),
        )
        setAvailableNumbers(filteredNumbers)
      })
      .catch((error) => {
        console.error('Error fetching existing numbers:', error)
      })
  }, [type.options.documentType, type.options.documentId])

  const handleSelectChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <select value={value} onChange={handleSelectChange}>
      <option value="">Select a number</option>
      {availableNumbers.map((option) => (
        <option key={option.value} value={option.value}>
          {option.title}
        </option>
      ))}
    </select>
  )
}

CustomNumberSelect.propTypes = {
  type: PropTypes.object.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
}

export default CustomNumberSelect
