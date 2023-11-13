import axios from 'axios';
import baseURL from '../baseURL';

import { MAKE_ORDER_FAILURE, MAKE_ORDER_REQUEST, MAKE_ORDER_SUCCESS } from "../constants/paymentConstants";

export const makeOrderRequest = () => ({
    type: MAKE_ORDER_REQUEST
  });
  
  export const makeOrderSuccess = session => ({
    type: MAKE_ORDER_SUCCESS,
    payload: session
  });
  
  export const makeOrderFailure = error => ({
    type: MAKE_ORDER_FAILURE,
    payload: error
  });

  export const makeOrder = (body,fm) => async dispatch => {
    console.log(body)
    const stripeModule = await import('@stripe/stripe-js');
    console.log("heree")
    const stripe = await stripeModule.loadStripe('pk_test_51LcefBHcGowY4Vx0nqxA3L6hCswMF2qxZ4Phr2T70nbrw4SKrMYQyayH05jG0vjObczx85nvSaF9iVxqC1aBFT9f00UPxN8UWY');
    try {
      dispatch(makeOrderRequest());
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      };
      
      // 1) Get checkout session from API

      if(body.paymentMethod === 'Stripe') {
        let url = body.reserve === true ? `${baseURL}/api/v1/appointment/reserveStripe/${body.doctor}/${body.price}` : `${baseURL}/api/v1/healthPackages/subscribeStripe/${body.id}`;
        if(fm) {
            url += `?fm=${fm}`
        }
        if(body.reserve) url += `?date=${body.date}`
      const { data } = await axios.get(url
       ,
        config
      );

      console.log(data.session.id)
      await stripe.redirectToCheckout({
        sessionId: data.session.id
      });
  
      // 2) Create checkout form + charge credit card
      dispatch(makeOrderSuccess(data.session));
    }
    else {
        let url = body.reserve === true ? `${baseURL}/api/v1/appointment/reserve/${body.doctor}/${body.price}` : `${baseURL}/api/v1/healthPackages/subscribe/${body.id}`
        if(fm) {
            url += `?fm=${fm}`
        }
      const { data } = await axios.post(
       url,body,
        config
      );
      dispatch(makeOrderSuccess(data.data))
    }

    } catch (error) {
      console.log(error);
      dispatch(makeOrderFailure(
        error.response
          ? error.response.data.message
          : 'Make order failed. Please try again.'
      ));
      // showAlert('error', error);
    }
  };