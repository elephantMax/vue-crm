<template>
  <Form class="card auth-card" v-slot="{ errors }" @submit="register">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <Field name="email" type="email" v-model="email" as="input" placeholder="Email" :rules="emailValidation" /> 
        <span class="helper-text invalid"> {{errors.email}} </span>
      </div>
      <div class="input-field">
        <Field  as="input" type="password" name="password" v-model="password" :rules="passwordValidation" placeholder="Пароль" />
        <small class="helper-text invalid">{{errors.password}}</small>
      </div>
      <div class="input-field">
        <Field name="name" type="text" :rules="nameValidation" v-model="name" placeholder="Имя" />
        <small class="helper-text invalid">{{ errors.name }}</small>
      </div>
      <p>
        <label>
          <Field name="accept" as="input" v-model="accept" :rules="checkBoxValidation" type="checkbox"/>
          <span>С правилами согласен</span>
          <span class="helper-text invalid">{{ errors.accept }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </Form>
</template>
<script>
import {emailValidation, passwordValidation, nameValidation, checkBoxValidation} from '../validateRules/rules'

export default {
  name: "register",
  data: () => ({
    email: null,
    password: null,
    name: null,
    accept: null
  }),
  components: {
  },
  methods: {
    emailValidation(){
      return emailValidation(this.email);
    },
    passwordValidation(){
      return passwordValidation(this.password);
    },
    nameValidation(){
      return nameValidation(this.name);
    },
    checkBoxValidation(){
      return checkBoxValidation(this.accept);
    },
    async register() {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      try{
        await this.$store.dispatch('register', formData);
        this.$router.push("/");
      }
      catch (e) {}
      
    },
  },
  mounted(){
   
    this.$message('test');
  }
};
</script>