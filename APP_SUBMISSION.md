# General
You can find Google Play Store and Apple Developer log in credentials on the "App Submission Info" Teamwork notebook

# Android
1. Bump the app versions in `app.json`. This inslcudes 
   - version
   - buildNumber
   - versionCode
2. Initiate a build in your terminal using the expo cli: `expo build:android`
   - Expo will prompt you for a keystore file. It can be downloaded from Teamwork files.
3. The app will build in the cloud, and prompt you to download the app file once finished.
4. [Sign into Google Play Store](https://play.google.com/apps/publish/?account=4660069036203097836#AppListPlace) using the credential from Teamwork
5. Navigate to the LexCall 311 App Dashboard
6. Go to the Release - Production Dashboard and click "Create New Release"
7. Upload the new app file that was generated from Expo (.apk)
8. Enter Release notes that detail what changes were made in this version.
9. Save and Review the release
10. Click "Start Rollout to Production"

If you need to update anything on the Store page, it can be done on the [Store Presence -> Main store listing page](https://play.google.com/console/u/3/developers/4660069036203097836/app/4975150974915167688/main-store-listing)

# iOS