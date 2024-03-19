import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path';
import TextToSVG from 'text-to-svg';
import { MemoryDb } from 'minimongo'
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);

console.log(__filename)
const fontParamsSans = {
    "e-angle": { a: ["horizontal", "~horizontal", "angled", "~vertical", "vertical", "other"], s: "e", c: "lower case e Angle" },
    "g-shape": { a: ["modern (single story)", "classical (double story)", "both", "other"], s: "g", c: "lower case g shape" },
    "l-shape": { a: ["helvetica", "akkurat", "mono", "other"], s: "l", c: "lower case l shape" },
    "ij-dot-shape": { a: ["square", "round", "other"], s: "ij", c: "dot shape of lower case i & j" },
    "Kk-shape": { a: ["helvetica", "univers", "other"], s: "K k", c: "shape of upper and lower case k / K" },
    "a-shape": { a: ["double story", "double story extensive tail", "single story", "other"], s: "a", c: "shape of lower case a" },
    "g-up-shape": { a: ["Helvetica", "Univers", "Other"], s: "G", c: "shape of uppercase G" },
    "R-shape": { a: ["curved", "straight"], s: "R", c: "shape of uppercase R" },
    "M-tip": { a: ["baseline", "above"], s: "M", c: "position of tip of uppercase M" },
    "M-stems": { a: ["parallel", "angled"], s: "M", c: "angle of outer stems of uppercase M" },
    "W-tip": { a: ["one tip", "crossed", "other"], s: "W", c: "shape of uppercase w tip" },
    "W-tip-level": { a: ["capheight", "below", "other"], s: "W", c: "position of uppercase W tip" },
    "AMW-joints": { a: ["flat", "sharp", "other"], s: "WAM", c: "shape of outer joins of uppercase A / W / M" },
    "x-height": { a: ["neutra", "reasonable"], s: "EAR\nae", c: "x height and center of uppercase A" },

}

const db = new MemoryDb();
db.addCollection('fonts')

const metas = JSON.parse(readFileSync('bettergooglefontsng/src/assets/fontmeta.json'))
const classificationEntries = JSON.parse(readFileSync('bettergooglefontsng/src/assets/classification.json'))
const classification = new Map(classificationEntries)

for (const meta of metas) {
    meta['classification'] = classification.get(meta.meta.name)
}


db.collections['fonts'].upsert(metas,
    (docs) => { console.log(docs.length), createSvgs(db) },
    (err) => { console.log(err); }
)

async function createSvgs(db) {
    for (const [k, v] of Object.entries(fontParamsSans)) {

        console.log(`${k}`)
        for (const value of v.a) {
            const firstMatch = await db.fonts.findOne({ ['classification.' + k]: value })
            if( !firstMatch) {
                continue
            } 
            console.log(firstMatch)

            const prevsvgname = `${k}-${value}.svg`;
            console.log(prevsvgname)

            const textToSVG = TextToSVG.loadSync(join(firstMatch.dir, firstMatch.meta.fonts[0].filename))
            // const textToSVG = TextToSVG.loadSync()

            const attributes = { fill: 'black' };
            const options = { x: 0, y: 0, fontSize: 72, attributes: attributes };

            const metrics = textToSVG.getMetrics(v.s, options)

            const svg = textToSVG.getSVG(v.s, {...options,y: -metrics.y});


            writeFileSync(join('prevsvgs', prevsvgname), svg)
        }
    }
}
