import React from 'react'
import { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { EyeTwoTone, EyeInvisibleOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from "../resources/login.module.css";
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";





function Login() {
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
      const response = await axios.post("/api/users/login", values);
      dispatch(HideLoading());
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

    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message)
    }
  };



  // eslint-disable-next-line react-hooks/rules-of-hooks
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
                <button onClick={login} className={styles.googleBtn}>
                  <img src="https://developers.google.com/identity/images/g-logo.png" width={"20px"} alt="Google logo" /> 
                  <span>Continue with Google</span>
                </button>

              </div>
            </Form>
          </div>
        </div>
      </div>
      <div>

      </div></>
  )
}


export default Login;
