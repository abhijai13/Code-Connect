import React from 'react'
import { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'


const Login = (props) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    // const name = "Abhi"
    const { email, password} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = async e =>{
        e.preventDefault()
        props.login({email, password})
    }

    //redirect if loggedin
    if(props.isAuthenticated){
        return <Redirect to='dashboard' />
    }
    return (
        <Fragment>
            <h1 className="large " style = {{color:'#17a2b8'}}>
                Sign In
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> 
                Sign into Your Account
            </p>
            <form  className="form" onSubmit = {e => onSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name = 'email' 
                        value = {email} 
                        onChange = {e => onChange(e)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        minlength="6" 
                        name = 'password' 
                        value = {password} 
                        onChange = {e => onChange(e)} 
                        required
                    />
                </div>
                <input type="submit" value="Login" className="btn btn-primary" />
            </form>
            <p className="my-1">
                Don' t have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login)