import React from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';


const SplashScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Video
        source={require('../../assets/splash.mp4')}
        style={{ flex: 1 }}
        resizeMode="cover"
        repeat={false}
        muted={true}
      />
    </View>
  );
};

export default SplashScreen;
