import React from "react";
import { StyleSheet, View, TextInput, Keyboard } from "react-native";

// components
import HeaderTitle from "./HeaderTitle.js";
import HeaderBack from "./HeaderBack.js";
import HeaderNext from "./HeaderNext.js";
import NineOneOne from "./NineOneOne.js";
import Summary from "./Summary.js";

// images
import summary_pencil from "../assets/images/summary_icon_pencil-alt.png";

export default class DescriptionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      descriptionColor: "#888",
      screenOffset: 0,
    };
  }

  UNSAFE_componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
  }

  componentDidMount() {
    this.startingDescription();
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  keyboardDidShow = (event) => {
    this.setState({
      screenOffset: -160,
    });
  };

  keyboardDidHide = (event) => {
    this.setState({
      screenOffset: 0,
    });
  };

  startingDescription() {
    currentDescription = this.props.navigation.getParam("description");
    if (currentDescription) {
      this.setState({
        descriptionColor: "#000",
        description: currentDescription,
      });
    } else {
      this.setState({
        descriptionColor: "#888",
        description: "Add description here...",
      });
    }
  }

  updateDescription(description) {
    this.setState({
      descriptionColor: "#000",
      description: description,
    });
    this.props.navigation.navigate("Description", {
      description: description,
    });
  }

  descriptionCheck() {
    if (this.state.description == "") {
      this.setState({
        descriptionColor: "#888",
        description: "Add description here...",
      });
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => (
        <HeaderBack
          navigation={navigation}
          text={"Back"}
          nav_link={"Location"}
          category={navigation.getParam("category")}
          location={navigation.getParam("location")}
          latitude={navigation.getParam("latitude")}
          longitude={navigation.getParam("longitude")}
          description={navigation.getParam("description")}
          image1={navigation.getParam("image1")}
          image2={navigation.getParam("image2")}
          firstName={navigation.getParam("firstName")}
          lastName={navigation.getParam("lastName")}
          email={navigation.getParam("email")}
          phone={navigation.getParam("phone")}
        />
      ),
      headerTitle: () => <HeaderTitle text={"Create A Report"} />,
      headerRight: () => (
        <HeaderNext
          navigation={navigation}
          text={"Next"}
          nav_link={"Photo"}
          category={navigation.getParam("category")}
          location={navigation.getParam("location")}
          latitude={navigation.getParam("latitude")}
          longitude={navigation.getParam("longitude")}
          description={navigation.getParam("description")}
          image1={navigation.getParam("image1")}
          image2={navigation.getParam("image2")}
          firstName={navigation.getParam("firstName")}
          lastName={navigation.getParam("lastName")}
          email={navigation.getParam("email")}
          phone={navigation.getParam("phone")}
        />
      ),
    };
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            paddingBottom: this.keyboardHeight,
            marginTop: this.state.screenOffset,
          },
        ]}
      >
        <View style={styles.header}>
          <NineOneOne />
          <Summary
            icon={summary_pencil}
            heading={"Add Description of Issue"}
            content={"Add notes, comments, license number, etc."}
          />
        </View>
        <View style={styles.description_wrap}>
          <TextInput
            onFocus={() => this.setState({ description: "" })}
            style={[styles.description, { color: this.state.descriptionColor }]}
            onChangeText={(description) => this.updateDescription(description)}
            value={this.state.description}
            multiline={true}
            underlineColorAndroid="transparent"
            onBlur={() => this.descriptionCheck()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 170,
    borderBottomWidth: 1,
    borderColor: "#585858",
  },
  description_wrap: {
    flex: 6,
  },
  description: {
    margin: 10,
  },
});
