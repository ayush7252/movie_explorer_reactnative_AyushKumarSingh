import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
  Linking,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale, verticalScale} from '../Constants/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSubscription} from '../AxiosRoutes/AxiosRoutes';

import WebView from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

const PremiumScreen = () => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [premiumMember, setpremiumMember] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const premiumFeatures = [
    'Ad-Free Experience',
    'Exclusive Content',
    'Early Access to New Releases',
    'Full HD & 4K Streaming',
    'Global Content Access',
    'Monthly Surprises',
  ];

  const plans = [
    {id: '1', title: '1_day', price: '$99', duration: '1 Month', tag: 'Basic'},
    {
      id: '2',
      title: '7_days',
      price: '$249',
      duration: '3 Months',
      tag: 'Best Value',
    },
    {
      id: '3',
      title: '3_month',
      price: '$799',
      duration: '12 Months',
      tag: 'Pro',
    },
  ];
  useEffect(() => {
    const checkPremiumMenbership = async () => {
      try {
        const subscriptionStatus = await AsyncStorage.getItem(
          'SubscriptionStatus',
        );
        if (subscriptionStatus === 'premium') {
          console.log('Subscription Status:', subscriptionStatus);
          setpremiumMember(true);
        } else {
          console.warn('No subscription status found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Error fetching subscription status:', error);
      }
    };
    checkPremiumMenbership();
  }, []);
  const handleCardPress = id => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedPlanId(prevId => (prevId === id ? null : id));
  };
  const handleBuyNow = async () => {
    if (premiumMember) {
      ToastAndroid.show('You are already a premium member', ToastAndroid.SHORT);
      return;
    } else {
      const selectedPlan = plans.find(plan => plan.id === selectedPlanId);

      if (!selectedPlan) {
        ToastAndroid.show(
          'Please select a plan before proceeding.',
          ToastAndroid.SHORT,
        );
        return;
      }

      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.warn('No token found in AsyncStorage.');
          return;
        }

        const response = await createSubscription(selectedPlan.title, token);
        const data =
          typeof response === 'string' ? JSON.parse(response) : response;
        const checkoutUrl = data.url;
        // Linking.openURL(checkoutUrl).catch(err => console.error('Failed to open URL:', err));
        navigation.navigate('Payment', {
          url: checkoutUrl,
          session: data.session_id,
        });
      } catch (error) {
        console.error('Subscription error:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.MainContainer}>
      <Text style={styles.pageTitle}>Premium Membership</Text>

      {plans.map(item => {
        const isSelected = selectedPlanId === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleCardPress(item.id)}
            style={[
              styles.planCard,
              item.tag === 'Best Value' && styles.highlightPlan,
              isSelected
                ? [styles.expandedCard, styles.selectedCard]
                : styles.collapsedCard,
            ]}
            activeOpacity={0.9}>
            <Text style={styles.planTitle}>{item.title}</Text>
            <View style={styles.tagWrapper}>
              <Text style={styles.tag}>{item.tag}</Text>
            </View>

            {isSelected && (
              <>
                <Text style={styles.planPrice}>{item.price}</Text>
                <Text style={styles.planDuration}>{item.duration}</Text>

                <View style={styles.tagWrapper}>
                  <Text style={styles.tag}>{item.tag}</Text>
                </View>

                <Text style={styles.featuresTitle}>Features Included:</Text>
                {premiumFeatures.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Image
                      source={require('../assets/Icons/checkmark.png')}
                      style={styles.checkMark}
                    />
                    <Text style={styles.text}>{feature}</Text>
                  </View>
                ))}
              </>
            )}
          </TouchableOpacity>
        );
      })}

      {/* Buy Now */}
      <TouchableOpacity
        style={[styles.btn, loading && {opacity: 0.6}]}
        onPress={handleBuyNow}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={styles.btnTxt}>Buy Now</Text>
        )}
      </TouchableOpacity>

      {/* Plan Comparison */}
      <View style={{marginTop: verticalScale(25)}}>
        <Text style={styles.featuresTitle}>Plan Comparison</Text>
        <View
          style={[
            styles.featureItem,
            {justifyContent: 'space-between', paddingRight: 20},
          ]}>
          <Text style={[styles.text, {flex: 1}]}>Features</Text>
          {plans.map(plan => (
            <Text
              key={plan.id}
              style={[styles.text, {flex: 1, textAlign: 'center'}]}>
              {plan.title}
            </Text>
          ))}
        </View>

        {premiumFeatures.map((feature, index) => (
          <View
            key={index}
            style={[
              styles.featureItem,
              {justifyContent: 'space-between', paddingRight: 20},
            ]}>
            <Text style={[styles.text, {flex: 1}]}>{feature}</Text>
            {plans.map(plan => (
              <Image
                key={plan.id}
                source={require('../assets/Icons/checkmark.png')}
                style={[styles.checkMark, {alignSelf: 'center'}]}
              />
            ))}
          </View>
        ))}
      </View>

      {/* Testimonials */}
      <View style={{marginTop: verticalScale(35)}}>
        <Text style={styles.featuresTitle}>What Our Users Say</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            {
              name: 'Aman',
              feedback: 'Loving the 4K content. Totally worth it!',
            },
            {
              name: 'Sneha',
              feedback: 'Premium saved me so much time from ads!',
            },
            {name: 'Ravi', feedback: 'Best value with early access content!'},
          ].map((user, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#1c1c1c',
                padding: verticalScale(14),
                borderRadius: 12,
                marginRight: verticalScale(12),
                width: 250,
              }}>
              <Text style={[styles.text, {fontStyle: 'italic'}]}>
                “{user.feedback}”
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  color: '#FFD700',
                  fontWeight: 'bold',
                  fontSize: verticalScale(12),
                  textAlign: 'right',
                }}>
                - {user.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* FAQ Section */}
      <View
        style={{marginTop: verticalScale(35), marginBottom: verticalScale(50)}}>
        <Text style={styles.featuresTitle}>Frequently Asked Questions</Text>
        {[
          {
            question: 'Can I cancel anytime?',
            answer:
              'Yes, you can cancel anytime through your account settings.',
          },
          {
            question: 'Will my plan auto-renew?',
            answer:
              'Yes, plans auto-renew unless canceled before the renewal date.',
          },
          {
            question: 'Do I get offline access?',
            answer: 'Yes, premium users can download and watch offline.',
          },
        ].map((faq, index) => (
          <View key={index} style={{marginBottom: verticalScale(12)}}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>
              {faq.question}
            </Text>
            <Text style={[styles.text, {marginTop: 4, color: '#ccc'}]}>
              {faq.answer}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default PremiumScreen;

const styles = StyleSheet.create({
  MainContainer: {
    paddingHorizontal: verticalScale(20),
    backgroundColor: '#000',
    paddingTop: verticalScale(45),
    paddingBottom: verticalScale(40),
  },
  pageTitle: {
    fontSize: verticalScale(33),
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: verticalScale(25),
  },
  planCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: verticalScale(20),
    paddingHorizontal: verticalScale(18),
    marginBottom: verticalScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    width: '100%',
    borderWidth: 1,
    borderColor: '#444',
    position: 'relative',
    overflow: 'hidden',
  },
  collapsedCard: {
    height: verticalScale(60),
    paddingVertical: verticalScale(10),
  },
  expandedCard: {
    paddingVertical: verticalScale(18),
  },
  highlightPlan: {
    borderColor: '#FFD700',
    backgroundColor: '#2c2c2c',
  },
  planTitle: {
    fontSize: verticalScale(18),
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: verticalScale(5),
  },
  planPrice: {
    fontSize: verticalScale(22),
    color: '#ffcc00',
    fontWeight: '900',
    marginBottom: verticalScale(5),
  },
  planDuration: {
    fontSize: verticalScale(14),
    color: '#bbb',
  },
  tagWrapper: {
    position: 'absolute',
    top: verticalScale(8),
    right: verticalScale(8),
    backgroundColor: '#FFD700',
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    borderRadius: verticalScale(10),
  },
  tag: {
    fontSize: verticalScale(10),
    fontWeight: 'bold',
    color: '#000',
  },
  featuresTitle: {
    fontSize: verticalScale(16),
    fontWeight: 'bold',
    color: '#fff',
    marginTop: verticalScale(12),
    marginBottom: verticalScale(8),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    alignSelf: 'flex-start',
  },
  checkMark: {
    height: verticalScale(20),
    width: verticalScale(20),
  },
  text: {
    fontSize: verticalScale(14),
    color: '#fff',
    marginLeft: verticalScale(10),
    lineHeight: verticalScale(20),
  },
  btn: {
    width: '60%',
    height: verticalScale(45),
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: verticalScale(30),
    marginTop: verticalScale(30),
    alignSelf: 'center',
  },
  btnTxt: {
    fontSize: verticalScale(20),
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedCard: {
    borderColor: 'limegreen',
    borderWidth: 2,
  },
  premiumBtn: {
    backgroundColor: 'green',
  },
});
