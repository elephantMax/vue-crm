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

    <div  v-tooltip="'Создать новую запись'" class="fixed-action-btn">
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
import messages from '@/utils/messages';

export default {
  name: "main-layout",
  components: {
    Navbar,
    SideBar,
  },
  computed:{
    error(){
      return this.$store.getters.error;
    }
  },
  watch:{
    error(fbError){
      this.$error(messages[fbError.code] || 'Что-то пошло не так');
    }
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