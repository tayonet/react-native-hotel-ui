import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  Animated,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Feather, MaterialIcons } from "@expo/vector-icons";
import COLORS from "../../src/consts/colors";
import hotels from "../../src/consts/hotels";
import React, { useState, useRef } from "react";
const { width } = Dimensions.get("screen");
const cardWidth = width / 1.6;
const HomeScreen = ({ navigation }) => {
  const categories = ["All", "Popular", "Top Rated", "Featured", "Luxury"];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeCardIndex, setActiveCardIndex] = React.useState(0);
  const CategoryList = ({ navigation }) => {
    return (
      <View style={styles.categoryListContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}
          >
            <View>
              <Text
                style={{
                  ...styles.categoryListText,
                  color:
                    selectedCategoryIndex === index
                      ? COLORS.primary
                      : COLORS.grey,
                }}
              >
                {item}
              </Text>
              {selectedCategoryIndex === index && (
                <View
                  style={{
                    height: 3,
                    width: 25,
                    backgroundColor: COLORS.primary,
                    marginTop: 2,
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Card = ({ hotel, index }) => {
    const navigation = useNavigation();
    const inputRange = [
      (index - 1) * cardWidth,
      index * cardWidth,
      (index + 1) * cardWidth,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 0, 0.7],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
    });
    return (
      <TouchableOpacity
        disabled={activeCardIndex != index}
        onPress={() => navigation.navigate("Details", hotel)}
        activeOpacity={1}
      >
        <Animated.View style={{ ...styles.card, transform: [{ scale }] }}>
          <Animated.View style={{ ...styles.cardOverlay, opacity }} />
          <View style={styles.priceTag}>
            <Text
              style={{ color: COLORS.white, fontSize: 20, fontWeight: "bold" }}
            >
              ${hotel.price}
            </Text>
          </View>
          <Image source={hotel.image} style={styles.cardImage} />
          <View style={styles.cardDetails}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                  {hotel.name}
                </Text>
                <Text style={{ fontSize: 12, color: COLORS.grey }}>
                  {hotel.location}
                </Text>
              </View>
              <Feather name="bookmark" size={22} color={COLORS.primary} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Feather name="star" size={15} color={COLORS.orange} />
                <Feather name="star" size={15} color={COLORS.orange} />
                <Feather name="star" size={15} color={COLORS.orange} />
                <Feather name="star" size={15} color={COLORS.orange} />
                <Feather name="star" size={15} color={COLORS.grey} />
              </View>
              <Text style={{ fontSize: 10, color: COLORS.grey }}>
                365 previews
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const TopHotelCard = ({ hotel }) => {
    return (
      <View style={styles.topHotelCard}>
        <View
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: "row",
          }}
        >
          <MaterialIcons name="grade" size={15} color={COLORS.orange} />
          <MaterialIcons name="grade" size={15} color={COLORS.orange} />
          <MaterialIcons name="grade" size={15} color={COLORS.orange} />
        </View>
        <Image style={styles.topHotelCardImage} source={hotel.image} />
        <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>{hotel.name}</Text>
          <Text style={{ fontSize: 7, fontWeight: "bold", color: COLORS.grey }}>
            {hotel.location}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <View style={{ paddingBottom: 15 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            Find your hotel
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>in </Text>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: COLORS.primary,
              }}
            >
              Paris
            </Text>
          </View>
        </View>
        <Feather name="user" size={30} color={COLORS.primary} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchInputContainer}>
          <Feather name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput
            placeholder="Search"
            style={{ fontSize: 20, paddingLeft: 10 }}
          />
        </View>
        <CategoryList />
        <View>
          <Animated.FlatList
            onMomentumScrollEnd={(e) => {
              //   console.log(
              //     Math.round(e.nativeEvent.contentOffset.x / cardWidth)
              //   );
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth)
              );
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            horizontal
            data={hotels}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Card hotel={item} index={index} />
            )}
            snapToInterval={cardWidth}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", color: COLORS.grey }}>
            Top hotels
          </Text>
          <Text style={{ color: COLORS.grey }}>Show all</Text>
        </View>
        <FlatList
          horizontal
          data={hotels}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 20,
            marginTop: 20,
            paddingBottom: 30,
          }}
          renderItem={({ item }) => <TopHotelCard hotel={item} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.primary,
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  card: {
    height: 280,
    width: cardWidth,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.primary,
    position: "absolute",
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    padding: 20,
    width: "100%",
  },
  cardOverlay: {
    height: 200,
    backgroundColor: COLORS.white,
    position: "absolute",
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topHotelCard: {
    height: 120,
    width: 120,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    elevation: 15,
  },
  topHotelCardImage: {
    height: 80,
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});
export default HomeScreen;
