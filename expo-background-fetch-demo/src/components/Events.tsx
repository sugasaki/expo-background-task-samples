import { StyleSheet, Text, View } from 'react-native';
import TaskEvent from '../utils/TaskEvent';
import { Colors } from '../utils/Color';

interface Props {
  events: TaskEvent[];
}
export const Events = ({ events }: Props) => {
  //   const [events, setEvents] = useState<TaskEvent[]>([]);

  const eventList = events
    .slice()
    .reverse()
    .map((event) => (
      <View key={event.key} style={styles.event}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.taskId}>
            {event.taskId}&nbsp;{event.isHeadless ? '[Headless]' : ''}
          </Text>
        </View>
        <Text style={styles.timestamp}>{event.timestamp}</Text>
      </View>
    ));

  return !events.length ? (
    <>
      <Text style={{ padding: 10, fontSize: 16 }}>Waiting for BackgroundFetch events...</Text>
    </>
  ) : (
    <>{eventList}</>
  );
};

const styles = StyleSheet.create({
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
  timestamp: {
    color: Colors.black,
  },
});
