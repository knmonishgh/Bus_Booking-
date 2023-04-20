import React from 'react'
import { useEffect } from 'react';
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axois from "axios"
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { EyeTwoTone, EyeInvisibleOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from "../resources/login.module.css"



function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignIn = () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signIn().then(async (googleUser) => {
            try {
                dispatch(ShowLoading());
                const id_token = googleUser.getAuthResponse().id_token;
                const response = await axois.post('/api/users/auth/google', {
                    id_token,
                });
                dispatch(HideLoading());
                if (response.data.success) {
                    message.success(response.data.message);
                    localStorage.setItem('token', response.data.data);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else {
                    message.error(response.data.message);
                }
            } catch (error) {
                dispatch(HideLoading());
                message.error(error.message);
            }
        });
    };

    useEffect(() => {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                client_id: '513067274332-u7udvva91ic52gmqlaoei9pt2ppom80p.apps.googleusercontent.com',
            });
        });
    }, []);

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await axois.post("/api/users/login", values);
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem("token", response.data.data);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                message.error(response.data.message);
            }

        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message)
        }
    };



    const [form] = Form.useForm()

    return (
        <>
            <div className='container'>
                <div className={styles.loginbox}>
                    <div className={styles.login}>
                        <div className={styles.logo}>
                            <img src={require("../images/BUSLOGO.png")} alt="logo" />
                        </div>
                        <h1 className='text-lg'> Login</h1>
                        <hr />
                        <Form layout="vertical" onFinish={onFinish} form={form}>
                            <Form.Item label="Email" name="email" required>
                                <Input prefix={<MailOutlined />} placeholder=" Enter a valid Email " type="text" required />
                            </Form.Item>
                            <Form.Item label="Password" name="password" required>
                                <Input.Password
                                    placeholder="Enter Password" prefix={<LockOutlined />}
                                    iconRender={(visible) =>
                                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                    }
                                    required
                                />
                            </Form.Item>
                            <br />

                            <hr />
                            <div className='d-flex justify-content-between align-items-center'>
                                <Link to="/register" >Click here to Register</Link>
                                <button className='secondary-btn' type='submit'>Login</button>

                            </div>
                            <hr />
                            <div>
                                <button className={styles.googleBTN} onClick={handleSignIn} block>
                                    <i className="ri-google-fill"></i> Sign up with Google
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div></>
    )
}

export default Login
