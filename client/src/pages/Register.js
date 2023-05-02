import React from 'react'
import { useState } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import styles from "../resources/login.module.css"
import { useDispatch } from "react-redux";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const login = useGoogleLogin({
        onSuccess: async respose => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${respose.access_token}`
                    }
                })



                const payload = {
                    userInfo: res.data,

                };

                const response = await axios.post('/api/users/google-login', payload);
                if (response.data.success) {
                    message.success(response.data.message);
                    localStorage.setItem("token", response.data.data);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                    navigate("/")
                } else {
                    message.error(response.data.message);
                }
                console.log(res.data)
            } catch (err) {
                console.log(err)

            }

        }
    });



    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/users/register", values);
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                navigate("/login");

            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message)
        }
    };

    const validateName = (_, value) => {
        if (!/^[a-zA-Z ]{3,}$/.test(value)) {
            return Promise.reject('Name should have minimum 3 alphabets')
        }
        return Promise.resolve()
    }



    const validateEmail = (_, value) => {
        if (!/\S+@\S+\.\S+/.test(value)) {
            return Promise.reject('Invalid email')
        }
        return Promise.resolve()
    }

    const validatePassword = (_, value) => {
        if (!/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}/.test(value)) {
            return Promise.reject('Password should be minimum 8 characters with at least 1 capital letter, 1 special character, and 1 number')
        }
        return Promise.resolve()
    }

    const validateConfirmPassword = (_, value) => {
        const { password } = form.getFieldsValue()
        if (value !== password) {
            return Promise.reject('Passwords do not match')
        }
        return Promise.resolve()
    }

    const [form] = Form.useForm()

    /* const handleReset = () => {
        form.resetFields();
    }; 
    <button className='secondary-btn' type='reset'>Reset</button>
    to reset fields*/

    return (
        <div className={styles.loginbox}>
            <div className={styles.login}>
                <div className={styles.logo}>
                    <img src={require("../images/BUSLOGO.png")} alt="logo" />
                </div>
                <h1 className='text-lg' >TravelSwift - Register</h1>
                <hr />
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item label="Full Name" name="name" rules={[{ validator: validateName }]} required>
                        <Input prefix={<UserOutlined />} placeholder=" Enter Full Name " type="text" required />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ validator: validateEmail }]} required>
                        <Input prefix={<MailOutlined />} placeholder=" Enter a valid Email " type="text" required />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ validator: validatePassword }]} required>
                        <Input.Password prefix={<LockOutlined />}
                            placeholder="Enter Password"
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                            required
                        />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ validator: validateConfirmPassword }]} required>
                        <Input.Password prefix={<LockOutlined />}
                            placeholder="Enter Password"
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                            required
                        />
                    </Form.Item>
                    <hr />
                    <div className='d-flex justify-content-between align-items-center'>
                        <Link to="/login">Click here to Login</Link>
                        <button className='secondary-btn' type='submit'>Register</button>
                    </div>

                    <hr />
                    <div>
                        <button onClick={login} className={styles.googleBtn}>
                            <img src={require("../images/google logo.png")} width={"20px"} alt="Google logo" style={{ marginRight: "8px" }} />
                            <span style={{ marginLeft: "8px" }}>Continue with Google</span>
                        </button>


                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register;
