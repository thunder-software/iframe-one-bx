<template>
  <div class="overlay">
    <div class="popup">
      <h1>⛔ {{ t("title") }}</h1>
      <p>{{ t("message") }}</p>
      <!-- <router-link to="/" class="home-link">
        {{ t("home") }}
      </router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  layout: "guest",
  data() {
    return {
      translations: {
        th: {
          title: "ไม่สามารถเข้าถึงเว็บไซต์ได้",
          message: "ขออภัย เว็บไซต์นี้ ไม่ได้รับอนุญาตให้เข้าถึงจากพื้นที่ที่คุณใช้งานอยู่ในขณะนี้ หากคุณคิดว่าข้อความนี้แสดงขึ้นโดยผิดพลาด กรุณาติดต่อผู้ดูแลระบบหรือฝ่ายสนับสนุนลูกค้าเพื่อขอความช่วยเหลือเพิ่มเติม",
          home: "กลับหน้าหลัก",
        },
        en: {
          title: "Access Denied",
          message: "Sorry, this website is not accessible from your current location. If you believe this is a mistake, please contact the site administrator or customer support for further assistance.",
          home: "Back to Home",
        },
      },
    }
  },
  computed: {
    lang() {
      const lang = localStorage.getItem("auth.language")
      return lang === "th" ? "th" : "en"
    },
  },
  methods: {
    t(key) {
      return this.translations[this.lang][key] || key
    },
  },
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.popup {
  text-align: center;
  background: #fff;
  padding: 40px 60px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  border: 2px solid #f5c6cb;
  color: #721c24;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 16px;
}

p {
  font-size: 1.1rem;
  margin-bottom: 24px;
}

.home-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #c82333;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #a71d2a;
}
</style>