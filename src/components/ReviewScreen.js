import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

// components
import HeaderTitle from "./HeaderTitle.js";
import HeaderBack from "./HeaderBack.js";
import HeaderNext from "./HeaderNext.js";
import NineOneOne from "./NineOneOne.js";
import Summary from "./Summary.js";

// images
import summary_icon_check from "../assets/images/summary_icon_check-circle.png";
import trash_img from "../assets/images/icon_trash-alt.png";
import road_img from "../assets/images/icon_road.png";
import truck_img from "../assets/images/icon_truck.png";
import volume_img from "../assets/images/icon_volume-up.png";
import wrench_img from "../assets/images/icon_wrench.png";
import car_img from "../assets/images/icon_car.png";
import question_img from "../assets/images/icon_question.png";
import recycle_img from "../assets/images/icon_recycle.png";
import sign_img from "../assets/images/icon_map-signs.png";
import tree_img from "../assets/images/icon_tree.png";
import ellipsis_img from "../assets/images/icon_ellipsis-h.png";
import house_img from "../assets/images/icon_house.png";
import sidewalk_img from "../assets/images/icon_sidewalk.png";

export default class ReviewScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  getCategoryIcon = (category) => {
    switch (category) {
      case "garbage_collection":
        return truck_img;
      case "trash_pickup":
        return trash_img;
      case "yard_waste":
        return tree_img;
      case "recycling":
        return recycle_img;
      case "pothole":
        return car_img;
      case "nuisance_complaint":
        return volume_img;
      case "park_maintenance":
        return wrench_img;
      case "dead_animal":
        return road_img;
      case "traffic_light":
        return sign_img;
      case "housing_complaint":
        return house_img;
      case "sidewalk_complaint":
        return sidewalk_img;
      case "other":
        return ellipsis_img;
      case "question":
        return question_img;
      default:
        return summary_icon_check;
    }
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => (
        <HeaderBack
          navigation={navigation}
          text={"Back"}
          nav_link={"Contact"}
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
      headerTitle: () => <HeaderTitle text={"Review Your Report"} />,
      headerRight: () => (
        <HeaderNext
          navigation={navigation}
          text={"Submit"}
          nav_link={"Home"}
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
    const report = this.props.navigation.state.params;
    return (
      <View style={[styles.container, {}]}>
        <View style={styles.header}>
          <NineOneOne />
          <Summary
            icon={summary_icon_check}
            heading={"Review Your Report"}
            content={
              "Review your report before submission. Return to previous screens to edit."
            }
          />
        </View>
        <View style={styles.review_wrap}>
          <Text style={styles.review_item}>
            Name: {report.firstName} {report.lastName}
          </Text>
          <Text style={styles.review_item}>Email Address: {report.email}</Text>
          <Text style={styles.review_item}>Phone Number: {report.phone}</Text>
          <Text style={styles.review_item}>Category: {report.category}</Text>
          <Text style={styles.review_item}>
            Location:{" "}
            {report.location ? report.location : "map location submitted"}
          </Text>
          <Text style={styles.review_item}>
            Description: {report.description}{" "}
          </Text>
          <Text style={styles.review_item}>
            Images Submitted: {report.image1 !== undefined ? "yes" : "none"}
          </Text>
          <Image
            source={this.getCategoryIcon(report.category)}
            style={styles.category_icon}
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
    height: 190,
    borderBottomWidth: 1,
    borderColor: "#585858",
    marginBottom: 10,
  },
  review_wrap: {
    flex: 1,
    margin: 20,
  },
  review_item: {
    fontSize: 18,
    padding: 10,
  },
  category_icon: {
    alignSelf: "center",
    marginTop: 20,
  },
});
