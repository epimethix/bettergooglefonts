const fs = require('fs');
const ProtoBuf = require('protobufjs')
const sut = require('protobufjs-textformat')
const fqn = 'google.fonts_public.FamilyProto';

async function listMetaData() {
    // load protobuf definition
    const root = await (new ProtoBuf.Root()).load('fonts_public.proto', { keepCase: true })

    const fontsBasePath = './fonts/ofl/';

    const fontDirs = fs.readdirSync(fontsBasePath);

    // console.log(fontDirs);

    // METADATA.pb
    let missingCounter = 0
    const parsingErrors = []
    for (const fontDirName of fontDirs) {
        const fullName = fontsBasePath + fontDirName + '/METADATA.pb';
        if (fs.existsSync(fullName)) {
            const metaContents = fs.readFileSync(fullName, 'utf-8');
            const result = sut.parse(root, fqn, metaContents)
            if (result.status) {
                console.log(JSON.stringify(result.message,null,2));
            }
            else {
                parsingErrors.push([fullName, result.error])
            }
        } else {
            missingCounter++;
            // console.log(`Metadata for ${fontDirName} was not found!`)
        }
    }
    console.log(`Metadata files for ${missingCounter} fonts were not found!`)
    console.log(`Meta Parsing failed for ${parsingErrors.length} fonts`)
    console.log(parsingErrors)
}

listMetaData()