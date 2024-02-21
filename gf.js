const fs = require('fs');

const fontsBasePath = './fonts/ofl/';

const fontDirs = fs.readdirSync(fontsBasePath);

console.log(fontDirs);

// METADATA.pb
let missingCounter = 0;
for (const fontDirName of fontDirs) {
    const fullName = fontsBasePath + fontDirName + '/METADATA.pb';
    if (fs.existsSync(fullName)) {
        const metaContents = fs.readFileSync(fullName);
        console.log(metaContents.toString());
    } else {
        missingCounter++;
        console.log(`Metadata for ${fontDirName} was not found!`)
    }
    console.log(`Metadata files for ${missingCounter} fonts were not found!`)
}