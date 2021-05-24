/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from "./screens/paymentScreen";

const App = ()  => {
  const publishableKey = "pk_test_AtN3VLAFhzbLNqf3Y9z50iNQ";
  return (
    <StripeProvider
      publishableKey={publishableKey}
    >
      <PaymentScreen />
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
});

export default App;
