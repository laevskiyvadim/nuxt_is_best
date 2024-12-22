<template>
  <Nuxt />
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class DefaultLayout extends Vue {}
</script>
<style lang="scss">
body {
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  width: 350px;

  a {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 42px;
  }
}

#__nuxt {
  min-width: 100%;
  display: flex;
  justify-content: center;
}

#__layout {
  justify-content: center;
  display: flex;
  width: 100%;
}
</style>
