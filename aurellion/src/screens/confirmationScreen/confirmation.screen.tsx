import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useMainContext } from '../main.provider';

const ConfirmationScreen: React.FC = () => {
  const { walletAddress, packageDeliveryData } = useMainContext();

  const handleConfirm = () => {
    // Handle confirmation logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Confirm Your Delivery</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.detailsContainer}>
            <View style={styles.section}>
            <Text style={styles.label}>Sender Address</Text>
            <Text style={styles.value}>{packageDeliveryData?.startName}</Text>
            </View>
            <View style={styles.section}>
            <Text style={styles.label}>Sender Wallet</Text>
            <Text style={styles.value}>{walletAddress}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.section}>
            <Text style={styles.label}>Recipient Address</Text>
            <Text style={styles.value}>{packageDeliveryData?.endName}</Text>
            </View>
            <View style={styles.section}>
            <Text style={styles.label}>Recipient Wallet</Text>
            <Text style={styles.value}>recipient address</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.section}>
            <Text style={styles.label}>Delivery Option</Text>
            <Text style={styles.value}>chosen option</Text>
            <Text style={styles.value}>chosen option</Text>
            <Text style={styles.value}>chosen option</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.section}>
            <Text style={styles.label}>Pricing</Text>
            <Text style={styles.value}>pricing</Text>
            <Text style={styles.value}>pricing</Text>
            <Text style={styles.value}>pricing</Text>
            </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const Colors = {
  primary: '#000000', // Black
  secondary: '#000000', // Black
  text: '#000000', // Black
  buttonText: '#FFFFFF',
  separator: 'grey', // Black
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', // Align to the left
    paddingHorizontal: 15,
  },
  scrollContent: {
    flexGrow: 1,
    minWidth: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginTop:20,
    marginBottom: 20,
    color: Colors.primary,
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  section: {
    marginBottom: 35,
  },
  label: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.secondary,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: Colors.text,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.separator,
    marginBottom: 20,
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center', // Align to center horizontally
    marginBottom: 20, // Add some bottom margin for spacing
    },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.buttonText,
  },
});

export default ConfirmationScreen;
