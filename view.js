Vue.component('select-currency', {
  props: {
    id: String,
  },

  data() {
    return {
      selectedCurrency: 'EUR',
      currencyCodes: ["AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT",
        "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTC", "BTN", "BWP", "BYN", "BYR", "BZD",
        "CAD", "CDF", "CHF", "CLF", "CLP", "CNY", "COP", "CRC", "CUC", "CUP", "CVE", "CZK", "DJF", "DKK",
        "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD",
        "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR",
        "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KMF", "KPW", "KRW", "KWD", "KYD", "KZT",
        "LAK", "LBP", "LKR", "LRD", "LSL", "LTL", "LVL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT",
        "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD",
        "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR",
        "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "STD", "SVC", "SYP", "SZL", "THB",
        "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VEF",
        "VND", "VUV", "WST", "XAF", "XAG", "XAU", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMK", "ZMW", "ZWL"],
    }
  },

  template: `
    <span class="currency-selector">
      <select :id="id" v-model="selectedCurrency" @change="$emit('set-currency', $event.target)">
        <option v-for="code in currencyCodes" :value="code">{{code}}</option>
      </select>
    </span>
  `,
})

const app = new Vue({
  el: '#app',

  data: {
    amount: 0,
    from: 'EUR',
    to: 'CZK',
    result: null,
    isError: false,
  },

  methods: {
    async convert() {
      const url = new URL('https://a7t9zsd4u6.execute-api.eu-central-1.amazonaws.com/default/getConversionRates')
      const params = { amount: this.amount, from: this.from, to: this.to }
      url.search = new URLSearchParams(params)
      const reponse = await fetch(url)

      const jsonReply = await reponse.json()

      // it could also be an error
      this.isError = typeof jsonReply !== 'number'

      if (typeof jsonReply !== 'number') this.result = jsonReply
      else this.result = `${parseFloat(this.amount).toFixed(2)} ${this.from} = ${jsonReply.toFixed(2)} ${this.to}`
    },

    setCurrency(code) {
      this[code.id] = code.value
    },
  },
})
