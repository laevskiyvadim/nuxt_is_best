import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import axios, { AxiosResponse } from 'axios'
import { AuthState, User, UserAndRoles } from '../../interfaces/interface'
import { store } from '..'

@Module({
  namespaced: true,
  name: 'auth',
  stateFactory: true,
  store,
})
export default class Auth extends VuexModule implements AuthState {
  usersAndRoles: UserAndRoles = {}

  @Mutation
  setUsers(usersAndRoles: UserAndRoles): void {
    this.usersAndRoles = usersAndRoles
  }

  @Action
  async logout(): Promise<void> {
    await axios.post('/api/auth/logout')
  }

  @Action
  async sendFormLogin(loginData: {
    login: string
    password: string
  }): Promise<void> {
    await axios.post('/api/auth/login', loginData)
  }

  @Action
  async sendFormRegistration(loginData: {
    login: string
    password: string
  }): Promise<void> {
    await axios.post('/api/auth/reg', loginData)
  }

  @Action
  async fetchUsersAndRoles() {
    const response: AxiosResponse<User[]> = await axios.get('/api/users')
    this.context.commit('setUsers', response.data)
  }

  @Action
  async changeRole(userAndRole: { login: string; role: string }) {
    await axios.post('/api/users', userAndRole)
    this.context.dispatch('fetchUsersAndRoles')
  }

  get getUsersAndRoles() {
    return this.usersAndRoles
  }
}
