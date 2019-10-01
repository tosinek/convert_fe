const app = new Vue({
  el: '#app',
  data: {
    x: 'aaa',
    test: 'google.com',
    onSale: false,
    sizes: ['L', 'M'],
    color: 'blue',
  },
  methods: {
    calculate() {
      this.color = 'red'
    }
  }
})
