import { defineStore } from 'pinia'

export const useConfirmStore = defineStore('confirm', {
  state: () => ({
    userInfo: {},
    paymentDetails: {},
    bookingData: {
      car: '',
      bookingDates: {}
    },
    finalBooking: {}
  })
})

export const useAppStore = defineStore('appSettings', {
  state: () => ({
    theme: "light",
    colorWeek: false,
    navbar: true,
    menu: true,
    menuCollapse: false,
    footer: true,
    themeColor: "#165DFF",
    menuWidth: 250,
    globalSettings: false
  }
  ),
  actions: {
    // Update app settings
    updateSettings(partial) {
      // @ts-ignore-next-line
      this.$patch(partial)
    },

    // Change theme color
    toggleTheme(dark) {
      if (dark) {
        this.theme = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        this.theme = 'light'
        document.body.removeAttribute('arco-theme')
      }
    }
  }
})
