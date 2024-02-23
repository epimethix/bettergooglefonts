const { raw } = require('body-parser')
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('fonts/ofl/'))

function renderFont(fontInfo) {
    console.log(fontInfo.meta.fonts[0])
    firstFont = fontInfo.meta.fonts[0]
    let out = `<style>
  @font-face {
    font-family: "${firstFont.name}";
    font-style: ${firstFont.style};
    font-weight: ${firstFont.weight};
    src: url(/${fontInfo.dir}/${firstFont.filename})
  }
  </style>
  <div style="font-family: '${firstFont.name}'">${firstFont.name} - The quick brown fox jumps over the lazy dog</div>
    `

    return out
}

app.get('/', (req, res) => {
    const gf = require('./gf.js')
    res.write('<html><body><ul>')
    gf.listMetaData().then(fonts => {
        for (const font of fonts) {
            res.write(`<li>${renderFont(font)}</li>`)
        }
        res.write('</ul></body></html>')
        res.end()
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})