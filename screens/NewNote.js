import React, { useState } from "react";
import { Alert, Button, Image, Text, View, TextInput } from "react-native";
import * as FileSystem from "expo-file-system";

import ImageSelector from "../components/ImageSelector";
import { styles } from "../styles/styles";
import { useNavigation, useRoute } from "@react-navigation/native";

function NewNote() {
  const navigation = useNavigation();
  const route = useRoute();

  const [postName, setName] = useState("");
  const [postGender, setGender] = useState("");
  const [postAge, setAge] = useState("");
  const [postBreed, setBreed] = useState("");
  const [postDimensions, setDimensions] = useState("");
  const [postWeight, setWeight] = useState("");
  const [postImage, setImage] = useState();

  const imageSelectedHandler = (imagePath) => {
    setImage(imagePath);
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

  function addItemHandler() {
    if (postImage != null) {
      route.params.onCreate({
        key: (Math.random() * 100000000000000000).toString(),
        name: postName,
        gender: postGender,
        age: postAge,
        breed: postBreed,
        dimensions: postDimensions,
        weight: postWeight,
        image: postImage,
      });
      navigation.goBack();
    } else {
      Alert.alert("Please select an image for the post.");
    }
  }

  saveToFile = () => {
    const filePath = FileSystem.documentDirectory + "MyNewTextFile.txt";
    FileSystem.writeAsStringAsync(filePath, postImage, {})
      .then(() => {
        console.log("Image was sent to DocumentDirectory!");
      })
      .catch((error) => {
        console.log("An error occurred: ");
        console.log(error);
      });
  };

  return (
    <View style={styles.form}>
      <View style={styles.bigContainer}>
        <Text style={styles.labelHeading}>Image</Text>
        <View>
          {!postImage && (
            <ImageSelector onImageSelected={imageSelectedHandler} />
          )}
          {postImage && (
            <View>
              <Image style={styles.image2} source={{ uri: postImage }} />
              <Button
                title="Reset"
                color="#F6973D"
                onPress={() => {
                  setImage(null);
                }}
              />
            </View>
          )}
        </View>
      </View>
      <View style={styles.smallContainer}>
        <TextInput
          style={styles.textInputPost}
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
        <Button title="Save" color="#F6973D" onPress={addItemHandler} />
      </View>
    </View>
  );
}

export default NewNote;
