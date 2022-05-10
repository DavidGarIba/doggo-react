import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";

import { styles } from "../styles/styles";

function NotesListItem(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress.bind(this, props.id)}
    >
      <View style={styles.listItem}>
        <Image style={styles.imageList} source={{ uri: props.image }}></Image>
        <Text>
          {props.name}
          {" - "}
          {props.breed}
          {" - "}
          {props.gender}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default NotesListItem;
