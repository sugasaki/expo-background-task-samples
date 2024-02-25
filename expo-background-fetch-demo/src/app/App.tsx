import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

import Fetcher, { BACKGROUND_FETCH_TASK } from './Fetcher';
import { Colors } from '../utils/Color';
import { Events } from '../components/Events';
import TaskEvent from '../utils/TaskEvent';

// Prevent the splash screen from auto-hiding before asset loading is complete.
if (!TaskManager.isTaskDefined(BACKGROUND_FETCH_TASK)) {
  console.log('first set TaskManager.defineTask!!');
  TaskManager.defineTask(BACKGROUND_FETCH_TASK, () => Fetcher.backgroundFetch());
}

export default function App() {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState<BackgroundFetch.BackgroundFetchStatus | null>(null);
  const [events, setEvents] = useState<TaskEvent[]>([]);

  useEffect(() => {
    checkStatusAsync();
    loadEvents();
  }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setEnabled(isRegistered);
    // console.log('status', status);
    // console.log('isRegistered', isRegistered);
  };

  const onClickToggleEnabled = async (value: boolean) => {
    setEnabled(value);
    // console.log('register value:', value);
    if (value) {
      await Fetcher.registerBackgroundFetchAsync();
    } else {
      await Fetcher.unregisterBackgroundFetchAsync();
    }
    await checkStatusAsync();
  };

  const onClickClear = () => {
    TaskEvent.destroyAll();
    loadEvents();
  };

  const loadEvents = () => {
    TaskEvent.all()
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to load data from AsyncStorage: ' + error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.gold }}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.title}>Expo BackgroundFetch</Text>
          <Switch value={enabled} onValueChange={onClickToggleEnabled} />
        </View>
        <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.eventList}>
          <View>
            <Text>
              Background fetch status:
              <Text>{status && BackgroundFetch.BackgroundFetchStatus[status]}</Text>
            </Text>
            <Text>
              Background fetch task name:
              <Text>{enabled ? BACKGROUND_FETCH_TASK : 'Not registered yet!'}</Text>
            </Text>
          </View>
          <Events events={events} />
        </ScrollView>
        <View style={styles.toolbar}>
          <Text>&nbsp;</Text>
          <Button title='Refresh' onPress={loadEvents} />
          <View style={{ flex: 1 }} />
          <Button title='clear' onPress={onClickClear} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: 24,
    flex: 1,
    fontWeight: 'bold',
    color: Colors.black,
  },
  eventList: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  event: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
  },
  taskId: {
    color: Colors.blue,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headless: {
    fontWeight: 'bold',
  },
  timestamp: {
    color: Colors.black,
  },
  toolbar: {
    height: 57,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    backgroundColor: Colors.gold,
  },
});
