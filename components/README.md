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
* handle .env
  * create .env, .env_prod, and .env_stage files
    * see .env_example for info needed
    * fill .env_prod with prod info and .env_stage with stage info
    * copy .env_stage info into .env

## Local Dev
* $ `nvm use`
* $ `npm run start`

### TROUBLE 
* $ `nvm run disintegrate`

## Deployment
1. Update to latest
  * $ `git pull master`
  * $ `npm i`
2. copy contents of .env_prod into .env
3. Increment versions in app.json
  * $ `npm run versionup`
    This will increment the following:
    * android.versionCode
    * ios.buildNumber
    * version
4. Save and commit - no need to push
  * $ `git add .`
  * $ `git commit -m "deploying version X.X.X"`
