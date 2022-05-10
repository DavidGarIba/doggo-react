import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  TextInput,
  Text,
  Button,
  Alert,
  FlatList,
} from "react-native";

import { db, auth } from "../FirebaseConfig";

import AppLoading from "expo-app-loading";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

import NotesListItem from "../components/NotesListItem";
import { styles } from "../styles/styles";
import { useNavigation, useRoute } from "@react-navigation/native";

import logo from "../assets/Dogo_logo_v2.png";

function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  let soundObject = null;

  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [databaseData, setDatabaseData] = useState("");

  useEffect(
    () => {
      playAudio();
    },
    // add [] as extra argument to only have this fire on mount and unmount (or else it fires every render/change)
    []
  );

  // function addNoteItemHandler(noteItem) {
  //   saveToDatabase(
  //     noteItem.key,
  //     noteItem.name,
  //     noteItem.gender,
  //     noteItem.age,
  //     noteItem.breed,
  //     noteItem.dimensions,
  //     noteItem.weight,
  //     noteItem.image
  //   );
  //   console.log(noteItem);
  // }

  function sendName(itemId) {
    var itemSelected = databaseData.filter((item) => item.key == itemId);
    return itemSelected[0].name;
  }

  function sendGender(itemId) {
    var itemSelected = databaseData.filter((item) => item.key == itemId);
    return itemSelected[0].gender;
  }

  function sendAge(itemId) {
    var itemSelected = databaseData.filter((item) => item.key == itemId);
    return itemSelected[0].age;
  }

  function sendBreed(itemId) {
    var itemSelected = databaseData.filter((item) => item.key == itemId);
    return itemSelected[0].breed;
  }

  function sendDimensions(itemId) {
    var itemSelected = databaseData.filter((item) => item.key == itemId);
    return itemSelected[0].dimensions;
  }

  function sendWeight(itemId) {
    var itemSelected = databaseData.filter((item) => item.key == itemId);
    return itemSelected[0].weight;
  }

  function sendImage(itemId) {
    var itemSelected = databaseData.filter((item) => item.key == itemId);
    return itemSelected[0].image;
  }

  function dataToUpdate(itemId) {
    navigation.navigate("UpdateNote", {
      name: sendName(itemId),
      gender: sendGender(itemId),
      age: sendAge(itemId),
      breed: sendBreed(itemId),
      dimensions: sendDimensions(itemId),
      weight: sendWeight(itemId),
      image: sendImage(itemId),
      key: itemId,
      onCreate: onNoteUpdated,
    });
    // console.log(itemId);
  }

  const onNoteUpdated = (noteItem) => {
    saveDataWithFirebase(noteItem);
    retrieveDataFromFirebase();
  };

  playAudio = async () => {
    await Audio.setAudioModeAsync({
      // set to false to play through speaker (instead of headset)
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });

    soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require("../assets/audio/intro_jingle.mp3"));
      await soundObject.setStatusAsync({ isLooping: false });
      await soundObject.playAsync();
      // console.log("we are playing the jingle!");
    } catch (error) {
      console.log("An error occurred on playback:");
      console.log(error);
    }
  };

  registerWithFirebase = () => {
    if (registrationEmail.length < 4) {
      Alert.alert("Please enter an email address.");
      return;
    }

    if (registrationPassword.length < 4) {
      Alert.alert("Please enter a password.");
      return;
    }

    auth
      .createUserWithEmailAndPassword(registrationEmail, registrationPassword)
      .then(function (_firebaseUser) {
        Alert.alert("user registered!");

        setRegistrationEmail("");
        setRegistrationPassword("");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == "auth/weak-password") {
          Alert.alert("The password is too weak.");
        } else {
          Alert.alert(errorMessage);
        }
        console.log(error);
      });
  };

  loginWithFirebase = () => {
    if (loginEmail.length < 4) {
      Alert.alert("Please enter an email address.");
      return;
    }

    if (loginPassword.length < 4) {
      Alert.alert("Please enter a password.");
      return;
    }

    auth
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .then(function (_firebaseUser) {
        Alert.alert("User logged in!");
        setLoggedIn(true);

        // load data
        retrieveDataFromFirebase();
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          Alert.alert("Wrong password.");
        } else {
          Alert.alert(errorMessage);
        }
      });
  };

  signoutWithFirebase = () => {
    auth.signOut().then(function () {
      // if logout was successful
      if (!auth.currentUser) {
        Alert.alert("User logged out!");
        setLoggedIn(false);
      }
    });
  };

  function saveDataWithFirebase(item) {
    // *********************************************************************
    // When saving data, to create a new collection you can use SET
    // and when updating you can use UPDATE (refer to docs for more info)
    // -- https://firebase.google.com/docs/firestore/manage-data/add-data
    // *********************************************************************

    var userId = auth.currentUser.uid;

    // SAVE DATA TO REALTIME DB
    db.ref("users/" + userId + "/" + item.key).set({
      key: item.key,
      name: item.name,
      gender: item.gender,
      age: item.age,
      breed: item.breed,
      dimensions: item.dimensions,
      weight: item.weight,
      image: item.image,
    });
    retrieveDataFromFirebase();
  }

  function retrieveDataFromFirebase() {
    // *********************************************************************
    // When loading data, you can either fetch the data once like in these examples
    // -- https://firebase.google.com/docs/firestore/query-data/get-data
    // or you can listen to the collection and whenever it is updated on the server
    // it can be handled automatically by your code
    // -- https://firebase.google.com/docs/firestore/query-data/listen
    // *********************************************************************

    var userId = auth.currentUser.uid;

    /*****************************/
    // LOAD DATA FROM REALTIME DB
    /*****************************/

    // read once from data store
    db.ref("/users/" + userId)
      .once("value")
      .then(function (snapshot) {
        setDatabaseData(Object.values(snapshot.val()));
      });
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.form}>
        {!loggedIn && (
          <View>
            <View style={styles.imageContainer}>
              <Image source={logo} style={styles.logo}></Image>
            </View>
            <Text style={styles.doggo}>Doggo</Text>

            <View>
              <Text style={styles.label}>Sign In</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) => setLoginEmail(value)}
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                keyboardType="email-address"
                placeholder="email"
              />
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                onChangeText={(value) => setLoginPassword(value)}
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="password"
                keyboardType="visible-password"
                placeholder="password"
              />
              <Button
                style={styles.button}
                title="Login"
                color="#F6973D"
                onPress={loginWithFirebase}
              />
            </View>
            <View>
              <Text style={styles.label}>OR</Text>
            </View>
            <View>
              <Text style={styles.label}>Register</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) => setRegistrationEmail(value)}
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                keyboardType="email-address"
                placeholder="email"
              />
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                onChangeText={(value) => setRegistrationPassword(value)}
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="password"
                keyboardType="visible-password"
                placeholder="password"
              />
              <Button
                style={styles.button}
                color="#F6973D"
                title="Register"
                onPress={registerWithFirebase}
              />
            </View>
          </View>
        )}
        {loggedIn && (
          <View style={styles.form}>
            <View style={styles.addButtonContainer}>
              <Ionicons
                name="paw"
                size={60}
                color="#F6973D"
                onPress={() => {
                  navigation.navigate("NewNote", {
                    onCreate: saveDataWithFirebase,
                  });
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <FlatList
                data={databaseData}
                renderItem={(itemData) => (
                  <NotesListItem
                    id={itemData.item.key}
                    onPress={dataToUpdate}
                    name={itemData.item.name}
                    breed={itemData.item.breed}
                    gender={itemData.item.gender}
                    image={itemData.item.image}
                  />
                )}
              />
            </View>
            <View>
              <Button
                title="Sign Out"
                color="#F6973D"
                onPress={signoutWithFirebase}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default HomeScreen;
