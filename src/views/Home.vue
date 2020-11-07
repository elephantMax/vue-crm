<template>
  <div>
    <div class="page-title">
      <h3>{{$localizeFilter('Bill')}}</h3>

      <button @click="refresh" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill 
        :rates="currency.rates"
      />
      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
       />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';

export default {
  name: 'Home',
  data: () => ({
    loading: true,
    currency: null
  }),
  methods:{
    async refresh(){
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    }
  },
  async mounted(){
    let currency = await this.$store.dispatch('fetchCurrency');
    const rates = []
    rates['RUB'] = 1 
    for(let i in currency.rates){
      if(i === 'USD' || i === 'EUR'){
        rates[i] = currency.rates[i]
      }
    }
    this.currency = {
      ...currency,
      rates,
    }
    this.loading = false;
  },
  components:{HomeBill, HomeCurrency}
}
</script>