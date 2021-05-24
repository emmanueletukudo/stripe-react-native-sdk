import React, { useState, useEffect } from "react";
import { StyleSheet, Button, View} from 'react-native';
import {
  CardField,
  CardFieldInput,
  useStripe,
} from '@stripe/stripe-react-native';


export default PaymentScreen = () => {
  const [card, setCard] = useState(CardFieldInput.Details | null);
  const { confirmPayment, handleCardAction } = useStripe()

  const API_URL = "http://localhost:8000";

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet({ clientSecret });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          setCard(cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      />
        <Button
          style={styles.button}
          disabled={!loading}
          title="Checkout"
          color="#841584"
          onPress={openPaymentSheet}
        />
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     padding: 20,
     marginHorizontal: 10,
     marginVertical: 10,
  },
  button: {
     backgroundColor: '#00aeef',
     borderColor: 'red',
     borderWidth: 5,
     borderRadius: 15       
  }
})
