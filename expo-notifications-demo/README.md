<p>
  <a href="https://docs.expo.dev/versions/latest/sdk/notifications/">
    <img
      src="https://raw.githubusercontent.com/expo/expo/38185aeb5e176a5c8ef5150ecb1345bc2c701759/.github/resources/expo-notifications.svg"
      alt="expo-notifications"
      height="64" />
  </a>
</p>

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
