<template>
  <div>
    <button @click="send()">
      Send from Component
    </button>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  methods: {
    send() {
      bus.$emit('sendTestMessage', {source: 'Component.vue', message: 'Hello World!'})
    }
  }
}
</script>
