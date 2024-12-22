<template>
  <div v-if="type != 'hidden'" class="form-field">
    <label :for="name" class="form-field-label">{{ title }}</label>
    <input
      :id="name"
      v-model="currentValue"
      :type="type"
      class="form-field-input"
      :placeholder="placeholder"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class FormFieldClass extends Vue {
  @Prop({ default: '' }) readonly title!: string
  @Prop({ default: 'text' }) readonly type?: string
  @Prop({ required: true }) readonly name!: string
  @Prop({ default: '' }) readonly placeholder?: string
  @Prop({ default: '' }) readonly value?: string

  currentValue: string = ''

  get computedValue(): Record<string, string> {
    return { [this.name]: this.currentValue }
  }

  created(): void {
    this.currentValue = this.value || ''
  }
}
</script>
<style lang="scss">
.form-field {
  &-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #555;
  }

  &-input {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
  }
}
</style>
