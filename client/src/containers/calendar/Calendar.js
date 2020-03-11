import React, {Component} from 'react';
//import FullCalendar from '@fullcalendar/react';
//import dayGridPlugin from '@fullcalendar/daygrid'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

import '../../App.css'

class Calendar extends Component {
	render () {
		return (
		
			<ScheduleComponent>
        	<Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
    		</ScheduleComponent>
		
		)	
	};
}
//ReactDOM.render(<Calendar />, document.getElementById('schedule'));
export default Calendar;

