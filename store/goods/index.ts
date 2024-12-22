import {
  VuexModule,
  Mutation,
  Action,
  Module,
  config,
} from 'vuex-module-decorators'
import axios, { AxiosResponse } from 'axios'
import { Good, GoodAndCities, GoodsState } from '../../interfaces/interface'
import { store } from '..'
config.rawError = true

@Module({
  namespaced: true,
  name: 'goods',
  stateFactory: true,
  store,
})
export default class Goods extends VuexModule implements GoodsState {
  data: GoodAndCities = null as unknown as GoodAndCities
  selectedGood: Partial<Good> = null as unknown as Partial<Good>

  @Mutation
  setData(data: GoodAndCities): void {
    this.data = data
  }

  @Mutation
  removeSelectedGood(): void {
    this.selectedGood = null as unknown as Good
  }

  @Mutation
  addSelectGood(good: Good | Omit<Good, 'id'>): void {
    this.selectedGood = good
  }

  @Mutation
  setSelectedGood(id: number): void {
    this.selectedGood =
      this.data.goods?.find((good) => good.id === id) ||
      (null as unknown as Good)
  }

  @Action
  async fetchGoods(serachFields?: Record<string, string>): Promise<void> {
    let response: AxiosResponse<Good[]>
    if (serachFields) {
      const params = new URLSearchParams(serachFields)
      response = await axios.get('/api/goods?' + params)
    } else {
      response = await axios.get('/api/goods')
    }
    this.context.commit('setData', response.data)
  }

  @Action
  async updateGood(good: Good | Partial<Good>): Promise<void> {
    try {
      const response: AxiosResponse<string> = good?.id
        ? await axios.post('/api/goods/edit', good)
        : await axios.post('/api/goods/create', good)

      if (response.status.toString().startsWith('20')) {
        this.context.commit('removeSelectedGood')
        this.context.dispatch('fetchGoods')
      }
    } catch {}
  }

  @Action
  async deleteGood(id: number): Promise<void> {
    try {
      const response: AxiosResponse<string> = await axios.post(
        '/api/goods/delete/' + id
      )
      if (response.status === 202) {
        this.context.dispatch('fetchGoods')
      }
    } catch (error) {}
  }

  get getCities() {
    if (this.data?.cities) {
      return this.data.cities
    }
    return []
  }

  get getRole() {
    return this.data?.role ? this.data.role : ''
  }

  get getGoods() {
    const { data } = this
    return data?.goods ? data.goods : []
  }

  get currentGood() {
    return this.selectedGood
  }
}
