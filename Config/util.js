import * as Application from 'expo-application';
import sha256 from 'crypto-js/sha256';

const getDeviceId = function(){
    return Application.androidId
}

const hash = function(str) {
    return sha256(str).toString()
}




export {hash, getDeviceId};