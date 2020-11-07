<template>
  <div>
    <div class="page-title">
      <h3>{{$localizeFilter('History')}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="loading" />
    <h5 class="center" v-else-if="!records.length">
      {{$localizeFilter('EmptyHere')}} <router-link to="/record">{{$localizeFilter('AddRecord')}}</router-link>.
    </h5>
    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        :countPages="pageCount"
        @change-page="changePageHandler"
        :currentPage="currentPage"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import PaginationMixin from "@/mixins/pagination.mixin.js";
import { Pie } from "vue-chartjs";

export default {
  name: "History",
  extends: Pie,
  data: () => ({
    loading: true,
    records: [],
  }),
  mixins: [PaginationMixin],
  async mounted() {
    this.records = await this.$store.dispatch("getRecords");
    const categories = await this.$store.dispatch("getCategories");

    this.setup(categories);
    this.loading = false;
  },
  components: {
    HistoryTable,
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find((cat) => cat.id === record.category)
              .title,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ?  this.$localizeFilter('Income') : this.$localizeFilter('Outcome'),
          };
        })
      );

      this.renderChart({
        labels: categories.map(c=> c.title),
        datasets: [
          {
            label: "Расходы по категориям",
            data: categories.map(c=>{
              return this.records.reduce((total, r)=>{
                if(r.category === c.id && r.type === 'outcome'){
                  total += +r.amount;
                }
                return total;
              }, 0)
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 5,
          },
        ],
      });
    },
  },
};
</script>