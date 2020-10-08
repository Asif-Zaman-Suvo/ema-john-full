import React from 'react';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from '../SimpleCardForm/SimpleCardForm';
import SplitCardForm from '../SplitCardForm/SplitCardForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HZuZyJAmJyYwlCnPReYKG010Sz8ntJSPjP9TzrbGOoIWaUSzko33IADrzXoHnhAiJfeRjmRbSjWYlMqxBoJjqZ400krvsPeqj');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
            
        </Elements>
    );
};

export default ProcessPayment;