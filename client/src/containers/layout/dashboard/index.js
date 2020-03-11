import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, HeartFilled, LogoutOutlined } from '@ant-design/icons';

import withStore from '../../helpers/withStore';
import Calendar from '../../calendar/Calendar';
import UsersTable from '../../tables/UsersTable';
import Landing from '../../landing/Landing';

class Dashboard extends Component {
	
    //Check if user is logged for delete sign's menu
    renderMenu = () => {
		
        const { authStore } = this.props.store;

        if (!authStore.isLoggedIn) {
            return (
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1">
                        <HeartFilled />
                        <Link to="/" className="nav-text">
                            Start
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <UserOutlined />
                        <Link to="/signin" className="nav-text">
                            Sign in
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <UserOutlined />
                        <Link to="/signup" className="nav-text">
                            Sign up
                        </Link>
                    </Menu.Item>
                </Menu>
            );
			
        } else {
			
			return (
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1">
                        <HeartFilled />
                            Welcome {authStore.user.email}
                    </Menu.Item>
                    <Menu.Item key="2">
                        <LogoutOutlined />
                        <Link to="/logout" className="nav-text">
                            Logout
                        </Link>
                    </Menu.Item>
                </Menu>
            );
		}
    }
	
	//Check if user is logged and which user it is for render rigth content
	renderContent = () => {
		
		const { authStore } = this.props.store;

        if (!authStore.isLoggedIn) {
			return <Landing />
		} else {
			
			if(authStore.userType === 'clinician') {
				
				return <Calendar />
			} else if(authStore.userType === 'patient') {
				
				return <Calendar />
			} else if(authStore.userType === 'superadmin') {
				
				return <UsersTable />
			}
		}
	}

    render() {
        const { Header, Content, Footer, Sider } = Layout;

        return (
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0
                    }}
                >
                    <div className="logo" />
                    {this.renderMenu()}
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '24px 16px 50%', overflow: 'initial' }}>
                        <div
                            className="site-layout-ackground"
                            style={{ padding: 24, textAlign: 'center' }}
                        >
                            {this.renderContent()}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Medical Clinic for lifestyle
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default withStore(Dashboard);