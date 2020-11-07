<template>
  <ul class="sidenav app-sidenav" :class="isOpen ? 'open' : ''">
    <li v-for="link in links" :key="link.url" >
      <router-link
        class="waves-effect waves-orange pointer"
        active-class="active"
        :to="link.url"
      >
        {{ $localizeFilter(link.title) }}
      </router-link>
    </li>
  </ul>
</template>

<script>
let localizeFilter;
export default {
  data: () => ({
    links: [
      { title: "Menu_Bill", url: "/", active: false },
      { title: "Menu_History", url: "/history", active: false },
      { title: "Planning", url: "/planning", active: false },
      { title: "NewRecord", url: "/record", active: false },
      { title: "Categories", url: "/categories", active: false },
    ],

  }),
  methods:{
    activeLink(id){
      this.links.forEach(link => {
          link.active = false;
      });
      this.links[id].active = true;
    }
  },
  props: ['isOpen'],
};
</script>