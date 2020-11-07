<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record"> 
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb"> {{record.type === 'income' ? 'Доход' : 'Расход' }} </a>
      </div>
      <div class="row"  :key="record.id">
        <div class="col s12 m6">
          <div class="card" :class="{green: record.type === 'income', red: record.type === 'outcome'}">
            <div class="card-content white-text">
              <p>Описание: {{record.description}}</p>
              <p>Сумма: {{ formatCurrency(record.amount) }}</p>
              <p>Категория: {{record.categoryTitle}}</p>
              <small>{{ formatDate(record.date) }}</small>
            </div>
          </div>
        </div>
      </div>
      <div style="color: red; sda"></div>
    </div>
    <h5 class="center" v-else>Запси с id {{$route.params.id }} не найдена</h5>
  </div>
</template>

<script>
import CurrencyFilter from '@/filters/currency.filter';
import DateFilter from '@/filters/date.filter';

export default {
  name: 'Detail',
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted(){
    const id = this.$route.params.id;
    const record = await this.$store.dispatch('getRecordById', id);
    const category = await this.$store.dispatch('getCategoryById', record.category);
    this.record = {
      ...record,
      categoryTitle: category.title
    }
    this.loading = false;
  },
  methods:{
    formatCurrency(val){
      return CurrencyFilter(val)
    },
    formatDate(val){
      return DateFilter( new Date(val));
    }
  },
}
</script>