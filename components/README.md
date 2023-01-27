# LexCall 311

The mobile (react-native) front-end for LexCall 311

## Tech Used
* React-Native
* Xcode
* Android Studio
* Expo
* Redux

## Version notes
* NPM 8.1.0
* Node v16.13.0
* NVM  0.39.1

## Installation
* $ `nvm use` 
* $ `npm install`

## Local Dev
* $ `npm run start`

## Deployment
1. Update to latest
  * $ `git pull master`
  * $ `npm i`
2. copy contents of .env_prod into .env
3. Increment versions by 1.  Don't increment 2nd and 3rd digit past 9.  12.2.9 == good, 12.23.91 == bad
  * app.json version
  * app.json buildNumber
  * app.json versionCode
4. Save and commit - no need to push
  * $ `git add .`
  * $ `git commit -m "deploying version X.X.X"`
