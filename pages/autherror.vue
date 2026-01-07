<template>
  <div>
    <!-- <video playsinline autoplay muted loop>
      <source src="/vdo/Premier-League.mp4" type="video/mp4" />
      <source src="/vdo/Premier-League.mp4" type="video" />
    </video>

    <header>
      <nav>
        <a></a>
        <a>
          <b-img
            src="/LSM99-V-2.png"
            style="width: 189px; display: inline-block; margin-left: 120px;"
          ></b-img>
        </a>
        <a style="float: right">
          <b-dropdown
            size="lg"
            variant="link"
            class="p-0"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template #button-content>
              <span class="menu-language">
                <b-img
                  :src="flagimg(checklang)"
                  class="inline-block"
                  style="width: 23px"
                />
                {{ UpperCase(checklang) }}
                <b-icon icon="caret-down-fill"></b-icon>
              </span>
            </template>
            <b-dropdown-item
              @click="ChangeLang(items)"
              v-for="items in lang"
              :key="items"
            >
              <div>
                <b-img
                  :src="flagimg(items)"
                  class="inline-block"
                  style="width: 23px"
                />
                {{ UpperCase(items) }}
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </a>
      </nav>
    </header>

    <div class="overlay">
      <b-container style="margin-top: 338px;">
        <div class="center-menu">
          <span
            class="text-white"
            style="font-size: 32px; vertical-align: middle"
            >ต้อนรับเปิดฤดูกาลใหม่</span
          >
          <b-img
            src="/icon/premier-league-logo.png"
            class="ml-3"
            style="width: 100px; display: inline-block"
          ></b-img>
          <div class="flex mt-3">
            <div class="flex-1 mr-3">
              <b-input size="sm" placeholder="ชื่อผู้ใช้"></b-input>
            </div>
            <div class="flex-1 mr-3">
              <b-input size="sm" placeholder="รหัสผ่าน"></b-input>
            </div>
            <div class="flex-1">
              <b-button size="sm" variant="danger" class="w-full"
                >เข้าสู่ระบบ</b-button
              >
            </div>
          </div>
        </div>
      </b-container>
    </div>
    <div class="mt-4">
      <b-img src="/banner/sport-login.png"></b-img>
    </div>
    <div>
      <b-container style="width: fit-content;">
        <h4 class="block font-bold my-8" style="color: rgba(63, 100, 172, 1);">LIVE SPORTS BETTING</h4>
        <small class="block text-secondary"><span class="font-bold">LSM99</span> เว็บไซต์แทงบอลออนไลน์ที่รวมกีฬาพนันบอลออนไลน์ครบ ฟุตบอล มวย บาสเก็ตบอล NBA เทนนิส สนุกเกอร์ มวยไทยออนไลน์ และกีฬาอื่นๆ</small>
        <small class="block text-secondary">ให้ลุ้นได้ทุกคู่ เว็บแทงบอลออนไลน์ แทงบอลชุด บอลสเต็ป ที่นิยมเป็นอย่างมากและที่ดีที่สุดในประเทศไทย ค่าคอมมิชชั่น สูง</small>
      </b-container>
    </div>

    <div class="my-8">
      <b-container style="width: fit-content; width: 994px;">
        <div class="flex">
          <div class="flex-1 mr-3">
            <div class="box-1" style="background: rgba(255, 204, 204, 1);">
              <b-img src="/icon/sport-nomey.png" class="m-auto" style="width: 130px;"></b-img>
              <small class="block text-secondary mt-2">
                มีให้เลือกเล่นได้หลายรูปแบบอาทิเช่น 
                ราคา แฮนดิแคป (HDP) ครึ่งแรก 
                และแบบเต็มเวลา ทายสกอร์สูงต่ำ (O/U) 
              </small>
            </div>
          </div>
          <div class="flex-1 mr-3">
            <div class="box-1" style="background: rgba(210, 226, 255, 1);">
              <b-img src="/icon/sport-live.png" class="m-auto" style="width: 130px;"></b-img>
              <small class="block text-secondary mt-2">
                เลือกวางเดิมพันได้ขณะบอลกำลังทำการแข่งขันอยู่ในขณะนั้น (Live)
              </small>
            </div>
          </div>
          <div class="flex-1 mr-3">
            <div class="box-1" style="background: rgba(210, 237, 186, 1);">
              <b-img src="/icon/nomey.png" class="m-auto" style="width: 130px;"></b-img>
              <small class="block text-secondary mt-2">
                ขั้นต่ำในการวางเดิมพันบอลเต็งหรือ
                บอลเดี่ยวนั้นเริ่มต้นที่ 10 บาท
              </small>
            </div>
          </div>
          <div class="flex-1">
            <div class="box-1" style="background: rgba(255, 210, 144, 1);">
              <b-img src="/icon/sale.png" class="m-auto" style="width: 130px;"></b-img>
              <small class="block text-secondary mt-2">
                มีส่วนลดสูงสุดให้ถึง 20% วางเดิมพัน
                ได้ตั้งแต่ 2 คู่ขึ้นไป
              </small>
            </div>
          </div>
        </div>
      </b-container>
    </div>
      <div class="bg-casino py-4">
        <div class="flex mt-4">
          <div class="flex-1">
            <div class="card-casino">
              <div class="text-center">
                <h4 class="mb-0" style="font-weight: 700; color: rgb(63, 100, 172);">CASINO</h4>
                <span class="" style="font-weight: 700; color: rgb(63, 100, 172);">ONLINE</span>
              </div>
              <small class="mt-2 block">LSM99 เว็บไซต์รวมเกมคาสิโนออนไลน์ มีคาสิโน Live ที่เปิดให้ผู้ที่ชื่นชอบการเสี่ยงดวงเสี่ยงโชค LSM99 มีหลากหลายเกมส์ อาทิเช่น บาคาร่า รูเล็ท ไฮโล เสือมังกร เป็นต้น คาสิโนออนไลน์ทั้งหมดใน LSM99 เป็นการถ่ายทอดสดจากบ่อน คาสิโนโดยตรง คาสิโนออนไลน์เริ่มต้นขั้นต่ำในการวางเดิมพัน 50 บาทขึ้นไป และยังมีคอมมิชชั่นให้ 0.30% อีกด้วย </small>
            </div>
          </div>
          <div class="flex-1">
             <b-img src="/banner/casino.png" style="width: 400px;"></b-img>
          </div>
        </div>
        <div class="flex mt-4">
          <div class="flex-1"></div>
          <div class="flex-1">
            <b-img src="/banner/text-casino.png" style="width: 400px;"></b-img>
          </div>
        </div>
      </div>

      <div class="my-8">
      <b-container style="width: fit-content; width: 994px;">
        <h4 class="block font-bold my-8 m-auto text-center" style="color: rgba(63, 100, 172, 1);">LOTTO ONLINE</h4>
            <small class="text-secondary block mt-3">LSM99 เว็บไซต์แทงหวยออนไลน์ หวย 2 ตัวบน หวย 2 ตัวล่าง หวย 3 ตัวบน หวย 3 ตัวล่าง หวย 2 ตัวบนวิ่ง หวย 3 ตัวล่างวิ่ง ล็อตเตอรี่ออนไลน์ ไม่มีอั้นเลข จ่ายสูงสุด ลดเยอะที่สุดในประเทศ อีกทั้งยังมี หวยหุ้น หวยลาว หมดปัญหาเรื่อง ถูกแล้วไม่จ่ายจากเจ้ามือ
    หวยออนไลน์ ของ lsm99 แทงขั้นต่ำเริ่มต้นเพียง 10 บาท และยังได้รับ ส่วนลดถึง 33 % ซึ่งมากกว่าท้องตลาดทั่วไปรวมถึงใต้ดิน เลขอั้นน้อย lsm99 เปิดรับแทงหวยล่วงหน้าก่อนหวยออกถึง 2 วัน และปิดรับก่อนหวยออกเวลา 15.00 คิดผลให้ทันทีหลังจากการออกสลากกินแบ่งรัฐบาลเสร็จสิ้นเรียบร้อย หวยออนไลน์ จึงเหมาะกับผู้ที่รับหวยหรือคนที่เล่นเองเป็นอย่างมาก หน้าเว็บถูกออกแบบมาให้เข้าใจง่าย และยังสามารถพิมพ์ใบรายการที่เราแทงออกมาได้อีกด้วย</small>
        </b-container>
      </div>
    

 





      <div class="footer">
        <b-img src="/LSM99-V-2.png" style="width: 178px; display: inline-block; margin-top: 18px;"></b-img>
        <small class="text-secondary block my-3">LSM99 @ 2023 All rights reserved.</small>
        <b-img src="/icon/social.png" style="width: 178px; display: inline-block; margin-top: 18px;"></b-img>
      </div> -->

      <b-container>
        <b-row>
          <b-col class="mx-auto mt-40" lg="4" md="6" sm="8">
            <h1 class="text-white">กรุณาเข้าสู่ระบบอีกครั้ง</h1>
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

  <script>
