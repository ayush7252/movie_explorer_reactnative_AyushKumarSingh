import { StyleSheet, SafeAreaView, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import WebView from 'react-native-webview';
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
import axios from 'axios';
import { GetSubscriptionStatus } from '../AxiosRoutes/AxiosRoutes';

type PaymentRouteParams = {
  params: {
    url: string;
    session: string;
  };
};

const Payment = () => {
  const route = useRoute<RouteProp<PaymentRouteParams, 'params'>>();
  const { url, session } = route.params;
  const navigation = useNavigation();

  const [hasReachedSuccessUrl, setHasReachedSuccessUrl] = useState(false);
  const [finalRedirectUrl, setFinalRedirectUrl] = useState<string | null>(null);

  const successUrl = `http://localhost:5173/success?session_id=${session}`;

  const handleNavigationChange = async(navState: { url: any }) => {
    const currentUrl = navState.url;

    if(currentUrl.includes('success')) {
      console.log('Success URL reached:', currentUrl);
      setHasReachedSuccessUrl(true);
      let x = await GetSubscriptionStatus(session);
      console.log(x?.status === 200 ? 'Subscription status fetched successfully' : 'Failed to fetch subscription status');
      if (x?.status === 200) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Splash' }],
          })
        );
        ToastAndroid.show('Payment Successful', ToastAndroid.SHORT);
      }
    }
     else if (hasReachedSuccessUrl && !finalRedirectUrl) {
      setFinalRedirectUrl(currentUrl);
      console.log('Final redirected URL after success:', currentUrl);
      navigation.replace('Footer'); 
      ToastAndroid.show('Payment Failed', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} testID="payment-screen">
      <WebView
        source={{ uri: url }}
        startInLoadingState={true}
        javaScriptEnabled={true}
        onNavigationStateChange={handleNavigationChange}
      />
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({});
