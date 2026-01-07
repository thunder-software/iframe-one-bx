import Vue from 'vue'
import MyFormatPrice from '../components/number/FormatNumber.vue'

Vue.component('my-format-price',MyFormatPrice);

export default () => {
  Vue.filter('currency', function (value, currency) {      
      let currencyText = ! currency ? '' : currency;
     if (!value) return '0'
     return `${parseFloat(value).toLocaleString()} ${currencyText}`
  });

  Vue.filter('leadingzero', function (value, padNumber){
    let padNum = ! padNumber ? 2 : padNumber;
      return value.toString().padStart(padNum, '0');
  });

  // Vue.use(MyFormatPrice);

}