export default {
  layout: "guest",
  data() {
    return {
      form: {
        username: "LSM12_0t01",
        password: "123456",
      },
      error_partner: null,
      message: null,
      loading : false,
      checklang: "th",
      lang: ["th", "en" ,'my','vn','cn','cnsp','lao','khmer'],
    };
  },

  methods: {
    flagimg(item){
      return '/icon/'+item+'.png'
    },
    UpperCase(text) {
      if(text == 'th'){
        return 'TH'
      }else if(text == 'en'){
        return 'English'
      }else if(text == 'my'){
        return 'မြန်မာ'
      }else if(text == 'vn'){
        return 'Tiếng Việt'
      }else if(text == 'cn'){
        return '繁體中文'
      }else if(text == 'cnsp'){
        return '简体中文'
      }else if(text == 'lao'){
        return 'ລາວ'
      }else{
        return 'ប្រទេសកម្ពុជា'
      }
    },
  },
  created() {},
  watch: {
    errors(val) {
      if (val.message) {
        this.error_partner = [];
        this.error_partner = val.message;
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: "Lato", "Avenir Next", Arial, sans-serif;
  margin: 0;
  background: white;
  background-size: cover;
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 475px;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: center;
  object-position: center;
}

.overlay {
  min-height: 471px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.overlay {
  font-weight: 600;
  mix-blend-mode: hard-light;
  padding: 5px 15px;
  text-align: center;
  margin-top: 0rem;
}
header {
  position: fixed;
  width: 100%;
  text-align: center;
  color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  padding: 0.5em;
  margin-top: 0px;
}
nav a {
  color: inherit;
  padding: 0 12px;
  text-decoration: none;
}
</style>

<style scoped>
.center-menu {
  width: 55%;
  margin: auto;
}
.menu-language {
  font-size: 14px;
  display: block;
  color: white;
  padding: 6px 9px;

  border: 1px solid #e2e8f254;
  border-radius: 8px; 
}

.box-1 {
  padding: 14px;
  border-radius: 8px;
}

.bg-casino {
  background: url("https://gdkfiles.visitdenmark.com/files/484/227520_Royal-Casino-p-Hotel-Royal-i-Aarhus.jpg?width=987");
  background-size: cover;
  background-attachment: fixed;
}

.card-casino {
  width: 274px;
  float: right;
  margin-right: 4rem;
  background: white;
  padding: 18px;
  border-radius: 14px;
  margin-top: 24px;
}


.footer {
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: rgba(2, 56, 96, 1);
   color: white;
   text-align: center;
   height: 186px
}
</style>
