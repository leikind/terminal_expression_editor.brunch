module.exports = config:
  files:
    javascripts:
      joinTo:

        'js/app.js': /^(app\/js)/
        'js/vendor.js': /^vendor/

      order:
        before:[
          'vendor/jquery.js',
          'vendor/hammer.js',
          'vendor/picker.js',
          'vendor/materialize.js'
        ]

    stylesheets:
      joinTo: 'css/app.css'
