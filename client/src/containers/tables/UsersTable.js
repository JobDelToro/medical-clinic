import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import { Table, Tag, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import withStore from '../helpers/withStore';

class UsersTable extends Component {
	
	componentDidMount() {
		
		const { usersStore } = this.props.store;
		usersStore.fetchClinicians();
	}
	
	onChangeStatus = data => {
		console.log(data);
	}
	
	createData = () => {
		
		const { usersStore } = this.props.store;
		const data = usersStore.clinicians.map((clinician) => {
			return { key: clinician._id, firstName: clinician.firstName, lastName: clinician.lastName, status: clinician.status }
		});
		return data;
	}
	
	  state = {
		searchText: '',
		searchedColumn: '',
	  };

	  getColumnSearchProps = dataIndex => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
		  <div style={{ padding: 8 }}>
			<Input
			  ref={node => {
				this.searchInput = node;
			  }}
			  placeholder={`Search ${dataIndex}`}
			  value={selectedKeys[0]}
			  onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
			  onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
			  style={{ width: 188, marginBottom: 8, display: 'block' }}
			/>
			<Button
			  type="primary"
			  onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
			  icon={<SearchOutlined />}
			  size="small"
			  style={{ width: 90, marginRight: 8 }}
			>
			  Search
			</Button>
			<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
			  Reset
			</Button>
		  </div>
		),
		filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		onFilter: (value, record) =>
		  record[dataIndex]
			.toString()
			.toLowerCase()
			.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: visible => {
		  if (visible) {
			setTimeout(() => this.searchInput.select());
		  }
		}
	  });

	  handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.setState({
		  searchText: selectedKeys[0],
		  searchedColumn: dataIndex,
		});
	  };

	  handleReset = clearFilters => {
		clearFilters();
		this.setState({ searchText: '' });
	  };
	
	render() {
		
		const columns = [
		  {
			title: 'First Name',
			dataIndex: 'firstName',
			key: 'fistName',
			...this.getColumnSearchProps('firstName')
		  },
		  {
			title: 'Last Name',
			dataIndex: 'lastName',
			key: 'lastName',
			...this.getColumnSearchProps('lastName')
		  },
		  {
			title: 'Tags',
			key: 'tags',
			dataIndex: 'tags',
			render: () =>(
			  <span>
				<Tag color='geekblue'>
					Clinician
				</Tag>
			  </span>
			)
		  },
		  {
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			...this.getColumnSearchProps('status')
		  },
		  {
			title: 'Action',
			key: 'action',
			render: (text, record) => (
			  <span>
				<Link to={`/clinician/edit/${record.key}`}>Edit</Link>
			  </span>
			),
		  },
		];
		
		return(
			<Table columns={columns} dataSource={this.createData()} />
		)
	}

}

export default withStore(UsersTable);