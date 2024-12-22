<template>
  <div>
    <label :for="name">{{ title }}</label>
    <select :id="name" v-model="currentValue">
      <option v-for="v of values" :key="v.name" :value="v.id">
        {{ v.name }}
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

type Keys = 'id' | 'name'

@Component
export default class SelectField extends Vue {
  @Prop({ default: '' }) readonly name!: string
  @Prop({ default: '' }) readonly title!: string
  @Prop({ default: '' }) readonly value!: Record<Keys, any>
  @Prop({ default: () => [] }) readonly values!: Array<Record<Keys, any>>

  currentValue: number = 0

  get computedValue(): Record<string, number> {
    return { [this.name]: this.currentValue }
  }

  created() {
    this.currentValue = this.value.id
  }
}
</script>
<style lang="scss">
select {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}
</style>
