<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>
        <p v-for="cur of currencies" :key="cur" class="currency-line">
          
          <span>{{formatCurrency(getCurrency(cur))}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CurrencyFilter from '@/filters/currency.filter.js';

export default {
  name: 'Home Bill',
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  }),
  props: ['rates'],
  computed:{
    base(){
      return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
    },
  },
  methods:{
    getCurrency(currency){
      return Math.floor(this.base * this.rates[currency]);
    },
    formatCurrency(currency){
      return CurrencyFilter(currency);
    },
   
  },
}
</script>