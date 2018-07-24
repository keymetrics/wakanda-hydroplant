
const io = require('@pm2/io')
const cvlc = require('cvlc')

new class MyApp extends io.Entrypoint {
  onStart(cb) {
    this.player = new cvlc();

    this.radios = [
      'http://listen.radionomy.com/radio-mozart.m3u',
      'http://www.swissradio.ch/streams/6034.asx'
    ]

    this.radio_index = 0
    return cb()
  }

  onStop(err, cb) {
  }

  actions() {
    this.io.action('play', (reply) => {
      this.player.play(this.radios[this.radio_index], () => {
        console.log('radio started')
      })
      reply({success:true})
    })

    this.io.action('volup', (reply) => {
      this.player.cmd('volup 10', () => {
        reply({success:true})
      })
    })

    this.io.action('voldown', (reply) => {
      this.player.cmd('voldown 10', () => {
        reply({success:true})
      })
    })

    this.io.action('next', (reply) => {
      if (this.radio_index == this.radios.length)
        this.radio_index = 0
      else
        this.radio_index++

      this.player.cmd('stop', () => {
        this.player.play(this.radios[this.radio_index], () => {
          console.log('radio started')
        })
      })
      reply({success:true})
    })

    this.io.action('pause', (reply) => {
      this.player.cmd('stop', () => {
      })
      reply({success:true})
    })


  }
}
