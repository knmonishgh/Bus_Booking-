import React from 'react'
import { useEffect,useState } from 'react';
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { EyeTwoTone, EyeInvisibleOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from "../resources/login.module.css";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';



function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const handleSignIn = useGoogleLogin({
        onSuccess: (codeResponse) => {
          axios.post('/api/users/auth/google', {
            id_token: codeResponse.id_token,
          }).then((response) => {
            if (response.data.success) {
              message.success(response.data.message);
              localStorage.setItem('token', response.data.data);
              axios.post('/api/users/auth/google', {
                headers: {
                  Authorization: `Bearer ${response.data.data}`,
                }
              }).then((res) => {
                if (res.data.success) {
                  const user = res.data.data;
                  if (user.googleId) {
                    navigate('/');
                  } else {
                    axios.post('/api/users/auth/google', {
                      email: user.email,
                      name: user.name,
                    }, {
                      headers: {
                        Authorization: `Bearer ${response.data.data}`,
                      }
                    }).then((res) => {
                      if (res.data.success) {
                        navigate('/');
                      } else {
                        message.error(res.data.message);
                      }
                    }).catch((error) => {
                      message.error(error.message);
                    });
                  }
                } else {
                  message.error(res.data.message);
                }
              }).catch((error) => {
                message.error(error.message);
              });
            } else {
              message.error(response.data.message);
            }
          }).catch((error) => {
            message.error(error.message);
          });
        },
        onError: (error) => console.log('Login Failed:', error)
      });
      

    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/users/login", values);
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
                                <button className={styles.googleBTN}  block>
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