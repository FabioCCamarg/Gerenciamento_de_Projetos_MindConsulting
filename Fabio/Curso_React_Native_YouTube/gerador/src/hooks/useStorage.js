import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const getItem = async (key) => {
    try {
      const passwords = await AsyncStorage.getItem(key);
      return JSON.parse(passwords) || [];
    } catch (err) {
      console.log("Erro ao buscar", err);
      return [];
    }
  };

  const saveItem = async (key, value) => {
    try {
      let passwords = await getItem(key);
      passwords.push(value);

      await AsyncStorage.setItem(key, JSON.stringify(passwords));
    } catch (err) {
      console.log("Erro ao salvar", err);
    }
  };

  const removeItem = async (key, item) => {
    try {
      let passwords = await getItem(key);
      let myPasswods = passwords.filter((password) => {
        return password !== item;
      });

      await AsyncStorage.setItem(key, JSON.stringify(myPasswods));
      return myPasswods;
    } catch (err) {
      console.log("Erro ao Deletar", err);
    }
  };

  return {
    getItem,
    saveItem,
    removeItem,
  };
};

export default useStorage;
