import * as Application from 'expo-application';
import sha256 from 'crypto-js/sha256';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getDeviceId = function(){
    return Application.androidId
}

const hash = function(str) {
    return sha256(str).toString()
}

const getAPIHeaders = function(){
    return {
        'Content-Type': 'application/json;charset=UTF-8',
    }
}

const getLoginHeaders = async function(){
    return {
        'Content-Type': 'application/json;charset=UTF-8',
        'at': await AsyncStorage.getItem('at'),
        'uid': await AsyncStorage.getItem('uid'),
    }
}

const setData = async function(user) {
    await AsyncStorage.setItem('uid', user.id.toString());
    await AsyncStorage.setItem('name', user.name);
    await AsyncStorage.setItem('at', user.at);
    await AsyncStorage.setItem('role', user.role);
}

export {hash, getDeviceId, getAPIHeaders, getLoginHeaders, setData};