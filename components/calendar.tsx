import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    format,
    isSameDay,
    startOfMonth,
    subMonths,
} from "date-fns";
import * as Calendar from "expo-calendar";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface WorkoutEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  notes?: string;
}

interface CalendarComponentProps {
  onDateSelect?: (date: Date) => void;
  workoutEvents?: WorkoutEvent[];
}

export const CalendarComponent: React.FC<CalendarComponentProps> = ({
  onDateSelect,
  workoutEvents = [],
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [calendarPermission, setCalendarPermission] = useState<boolean>(false);
  const [calendars, setCalendars] = useState<Calendar.Calendar[]>([]);
  const [events, setEvents] = useState<Calendar.Event[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventNotes, setEventNotes] = useState<string>("");

  // Request calendar permissions
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        setCalendarPermission(true);
        await loadCalendars();
      } else {
        Alert.alert(
          "Permission Denied",
          "Calendar access is required for this feature.",
        );
      }
    })();
  }, []);

  // Load events when month changes or permission granted
  useEffect(() => {
    if (calendarPermission && calendars.length > 0) {
      loadEvents();
    }
  }, [currentMonth, calendarPermission, calendars]);

  const loadCalendars = async () => {
    try {
      const calendarsData = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT,
      );
      setCalendars(calendarsData);
    } catch (error) {
      console.error("Error loading calendars:", error);
    }
  };

  const loadEvents = async () => {
    try {
      const startDate = startOfMonth(currentMonth);
      const endDate = endOfMonth(currentMonth);

      const calendarIds = calendars
        .filter((calendar) => calendar.allowsModifications)
        .map((calendar) => calendar.id);

      if (calendarIds.length > 0) {
        const eventsData = await Calendar.getEventsAsync(
          calendarIds,
          startDate,
          endDate,
        );
        setEvents(eventsData);
      }
    } catch (error) {
      console.error("Error loading events:", error);
    }
  };

  const createWorkoutEvent = async () => {
    if (!eventTitle.trim()) {
      Alert.alert("Error", "Please enter an event title");
      return;
    }

    try {
      const defaultCalendar = calendars.find(
        (cal) => cal.allowsModifications && cal.source.name !== "Birthdays",
      );

      if (!defaultCalendar) {
        Alert.alert("Error", "No writable calendar found");
        return;
      }

      const eventDetails: Calendar.Event = {
        title: eventTitle,
        startDate: selectedDate,
        endDate: new Date(selectedDate.getTime() + 60 * 60 * 1000), // 1 hour duration
        notes: eventNotes,
        timeZone: "GMT",
      };

      await Calendar.createEventAsync(defaultCalendar.id, eventDetails);

      setEventTitle("");
      setEventNotes("");
      setModalVisible(false);
      loadEvents(); // Refresh events

      Alert.alert("Success", "Workout event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      Alert.alert("Error", "Failed to create event");
    }
  };

  const handleDatePress = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) =>
      direction === "prev" ? subMonths(prev, 1) : addMonths(prev, 1),
    );
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  };

  const hasEvent = (date: Date) => {
    return (
      events.some((event) => isSameDay(new Date(event.startDate), date)) ||
      workoutEvents.some((event) => isSameDay(event.startDate, date))
    );
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.startDate), date));
  };

  const renderCalendarDay = (date: Date) => {
    const isSelected = isSameDay(date, selectedDate);
    const isToday = isSameDay(date, new Date());
    const hasEventOnDate = hasEvent(date);

    return (
      <TouchableOpacity
        key={date.toISOString()}
        style={[
          styles.dayContainer,
          isSelected && styles.selectedDay,
          isToday && styles.todayDay,
        ]}
        onPress={() => handleDatePress(date)}
      >
        <Text
          style={[
            styles.dayText,
            isSelected && styles.selectedDayText,
            isToday && styles.todayText,
          ]}
        >
          {format(date, "d")}
        </Text>
        {hasEventOnDate && <View style={styles.eventIndicator} />}
      </TouchableOpacity>
    );
  };

  const renderEventItem = ({ item }: { item: Calendar.Event }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventTime}>
        {format(new Date(item.startDate), "HH:mm")}
      </Text>
      {item.notes && <Text style={styles.eventNotes}>{item.notes}</Text>}
    </View>
  );

  const daysInMonth = getDaysInMonth();
  const eventsForSelectedDate = getEventsForDate(selectedDate);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateMonth("prev")}
        >
          <Text style={styles.navButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.monthTitle}>
          {format(currentMonth, "MMMM yyyy")}
        </Text>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateMonth("next")}
        >
          <Text style={styles.navButtonText}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Days of Week */}
      <View style={styles.weekDaysContainer}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarGrid}>
        {daysInMonth.map(renderCalendarDay)}
      </View>

      {/* Add Event Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Add Workout for {format(selectedDate, "MMM dd, yyyy")}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Workout Title"
              value={eventTitle}
              onChangeText={setEventTitle}
            />

            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="Notes (optional)"
              value={eventNotes}
              onChangeText={setEventNotes}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setEventTitle("");
                  setEventNotes("");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={createWorkoutEvent}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    width: "14.28%",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  dayContainer: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  selectedDay: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
  },
  todayDay: {
    backgroundColor: "#FFE4B5",
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
    color: "#333",
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "bold",
  },
  todayText: {
    fontWeight: "bold",
    color: "#FF6B35",
  },
  eventIndicator: {
    position: "absolute",
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF6B35",
  },
  eventsContainer: {
    marginTop: 16,
  },
  eventsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addEventButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addEventButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  eventsList: {
    maxHeight: 150,
  },
  eventItem: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  eventTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  eventNotes: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
    fontStyle: "italic",
  },
  noEventsText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  notesInput: {
    height: 80,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default CalendarComponent;
