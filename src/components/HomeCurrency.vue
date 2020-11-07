<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{$localizeFilter('ExchangeRates')}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{$localizeFilter('Currency')}}</th>
              <th>{{$localizeFilter('Course')}}</th>
              <th>{{$localizeFilter('Date')}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur]}}</td>
              <td>{{formatDate(date)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import DateFilter from '@/filters/date.filter.js';
export default {
  name: 'Home currency',
  props: ['rates', 'date'],
  data: () =>({
    currencies: ['RUB', 'USD', 'EUR']
  }),
  methods:{
    formatDate(date){
      return DateFilter(new Date(date), 'date');
    }
  }
}
</script>