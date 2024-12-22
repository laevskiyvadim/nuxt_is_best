<template>
  <div class="main-page">
    <HeaderMenu />
    <TableView ref="table" @search="sendSearchForm" />
    <template v-if="currentGood">
      <ModalWindow />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { Action, Getter, Mutation } from 'vuex-class'
import { AxiosResponse } from 'axios'
import { Good } from '../interfaces/interface'

interface IComponentWithSearchFields {
  searchFields: Record<string, string>
}

@Component({
  name: 'Index',
})
export default class IndexPage extends Vue {
  @Action('goods/fetchGoods') readonly fetchGoods!: (
    searchFields?: Record<string, any>
  ) => AxiosResponse<Good[]>

  @Mutation('goods/setGoods') readonly setGoods!: (goods: Good[]) => void
  @Getter('goods/getGoods') readonly goods!: Good[] | null
  @Getter('goods/currentGood') currentGood!: Good | null

  @Watch('currentGood')
  watchOfModalWindow() {
    document.querySelector('body')
  }

  async sendSearchForm() {
    const table = this.$refs.table as unknown as IComponentWithSearchFields
    const { searchFields } = table
    if (searchFields) {
      await this.fetchGoods(searchFields)
    }
  }

  async created() {
    try {
      await this.fetchGoods()
    } catch (error) {
      this.$router.push('/login')
    }
  }

  layout() {
    return 'default'
  }
}
</script>
<style></style>
