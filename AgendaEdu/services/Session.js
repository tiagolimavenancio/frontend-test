import { AsyncStorage } from 'react-native'

export default {
    Credential: {
        set: async (key, token) => {
            try {
                await AsyncStorage.setItem(key, JSON.stringify(token))
            } catch (e) {
                console.warn(e)
            }
        },
        multiSet: async (sets) => {
            try {
                await AsyncStorage.multiSet(sets)
            } catch (e) {
                console.warn(e)
            }
        },
        get: async (key) => {
            try {
                const credential = await AsyncStorage.getItem(key)
                return credential ? JSON.parse(credential) : null
            } catch (e) {
                console.warn(e)
            }
        },
        multiGet: async () => {

        },
        destroy: async (key) => {
            try {
                await AsyncStorage.removeItem(key)
            } catch (e) {
                console.warn(e)
            }
        },
        multiDestroy: async (keys) => {
            try {   
                await AsyncStorage.multiRemove(keys)
            } catch (e) {
                console.warn(e)
            }
        },
        currentUser: null
    }
}