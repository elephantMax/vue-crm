<template>
   <ul class="pagination" v-if="countPages">
    <li class="waves-effect" ><a @click.prevent="$emit('change-page', currentPage - 1)"><i class="material-icons">chevron_left</i></a></li>
    <li v-for="page in countPages" :key="page" class="waves-effect" :class="{active: page === currentPage}"><a @click.prevent="$emit('change-page', page)">{{page}}</a></li>
    <li class="waves-effect"><a @click.prevent="$emit('change-page', currentPage + 1)"><i class="material-icons">chevron_right</i></a></li>
  </ul>
</template>

<script>
export default {
  name: 'Pagimate',
  props: {
    countPages:{
      type: Number,
      required: true
    },
    currentPage:{
      type: Number,
      required: true
    }
  }
}
</script>