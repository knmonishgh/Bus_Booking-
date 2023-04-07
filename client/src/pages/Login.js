import React from 'react'
import '../resources/login.css';
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axois from "axios"



function Login() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            const response = await axois.post("/api/users/login", values)
            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem("token", response.data.data);
                navigate("/");

            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message)
        }
    };



    const [form] = Form.useForm()

    return (
        <>
            <div className='container'>
                <div className='login-box'>
                    <div className='login'>
                        <div className="logo">
                            <img src={require("../images/BUSLOGO.png")} alt="logo" />
                        </div>
                        <h1 className='text-lg'> Login</h1>
                        <hr />
                        <Form layout="vertical" onFinish={onFinish} form={form}>
                            <Form.Item label="Email" name="email">
                                <Input type="text" required />
                            </Form.Item>
                            <Form.Item label="Password" name="password">
                                <Input type="password" required />
                            </Form.Item>
                            <br />

                            <div className='d-flex justify-content-between align-items-center'>
                                <Link className="link1" to="/login">Forget Password?</Link>
                            </div>
                            <hr/>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Link to="/register" >Click here to Register</Link>
                                <button className='secondary-btn' type='submit'>Login</button>
                            </div>


                        </Form>
                    </div>
                </div>
            </div></>
    )
}

export default Login
