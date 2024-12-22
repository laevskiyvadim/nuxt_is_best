<template>
  <form @click.prevent>
    <FormField :ref="'login'" :title="'login'" :name="'login'" />
    <FormField
      :ref="'password'"
      :title="'password'"
      type="password"
      :name="'password'"
    />
    <FormButton :title="'Зарегистрироваться'" @click.prevent="sendForm" />
    <nuxt-link to="/login">Авторизация</nuxt-link>
  </form>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Action } from 'vuex-class'

@Component({ name: 'Registration' })
export default class RegisterPage extends Vue {
  @Action('auth/sendFormRegistration') readonly sendFormRegistration!: Function

  head() {
    return { title: 'Registration' }
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
      await this.sendFormRegistration(this.form())
      this.$router.push('/login')
    } catch (error) {
      this.$router.push('/reg')
    }
  }
}
</script>
<style lang="scss"></style>
