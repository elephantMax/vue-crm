<template>
  <form class="card auth-card" @submit.prevent="login">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && $v.email.required.$invalid) ||
              ($v.email.$dirty && $v.email.email.$invalid),
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.required.$invalid && $v.email.$dirty"
          >Введите Email</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && $v.email.email.$invalid"
          >Введите корректный Email</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && $v.password.required.$invalid) ||
              ($v.password.$dirty && $v.password.minLength.$invalid),
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && $v.password.required.$invalid"
          >Введите пароль</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && $v.password.minLength.$invalid"
          >Длина пароля {{ $v.password.minLength.$params.length }} символов.
          Сейчас {{ password.length }}</small
        >
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
  </form>
</template>

<script>

import { required, email, minLength } from "@vuelidate/validators"
export default {
  name: "login",
  data: () => ({
    email: null,
    password: null,
  }),
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },
  methods: {
    login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.$router.push("/");
    }
  }
};
</script>