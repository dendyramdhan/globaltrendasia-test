import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getData, clearData} from '../../utils';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, Gap} from '../../components';

export default function Success({navigation}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData('user').then((user) => {
      if (!user) {
        navigation.replace('Login');
      }

      setUser(user);
    });
  }, [navigation]);

  const logout = async () => {
    clearData();
    navigation.replace('Login');
  };

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Welcome</Text>
      {user && <Text style={styles.subTitle}>{user.email}</Text>}
      <Gap height={40} />
      <Button title="Log Out" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1, paddingHorizontal: 40, paddingTop: 80},
  title: {fontSize: 40},
  subTitle: {fontSize: 20},
});
