<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="( record, index) in records" :key="record.id">
        <td>{{index + 1}}</td>
        <td>{{ formatCurrency(record.amount)}}</td>
        <td>{{ formatDate(record.date)}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span class="white-text badge" :class="record.typeClass">{{record.typeText}}</span>
        </td>
        <td>
          <button class="btn-small btn" v-tooltip="'Посмотреть запись'" @click="$router.push(`/detail/${record.id}`)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import DateFilter from '@/filters/date.filter'
import CurrencyFilter from '@/filters/currency.filter'
export default {
  name: 'History Table',
  props: {
    records:{
      required: true,
      type: Array
    }
  },
  methods:{
    formatDate(date){
      return DateFilter(new Date(date), 'date');
    },
    formatCurrency(value){
      return CurrencyFilter(value);
    }
  }
}
</script>