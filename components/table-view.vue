<template>
  <table>
    <thead>
      <tr>
        <th>
          <FormField ref="name" :name="'name'" :placeholder="'Название'" />
        </th>
        <th>
          <FormField
            ref="content"
            :name="'content'"
            :placeholder="'Описание'"
          />
        </th>
        <th>
          <FormField
            ref="cityOfDeparture"
            :name="'cityOfDeparture'"
            :placeholder="'Город отправления'"
          />
        </th>
        <th>
          <FormField
            ref="dateOfDeparture"
            :name="'dateOfDeparture'"
            :placeholder="'Дата отправления'"
          />
        </th>
        <th>
          <FormField
            ref="cityOfArrival"
            :name="'cityOfArrival'"
            :placeholder="'Город назначения'"
          />
        </th>
        <th>
          <FormField
            ref="dateOfArrival"
            :name="'dateOfArrival'"
            :placeholder="'Дата прибытия'"
          />
        </th>
        <th>
          <FormButton title="искать" @click="$emit('search')" />
        </th>
        <th>
          <FormButton title="добавить" @click="addSelectGood(good)" />
        </th>
      </tr>
      <tr style="position: relative">
        <th :class="bindingClass('name')" @click="log('name')">Название</th>
        <th :class="bindingClass('content')" @click="log('content')">
          Описание
        </th>
        <th
          :class="bindingClass('cityOfDeparture')"
          @click="log('cityOfDeparture')"
        >
          Город отправления
        </th>
        <th
          :class="bindingClass('dateOfDeparture')"
          @click="log('dateOfDeparture')"
        >
          Дата отправления
        </th>
        <th
          :class="bindingClass('cityOfArrival')"
          @click="log('cityOfArrival')"
        >
          Город назначения
        </th>
        <th
          :class="bindingClass('dateOfArrival')"
          @click="log('dateOfArrival')"
        >
          Дата прибытия
        </th>
        <th>Детально</th>
        <th v-if="role != 'ROLE_USER'">Удалить</th>
      </tr>
    </thead>
    <tbody id="list">
      <tr v-for="row of goodsToPresent" :key="row.id">
        <td>{{ row.name }}</td>
        <td>{{ row.content }}</td>
        <td>{{ row.cityOfDeparture?.name }}</td>
        <td>{{ row.dateOfDeparture }}</td>
        <td>{{ row.cityOfArrival?.name }}</td>
        <td>{{ row.dateOfArrival }}</td>
        <td>
          <a @click.prevent="setSelectedGood(row.id)">Подробнее</a>
        </td>
        <td v-if="role != 'ROLE_USER'">
          <FormButton title="удалить" @click.prevent="deleteGood(row.id)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Mutation, Action, Getter } from 'vuex-class'
import { City, Good } from '../interfaces/interface'

interface IComponentWithComputedValue {
  computedValue?: Record<string, string>
}

@Component({
  name: 'TableView',
})
export default class Table extends Vue {
  @Mutation('goods/setSelectedGood') setSelectedGood!: (id: number) => void
  @Mutation('goods/addSelectGood') addSelectGood!: (
    good: Omit<Good, 'id'>
  ) => void

  @Action('goods/deleteGood') readonly deleteGood!: (
    id: number
  ) => Promise<void>

  @Getter('goods/getGoods') readonly goods!: Good[] | null
  @Getter('goods/getCities') readonly cities!: City[]
  @Getter('goods/getRole') readonly role!: string

  sortField: Record<string, string> = {}

  log(fieldName: string) {
    if (fieldName in this.sortField) {
      this.sortField = {
        [fieldName]: this.sortField[fieldName] === 'asc' ? 'desc' : 'asc',
      }
    } else {
      this.sortField = { [fieldName]: 'asc' }
    }
  }

  bindingClass(field: string) {
    return {
      asc: this.sortField[field] === 'asc',
      desc: this.sortField[field] === 'desc',
    }
  }

  good: Omit<Good, 'id'> = {
    name: '',
    content: '',
    cityOfDeparture: this.cities as unknown as City,
    dateOfDeparture: '',
    cityOfArrival: 1 as unknown as City,
    dateOfArrival: '',
  }

  get searchFields() {
    let result: Record<string, string> = {}
    const keys = Object.keys(this.$refs)
    for (const key of keys) {
      try {
        if (key === 'observer') continue
        const refComponent = this.$refs[key] as IComponentWithComputedValue
        if (refComponent && refComponent.computedValue) {
          result = { ...result, ...refComponent.computedValue }
        }
      } catch (error) {}
    }
    return result
  }

  get goodsToPresent() {
    const keys = Object.keys(this.sortField)
    let first: string
    // eslint-disable-next-line no-unreachable-loop
    for (const key of keys) {
      first = key
      break
    }
    if (this.goods)
      return [...this.goods]?.sort((a, b) => {
        if (a[first] === undefined || b[first] === undefined) return 0
        if (first === 'cityOfDeparture' || first === 'cityOfArrival') {
          if (a[first].name < b[first].name)
            return this.sortField[first] === 'asc' ? -1 : 1
          if (a[first].name > b[first].name)
            return this.sortField[first] === 'asc' ? 1 : -1
        } else {
          if (a[first] < b[first])
            return this.sortField[first] === 'asc' ? -1 : 1
          if (a[first] > b[first])
            return this.sortField[first] === 'asc' ? 1 : -1
        }
        return 0
      })
    return []
  }
}
</script>
<style lang="scss">
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  cursor: pointer;
}

th.asc::after,
th.desc::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

th.asc::after {
  content: '▲';
  margin-left: 5px;
}

th.desc::after {
  content: '▼';
  margin-left: 5px;
}

tbody tr {
  background-color: #f9f9f9;
}

a {
  text-decoration: none;
  color: #337ab7;
  cursor: pointer;
}
</style>
