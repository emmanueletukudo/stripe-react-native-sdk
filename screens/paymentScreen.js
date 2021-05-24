import React, {useState} from "react";
import {
    CardField,
    CardFieldInput,
    useStripe,
  } from '@stripe/stripe-react-native';


  export default PaymentScreen = () => {
    const [card, setCard] = useState(CardFieldInput.Details | null);
    const {confirmPayment, handleCardAction} = useStripe()

    return(
        <CardField
      postalCodeEnabled={false}
      placeholder={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        marginTop: 30,
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
        marginTop: 30,
      }}
      onCardChange={(cardDetails) => {
        setCard(cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />
    )
  }

