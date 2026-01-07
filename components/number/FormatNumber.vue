<template>
    <span :class="checkNum(value)" :style="thb == 'thb' ? 'white-space: nowrap;' : ''">
       <!-- {{ thb == 'thb' ? '฿' : '' }} -->
        {{ formatPrice(value,decimal) }}
    </span>
</template>
<script>
export default {
    props: ['value','decimal','active','thb'],
    watch: {
        value(newValue, oldValue){
            this.$emit('change',{newValue,oldValue})
        }
    },
    methods: {
        numberWithCommas(x,dcm) {
            var parts = x.toString().split(".");
            var decimal = Math.round(parts.join(".") * 100) / 100;
            var num = decimal.toString().split(".");
            num[0] = num[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var New_num = num.join(".");
            return New_num;
        },
        formatPrice(value, decimal) {
            var valuedec7 =  parseFloat(value).toFixed(7) === -0.0000000 ? 0.0000000 : parseFloat(value).toFixed(7);
            var num =  parseFloat(valuedec7).toFixed(decimal);
            var dcm = num.toString().split(".");
            dcm[0] = dcm[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var numm = dcm.join(".");
            if (parseFloat(numm) === 0) {
                return "";
            }
            return numm;
        },

        checkNum(value){
            if(this.active){
                return parseFloat(value).toFixed(7) < 0 ? "color-active" : "" 
            }else{
                return parseFloat(value).toFixed(7) < 0 ? "color-red" : "color-active" 
            }
        },
        
    }
}
</script>
<style scoped>
    p{
        margin: 0 0 0px;
    }
    .color-active {
        color: white;
    }
    .color-red {
        color: #ff0f11; 
    }
    .color-green {
        color: rgb(10, 219, 62);
    }
    
</style>

