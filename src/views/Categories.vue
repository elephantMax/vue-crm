<template>
  <div>
    <div class="page-title">
      <h3>{{$localizeFilter('Categories')}}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoryCreate @created="appendCategory" />

        <CategoryUpdate v-if="categories.length" :key="categories.length + updateCount" @updated="updateCategories" :categories="categories" /> 
        <!-- При изменении key перерисовывается компонент -->
        <h5 v-else class="center">{{$localizeFilter('EmptyHere')}}</h5>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryUpdate from "@/components/CategoryUpdate";
import Loader from "@/components/app/Loader";
export default {
  name: "Categories",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  methods: {
    appendCategory(category) {
      this.categories.push(category);
    },
    updateCategories(data) {
      const { id, title, limit } = data;
      const index = this.categories.findIndex((cat) => cat.id === id);
      this.categories[index].title = title;
      this.categories[index].limit = limit;
      this.updateCount++;
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch("getCategories");
    this.loading = false;
  },
  components: { CategoryCreate, CategoryUpdate, Loader },
};
</script>