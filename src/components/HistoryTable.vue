<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{$localizeFilter('Amount')}}</th>
        <th>{{$localizeFilter('Date')}}</th>
        <th>{{$localizeFilter('Category')}}</th>
        <th>{{$localizeFilter('Type')}}</th>
        <th>{{$localizeFilter('Open')}}</th>
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
          <button class="btn-small btn" v-tooltip="$localizeFilter('viewRecord')" @click="$router.push(`/detail/${record.id}`)">
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