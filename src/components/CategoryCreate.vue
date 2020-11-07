<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $localizeFilter("Create") }}</h4>
      </div>

      <Form @submit="createCategory" v-slot="{ errors }">
        <div class="input-field">
          <Field
            id="name"
            name="title"
            as="input"
            :class="{ invalid: errors.title, valid: !errors.title }"
            :rules="titleRules"
            v-model="title"
            type="text"
          />
          <label for="name">{{ $localizeFilter("Name") }}</label>
          <span class="helper-text invalid">{{ errors.title }}</span>
        </div>

        <div class="input-field">
          <Field
            id="limit"
            name="limit"
            :class="{ invalid: errors.limit, valid: !errors.limit }"
            v-model.number="limit"
            :rules="minValueRules"
            as="input"
            type="number"
          />
          <label for="limit">{{ $localizeFilter("Limit") }}</label>
          <span class="helper-text invalid">{{ errors.limit }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ $localizeFilter("Create") }}
          <i class="material-icons right">send</i>
        </button>
      </Form>
    </div>
  </div>
</template>
<script>
import {
  requiredRule,
  minValueValidation,
  NumberValue,
} from "@/validateRules/rules";
export default {
  name: "Category Create",
  data: () => ({
    title: "",
    limit: 100,
  }),
  methods: {
    titleRules() {
      if(!requiredRule(this.title)) return this.$localizeFilter("FieldIsRequired")
      return true
    },
    minValueRules() {
      if (!NumberValue(this.limit)) return this.$localizeFilter("FieldNumber");
      else {
        const minVal = 100;
        if (!minValueValidation(this.limit, minVal))
          return this.$localizeFilter('FieldMoreThen') + minVal;
      }
      return true;
    },
    async createCategory() {
      const formData = {
        title: this.title,
        limit: this.limit,
      };
      try {
        const category = await this.$store.dispatch("createCategory", formData);
        this.limit = this.title = null;
        this.$message(this.$localizeFilter('SuccessCreatedCategory'));
        this.$emit("created", category);
      } catch (error) {}
    },
  },
  mounted() {
    M.updateTextFields();
  },
};
</script>