import React, { useState } from 'react';
import HomeImage from '../Images/HomeImage.png';
import './Home.css';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
//import {useParams} from "react-router-dom";

function Home({ navigation }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})
    const [visible, setVisible] = useState(false)
    //const createUserApi = "http://localhost:3000/"
    //const { id } = useParams();
    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        
        setFormData({
            ...formData, [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(formData)
        const validationErrors = {}
        if (!formData.email.trim()) {
            validationErrors.email = "email is required!"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "email is not valid"
        }

        if (!formData.password.trim()) {
            validationErrors.password = "password is required!"
        } else if (formData.password.length < 6) {
            validationErrors.password = "password should be at least 6 characters."
        }

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length === 0) {
            navigation.navigate('User Details')
        }
    }

    return (
        <>
            <h1 style={{ textAlign: 'start' }}>User Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="frame">
                    <div className="innerFrame">
                        <h2>Sign In</h2>
                        <label className='email'>Email</label>
                        <div className='input-container'>
                            <input
                                className='form-input'
                                type="text"
                                name="email"
                                onChange={handleChange}
                                placeholder='email@example.com'
                                autoComplete='off'
                                value={formData.email} />
                            {errors.email && <span>{errors.email}</span>}
                        </div>

                        <label className='password'>Password</label>
                        <div className='input-container'>
                            <input
                                name='password'
                                type={visible ? "text" : "password"}
                                placeholder='*******'
                                className='form-input'
                                onChange={handleChange}
                                value={formData.password} />

                            {visible ? (
                                <AiFillEye
                                    className='eye-icon'
                                    onClick={() => setVisible((prevState) =>
                                        !prevState)} />
                            ) : (
                                <AiFillEyeInvisible
                                    className='eye-icon'
                                    onClick={() => setVisible((prevState) =>
                                        !prevState)} />
                            )}
                            {errors.password && <span>{errors.password}</span>}
                        </div>

                        <button
                            className="styled"
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

export default Home;