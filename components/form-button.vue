<template>
  <input type="submit" :value="title" v-on="$listeners" />
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class FormButton extends Vue {
  @Prop({ default: '' }) readonly title!: string
}
</script>
<style lang="scss" scoped>
input {
  width: 100%;
  background-color: #28a745;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}
</style>
