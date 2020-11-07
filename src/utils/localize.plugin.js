import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const locales ={
  'ru-RU': ru,
  'en-US': en
}


export default {
  install(Vue, options){
      Vue.config.globalProperties.$localizeFilter = function(key){
        const locale = store.getters.info.locale || 'ru-RU';
        return locales[locale][key] || `[Localize error]: key ${key} not found`;
      }
  }
}