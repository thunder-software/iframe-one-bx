export const state = () => ({
  isAdsHidden: false,
  banners: [],
  loading: false,
  error: false
})

export const mutations = {
  SET_ADS_HIDDEN(state, value) {
    state.isAdsHidden = value
  },
  SET_BANNERS(state, banners) {
    state.banners = banners
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

// Helper function to check if banner is active based on day and time
const isBannerActive = (banner) => {
  // ถ้าไม่มีข้อมูลวันที่และเวลา ให้แสดง
  if (!banner.days || !banner.startTime || !banner.endTime) {
    return true
  }

  // ตรวจสอบสถานะ
  if (banner.status === false) {
    return false
  }

  const now = new Date()
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'short' })
  const currentTime = now.toTimeString().slice(0, 8) // HH:MM:SS format


  // ตรวจสอบวัน
  const isDayMatch = banner.days.includes(currentDay)
  if (!isDayMatch) {
    return false
  }

  // ตรวจสอบเวลา
  const isTimeInRange = currentTime >= banner.startTime && currentTime <= banner.endTime
  return isTimeInRange
}

export const actions = {
  hideAds({ commit }) {
    commit('SET_ADS_HIDDEN', true)
    // เก็บใน localStorage
    if (process.client) {
      localStorage.setItem('adsHidden', 'true')
    }
  },
  showAds({ commit }) {
    commit('SET_ADS_HIDDEN', false)
    // ลบออกจาก localStorage
    if (process.client) {
      localStorage.removeItem('adsHidden')
    }
  },
  toggleAds({ commit, state }) {
    const newValue = !state.isAdsHidden
    commit('SET_ADS_HIDDEN', newValue)
    // อัปเดต localStorage
    if (process.client) {
      if (newValue) {
        localStorage.setItem('adsHidden', 'true')
      } else {
        localStorage.removeItem('adsHidden')
      }
    }
  },
  // โหลดสถานะจาก localStorage เมื่อเริ่มต้น
  initAdsState({ commit, dispatch }) {
    if (process.client) {
      // อ่านค่าจาก localStorage
      let isHidden = localStorage.getItem('adsHidden')
      
      // ถ้าไม่มีค่าใน localStorage ให้แสดงโฆษณา (ไม่เก็บค่าเริ่มต้น)
      if (isHidden === null) {
        commit('SET_ADS_HIDDEN', false) // แสดงโฆษณา
      } else {
        commit('SET_ADS_HIDDEN', isHidden === 'true')
      }
      
      // โหลดข้อมูล banner เพื่อตรวจสอบว่ามีข้อมูลหรือไม่
      dispatch('fetchBanners')
    }
  },
  // แสดงโฆษณาเมื่อ login ใหม่
  showAdsOnLogin({ commit, dispatch }) {
    commit('SET_ADS_HIDDEN', false)
    // ลบออกจาก localStorage เพื่อให้แสดงโฆษณา
    if (process.client) {
      localStorage.removeItem('adsHidden')
    }
    setTimeout(() => {
      dispatch('refreshBanners').catch(() => {
        // ไม่ทำอะไรถ้าเกิด error
      })
    }, 100)
  },
  // อัพเดทข้อมูล banner (ล้างข้อมูลเก่าและโหลดใหม่)
  refreshBanners({ commit }) {
    commit('SET_BANNERS', [])  // ล้างข้อมูลเก่า
    return this.fetchBanners() // โหลดใหม่
  },
  // โหลด banner data จาก API
  async fetchBanners({ commit, state }) {
    // ถ้ามีข้อมูลอยู่แล้ว ไม่ต้องโหลดใหม่
    if (state.banners.length > 0) {
      return
    }
    
    commit('SET_LOADING', true)
    commit('SET_ERROR', false)
    
    try {
      const apiUrl = process.env.API_URL
      const response = await this.$axios.get(`${apiUrl}/banner`)
      
      let rawBanners = []
      
      if (response.data && Array.isArray(response.data)) {
        rawBanners = response.data
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        rawBanners = response.data.data
      }
      
      // ตรวจสอบว่ามีข้อมูล banner หรือไม่
      if (!rawBanners || rawBanners.length === 0) {
        commit('SET_ADS_HIDDEN', true) // ซ่อน ads เมื่อไม่มีข้อมูล
        commit('SET_BANNERS', [])
        return
      }
      
      // กรอง banner ที่ active ตามวันและเวลา
      const activeBanners = rawBanners.filter(banner => isBannerActive(banner))
      
      // ถ้าไม่มี banner ที่ active ให้ซ่อน ads
      if (activeBanners.length === 0) {
        commit('SET_ADS_HIDDEN', true)
        commit('SET_BANNERS', [])
        return
      }
      
      // แปลงข้อมูล banner
      const banners = activeBanners.map(banner => ({
        image: banner.picture || banner.image || banner.banner_image || banner.url,
        alt: banner.alt || banner.title || banner.name || `Banner ${banner.id || ''}`,
        url: banner.link || banner.url || banner.target_url || null,
        id: banner.id,
        days: banner.days,
        startTime: banner.startTime,
        endTime: banner.endTime,
        status: banner.status
      }))
      
      // กรองออก banner ที่ไม่มี image
      const validBanners = banners.filter(banner => banner.image)
      
      if (validBanners.length === 0) {
        commit('SET_ADS_HIDDEN', true) // ซ่อน ads เมื่อไม่มี banner ที่มี image
        commit('SET_BANNERS', [])
      } else {
        // มีข้อมูล banner ที่ถูกต้อง แสดง ads (ถ้าไม่ได้ถูกซ่อนโดยผู้ใช้)
        if (!state.isAdsHidden) {
          commit('SET_ADS_HIDDEN', false)
        }
        commit('SET_BANNERS', validBanners)
      }
      
    } catch (error) {
      console.error('Error fetching banners:', error)
      commit('SET_ERROR', true)
      commit('SET_ADS_HIDDEN', true) // ซ่อน ads เมื่อเกิด error
      commit('SET_BANNERS', [])
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

export const getters = {
  isAdsHidden: state => state.isAdsHidden,
  banners: state => state.banners,
  loading: state => state.loading,
  error: state => state.error,
  // ตรวจสอบว่าควรแสดง ads หรือไม่ (มีข้อมูลและไม่ได้ถูกซ่อน)
  shouldShowAds: state => !state.isAdsHidden && state.banners.length > 0 && !state.error,
  // ตรวจสอบว่ามีข้อมูล banner หรือไม่
  hasBanners: state => state.banners.length > 0
}