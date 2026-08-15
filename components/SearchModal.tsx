import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ScrollView, Dimensions } from 'react-native';
import { X, Bookmark } from 'lucide-react-native';
import { useTheme } from '@/store/ThemeContext';
import { emotions, emotionsList } from '@/constants/emotions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import EmotionBadge from './EmotionBadge';

interface SearchModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  selectedEmotions: string[];
  startDate: Date | null;
  endDate: Date | null;
  bookmarked: boolean;
}

export default function SearchModal({ isVisible, onClose, onSearch }: SearchModalProps) {
  const { theme } = useTheme();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const toggleEmotion = (emotionId: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotionId)
        ? prev.filter(id => id !== emotionId)
        : [...prev, emotionId]
    );
  };

  const handleSearch = () => {
    onSearch({
      selectedEmotions,
      startDate,
      endDate,
      bookmarked,
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedEmotions([]);
    setStartDate(null);
    setEndDate(null);
    setBookmarked(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[styles.modalContainer, { backgroundColor: 'transparent' }]}>
        <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>Search Entries</Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <X size={24} color={theme.text} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Emotions</Text>
              <View style={styles.emotionsGrid}>
                {emotionsList.map(emotion => (
                  <Pressable
                    key={emotion.id}
                    onPress={() => toggleEmotion(emotion.id)}
                    style={[
                      styles.emotionItem,
                      selectedEmotions.includes(emotion.id) && { 
                        backgroundColor: `${emotion.color}20`,
                        borderColor: emotion.color 
                      }
                    ]}
                  >
                    <EmotionBadge emotionId={emotion.id} size="small" />
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Date Range</Text>
              <View style={styles.dateContainer}>
                <Pressable
                  style={[styles.dateButton, { backgroundColor: theme.card }]}
                  onPress={() => setShowStartPicker(true)}
                >
                  <Text style={[styles.dateText, { color: theme.text }]}>
                    {formatDate(startDate)}
                  </Text>
                </Pressable>
                <Text style={[styles.dateText, { color: theme.text }]}>to</Text>
                <Pressable
                  style={[styles.dateButton, { backgroundColor: theme.card }]}
                  onPress={() => setShowEndPicker(true)}
                >
                  <Text style={[styles.dateText, { color: theme.text }]}>
                    {formatDate(endDate)}
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.section}>
              <Pressable
                style={[
                  styles.bookmarkButton,
                  { backgroundColor: theme.card },
                  bookmarked && { backgroundColor: theme.primary }
                ]}
                onPress={() => setBookmarked(!bookmarked)}
              >
                <Bookmark size={20} color={bookmarked ? theme.background : theme.text} />
                <Text style={[
                  styles.bookmarkText,
                  { color: bookmarked ? theme.background : theme.text }
                ]}>
                  Bookmarked Only
                </Text>
              </Pressable>
            </View>
          </ScrollView>

          {(Platform.OS === 'android' || Platform.OS === 'ios') && showStartPicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowStartPicker(false);
                if (date) setStartDate(date);
              }}
            />
          )}

          {(Platform.OS === 'android' || Platform.OS === 'ios') && showEndPicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowEndPicker(false);
                if (date) setEndDate(date);
              }}
            />
          )}

          <View style={styles.footer}>
            <Pressable
              style={[styles.button, styles.clearButton, { borderColor: theme.primary }]}
              onPress={handleClear}
            >
              <Text style={[styles.buttonText, { color: theme.primary }]}>Clear</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.searchButton, { backgroundColor: theme.primary }]}
              onPress={handleSearch}
            >
              <Text style={[styles.buttonText, { color: theme.background }]}>Search</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: SCREEN_HEIGHT * 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  emotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  emotionItem: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
  },
  dateText: {
    fontSize: 14,
  },
  bookmarkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
  },
  bookmarkText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButton: {
    borderWidth: 1,
  },
  searchButton: {
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 