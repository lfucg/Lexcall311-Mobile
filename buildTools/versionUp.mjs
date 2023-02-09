import {readFileSync,writeFileSync} from 'fs'

//read app.json:
    // android.versionCode - android number
    // ios.buildNumber - ios 1.2.3 string
    // version - expo 1.2.3 string
const loadAppJson = () => {
    const file = readFileSync('app.json')
    const asJson = JSON.parse(file)
    const versionCode = asJson.expo.android.versionCode
    const buildNumber = asJson.expo.ios.buildNumber
    const version = asJson.expo.version
    return {versionCode, buildNumber, version}
}
const writeAppJson = ({versionCode, buildNumber, version}) => {
    const file = readFileSync('app.json')
    const asJson = JSON.parse(file)
    asJson.expo.android.versionCode = versionCode
    asJson.expo.ios.buildNumber = buildNumber
    asJson.expo.version = version
    const newFile = JSON.stringify(asJson, null, 2)
    writeFileSync('app.json', newFile+'\n')
}

const writeVersionJs = (versions) => {
    const lines = Object.keys(versions).map(
        k => `export const ${k} = '${versions[k]}'\n`
    )
    writeFileSync('config/version.js', lines.join(''))
}

const incrementVersions = ({versionCode, buildNumber, version}) => {
    const [major, minor, patch] = version.split('.')
    // 1.2.3 => 123 +1 => 124 => 1.2.4
    const versionAsNumber = (Number(major) * 100) + (Number(minor) * 10) + (Number(patch) * 1)

    const newVersionAsNumber = versionAsNumber + 1

    const newPatch = newVersionAsNumber % 10
    const newMinor = Math.floor(newVersionAsNumber/10) % 10
    const newMajor = Math.floor(newVersionAsNumber/100)
    const newVersion = [newMajor, newMinor, newPatch].map(x => x.toString()).join('.')

    return {version:newVersion, buildNumber:newVersion, versionCode: versionCode+1}
}

const main = () => {
    console.log('versionUp.mjs')
    console.log('2022 Stellar TechWorks')
    const originalVersions = loadAppJson()
    console.log('original versions:', originalVersions)
    const newVersions = incrementVersions(originalVersions)
    console.log('incremented versions', newVersions)
    writeVersionJs(newVersions)
    writeAppJson(newVersions)
}

main()
