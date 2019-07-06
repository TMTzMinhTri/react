import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'


export const Login = () => {
    const [formData, setFormdata] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData
    const onchange = e =>
        setFormdata({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();

        console.log(formData)
    }
    return <>
        <h1 className="large text-primary">Sign in</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign in to Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    required
                    onChange={e => onchange(e)}
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    onChange={e => onchange(e)}
                />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
            Dont have an account? <Link to="/register">Sign Up</Link>
        </p>
    </>
}