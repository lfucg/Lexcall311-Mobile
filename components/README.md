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
### Deploy Start:
1. Update to latest
  * $ `git pull master`
  * $ `npm i`
2. copy contents of .env_prod into .env !!!IMPORTANT!!!
3. Increment versions in app.json
  * $ `npm run versionup`
    This will increment the following:
    * android.versionCode
    * ios.buildNumber
    * version
4. Save and commit - no need to push
  * $ `git add .`
  * $ `git commit -m "deploying version X.X.X"`

### Deploy to iOS store:
(Skip step 1 and 2 if already logged in as stellar_tech)
1. $ `expo logout`
2. $ `expo login`
  * user: stellar_tech
  * pass: ********
3. $ `npm run ios-build-release`
  * select team Lexington Fayette urban County Government (if you're not part of that team then you need an invite)
  * select provider Lexington Fayette urban County Government
4. When the build finishes, click the link in terminal to download the build
5. Use Transporter to push downloaded build to App Store (Transporter can be downloaded from App Store)
  * Login using Apple Developer account
  * Add downloaded build from downloads folder
  * Click deliver
6. Wait for confirmation email (I'm not sure who this email is going to - might check the store if it's been awhile)
7. App Store Connect:  https://appstoreconnect.apple.com/apps
  * TestFlight tab:
    * Go to newest build and click 'missing compliance' - select 'None of the algorithms mentioned above'
    * Test build on phone using TestFlight
  * App Store tab:
    * Click "+" next to "iOS App" in side menu - enter the version number just uploaded
    * Enter "Bug fixes and improvements." in the field for What's New in This Version.
    * Select version in the "Build" section. 
    * "Save"
    * "Add for Review"
    * "Submit to App Review"

### Deploy to Android store:
(Skip step 1 and 2 if already logged in as stellar_tech)
1. $ `expo logout`
2. $ `expo login`
  * user: stellar_tech
  * pass: ********
3. $ `npm run android-build-release`
  * select team Lexington Fayette urban County Government (if you're not part of that team then you need an invite)
  * select provider Lexington Fayette urban County Government
4. Wait for the build to finish
5. $ `eas submit -p android --latest`



5. Play Store:  https://play.google.com/console
6. Select LexCall 311 app
7. Side menu: Release: Production:  click "Create new release"
8. upload the app bundle

### Deploy Finish
1. Tag master branch (git)
  * List tags:  $ `git tag -n`
  * Create tag: $ `git tag -a vX.X.X -m "<description>"` (X.X.X == the incremented version)
  * Push tag: $ `git push origin --tags`
2. copy contents of .env_stage into .env !!!IMPORTANT!!!
3. save, commit, and push to master



