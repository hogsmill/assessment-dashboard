<template>
  <div>
    <button @click="send()">
      Send
    </button>
    <button @click="emit()">
      Emit
    </button>
    <SubComponent />
    <h2>Message: ({{ source }}) :{{ message }}, {{ date }}</h2>
    <h2>Emit: {{ emitMessage }}</h2>
  </div>
</template>

<script>
import bus from '../socket.js'

import SubComponent from './SubComponent.vue'

export default {
  name: 'App',
  components: {
    SubComponent
  },
  data() {
    return {
      date: '',
      message: '',
      emitMessage: '',
      source: ''
    }
  },
  created() {
    bus.$on('testMessage', (data) => {
      this.source = data.source
      this.date = data.date
      this.message = data.message
    })

    bus.$on('emitMessage', (data) => {
      this.emitMessage = data.message
    })
  },
  methods: {
    send() {
      bus.$emit('sendTestMessage', {source: 'App.vue', message: 'Hello World!'})
    },
    emit() {
      bus.$emit('sendEmitMessage', {message: 'Emitted Message!'})
    }
  }
}
</script>

<style lang="scss">
  button {
    margin: 6px;
  }
</style>
