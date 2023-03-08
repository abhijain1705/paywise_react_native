import { ScrollView } from 'react-native';
import React from 'react';
import { styles } from './styles/styles';
import SettingRow from './components/settingRow';

const Setting = () => {
  return (
    <ScrollView horizontal={false}>
      <SettingRow prefix={'bullhorn'} label={'Give Feedback'} suffix={'arrow-right-circle'}  />
      <SettingRow prefix={'book-open-page-variant'} label={'Our Story'} suffix={'open-in-new'}  />
      <SettingRow prefix={'share-variant'} label={'Share us with your friend'} suffix={'open-in-new'}  />
      <SettingRow prefix={'star'} label={'Rate us on Play Store'} suffix={'open-in-new'}  />
      <SettingRow prefix={'file-document-outline'} label={'Terms and Conditions'} suffix={'open-in-new'}  />
      <SettingRow prefix={'shield-lock-outline'} label={'Privacy Policy'} suffix={'open-in-new'}  />
      <SettingRow prefix={'phone'} label={'Contact us'} suffix={'open-in-new'}  />
      <SettingRow prefix={'logout'} label={'logout'} suffix={'open-in-new'}  />
    </ScrollView>
  )
}

export default Setting;