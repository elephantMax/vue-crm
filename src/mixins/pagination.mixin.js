import _ from 'lodash'

export default {
  data: () =>({
    currentPage: 1,
    pageSize: 5,
    pageCount: 0,
    allItems: [],
    items: []
  }),
  methods:{
    setupPagination(allItems){
      this.allItems = _.chunk(allItems, this.pageSize);
      this.pageCount = _.size(this.allItems);
      this.items = this.allItems[this.currentPage - 1] || 0; 
    },
    changePageHandler(to){
      if(to > 0 && to <= this.pageCount){
        this.$router.push(`${this.$route.path}?page=${to}`);
        const page = +to;
        this.items = this.allItems[page - 1] || 0;
        this.currentPage = +page; 
      }
    }
  },
  mounted(){
    this.currentPage = +this.$route.query.page || 1;
  }
}