import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  form: {
    flex: 1,
    margin: 15,
  },
  label: {
    fontSize: 18,
    textAlign: "center",
  },
  labelHeading: {
    fontSize: 13,
    textAlign: "left",
    textTransform: "uppercase",
  },
  textInput: {
    borderColor: "#000",
    borderWidth: 2,
    marginBottom: 15,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 2,
    textAlignVertical: "top",
  },
  textInputPost: {
    borderColor: "#000",
    borderWidth: 2,
    marginBottom: 5,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 2,
    textAlignVertical: "top",
  },
  listItem: {
    padding: 10,

    borderBottomColor: "#F6973D",
    borderTopColor: "#F6973D",
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
  doggo: {
    fontFamily: "Inter_900Black",
    fontSize: 30,
    textAlign: "center",
  },
  logo: {
    width: 130,
    height: 160,
  },
  imageContainer: {
    alignItems: "center",
    padding: 5,
  },
  image: {
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },
  image2: {
    alignItems: "center",
    padding: 80,
  },
  imageList: {
    alignItems: "center",
    padding: 100,
    marginVertical: 10,
  },
  headerContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 7,
  },
  noteContainer: {
    flex: 1,
    justifyContent: "center",
  },
  smallContainer: {
    flex: 1,
    justifyContent: "center",
  },
  bigContainer: {
    flex: 5,

    justifyContent: "center",
  },
  addButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  saveButtonContainer: {
    flex: 1,
  },
  buttonContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  containerSend: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    color: "#F6973D",
  },
});
