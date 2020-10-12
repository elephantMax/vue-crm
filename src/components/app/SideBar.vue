<template>
  <ul class="sidenav app-sidenav" :class="isOpen ? 'open' : ''">
    <li v-for="link in links" :key="link.url" >
      <router-link
        class="waves-effect waves-orange pointer"
        active-class="active"
        :to="link.url"
      >
        {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({
    links: [
      { title: "Счет", url: "/", active: false },
      { title: "История", url: "/history", active: false },
      { title: "Планирование", url: "/planning", active: false },
      { title: "Новая запись", url: "/record", active: false },
      { title: "Категории", url: "/categories", active: false },
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