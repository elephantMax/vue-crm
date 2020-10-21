<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ formatCurrency(info.bill) }}</h4>
    </div>
    <Loader v-if="loading" />
    <h5 class="center" v-else-if="!categories.length">
      Категория пока нету
      <router-link to="/record">Создать категорию</router-link>
    </h5>
    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ formatCurrency(cat.spend) }} из {{ formatCurrency(cat.limit) }}
        </p>
        <div class="progress" v-tooltip="`${cat.tooltip}`">
          <div
            class="determinate"
            :class="cat.progressColor"
            :style="`width: ${cat.progress}%`"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import currencyFilter from "@/filters/currency.filter";
import { mapGetters } from "vuex";
export default {
  name: "Planning",
  data: () => ({
    loading: true,
    categories: [],
  }),
  computed: {
    ...mapGetters(["info"]),
  },
  methods: {
    formatCurrency(bill, currency = "RUB") {
      return currencyFilter(bill, currency);
    },
  },
  async mounted() {
    const records = await this.$store.dispatch("getRecords");
    const categories = await this.$store.dispatch("getCategories");

    this.categories = categories.map((cat) => {
      const spend = records
        .filter((rec) => rec.category === cat.id)
        .filter((rec) => rec.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);
      
      const percent = (100 * spend) / cat.limit;
      const progress = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? "Превышение на " : "Осталось "
      } ${currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...cat,
        progress,
        progressColor,
        spend,
        tooltip,
      };
    });

    this.loading = false;
  },
};
</script>