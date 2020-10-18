<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <Form @submit="updateCategory" v-slot="{ errors }">
        <div class="input-field">
          <Field
            as="select"
            name="category"
            :rules="categoriesRules"
            id="selectCategory"
            v-model="category"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >{{ category.title }}</option>
          </Field>
          <span class="helper-text invalid">{{ errors.category }}</span>
          <!-- <label>Выберите категорию</label> -->
        </div>
        <div class="input-field">
          <Field
            as="input"
            type="text"
            name="title"
            :rules="titleRules"
            id="name"
            v-model="title"
            :class="{invalid: errors.title, valid: !errors.title}"
          />
          <label for="name">Название</label>
          <span class="helper-text invalid">{{ errors.title }}</span>
        </div>

        <div class="input-field">
          <Field
            as="input"
            name="limit"
            id="limit"
            :rules="limitRules"
            type="number"
            v-model="limit"
            :class="{invalid: errors.limit, valid: !errors.limit}"
          />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid">{{ errors.limit }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </Form>
    </div>
  </div>
</template>

<script>
import { requiredRule, minValueValidation, NumberValue } from '@/validateRules/rules'
export default {
  name: "Category Update",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    select: null,
    category: null,
    title: null,
    limit: null
  }),
  mounted() {
    this.select = M.FormSelect.init(document.querySelector("#selectCategory"));
    M.updateTextFields();
  },
  watch:{
    category(catId){
      const { title, limit } = this.categories.find(category => category.id === catId);
      this.title = title;
      this.limit = limit;
    }
  },
  created(){
    const {id, title, limit} = this.categories[0];
    this.category = id;
    this.title = title;
    this.limit = limit;
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async updateCategory() {
      const formData = {
        title: this.title,
        id: this.category,
        limit: this.limit
      }
      try {
        await this.$store.dispatch('updateCategory', formData);
        this.$message('Вы успешно обновили категорию');
        this.$emit('updated', formData);
      } catch (error) {}
      
    },
    categoriesRules() {
       return requiredRule(this.category);
    },
    limitRules() {
      if (!NumberValue(this.limit)) return "Данное поле должно быть числом";
      else {
        const minVal = 100;
        if (!minValueValidation(this.limit, minVal))
          return `Данное поле должно быть больше чем ${minVal}`;
      }
      return true;
    },
    titleRules() {
      return requiredRule(this.title);
    },
  },
};
</script>