import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Form, Input, Button, Typography } from 'antd';

import withStore from '../helpers/withStore';

class ClinicianEdit extends Component {
    componentDidMount() {
        const { usersStore } = this.props.store;
        usersStore.fetchClinician(this.props.match.params.id);
    }

    renderForm = () => {

        const { clinician } = this.props.store.usersStore;
		
		//Components and style for build form from antd
        const { Content } = Layout;
        const { Title } = Typography;

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
        if (clinician.firstName) {
            return (
				 <Content style={{ padding: '50px', margin: '25px' }}>
                <Title style={{ marginTop: '0.5px', textAlign: 'center' }}>Clinician Edit</Title>
                <Form
                    {...formItemLayout}
                    name="register"
                    onFinish={this.onFinish}
                    initialValues={{
                        residence: [' '],
                        prefix: '86',
						firstName: clinician.firstName,
						lastName: clinician.lastName,
						status: clinician.status
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="firstName"
                        label="First Name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label="Last Name"
						defaultValue={clinician.lastName}
                    >
                        <Input defaultValue={clinician.lastName}/>
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
						defaultValue={clinician.status}
                    >
                        <Input defaultValue={clinician.status}/>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
					
					<Link to="/">Go Back</Link>
                </Form>
            </Content>
            );
        }
    };

    onFinish = values => {
        const { usersStore } = this.props.store;
		console.log(values);
        usersStore.editClinician(values, usersStore.clinician._id);
    };

    render() {
		return <div>{this.renderForm()}</div>
    }
}

export default withStore(ClinicianEdit);