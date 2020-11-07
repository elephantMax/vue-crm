<template>
  <div>
    <div class="page-title">
      <h3>{{$localizeFilter('ProfileTitle')}}</h3>
    </div>

    <Form class="form" v-slot="{ errors }" @submit="updateUserInfo">
      <div class="input-field">
        <Field as="input"  id="description" name="name" :rules="nameRules" type="text" v-model="name" />
        <label for="description">{{$localizeFilter('Name')}}</label>
        <span class="helper-text invalid">{{errors.name}}</span>
      </div>
      <div class="switch">
        <label>
          English
          <input  type="checkbox" v-model="isRuLocale" />
          <span  class="lever"></span>
          Русский
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ $localizeFilter('Update') }}
        <i class="material-icons right">send</i>
      </button>
    </Form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { requiredRule, StringValue } from '@/validateRules/rules'

export default {
  name: 'Profile',
  data: () =>({
    name: '',
    isRuLocale: true
  }),
  computed:{
    ...mapGetters(['info'])
  },
  methods:{
    nameRules(value){
      if(!requiredRule(value)) return this.$localizeFilter('Message_EnterName');
      
      if(!StringValue(value)) return this.$localizeFilter('Message_ThisFieldIsString');

      return true;
    },
    async updateUserInfo(){
      try {
        const updateData = {
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        }
        await this.$store.dispatch('updateInfo', updateData);
        this.$message('Вы успешно обновили данные');
      } catch (error) {}
      
    }
  },
  mounted(){
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => M.updateTextFields());
  }

};
</script>

<style  scoped>
.switch{
  margin-bottom: 2rem;
}
</style>