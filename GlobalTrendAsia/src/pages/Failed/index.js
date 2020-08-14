import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {clearData} from '../../utils';
import {useNetInfo} from '@react-native-community/netinfo';
import {Button, Gap, Offline} from '../../components';

export default function Failed({navigation, route}) {
  const netInfo = useNetInfo();
  const error = route.params;

  const back = async () => {
    clearData();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.page}>
      {!netInfo.isConnected && <Offline />}
      <Text style={styles.title}>Login Failed</Text>
      {error && <Text style={styles.subTitle}>{error}</Text>}
      <Gap height={40} />
      <Button title="Kembali" onPress={back} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1, paddingHorizontal: 40, paddingTop: 80},
  title: {fontSize: 40},
  subTitle: {fontSize: 20, color: 'red'},
});
