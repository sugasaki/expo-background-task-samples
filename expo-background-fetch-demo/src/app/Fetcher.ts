import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

import TaskEvent from '../utils/TaskEvent';

export const BACKGROUND_FETCH_TASK = 'background-fetch';

export default class Fetcher {
  static async backgroundFetch() {
    const now = Date.now();
    const message = `Got background fetch call at date: ${new Date(now).toISOString()}`;
    console.log('TaskManager.defineTask: ', message);

    const taskId = now.valueOf().toString();
    const event = await TaskEvent.create(taskId, false);
    console.log('event: ', event);

    // await AsyncStorage.setItem(LAST_FETCH_DATE_KEY, now.toString());
    // Be sure to return the successful result type!
    return BackgroundFetch.BackgroundFetchResult.NewData;
  }

  // 2. 同じ名前と、バックグラウンド・フェッチの動作に関する設定オプションを指定して、アプリのある時点でタスクを登録します。
  // Note: これはグローバルスコープである必要はなく、Reactコンポーネントで使用できます！
  static async registerBackgroundFetchAsync() {
    // console.log('register BACKGROUND_FETCH_TASK');
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    if (isRegistered == true) BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);

    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      // minimumInterval: 15 * 60, // task will fire 1 minute after app is backgrounded
      minimumInterval: 1 * 60, // task will fire 1 minute after app is backgrounded
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }

  // 3. タスク名を指定して、タスクの登録を解除する。
  // これは、指定された名前にマッチするバックグラウンド・フェッチ・コールをキャンセルします。
  // Note: これはグローバルスコープに置く必要はありません！
  static async unregisterBackgroundFetchAsync() {
    // console.log('unregister BACKGROUND_FETCH_TASK');
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    if (isRegistered == false) return;

    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  }
}
