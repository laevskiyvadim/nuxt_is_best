<template>
  <div class="main-page">
    <HeaderMenu />
    <div>
      <table>
        <thead>
          <tr>
            <th>Пользователь</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user of mapedUsers" :key="user.login">
            <td>{{ user.login }}</td>
            <td>
              <SelectField
                :ref="user.login"
                :value="user.role"
                :values="user.roles"
              />
            </td>
            <td>
              <FormButton
                title="Редактировать"
                @click.prevent="sendForm(user.login)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Role, User, UserAndRoles } from '~/interfaces/interface'

interface IComponentWithCurrentValue {
  currentValue: string
}

interface IAdminPage {
  readonly roles: Role[] | undefined
  users: User[] | undefined
  usersAndRoles: UserAndRoles
  fetchUsersAndRoles(): () => any
}

@Component
export default class AdminPage extends Vue implements IAdminPage {
  @Action('auth/fetchUsersAndRoles') readonly fetchUsersAndRoles!: () => any
  @Getter('auth/getUsersAndRoles') readonly usersAndRoles!: UserAndRoles
  @Action('auth/changeRole') readonly changeRole!: Function

  get roles() {
    return this.usersAndRoles?.roles
  }

  get users() {
    return this.usersAndRoles?.users
  }

  get mapedUsers() {
    const { users } = this
    return users
      ? users.map(({ login, role }) => ({
          login,
          role,
          roles: this.roles,
        }))
      : []
  }

  sendForm(login: string) {
    const comp = this.$refs[login]
    let first = null as unknown as IComponentWithCurrentValue

    if (Array.isArray(comp)) {
      for (const c of comp as unknown as IComponentWithCurrentValue[]) {
        if (!first) first = c
      }
    }
    this.changeRole({ login, role: first ? first.currentValue : '' })
  }

  async created() {
    try {
      await this.fetchUsersAndRoles()
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
.main-page {
  width: 100%;
}
</style>
