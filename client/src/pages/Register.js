import React from 'react'
import { Form, Input } from 'antd'
import { Link } from 'react-router-dom'

function Register() {
    const onFinish = (values) => {
        console.log(values);
    };

    const validateName = (_, value) => {
        if (!/^[a-zA-Z ]{3,}$/.test(value)) {
            return Promise.reject('Name should have minimum 3 alphabets')
        }
        return Promise.resolve()
    }

    const validatePhone = (_, value) => {
        if (!/^\d{10}$/.test(value)) {
            return Promise.reject('Phone Number should be exactly 10 digits')
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

    return (
        <div className='h-screen d-flex justify-content-center align-items-center' >
            <div className='w-400 card p-3'>
                <div className="logo">
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCABAAEADASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAUGAgMHAQT/xAAtEAACAQQBAgQFBAMAAAAAAAABAgMABBESBRMhBjEyYSJBQlGRFCNSsYGTwf/EABkBAAIDAQAAAAAAAAAAAAAAAAACAQMFBv/EACQRAAICAAQGAwAAAAAAAAAAAAABAhEDEjHwBBMhcZHhQUJh/9oADAMBAAIRAxEAPwDl9KUrWMkUrattK4yqgj2YUkgkjXZwo9thn8UueN1ZbycSs2V12NVKzETEA/CM9+7gV4yFMZK9/swP9VNoVwklbRjSlKkQUpSgCzQ6mGBDAkqkRq2TGNAY42ydlJOSzfihjTSUjj4iysAg3h+Md8n0ew/NR1pyNoGDXdmrMI1TcAPsFAGMN2GQB3FYLJYNnFmv+0j+yKzOS0+q35R0S4qM0ssl8+vq+/ol1VVmwtlGq9LbcPD6tM6+j+Xw1rmIezcTWrQuyvoQy/ShbIKqM+WDUastjHKjmxRkUgn9/J/GTms7jlYgssdnCUWRCrHJQNkYJ0U65wf+0cltqlvyyXxcYxanKvzcVvV6ETSlK0znBV28POl9x0i2fB8SGe5trCz/AFNv1S0r5LO7nucKjE4AA2GB2xVJr6Yr+7htRbQ3EkcImE4VDjEgBUMD5g4JFJKNosw55X1LPP4M5TkbhriJ+JXqmPRLNiYipAGy6qQADtnPclHIBAyfON8EXKzWlxys1olof3ZohKxfpqm8gOo+HXBRu+Qfl5ZrVvyV/axLFbX11DGpyqRTsqg5ByAD9wD/AIFIeS5CBNIb+7jXqdXVJ2Ub/wAsA+r386XLPSxs2Hd0XnTi7q7WGLhbWK41Z7rj57fpT3UQTKPAchUJQBigwQdiNvKoKz8FX8zmGW5ghmMLNEj5HUkAiymxwo7zKuc427DNRw8RctooN0pkWIxLO0EZnVCCNRKV3AwSPV5HFfJJyfISwrDLf3bxLqVjadio19OBnHb5fahQktGNLEg9UdE47w7wthx0ct7ZxTAlrgdRzM76yCJUARQ5Vi6MMJ9QDfTnmTts7MECZJOo8l9qmeS8S8hf29lG0sscttG8bzpM+84YKDsc/ZFyPn3Pz7QtTCLVti4soulEUpSrCkUpSgBSlKAFKUoA/9k=" alt="logo" />
                </div>
                <h1 className='text-lg' >TravelSwift - Register</h1>
                <hr />
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item label="Full Name" name="name" rules={[{ validator: validateName }]}>
                        <Input type="text" required />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone" rules={[{ validator: validatePhone }]}>
                        <Input type="text" required />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ validator: validateEmail }]}>
                        <Input type="text" required />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ validator: validatePassword }]}>
                        <Input type="password" required />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ validator: validateConfirmPassword }]}>
                        <Input type="password" required />
                    </Form.Item>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Link to="/login">Click here to Login</Link>
                        <button className='secondary-btn' type='submit'>Register</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register
//Form-Item is from antd