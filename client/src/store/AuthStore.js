import { decorate, observable, computed, action } from 'mobx';
import { fromPromise } from 'mobx-utils';

import medicalClinicApi from '../apis/medicalClinicApi';
import history from '../history';

class AuthStore {
    // constructor(store) {
    //     extendObservable(this, {
    //         token: ''
    //     });
    // }

    // Observables
    user;
	userType;
	token;
    sessionStatus;
    isClinicianOrPatient = '0';

    // Computed
    get isLoggedIn() {
        return Boolean(this.token);
    }

    // Actions
    signUp = async params => {
		
        if (this.isClinicianOrPatient === '0') {
            const sessionPromise = medicalClinicApi.post('/auth/register/patient', params).catch(error => {
				
				if(error) {
					
					alert(error.response.data.message);
					history.push('/signup');
				}
            });
			
			const res = await sessionPromise;
			if(res) {
				this.sessionStatus = fromPromise(sessionPromise);
				this.setToken(res.data.token);
				this.setUser(res.data.user);
				this.setUserType(res.data.userType);
				history.push('/');
			}
			
        } else if (this.isClinicianOrPatient === '1') {
            const sessionPromise = medicalClinicApi.post('/auth/register/clinician', params).catch(error => {
				
				if(error) {
					
					alert(error.response.data.message);
					history.push('/signup');
				}
            });
			
			const res = await sessionPromise;
			if(res) {
				
				this.sessionStatus = fromPromise(sessionPromise);
				this.setToken(res.data.token);
				this.setUser(res.data.user);
				this.setUserType(res.data.userType);
				history.push('/');
			}
        }
    };

    login = async params => {
        const sessionPromise = medicalClinicApi.post('/auth/login', params).catch(error => {

			if(error) {

				alert(error.response.data.message);
				history.push('/signin');
			}
        });
		
		const res = await sessionPromise;
		if(res) {
			this.sessionStatus = fromPromise(sessionPromise);
			this.handleAuth(res.data);
			history.push('/');
		}
    };

    handleAuth = data => {
        this.setToken(data.token);
		this.setUser(data.user);
		this.setUserType(data.userType);
    };

    setToken = token => {
        this.token = token;
    };

    setUser = user => {
        this.user = user;
    };

	setUserType = userType => {
		this.userType = userType;
	}

    reset = () => {
        this.setToken(null);
        this.sessionStatus = null;
    };
}

//decorate
decorate(AuthStore, {
	user: observable,
	userType: observable,
    sessionStatus: observable,
	token: observable,
    isClinicianOrPatient: observable,
    isLoggedIn: computed,
    signUp: action,
    login: action,
    handleAuth: action,
    setToken: action,
    setUser: action,
	setUserType: action,
    reset: action
});

export default AuthStore;