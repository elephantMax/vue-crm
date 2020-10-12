<template>
  <div class="app-main-layout">
    
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
import Navbar from '@/components/app/Navbar';
import SideBar from '@/components/app/SideBar';

export default {
  name: 'main-layout',
  components:{
    Navbar, SideBar
  },
  data: () => ({
    isOpen: true
  })
}
</script>