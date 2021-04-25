import React from "react";
import { ScrollView, View, Text } from "react-native";
import COLORS from "../../src/consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native";
import { ImageBackground, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const DetailsScreen = ({ navigation, route }) => {
  const item = route.params;
  console.log(item);
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: COLORS.white,
          paddingBottom: 20,
        }}
      >
        <ImageBackground style={styles.headerImage} source={item.image}>
          <View style={styles.header}>
            <Feather
              name="arrow-left"
              onPress={navigation.goBack}
              size={28}
              color={COLORS.white}
            />
            <Feather name="bookmark" size={28} color={COLORS.white} />
          </View>
        </ImageBackground>
        <View>
          <View style={styles.iconContainer}>
            <Feather name="map-pin" color={COLORS.white} size={26} />
          </View>
          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: COLORS.grey,
                marginTop: 5,
              }}
            >
              {item.location}
            </Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row" }}>
                  <MaterialIcons name="grade" size={20} color={COLORS.orange} />
                  <MaterialIcons name="grade" size={20} color={COLORS.orange} />
                  <MaterialIcons name="grade" size={20} color={COLORS.orange} />
                  <MaterialIcons name="grade" size={20} color={COLORS.orange} />
                  <MaterialIcons name="grade" size={20} color={COLORS.grey} />
                </View>
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, marginLeft: 5 }}
                >
                  4.0
                </Text>
              </View>
              <Text style={{ fontSize: 13, color: COLORS.grey }}>
                354 reviews
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ lineHeight: 20, color: COLORS.grey }}>
                {item.details}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Price per night
            </Text>
            <View style={styles.priceTag}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: COLORS.grey,
                  marginLeft: 5,
                }}
              >
                {item.price}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: COLORS.grey,
                  marginLeft: 5,
                }}
              >
                + breakfast
              </Text>
            </View>
          </View>
          <View style={styles.btn}>
            <Text
              style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}
            >
              Book Now
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    height: 300,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: "hidden",
  },
  header: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  iconContainer: {
    position: "absolute",
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  priceTag: {
    height: 40,
    alignItems: "center",
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: "row",
  },
  btn: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    alignItems: "center",
    borderRadius: 10,
  },
});

export default DetailsScreen;
