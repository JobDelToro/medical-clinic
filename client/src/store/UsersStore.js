import { decorate, observable, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

import medicalClinicApi from '../apis/medicalClinicApi';
import history from '../history';

class UsersStore {

    // Observables
    sessionStatus;
	clinician = {};
	clinicians = [];

    //Actions
    fetchClinicians = async () => {
        const sessionPromise = medicalClinicApi.get('/users/clinicians');
        this.sessionStatus = fromPromise(sessionPromise);
        const res = await sessionPromise;
        this.setClinicians(res.data)
    };

	fetchClinician = async (id) => {
		const sessionPromise = medicalClinicApi.get(`/users/clinicians/${id}`);
		this.sessionStatus = fromPromise(sessionPromise);
		const res = await sessionPromise;
		this.setClinician(res.data);
	}
	
	editClinician = async (params, id) => {
		const sessionPromise = medicalClinicApi.put(`/users/clinicians/${id}`, params)
		this.sessionStatus = fromPromise(sessionPromise);
		const res = await sessionPromise;
		alert(`updated clinician ${res.data.firstName}`);
		history.push('/');
	}
	
	setClinician = clinician => {
		this.clinician = clinician
	}

	setClinicians = clinicians => {
		this.clinicians = clinicians;
	}
}

decorate(UsersStore, {
    sessionStatus: observable,
	clinician: observable,
	clinicians: observable,
	fetchClinicians: action,
	fetchClinician: action,
	editClinician: action,
	setClinician: action,
	setClinicians: action
});

export default UsersStore;