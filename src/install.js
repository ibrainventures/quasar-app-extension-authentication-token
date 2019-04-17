/**
 * Quasar App Extension install script
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 */

 module.exports = function (api) {
   api.render('./templates', {
     prompts: api.prompts
   })

   api.extendPackageJson({
     dependencies: {
       'axios': '^0.18.0',
       'vuelidate': '^0.7.4',
       'vue-i18n': '^7.3.3'
     }
   })
 }
