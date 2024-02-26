import {StatusBar} from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {BackgroundTimer} from 'react-native-background-timer';

export default function App() {
  const onClickStatus = () => {
    BackgroundTimer.start(3000);
    // Do whatever you want incuding setTimeout;
    BackgroundTimer.stop();
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>

      <Button title={'start'} onPress={onClickStatus} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
