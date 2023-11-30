import { Button, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../store/modules/user";
import { useNavigate } from 'react-router-dom';
import './index.css';
const loginSerive = async (params: any, dispatch: any, navigate: any) => {
    const data = await dispatch(fetchLogin({
        username: params.username,
        password: params.password
    }))
    if(!data.error) {
        message.success('登录成功')
        navigate('/dashboard')
    }
}
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <>
           <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={(e) => loginSerive(e,dispatch,navigate)}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" href="">
                    Forgot password
                    </a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
             </Form>
        </>
        
    )
}

export default Login;