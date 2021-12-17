
import config from './config.js'

const conf = config.config()

const Line = {

  data: function(results) {
    const data = []
    for (let i = 0; i < results.datasets.length; i++) {
      const dataset = config.dataset(i)
      dataset.data = results.datasets[i].data
      dataset.label = results.datasets[i].label
      data.push(dataset)
    }
    return {
      labels: results.labels,
      datasets: data
    }
  },

  options: function() {
    return conf.options
  }

}

export default Line
