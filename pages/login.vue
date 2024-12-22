<template>
  <form @click.prevent>
    <FormField :ref="'login'" :title="'login'" :name="'login'" />
    <FormField
      :ref="'password'"
      :title="'password'"
      type="password"
      :name="'password'"
    />
    <FormButton :title="'Войти'" @click.prevent="sendForm" />
    <nuxt-link to="/reg">Регистрация</nuxt-link>
  </form>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Action } from 'vuex-class'

@Component({ name: 'Login' })
export default class LoginPage extends Vue {
  @Action('auth/sendFormLogin') readonly sendFormLogin!: Function

  head() {
    return { title: 'Login' }
  }

  private form(): Record<string, string> {
    let result: Record<string, string> = {}
    const keys = Object.keys(this.$refs)
    for (const key of keys) {
      try {
        if (key === 'observer') continue
        // @ts-ignore
        result = { ...result, ...this.$refs[key].computedValue }
      } catch (error) {}
    }

    return result
  }

  async sendForm(): Promise<void> {
    try {
      await this.sendFormLogin(this.form())
      this.$router.push('/')
    } catch (error) {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss"></style>
