import AuthStore from './AuthStore';
import UsersStore from './UsersStore';

class Store {
  constructor() {

    this.usersStore = new UsersStore(this);
    this.authStore = new AuthStore(this);
  }
}

export default Store;