import React, {useState} from 'react';
import {
  View, 
  Text, 
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { getLoginHeaders } from '../../Config/util';
import { activities, server } from '../../Config/config';

const HomeScreen = ({navigation}) => {

  const clickHandler = () => {
    //function to handle click on floating Action Button
    alert('Floating Button Clicked');
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [activityDescription, setActivityDescription] = useState('');
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);

  const submitActivity = () => {
    setErrortext('');
    if (!activityDescription) {
      alert('Please description');
      return;
    }

    setLoading(true);
    let dataToSend = {
      description: activityDescription, 
      rt: Date.now(),
      lat: "24.75",
      lon: "72.45"
    };
    getLoginHeaders().then(
      obj => {
        const headers = obj
        fetch(server+activities, {
          method: 'POST',
          body: JSON.stringify(dataToSend),
          headers: headers
        })
          .then((response) => response.json())
          .then((responseJson) => {
            //Hide Loader
            setLoading(false);
            // If server response message same as Data Matched
            if (responseJson.status === 0) {
              console.log(responseJson);
              navigation.replace('DrawerNavigationRoutes');
            } else {
              setErrortext(responseJson.msg);
              console.log('Please check your phone or password');
            }
          })
          .catch((error) => {
            //Hide Loader
            setLoading(false);
            console.error(error);
          });

      }
    )

  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>

      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <KeyboardAvoidingView enabled>
            <TextInput
                style={styles.inputStyle}
                onChangeText={(ActivityDescription) =>
                  setActivityDescription(ActivityDescription)
                }
                placeholder="Enter Activity" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
              </KeyboardAvoidingView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => submitActivity()}>
              <Text style={styles.textStyle}>Post</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Example of Splash, Login and Sign Up in React Native
            {'\n\n'}
            This is the Home Screen
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          Splash, Login and Register Example{'\n'}React Native
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          www.aboutreact.com
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
//          onPress={clickHandler}
          onPress={() =>  setModalVisible(true)}
          style={styles.touchableOpacityStyle}>
          <Image
            //We are making FAB using TouchableOpacity with an image
            //We are using online image here
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            //You can use you project image Example below
            //source={require('./images/float-add-icon.png')}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
});


export default HomeScreen;