<template>
  <Form class="card auth-card" v-slot="{ errors }"  @submit="login">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <Field name="email" v-model.trim="email" as="input" :rules="emailValidation"  placeholder="Email"/>
        <span class="helper-text invalid" name="email">{{ errors.email }}</span>
      </div>
      <div class="input-field">
        <Field  name="password" v-model.trim="password" placeholder="Пароль" :rules="passwordValidation" />
        <span class="helper-text invalid" name="password">{{ errors.password }}</span>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>
      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </Form>
</template>

<script>
import * as rules from '../validateRules/rules'
import Messages from '@/utils/messages';
export default {
  name: "login",
  data: () => ({
    email: null,
    password: null,
  }),
  components: {
  },
  methods: {
    emailValidation(){
      return rules['emailValidation'](this.email);
    },
    passwordValidation(){
      return rules['passwordValidation'](this.password);
    },
    async login() {
      const formData = {
        email: this.email,
        password: this.password
      }
      try{
        await this.$store.dispatch('login', formData); //1ый аргумент - название action 2ой - объект с полями и значениями
        this.$router.push('/');
      }
      catch (e){}
    },
  },
  mounted(){
    if(Messages[this.$route.query.message]){
      this.$message(Messages[this.$route.query.message]);
    }  
  }
};
</script>