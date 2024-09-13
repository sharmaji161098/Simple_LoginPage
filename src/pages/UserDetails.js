import React, { useRef } from 'react';
import { useState } from 'react';
import './UserDetails.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from "react-icons/fa";
import HomeImage from '../Images/HomeImage.png';

function UserDetails({ navigation }) {
  const [details, setDetails] = useState({
    fName: '',
    lName: '',
    gender: '',
    date: '',
    postCode: ''
  })

  const [error, setError] = useState({})
  const [selectDate, setDate] = useState(null)
  const datePickerRef = useRef(null)

  const handleChange = (Event) => {
    const { name, value } = Event.target;
    setDetails({
      ...details, [name]: value
    })
  }

  const handleDateChange = (date) => {
    setDate(date);
    setDetails({
      ...details, date: date });
  };

  const handleSubmit = (Event) => {
    Event.preventDefault()
    const validationError = {}
    if (!details.fName.trim()) {
      validationError.fName = "first name is required!"
    }

    if (!details.lName.trim()) {
      validationError.lName = "last name is required!"
    }

    if (!details.postCode.trim()) {
      validationError.postCode = "post code is required!"
    } else if (details.postCode.length !== 4) {
      validationError.postCode = "postcode should be exactly four digit."
    }

    setError(validationError)

    if (Object.keys(validationError).length === 0) {
      navigation.navigate('Home')
    }
  }

  return (
    <>

      <form onSubmit={handleSubmit}>
        <div className="frame-details">
          <div className="inner-frame">
            <label className='fName'>First Name </label>
            <div className='input-conatainer'>
              <input
                className='form-input'
                type="text"
                name="fName"
                onChange={handleChange}
                placeholder='Enter First Name'
                autoComplete='off'
                value={details.fName} />
              {error.fName && <span>{error.fName}</span>}
            </div>

            <label className='lName'>Last Name </label>
            <div className='input-conatainer'>
              <input
                className='form-input'
                type="text"
                name="lName"
                onChange={handleChange}
                placeholder='Enter Last Name'
                autoComplete='off'
                value={details.lName} />
              {error.lName && <span>{error.lName}</span>}
            </div>

            <label>Gender </label>
            <div className='gender-input-conatainer'>
              <select className='gender-form-input' name='gender' onChange={handleChange} >
                <option value={""}>Choose Your Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Prefer not to say</option>
              </select>
            </div>

            <label>Date of Birth</label>
            <div className='dob-input-conatainer'>
              <DatePicker
                className='dob-form-input'
                selected={selectDate}
                onChange={handleDateChange}
                name='date'
                dateFormat="dd/MM/yyyy"
                placeholder="DD/MM/YYYY"
                //ref={datePickerRef}
                />
              
              <FaCalendarAlt 
                className='calenderIcon'
                onClick={() => datePickerRef.current.setFocus()}/>
              
            </div>

            <label className='postCode'>Post Code </label>
            <div className='input-conatainer'>
              <input
                className='form-input'
                type="number"
                name="postCode"
                onChange={handleChange}
                placeholder='Enter 4-digit Post Code'
                autoComplete='off'
                value={details.postCode} />
              {error.postCode && <span>{error.postCode}</span>}
            </div>

            <button
              className="submitButton"
              type="submit">Submit</button>

          </div>
        </div>
        <div className='homeImageDiv'>
                    <img alt="HomeImage" src={HomeImage} />
                </div>
      </form>
    </>
  )
}

export default UserDetails;