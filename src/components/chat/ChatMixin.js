export default {
  computed: {
    sessions () {
      return this.$store.state.chatSystem.sessions
    },
    currentSessionId () {
      return this.$store.state.chatSystem.currentSessionId
    },
    currentSession () {
      return this.$store.state.chatSystem.sessions[this.currentSessionId - 1]
    }
  },
  methods: {
    changeCurrentSessionId: function (id) {
      console.log('CurrentSession ID: ', this.currentSessionId)
      this.$store.dispatch('changeCurrentSessionID', id)
    }
  }
}
