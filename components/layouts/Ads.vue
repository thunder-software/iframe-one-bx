<template>
    <div v-if="!isAdsHidden" class="ads-container">
      <!-- Loading State  class="loading-container"-->
      <div v-if="loading">
        <!-- <div class="loading-spinner"></div>
        <span>กำลังโหลดโฆษณา...</span> -->
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <span>ไม่สามารถโหลดโฆษณาได้</span>
        <button @click="fetchBanners" class="retry-btn">ลองใหม่</button>
      </div>
      
      <!-- Ads Content -->
      <div v-else-if="banners.length > 0" class="ads-content">
        <!-- Close Button -->
        <button @click="hideAds" class="close-ads-btn" title="ปิดโฆษณา">
          <span>&times;</span>
        </button>
        
        <div class="ad-frame left-frame" @click="handleAdClick(leftAd)">
          <img :src="leftAd.image" :alt="leftAd.alt" class="ad-image">
        </div>
        <div class="ad-frame right-frame" @click="handleAdClick(rightAd)">
          <img :src="rightAd.image" :alt="rightAd.alt" class="ad-image">
        </div>
        
        <!-- Navigation Dots -->
        <div class="slider-dots">
          <span 
            v-for="index in totalPairs" 
            :key="index - 1"
            :class="['dot', { active: currentPairIndex === (index - 1) }]"
            @click="goToPair(index - 1)"
          ></span>
        </div>
      </div>
    </div>
    
    <!-- Show Ads Button when ads are hidden -->
    <!-- <div v-else class="show-ads-container">
      <button @click="showAds" class="show-ads-btn" title="แสดงโฆษณา">
        <span>📢</span>
        <span class="show-ads-text">แสดงโฆษณา</span>
      </button>
    </div> -->
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex'
  
  export default {
    name: 'Ads',
    data() {
      return {
        currentIndex: 0,
        autoPlayInterval: null
      }
    },
    computed: {
      ...mapState('ads', ['isAdsHidden', 'banners', 'loading', 'error']),
      leftAd() {
        return this.banners[this.currentIndex] || {};
      },
      rightAd() {
        return this.banners[(this.currentIndex + 1) % this.banners.length] || {};
      },
      totalPairs() {
        return Math.ceil(this.banners.length / 2);
      },
      currentPairIndex() {
        return Math.floor(this.currentIndex / 2);
      }
    },
    async mounted() {
      // โหลดสถานะจาก localStorage
      this.initAdsState();
      // โหลดข้อมูล banner เฉพาะเมื่อยังไม่มีข้อมูล (ครั้งแรก)
      if (this.banners.length === 0) {
        await this.fetchBanners();
      }
    },
    watch: {
      banners: {
        handler(newBanners) {
          if (newBanners.length > 0) {
            this.startAutoPlay();
          }
        },
        immediate: true
      }
    },
    created() {
      if (this.$route.name.includes("favorite")) {
        this.hideAds();
      }
    },
    beforeDestroy() {
      this.stopAutoPlay();
    },
    methods: {
      ...mapActions('ads', ['hideAds', 'showAds', 'initAdsState', 'fetchBanners']),
      
      handleAdClick(ad) {
        if (ad && ad.url) {
          window.open(ad.url, '_blank');
        }
      },
      goToPair(pairIndex) {
        this.currentIndex = pairIndex * 2;
      },
      nextAds() {
        if (this.banners.length > 0) {
          this.currentIndex = (this.currentIndex + 2) % this.banners.length;
        }
      },
      startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing interval
        if (this.banners.length > 2) { // Only autoplay if we have more than 2 ads
          this.autoPlayInterval = setInterval(() => {
            this.nextAds();
          }, 5000); // เปลี่ยนรูปทุก 5 วินาที
        }
      },
      stopAutoPlay() {
        if (this.autoPlayInterval) {
          clearInterval(this.autoPlayInterval);
          this.autoPlayInterval = null;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .ads-container {
    width: 1095px;
    height: 118px;
    margin: 0;
    margin-top: 40px;
    margin-bottom: 0;
    padding-left: 9px;
    padding-right: 9px;
    display: flex;
    gap: 10px;
    overflow: hidden;
    position: fixed;
    z-index: 9;
  }
  
  .ads-content {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 10px;
    position: relative;
  }
  
  /* Loading State */
  .loading-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    color: white;
    font-size: 14px;
  }
  
  .loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 8px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Error State */
  .error-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    border-radius: 8px;
    color: white;
    font-size: 14px;
  }
  
  .retry-btn {
    margin-top: 8px;
    padding: 4px 12px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.3s ease;
  }
  
  .retry-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  .ad-frame {
    flex: 1;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .ad-frame:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .left-frame {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .right-frame {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  
  .ad-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
    pointer-events: none;
  }
  
  .ad-frame:hover .ad-image {
    transform: scale(1.05);
  }
  
  /* Navigation Dots */
  .slider-dots {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
  }
  
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .dot.active {
    background-color: rgb(51, 0, 255);
  }
  
  .dot:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  
  /* Close Button */
  .close-ads-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
  }
  
  .close-ads-btn:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  /* Responsive */

  @media (max-width: 1400px) {
    .ads-container {
      width: 1008px;
    }
  }

  @media (max-width: 850px) {
    .ads-container {
      position: relative !important;
      margin-top: 3px !important;
    }
  }

  @media (max-width: 768px) {
    .ads-container {
      height: 93px;
      gap: 8px;
    }
    
    .slider-dots {
      bottom: 8px;
      gap: 6px;
    }
    
    .dot {
      width: 8px;
      height: 8px;
    }
    
    .close-ads-btn {
      width: 20px;
      height: 20px;
      font-size: 16px;
      top: 6px;
      right: 6px;
    }
    
    .loading-container,
    .error-container {
      font-size: 12px;
    }
    
    .loading-spinner {
      width: 16px;
      height: 16px;
    }
  }
  
  @media (max-width: 480px) {
    .ads-container {
      height: 78px;
      gap: 6px;
      padding-left: 6px;
      padding-right: 6px;
    }
    
    .slider-dots {
      bottom: 6px;
      gap: 5px;
    }
    
    .dot {
      width: 6px;
      height: 6px;
    }
    
    .close-ads-btn {
      width: 18px;
      height: 18px;
      font-size: 14px;
      top: 4px;
      right: 4px;
    }
    
    .loading-container,
    .error-container {
      font-size: 11px;
    }
    
    .loading-spinner {
      width: 14px;
      height: 14px;
    }
    
    .retry-btn {
      padding: 3px 10px;
      font-size: 11px;
    }
  }
  </style>