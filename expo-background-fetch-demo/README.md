# react-native-background-fetch

https://github.com/transistorsoft/react-native-background-fetch/

# setup

- Add the following **`UIBackgroundModes`** and **`BGTaskSchedulerPermittedIdentifiers`** to the **`ios.infoPlist`** section:

```diff
{
  "expo": {
    "name": "your-app-name",
    "ios": {
+     "infoPlist": {
+       "UIBackgroundModes": [
+         "fetch",
+         "processing"
+       ],
+     }
    }
  }
}
```

# build

## setup eas

```
eas build:configure
```

## develop build (simulation)

### iOs

```
eas build --profile development-simulator --platform ios --local
```

作成できた tar.gz ファイルを解答し、app をシミュレーターへ drop する

### android

```
eas build --profile development --platform android --local
```

## preview build (実機インストール用)

### iOs

```
eas build --profile preview --platform ios --local
```

apple configurator で転送

### android

```
eas build --profile preview --platform android --local
```

android file transfer で転送

もしくは、Google Drive 経由で実機へ転送
