<template>
  <div>
    <button @click="createQrCode()">
      Create QR Code
    </button>
    <div>
      <canvas id="qr" />
    </div>
  </div>
</template>

<script>
const qrCode = require('qrcode')

export default {
  methods: {
    createQrCode() {
      const canvas = document.getElementById('qr')

      qrCode.toCanvas(canvas, location.href, (error) => {
        if (error) console.error(error)
        console.log('success!')
      })
    }
  }
}
</script>
