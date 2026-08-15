import React from 'react';
import { View, Text, Image, StyleSheet, Linking, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/store/ThemeContext';
import { Stack } from 'expo-router';
import { Github } from 'lucide-react-native';

const developers = [
  {
      name: 'Aditya Joshi',
      github: 'https://github.com/Adityaj08'
  },
  {
    name: 'Aditya Nagurkar',
    github: 'https://github.com/Aditya-Nagurkar'
  },
  {
    name: 'Ashutosh Mathapati',
    github: 'https://github.com/Ashutosh-Mathapati'
  },
  {
    name: 'H M Dhanush',
    github: 'https://github.com/Dhanushiremath'
  },
  {
    name: 'Snehalkumar',
    github: 'https://github.com/snehal1616'
  },
];

export default function AboutScreen() {
  const { theme } = useTheme();

  const openGitHub = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Stack.Screen 
        options={{
          title: 'About',
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
        }}
      />
      
      <View style={styles.content}>
        <Image 
          source={require('@/assets/images/adaptive-icon.png')}
          style={styles.icon}
        />
        
        <Text style={[styles.appName, { color: theme.text }]}>Reflexa</Text>
        <Text style={[styles.version, { color: theme.textSecondary }]}>Version 1.0.0</Text>
        
        <View style={styles.divider} />
        
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Developers</Text>
        
        {developers.map((dev, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.developerCard, { backgroundColor: theme.cardDark }]}
            onPress={() => openGitHub(dev.github)}
          >
            <Github size={24} color={theme.primary} />
            <Text style={[styles.developerName, { color: theme.text }]}>{dev.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 16,
    borderRadius: 30,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  developerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
  },
  developerName: {
    fontSize: 16,
    marginLeft: 12,
  },
}); 