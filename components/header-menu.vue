<template>
  <header>
    <!-- <a href="" @click=""></a> -->
    <!-- <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
    <nuxt-link :to="switchLocalePath('ru')">Russian</nuxt-link> -->
    <div>
      <nuxt-link to="/">{{ $t('main') }}</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/chart">{{ $t('histogram') }}</nuxt-link>
    </div>
    <div v-if="role != 'ROLE_USER'">
      <nuxt-link to="/admin">Админ панель</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/about">Об авторе</nuxt-link>
    </div>
    <a @click.prevent="sendLogout">Выход</a>
  </header>
</template>

<i18n>
  {
    "en": {
      "main": "Main",
      "histogram": "Histogram",
      "hello": "hello world!"
    },
    "ru": {
      "main": "Главная",
      "histogram": "График",
      "hello": "qq"
    }
  }
</i18n>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component
export default class Header extends Vue {
  @Action('auth/logout') readonly logout!: () => Promise<void>
  @Getter('goods/getRole') readonly role!: string

  async sendLogout() {
    const { logout, $router } = this
    await logout()
    $router.push('/login')
  }
}
</script>
<style lang="scss">
header {
  background-color: #333;
  color: white;
  padding: 1rem 0;
  display: flex;
  justify-content: center;

  a {
    text-decoration: none;
    color: white;
    margin: 0 1rem;
    font-size: 1.1rem;
    transition: color 0.3s ease;

    &:hover {
      color: #eee;
    }
  }
}
</style>
