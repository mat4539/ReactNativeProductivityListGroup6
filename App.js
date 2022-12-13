import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useState, useRef, useEffect} from 'react';
import {
  setTasks,
  removeTask,
  setJokeOfDay,
  setFirstName,
  setLastName,
  setEmail,
} from './redux/actions';
import {useDispatch, useSelector} from 'react-redux';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Easing,
  Button,
  Linking,
  Image,
} from 'react-native';

const Stack = createStackNavigator();

const getRandomJoke = e => {
  fetch('https://official-joke-api.appspot.com/random_joke')
    .then(response => {
      return response.json();
    })
    .then(data => {
      setJokeOfDay(JSON.stringify(data.setup), JSON.stringify(data.punchline));
    })
    .catch(err => {
      console.log(err, err.response);
    });
};

const HomePage = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={{backgroundColor: '#1e1a3e', width: '100%', height: '100%'}}>
      <View style={styles.page}>
        <Modal
          animationType={'slide'}
          visible={modalVisible}
          transparent={true}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.modalView}>
              <Text style={{color: '#1e1a3e', fontWeight: 'bold'}}>
                Are you sure you want to Register?
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.buttons}
                  activeOpacity={0.5}
                  title="Yes"
                  color="#ff007a"
                  onPress={() => {
                    setModalVisible(false);
                    setModalVisible2(true);
                  }}>
                  <Text style={styles.texts}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttons}
                  activeOpacity={0.5}
                  title="No"
                  color="#3f3264"
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text style={styles.texts}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={'slide'}
          visible={modalVisible2}
          transparent={true}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.modalView}>
              <Text style={{color: '#1e1a3e', fontWeight: 'bold'}}>
                You Have Registered Successfully!
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible2(false);
                  navigation.navigate("Today's Tasks", {
                    firstName: {setFirstName},
                    lastName: {setLastName},
                  });
                }}>
                <View style={styles.register}>
                  <Text
                    style={{
                      color: '#3f3264',
                      fontWeight: 'bold',
                      paddingTop: 3,
                    }}>
                    Click to Start Managing Your Life
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Animated.View
          style={{
            backgroundColor: '#3f3264',
            opacity: fadeAnim,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#c7bce1',
              fontWeight: 'bold',
            }}>
            TODO | Managing your Life Daily
          </Text>
        </Animated.View>
        <Text
          style={{
            textAlign: 'center',
            color: '#c7bce1',
            fontWeight: 'bold',
            paddingTop: 40,
          }}>
          Register With Your Name and Email!
        </Text>
        <TextInput
          style={styles.textinput}
          value={setFirstName}
          onChangeText={setFirstName}
          placeholder="First Name"
        />
        <TextInput
          style={styles.textinput}
          value={setLastName}
          onChangeText={setLastName}
          placeholder="Last Name"
        />
        <TextInput
          style={styles.textinput}
          value={setEmail}
          onChangeText={setEmail}
          placeholder="email@gmail.com"
        />
        <TouchableOpacity
          style={styles.register}
          activeOpacity={0.5}
          title="Register"
          color="#c7bce1"
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text
            style={{
              color: '#c7bce1',
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center',
              marginTop: 2,
            }}>
            Register
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: 'center',
            color: '#c7bce1',
            marginTop: 25,
          }}>
          Or continue with
        </Text>

        <TouchableOpacity
          style={{
            marginTop: 20,
          }}
          onPress={() => {
            Linking.openURL('https://www.google.com/');
          }}>
          <Text
            style={{
              color: '#3f3264',
              backgroundColor: '#c7bce1',
              width: 120,
              height: 35,
              borderRadius: 100,
              paddingTop: 5,
              fontSize: 17,
            }}>
            {' '}
            <Image
              style={{
                height: 20,
                width: 20,
                paddingTop: 20,
                alignContent: 'center',
              }}
              source={require('./assets/google.png')}
            />
            Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: -30,
            marginLeft: 150,
          }}
          onPress={() => {
            Linking.openURL('https://www.facebook.com/');
          }}>
          <Text
            style={{
              color: '#3f3264',
              backgroundColor: '#c7bce1',
              width: 120,
              height: 35,
              borderRadius: 100,
              paddingTop: 5,
              fontSize: 17,
            }}>
            <Image
              style={{
                height: 20,
                width: 20,
                paddingTop: 20,
              }}
              source={require('./assets/facebook.png')}
            />
            Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            opacity: fadeAnim,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            marginTop: 20,
          }}
          activeOpacity={0.5}
          title="Contact"
          color="#c7bce1"
          onPress={() => {
            setModalVisible3(true);
          }}>
          <Text
            style={{
              color: '#c7bce1',
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center',
              marginTop: 2,
            }}>
            Contact Page
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TaskPage = ({route}) => {
  const [data, setData] = useState([]);
  const [indicator, setIndicator] = useState(false);
  const [key] = useState('');
  const {firstName} = route.params.firstName;
  const {lastName} = route.params.lastName;

  const Welcome = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(Welcome, {
      duration: 4000,
      toValue: 10,
      easing: Easing.elastic(20),
    }).start(() => {});
  }, [Welcome]);

  return (
    <View style={styles.page}>
      <Animated.View
        style={[
          styles.texts,
          {
            left: Welcome,
            backgroundColor: Welcome.interpolate({
              inputRange: [0, 100],
              outputRange: ['transparent', 'transparent'],
            }),
          },
        ]}>
        <Text style={styles.texts}>
          Welcome {firstName} {lastName}!
        </Text>
      </Animated.View>

      <ActivityIndicator
        style={{justifyContent: 'center'}}
        color="pink"
        size={30}
        animating={indicator}
      />
    </View>
  );
};

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const completeTask = index => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            headerTintColor: '#c7bce1',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#3f3264'},
          }}>
          <Stack.Screen name="Sign Up" component={HomePage} />
          <Stack.Screen name="Today's Tasks" component={TaskPage} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    flex: 1,
  },
  textinput: {
    padding: 10,
    height: 45,
    borderWidth: 1,
    margin: 10,
    borderRadius: 9,
    color: 'grey',
    justifyContent: 'center',
    backgroundColor: '#3f3264',
  },
  modalView: {
    padding: 15,
    backgroundColor: '#c7bce1',
    width: '80%',
    borderWidth: 1,
    borderRadius: 9,
  },
  register: {
    borderWidth: 1,
    height: 30,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#c7bce1',
    marginTop: 15,
  },
  buttons: {
    backgroundColor: '',
    borderWidth: 1,
    height: 30,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 20,
    width: 100,
    borderColor: '#c7bce1',
    marginTop: 15,
  },
  texts: {
    color: '#3f3264',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 2,
  },
});
