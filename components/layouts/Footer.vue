<template>
  <div>
    <div style="position: relative; z-index: 9; padding: 0px 70px;">
      <b-row>
        <b-col cols="7">
          <b-col cols="12"
            ><span class="text-white">{{ trans('content.payment_processing') }}</span></b-col
          >
          <b-col cols="12" class="pt-3 pl-4">
            <b-row>
              <div class="imgbank-sy" v-for="(item, i) in image" :key="i">
                <b-img
                  :src="item.icon"
                  style="width: 45px; border-radius: 10px"
                ></b-img>
              </div>
              <div class="ml-3"   >
                <b-row>
                  <span class="img-sy text-white">18+</span>
                  <span class="span-sy">Responsible Gambling</span>
                </b-row>

              </div>

            </b-row>
          </b-col>
        </b-col>

        <b-col cols="5" class="right-sy">
          <b-col cols="12"
            ><span class="text-white">Follow 2goalbet</span>
          </b-col>
          <b-col cols="12" class="pt-3">
            <div class="icon-sy">
              <b-img src="/icon/icon-ig.png" style="width: 30px"></b-img>
            </div>
            <div class="icon-sy">
              <b-img src="/icon/icon-fb.png" style="width: 30px"></b-img>
            </div>
          </b-col>
          <b-col cols="12" class="pt-4">
            <span class="text-white">Copyright © 2019 | 2goalbet</span>
          </b-col>
          <b-col cols="12">
            <span class="text-white"
              >Version {{ versions }} </span
            >
          </b-col>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { version } from '../../package'
export default {
  data() {
    return {
      openmodal: "",
      relode: false,
      data_user: [],
      versions : version,
      credit: null,
      tab: "sell",
       image: [
        { icon: "/icon/kb.png"},
        { icon: "/icon/scb.png"},
        { icon: "/icon/bk.jpg"},
        { icon: "/icon/krungthai.jpg"},
        { icon: "/icon/ks.png"},
        { icon: "/icon/line.png"},
        { icon: "/icon/True-money.jpg"}
      ],
    };
  },
};
</script>

<style scoped>
.right-sy {
  flex-basis: 0px;
  -webkit-box-flex: 1;
  flex-grow: 1;
  max-width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  text-align: right;
  position: relative;
  z-index: 9;
}
.icon-sy {
  display: inline-flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background: rgb(255, 204, 18);
  color: rgb(51, 51, 51);
  margin-left: 15px;
}
.imgbank-sy {
  margin-right: 20px;
  width: 45px;
  height: 45px;
}
.img-sy{
    display: inline-flex;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    min-width: 48px;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    border: 5px solid rgb(255, 204, 18);
    margin-right: 15px;
    font-style: normal;
}
.span-sy{
  flex-grow: 1;
  color: aliceblue;
  margin-top: 15px;

}
</style>
