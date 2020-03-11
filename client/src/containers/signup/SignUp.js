import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Form, Input, Cascader, Button, Radio, Typography } from 'antd';

import withStore from '../helpers/withStore';

class SignUp extends Component {
	
	componentDidMount() {
		const { authStore, usersStore } = this.props.store;
		authStore.isClinicianOrPatient = '0';
		usersStore.fetchClinicians();
	}
	
	//Check if is a clinician form or patient form
	renderClinicianCascade = (isClinicianOrPatient, clinicians) => {
		if(isClinicianOrPatient === '0') {
			return(
				<Form.Item
					name="clinician"
					label="Clinician"
					rules={[
						{
						type: 'array',
						required: true,
						message: 'Please select your clinician!'
						}
					]}
				>
					<Cascader options={clinicians} />
				</Form.Item>
			)
		}
	}
	
	onRadioClick = e => {
		
		const { value } = e.target;
		const { authStore } = this.props.store;
		
		authStore.isClinicianOrPatient = value;
	}
	
    onFinish = values => {
		const { authStore } = this.props.store;
		delete values.confirm
		console.log(values);
		authStore.signUp(values);
    }

    render() {
		//Value for radios buttons
		const { isClinicianOrPatient } = this.props.store.authStore;
		
		//Value for clinicians cascade
		const { clinicians } = this.props.store.usersStore;
		
        //Components and style for build form from antd
        const { Content } = Layout;
        const { Title } = Typography;
		
		const cliniciansCascade = clinicians.map(clinician => {
			return { value: clinician._id, label: clinician.lastName };
		});
		
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 8
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 16
                }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };

        return (
            <Content style={{ padding: '50px', margin: '25px' }}>
                <Title style={{ marginTop: '0.5px', textAlign: 'center' }}>Sign Up</Title>
                <Form
                    {...formItemLayout}
                    name="register"
                    onFinish={this.onFinish}
                    initialValues={{
                        residence: [' '],
                        prefix: '86'
                    }}
                    scrollToFirstError
                >
                    <Radio.Group name="radiogroup" defaultValue={'0'}>
                        <Radio onClick={this.onRadioClick} value={'0'}>Patient</Radio>
                        <Radio onClick={this.onRadioClick} value={'1'}>Clinician</Radio>

                        <br />
                        <br />
                        <br />
                    </Radio.Group>

                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your First Name!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Last Name!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
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
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!'
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        'The two passwords that you entered do not match!'
                                    );
                                }
                            })
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
					
					{this.renderClinicianCascade(isClinicianOrPatient, cliniciansCascade)}

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
				
				<Link to="/signin">
							Go to Login if you have account
				</Link>
            </Content>
        );
    }
}

//ReactDOM.render(<RegistrationForm />, mountNode);

export default withStore(SignUp);