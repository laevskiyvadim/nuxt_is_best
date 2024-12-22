<template>
  <form v-if="currentGood" @click.prevent>
    <template v-for="(k, v) of currentGood">
      <template v-if="v == 'cityOfDeparture' || v == 'cityOfArrival'">
        <SelectField
          :ref="v"
          :key="v"
          :name="v"
          :value="k"
          :values="cities"
          :title="titleNames[v]"
        />
      </template>
      <FormField
        v-else-if="typeof k !== 'object'"
        :ref="v"
        :key="v"
        :name="v"
        :placeholder="titleNames[v]"
        :value="k"
        :title="titleNames[v]"
        :type="v === 'user' || v === 'id' ? 'hidden' : 'text'"
      />
    </template>
    <FormButton :title="customTitleToSendButton" @click.prevent="sendForm" />
    <FormButton title="закрыть" @click.prevent="removeSelectedGood" />
  </form>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Mutation, Getter, Action } from 'vuex-class'
import { City, Good } from '../interfaces/interface'

@Component({
  name: 'ModalWindow',
})
export default class ModalWindow extends Vue {
  @Mutation('goods/removeSelectedGood') readonly removeSelectedGood!: Function
  @Action('goods/updateGood') readonly updateGood!: Function
  @Getter('goods/currentGood') readonly currentGood?: Partial<Good>
  @Getter('goods/getCities') readonly cities!: City[]

  titleNames: Record<string, string> = {
    name: 'Название',
    content: 'Описание',
    cityOfDeparture: 'Город отправления',
    dateOfDeparture: 'Дата отправления',
    cityOfArrival: 'Город прибытия',
    dateOfArrival: 'Дата прибытия',
    undefined: '',
  }

  private get customTitleToSendButton() {
    if (this.currentGood) {
      return this.currentGood?.id ? 'Редактировать' : 'Добавить'
    }
  }

  dd: Record<any, any> = {}

  private form(): Record<string, string> {
    let result: Record<string, string> = {}
    const keys = Object.keys(this.$refs)
    for (const key of keys) {
      try {
        if (key === 'observer') continue
        // @ts-ignore
        result = { ...result, ...this.$refs[key][0].computedValue }
      } catch (error) {}
    }

    return result
  }

  async sendForm(): Promise<void> {
    await this.updateGood({ ...this.form(), ...this.dd })
    this.removeSelectedGood()
  }
}
</script>
<style lang="scss" scoped>
form {
  position: absolute;
  min-width: 40%;
  min-height: 40%;
  background: lightgray;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
}
</style>
