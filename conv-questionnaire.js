
const fs = require('node:fs');
const path = require('node:path')

if (require.main === module) {
    console.log(process.argv)
    const outputfolder = process.argv[2]

    const fontMeta = JSON.parse(fs.readFileSync(path.join(outputfolder, 'fontmeta.json')))
    const fontQuestionnaire = JSON.parse(fs.readFileSync(path.join(outputfolder, 'classification.json')))

    const fontnameLookup = new Map(fontMeta.map(v => [v.dir, v.meta.name]))
    const fontNames = new Set(fontMeta.map(v => v.meta.name))


    const fontQOut = new Map()
    for (const [dir, qs] of Object.entries(fontQuestionnaire)
        .sort(([a,], [b,]) => a.localeCompare(b))) {
        let fname = fontnameLookup.get(dir)
        if (!fname) {
            if (fontNames.has(dir)) {
                fname = dir
            }
        }
        fontQOut.set(fname,qs)
    }

    fs.writeFileSync(path.join(outputfolder, 'classification.json'), JSON.stringify(Array.from(fontQOut)))


}
