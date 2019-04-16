/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

 module.exports = function (api, ctx) {
   api.extendQuasarConf((conf) => {
    // make sure my-ext boot file is registered
    conf.boot.push('axios.js')
    conf.boot.push('auth.js')
  })
 }
