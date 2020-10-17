<template>
  <Loader v-if="loading" />
  <div v-else class="app-main-layout">
    <Navbar @nav-click="isOpen = !isOpen" />

    <SideBar :isOpen="isOpen" />

    <main class="app-content" :class="!isOpen ? 'full' : ''">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import SideBar from "@/components/app/SideBar";
import Loader from "@/components/app/Loader";

export default {
  name: "main-layout",
  components: {
    Navbar,
    SideBar,
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }

    this.loading = false;
  },
  data: () => ({
    isOpen: true,
    loading: true,
  }),
};
</script>