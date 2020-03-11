import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Layout, Typography } from 'antd';

import withStore from '../helpers/withStore';

class SignIn extends Component {
	
    onFinish = values => {
        const { store } = this.props;
		store.authStore.login(values);
    }
	
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    }

	render() {
		const { Content } = Layout;

		const { Title } = Typography;

		const layout = {
			labelCol: {
				span: 8
			},
			wrapperCol: {
				span: 16
			}
		};
		const tailLayout = {
			wrapperCol: {
				offset: 8,
				span: 16
			}
		};
		
		return (
			<Content style={{ padding: '50px', margin: '25px' }}>
				<Title style={{ marginTop: '0.5px', textAlign: 'center' }}>Sign In</Title>
				<Form
					{...layout}
					name="basic"
					initialValues={{
						remember: true
					}}
					onFinish={this.onFinish}
					onFinishFailed={this.onFinishFailed}
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							 {
                                type: 'email',
                                message: 'The input is not valid E-mail!'
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!'
                            }
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: 'Please input your password!'
							}
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item {...tailLayout} name="remember" valuePropName="checked">
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Content>
		)
	}
};

export default withStore(SignIn);