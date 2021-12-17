<template>
  <div>
    <div class="buttons">
      <i class="fas fa-table" :class="{'selected': scope == 'table'}" @click="show('table')" title="Show table" />
      <i class="fas fa-chart-line" :class="{'selected': scope == 'graph'}" @click="show('graph')" title="Show graph" />
    </div>
    <div v-if="scope == 'table'">
      <p>
        Table
      </p>
    </div>
    <div v-if="scope == 'graph'">
      <p>
        Graph
      </p>
      <LineChart />
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

import LineChart from './lineChart/Graph.vue'
import lineChartFuns from './lineChart/data.js'
import lineChartConfig from './lineChart/config.js'

export default {
  components: {
    LineChart
  },
  data() {
    return {
      scope: 'table'
    }
  },
  methods: {
    dataset() {
      const data = []
      for (let i = 0; i < 25; i++) {
        data.push(parseInt(Math.random() * 100))
      }
      const dataset = {
        label: 'Dataset ' + parseInt(Math.random() * 100),
        data: data
      }
      return dataset
    },
    results() {
      const results = []
      for (let i = 0; i < 5; i++) {
        results.push(this.dataset())
      }
      return results
    },
    show(scope) {
      this.scope = scope
      if (scope == 'graph') {
        const results = this.results()
        const data = lineChartFuns.data({labels: ['one', 'two', 'three', 'four', 'five'], datasets: results})
        const options = lineChartConfig.config().options
        window.setTimeout(function() {
          bus.$emit('sendShowGraph', {chartdata: data, options: options})
        }, 100)
      }
    }
  }
}
</script>
