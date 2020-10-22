<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Loader v-if="loading" />
    <h5 class="center" v-else-if="!records.length">Здесь пока пусто <router-link to="/record">Добавить запись</router-link>.</h5>
    <section v-else>
      <HistoryTable :records="records"/>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import HistoryTable from "@/components/HistoryTable";
export default {
  name: "History",
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    const records = await this.$store.dispatch("getRecords");
    this.categories = await this.$store.dispatch("getCategories");
    this.records = records.map((record) => {
      return {
        ...record,
        categoryName: this.categories.find((cat) => cat.id === record.category)
          .title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "доход" : "расход",
      };
    });
    this.loading = false;
  },
  components: {
    HistoryTable,
  },
};
</script>