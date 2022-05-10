import React, { useState } from "react";
import { Alert, Text, View, TextInput, Button, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SMS from "expo-sms";
import * as MailComposer from "expo-mail-composer";

import ImageSelector from "../components/ImageSelector";
import { styles } from "../styles/styles";
import { useNavigation, useRoute } from "@react-navigation/native";

function UpdateNote() {
  const navigation = useNavigation();
  const route = useRoute();

  const [postName, setName] = useState(route.params.name);
  const [postGender, setGender] = useState(route.params.gender);
  const [postAge, setAge] = useState(route.params.age);
  const [postBreed, setBreed] = useState(route.params.breed);
  const [postDimensions, setDimensions] = useState(route.params.dimensions);
  const [postWeight, setWeight] = useState(route.params.weight);
  const [updatedImage, setUpdatedImage] = useState(route.params.image);

  const imageSelectedHandler = (imagePath) => {
    setUpdatedImage(imagePath);
  };

  function nameHandler(value) {
    setName(value);
  }

  function genderHandler(value) {
    setGender(value);
  }

  function ageHandler(value) {
    setAge(value);
  }

  function breedHandler(value) {
    setBreed(value);
  }

  function dimensionsHandler(value) {
    setDimensions(value);
  }

  function weightHandler(value) {
    setWeight(value);
  }

  function updateHandler() {
    if (updatedImage != null) {
      route.params.onCreate({
        key: route.params.key,
        name: postName,
        gender: postGender,
        age: postAge,
        breed: postBreed,
        dimensions: postDimensions,
        weight: postWeight,
        image: updatedImage,
      });
      navigation.goBack();
    } else {
      Alert.alert("Please select an image for the post.");
    }
  }

  function updateExecution() {
    updateHandler();
    Alert.alert(
      "Post Saved",
      "Your post has been saved/updated!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK" },
      ],
      { cancelable: false }
    );
  }

  function promptForAlertSms() {
    Alert.alert(
      "SMS sent!",
      postName,
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );
  }

  async function sendSms() {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        "1234567890",
        `${postName} - ${postGender}`
      );
    } else {
      Alert.alert("SMS is not available!");
    }
    promptForAlertSms();
  }

  function promptForAlertEmail() {
    Alert.alert(
      "Email sent!",
      postName,
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );
  }

  async function sendEmail() {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      var options = {
        recipients: ["d_garciaibanez@fanshaweonline.ca"],
        subject: postName,
        body: postGender,
      };
      MailComposer.composeAsync(options).then((result) => {
        console.log(result.status);
        promptForAlertEmail();
      });
    } else {
      Alert.alert("Email is not available!");
    }
  }

  return (
    <View style={styles.form}>
      <View style={styles.containerSend}>
        <View style={styles.send}>
          <Ionicons
            name="chatbox"
            size={30}
            color="#F6973D"
            onPress={sendSms}
          />
        </View>
        <View style={styles.send}>
          <Ionicons name="mail" size={30} color="#F6973D" onPress={sendEmail} />
        </View>
      </View>
      <View style={styles.bigContainer}>
        <Text style={styles.labelHeading}>Image</Text>
        <View>
          {!updatedImage && (
            <ImageSelector onImageSelected={imageSelectedHandler} />
          )}
          {updatedImage && (
            <View>
              <Image style={styles.image2} source={{ uri: updatedImage }} />
              <Button
                title="Reset"
                color="#F6973D"
                onPress={() => {
                  setUpdatedImage(null);
                }}
              />
            </View>
          )}
        </View>
      </View>

      <View style={styles.smallContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          multiline
          numberOfLines={1}
          onChangeText={nameHandler}
          value={postName}
        />
      </View>

      <View style={styles.smallContainer}>
        <TextInput
          style={styles.textInputPost}
          placeholder="Gender"
          multiline
          numberOfLines={1}
          onChangeText={genderHandler}
          value={postGender}
        />
      </View>
      <View style={styles.smallContainer}>
        <TextInput
          style={styles.textInputPost}
          placeholder="Age"
          multiline
          numberOfLines={1}
          onChangeText={ageHandler}
          value={postAge}
        />
      </View>
      <View style={styles.smallContainer}>
        <TextInput
          style={styles.textInputPost}
          placeholder="Breed"
          multiline
          numberOfLines={1}
          onChangeText={breedHandler}
          value={postBreed}
        />
      </View>
      <View style={styles.smallContainer}>
        <TextInput
          style={styles.textInputPost}
          placeholder="Dimensions: Height - Width (cm)"
          multiline
          numberOfLines={1}
          onChangeText={dimensionsHandler}
          value={postDimensions}
        />
      </View>
      <View style={styles.smallContainer}>
        <TextInput
          style={styles.textInputPost}
          placeholder="Weight: (kg)"
          multiline
          numberOfLines={1}
          onChangeText={weightHandler}
          value={postWeight}
        />
      </View>

      <View style={styles.saveButtonContainer}>
        <Button title="Update Post" color="#F6973D" onPress={updateExecution} />
      </View>
    </View>
  );
}

export default UpdateNote;
