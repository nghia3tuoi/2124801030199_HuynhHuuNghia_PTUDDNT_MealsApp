import { View, Text, Button, StyleSheet } from "react-native";

export default function SettingsScreen({ navigation } : any) {
    return (
      <View style={styles.container}>
        <Text>Setting Screen</Text>
        <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });