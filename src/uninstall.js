const glob = require('glob')
module.exports = function (api) {
  api.removePath('/boot/auth.js')
  api.removePath('/store/auth')
  api.removePath('/pages/auth')
  api.removePath('/i18n/auth')

  console.log('sdf')
  console.log(__dirname)
  glob(__dirname + '/templates/src/i18n/**/auth.js', {}, (err, files)=>{
    console.log(files)
  })
}