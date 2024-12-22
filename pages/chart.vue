<template>
  <div class="main-page">
    <HeaderMenu />
    <div class="btns">
      <FormButton
        title="Дата отправления"
        @click="currentGroupField = 'dateOfDeparture'"
      />
      <FormButton
        title="Дата прибытия"
        @click="currentGroupField = 'dateOfArrival'"
      />
    </div>
    <client-only>
      <BarChart :data="chartData" />
    </client-only>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Action, Getter } from 'vuex-class'
import { AxiosResponse } from 'axios'
import { Good } from '~/interfaces/interface'

@Component
export default class ChartPage extends Vue {
  @Action('goods/fetchGoods') readonly fetchGoods!: () => AxiosResponse<Good[]>
  @Getter('goods/getGoods') readonly goods?: Good[]

  groupByFields = ['dateOfArrival', 'dateOfDeparture']

  currentGroupField = 'dateOfArrival'

  get labels() {
    if (this.goods)
      return this.goods?.reduce((acc: string[], el) => {
        if (!acc.includes(el[this.currentGroupField])) {
          acc.push(el[this.currentGroupField])
        }
        return acc
      }, [])
    return []
  }

  get dd() {
    if (this.goods)
      return this.goods?.reduce((acc: Array<number>, el): number[] => {
        const idx = this.labels.indexOf(el[this.currentGroupField])
        ++acc[idx]
        return acc
      }, new Array(this.labels.length).fill(0))
    return []
  }

  get chartData() {
    return {
      labels: this.labels,
      datasets: [
        {
          label: `Группировка по дате ${
            this.currentGroupField === 'dateOfArrival' ? 'отправки' : 'прибытия'
          }`,
          data: this.dd,
          backgroundColor: 'rgba(20, 255, 0, 0.3)',
          borderColor: 'rgba(100, 255, 0, 1)',
          borderWidth: 4,
        },
      ],
    }
  }

  async created() {
    try {
      await this.fetchGoods()
    } catch (error) {
      this.$router.push('/login')
    }
  }
}
</script>
<style>
canvas {
  width: 100%;
}

.btns {
  display: flex;
  margin: 10px;
  gap: 10px;
}
</style>
