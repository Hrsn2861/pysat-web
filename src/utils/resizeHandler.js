import store from '@/store'

const { body } = document
const WIDTH = 1350 // refer to Bootstrap's responsive design

// default is 992

export default {
  watch: {
    $route () {
      if (this.$store.state.device === 'mobile' && this.$store.state.sidebar.opened) {
        store.dispatch('CloseSideBar')
      }
    }
  },
  beforeMount () {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted () {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('ToggleDevice', 'mobile')
      store.dispatch('CloseSideBar')
    }
  },
  methods: {
    isMobile () {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    resizeHandler () {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')

        console.log('Change to ' + this.$store.state.device)
        console.log('SidebarOpened:  ' + this.$store.state.sidebar.opened)

        if (isMobile) {
          store.dispatch('CloseSideBar')
        }
      }
    }
  }
}
