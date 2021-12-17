<template>
  <div id="app">
    <div v-if="connectionError" class="not-connected">
      WARNING: You are not connected to the server: {{ connectionError }}
    </div>
    <div v-if="localStorageStatus != 'ok'" class="not-connected">
      WARNING: {{ localStorageStatus }} - please enable cookies in browser settings
    </div>
    <h1>Assessment Dashboard</h1>
  </div>
</template>

<script>
import bus from './socket.js'

import ls from './lib/localStorage.js'

export default {
  name: 'App',
  components: {
  },
  data() {
  },
  computed: {
    connectionError() {
      return this.$store.getters.getConnectionError
    },
    localStorageStatus() {
      return this.$store.getters.getLocalStorageStatus
    }
  },
  created() {
    this.$store.dispatch('localStorageStatus', ls.check())

    bus.$on('connectionError', (data) => {
      this.$store.dispatch('updateConnectionError', data)
    })

    bus.$on('updateConnections', (data) => {
      this.$store.dispatch('updateConnectionError', null)
      this.$store.dispatch('updateConnections', data)
    })
  },
  methods: {
  }
}
</script>

<style lang="scss">

  h1 {
    margin-top: 24px;
  }

  .not-connected {
    background-color: red;
    color: #fff;
    font-weight: bold;
    margin: 6px;
  }
</style>
