# expo-background-task-samples

## :open_file_folder: 試したライブラリ


### 1. expo-background-fetch

expoが作っているライブラリ

#### Android

Androidでは安定して動作する。
スマホを触らずに放置していると時々タスクが発火しない時間帯もある。

#### iOS

iOSではなかなか発火しない。
丸1日経過に発火し始めた。が1時間に1回の発火頻度。


### 2. react-native-background-fetch

#### Android

Androidでは安定して動作する。
スマホを触らずに放置していると時々タスクが発火しない時間帯もある。

#### iOS

iOSではなかなか発火しない。
こちらも丸1日経過に発火し始めた。が1時間に1回の発火頻度。
機種によって発火の頻度が違うのが悩み。
傾向としては動き始めたら、`expo-background-fetch`と同じ感じがする。

### 3. react-native-background-timer

https://github.com/ocetnik/react-native-background-timer

動作せず。
ISSUEも放置されてて、今後も期待できなさそう。
https://github.com/ocetnik/react-native-background-timer/issues



## :open_file_folder: 試してないライブラリ

### 1. react-native-background-actions

https://github.com/Rapsssito/react-native-background-actions/

ちょっと厳しいのか

https://github.com/Rapsssito/react-native-background-actions/issues/191




## :open_file_folder: 動作しない時に参考になりそうな記事、ISSUE


https://github.com/transistorsoft/react-native-background-fetch/issues/483

https://github.com/transistorsoft/react-native-background-fetch/issues/474#issuecomment-1810215794

```
実際には、少なくとも毎日1回はアプリをフォアグラウンドにする必要があります。 そうしないと、アップルはあなたのアプリが使われていないとみなし、イベントの発生を止めてしまう。
```


https://stackoverflow.com/questions/58960411/how-to-get-your-ios-app-to-run-in-the-background-for-longer-than-3-minutes


