import React, { Component } from 'react';
import { Empty, Button } from 'antd';

import withStore from '../helpers/withStore';
import history from '../../history';

class Landing extends Component {
	
	onGoToDashboard = () => {
		
		const { authStore } = this.props.store;
		console.log(authStore);
		if(!authStore.isLogged) {
			console.log('no logged');
			history.push('/signup');
		} else {
			console.log('logged');
			history.push('/')
		}
	}
	
	render() {
		
		return (
			<Empty
				style={{ marginTop: '20%'}}
				image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
				imageStyle={{
					height: 200
				}}
				description={
					<span>
						Start with medical clinic
					</span>
				}
			>
				<Button onClick={this.onGoToDashboard} type="primary">Go To Dashboard</Button>
			</Empty>
		)
	}
}

export default withStore(Landing);