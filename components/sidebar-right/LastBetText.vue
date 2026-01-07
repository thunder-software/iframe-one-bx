<template>
  <div style=" font-size: 12px">
      <div class="text-over" :class="choice_class" :title="choice_bet">
        {{ choice_bet }}
      </div>
  </div>
</template>
<script>

export default {
  props: ['choice'],
  data() {
    return {
      choice_class: 'red',
      choice_text: '',
      
    };
  },
  computed: {
    choice_bet(){
      if(! this.choice) return '';

      let lang = this.$auth.$storage.getUniversal("language");
      let tor_rong = ( (this.choice.in_who == "1" && this.choice.option=='h') || (this.choice.in_who == "2" && this.choice.option=='a')) ? 'T' : 'R';
      let tor_text = lang == 'th' ? 'ต.' : 'T';
      let rong_text = lang == 'th' ? 'ร.' : 'R';
      let home_team = lang == 'th' ? this.choice.home_th : this.choice.home_en;
      let away_team = lang == 'th' ? this.choice.away_th : this.choice.away_en;
      let choice_team = '';

      switch(this.choice.market_type) {
        case '1x2':
          choice_team = this.choice.option=='a' ? away_team : home_team ;
          let text_1x2 = this.choice.option=='a' ? '2.' : this.choice.option=='h' ? '1.' : 'x.';

          this.choice_class = 'green';
          return text_1x2+' '+choice_team;
        break;
        case 'OverUnder':
          choice_team = home_team;
          tor_text = lang == 'th' ? 'ส.' : 'O.';
          rong_text = lang == 'th' ? 'ต.' : 'U.';

          this.choice_class = ( tor_rong == 'T') ? 'red' : 'yellow';
          return (( tor_rong == 'T') ? tor_text : rong_text)+' '+choice_team;
        break;
        case 'OE':
          choice_team = home_team;
          let even_text = lang == 'th' ? 'คู่.' : 'E.';
          let odd_text = lang == 'th' ? 'คี่.' : 'O.';

          this.choice_class = 'blue';
          return (( this.choice.option=='a') ? even_text : odd_text)+' '+choice_team;
        break;
        default:
          choice_team = this.choice.option=='h' ? home_team : away_team;

          this.choice_class = ( tor_rong == 'T') ? 'red' : 'yellow';
          return (( tor_rong == 'T') ? tor_text : rong_text)+' '+choice_team;
      }
      // console.log(this.choice.market_type+' '+this.choice_text);
    }
  }
};
</script>

<style scoped>

.text-over {
  white-space: nowrap; 
  width: 70px; 
  overflow: hidden;
  text-overflow: ellipsis; 
}
  .red{
    color: #ff0f11;
  }

  .yellow {
    color: #ffc107;
  }
  .green {
    color: greenyellow;
  }

  .blue {
    color: aqua;
  }
</style>