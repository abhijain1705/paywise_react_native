import { StyleSheet, View, Animated } from 'react-native'
import React, { useEffect } from 'react';
import Indicator from '../../common/components/indicator';


const SplashScreen = () => {
  let verticalHeight = new Animated.Value(0);
  let horizontalBar3Width = new Animated.Value(0);
  let horizontalBar2Width = new Animated.Value(0);
  let horizontalBar1Width = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(horizontalBar3Width, {
      toValue: 40,
      duration: 300,
      useNativeDriver: false
    }).start();

    setTimeout(() => {
      Animated.timing(horizontalBar2Width, {
        toValue: 40,
        duration: 300,
        useNativeDriver: false
      }).start();
    }, 300);

    setTimeout(() => {
      Animated.timing(horizontalBar1Width, {
        toValue: 60,
        duration: 300,
        useNativeDriver: false
      }).start();
    }, 600);

    setTimeout(() => {
      Animated.timing(verticalHeight, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, 900);


  }, []);

  const verticalStyle = {
    height: verticalHeight.interpolate({
      inputRange: [0, 80],
      outputRange: ['0%', '80%'],
    }),
  };

  const horizontal3style = {
    width: horizontalBar3Width.interpolate({
      inputRange: [0, 40],
      outputRange: [0, 40],
    }),
  };

  const horizontal2style = {
    width: horizontalBar2Width.interpolate({
      inputRange: [0, 40],
      outputRange: [0, 40],
    }),
  };

  const horizontal1style = {
    width: horizontalBar1Width.interpolate({
      inputRange: [0, 60],
      outputRange: [0, 60],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoParent}>
        <Animated.View style={{ ...styles.verticalBar, ...verticalStyle }} />
        <Animated.View style={{ ...styles.horizontalBar1, ...horizontal1style }} />
        <Animated.View style={{ ...styles.horizontalBar2, ...horizontal2style }} />
        <Animated.View style={{ ...styles.horizontalBar3, ...horizontal3style }} />
      </View>
    </View>
  )
};

export default SplashScreen;

const styles = StyleSheet.create({
  logoParent: {
    position: 'relative',
    maxHeight: 100,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  verticalBar: {
    width: 20,
    backgroundColor: '#000',
    marginRight: 10,
  },
  horizontalBar1: {
    height: 20,
    backgroundColor: '#000',
    position: 'absolute',
    borderTopRightRadius: 20
  },
  horizontalBar2: {
    height: 20,
    backgroundColor: '#000',
    position: 'absolute',
    left: 30,
    top: 30,
    borderTopRightRadius: 20,
    transform: [{ rotate: '90deg' }]
  },
  horizontalBar3: {
    height: 20,
    backgroundColor: '#000',
    position: 'absolute',
    left: 10,
    top: 42,
    borderBottomRightRadius: 20,
  },
});