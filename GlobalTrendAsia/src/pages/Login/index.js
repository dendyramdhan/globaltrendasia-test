import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, Input, Loading} from '../../components';
import {colors, showError, storeData, useForm, getData} from '../../utils';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: 'ramdhandendy@gmail.com',
    password: 'globaltrendasia',
  });
  const [loading, setLoading] = useState(false);

  // AsyncStorage.clear();
  useEffect(() => {
    getData('user').then((user) => {
      if (user) {
        navigation.replace('Success');
      }
    });
  }, [navigation]);

  const login = async () => {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: form.email, password: form.password}),
    };

    fetch(
      `http://c21acf9f055a.ngrok.io/api/v1/users/authenticate`,
      requestOptions,
    )
      .then((response) => {
        return response.text().then((text) => {
          const data = text && JSON.parse(text);

          if (!response.ok) {
            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
          }

          return data;
        });
      })
      .then((user) => {
        storeData('user', user);
        setLoading(false);
        navigation.replace('Success');
      })
      .catch((err) => {
        setLoading(false);
        navigation.replace('Failed', err);
      });
  };

  return (
    <>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <Text style={styles.title}>Silahkan Login</Text>
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={(value) => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={(value) => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={40} />
          <Button title="Sign In" onPress={login} />
          <Gap height={30} />
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: colors.text.primary,
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 153,
  },
});
