import AsyncStorage from '@react-native-async-storage/async-storage';

const storeInAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log(e)
    }
}

const getFromAsyncStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
            return value
        }
    } catch(e) {
        console.log(e)
    }
}

const timestampToDate = (ts) => {
    let date = new Date(ts * 1000)
    return date.toLocaleDateString()
}

export { storeInAsyncStorage, getFromAsyncStorage, timestampToDate }