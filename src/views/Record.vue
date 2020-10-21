<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading" />
    <h5 class="center" v-else-if="!categories.length">
      Категорий пока нету
      <router-link to="/categories">Добавить категорию</router-link>
    </h5>
    <Form @submit="addRecord" v-slot="{ errors }" v-else class="form">
      <div class="input-field">
        <select ref="selectRecord" v-model="currentCategory">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            v-model="type"
            name="type"
            type="radio"
            value="income"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            v-model="type"
            name="type"
            type="radio"
            value="outcome"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <Field
          as="input"
          :rules="minValue"
          id="amount"
          v-model.number="amount"
          name="amount"
          type="number"
          :class="{ invalid: errors.amount, valid: !errors.amount }"
        />
        <label for="amount">Сумма</label>
        <span class="helper-text invalid">{{ errors.amount }}</span>
      </div>

      <div class="input-field">
        <Field
          id="description"
          as="input"
          :rules="require"
          v-model="description"
          name="description"
          type="text"
          :class="{ invalid: errors.description, valid: !errors.description }"
        />
        <label for="description">Описание</label>
        <span class="helper-text invalid">{{ errors.description }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </Form>
  </div>
</template>

<script>
import Loader from "@/components/app/Loader";
import { requiredRule, minValueValidation } from "@/validateRules/rules";
import { mapGetters } from "vuex";

export default {
  name: "Record",
  data: () => ({
    loading: true,
    select: null,
    currentCategory: null,
    categories: null,
    amount: 1,
    description: null,
    type: "outcome",
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("getCategories");
    this.loading = false;
    if (this.categories.length) {
      this.currentCategory = this.categories[0].id;
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.selectRecord);
      M.updateTextFields();
    }, 0);
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  computed: {
    ...mapGetters(["info"]), // добавляет в computed свойства объект info
    canAddRecord() {
      if (this.type === "income") return true;
      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async addRecord() {
      if (this.canAddRecord) {
        try {
           await this.$store.dispatch("addRecord", {
            category: this.currentCategory,
            type: this.type,
            amount: +this.amount,
            description: this.description,
            date: new Date().toJSON()
          });
          let bill = this.type === 'income' 
            ? +this.info.bill + +this.amount // if
            : +this.info.bill - +this.amount // else
          bill = +bill;
          await this.$store.dispatch('updateInfo', {bill});

          this.$message('Вы успешно создали запись');
        } catch (error) {}
       
      } 
      else this.$message(`Недостаточно средств на счете (${this.amount - this.info.bill})`);
    },
    require(value) {
      if (!requiredRule(value)) {
        return "Данное поле обязательно";
      }
      return true;
    },
    minValue(value) {
      if (!minValueValidation(value, 1)) {
        return "Мимиальное значение 1";
      }
      return true;
    },
  },
};
</script>