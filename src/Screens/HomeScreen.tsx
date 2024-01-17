import {
  Dimensions,
  FlatList,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Theme } from "../Theme";
import { getSearchData } from "../services/SearchData";
import HomeList from "../components/home/HomeList";
import Search from "../components/search/Card/Search";
import { navigate } from "../Navigator/utils";

const HomeScreen = () => {
  const [isLoaing, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [trending, setTrending] = useState<any>([]);
  const [top, setTop] = useState<any>([]);
  const [noll, setNoll] = useState<any>([]);
  const [african, setAfrican] = useState<any>([]);
  const [netflix, setNetflix] = useState<any>([]);

  const getData = async (item: string) => {
    try {
      setIsLoading(true);
      const { data } = await getSearchData(item || "all");
      setData(data);
      const trending = await getSearchData("Trending");
      setTrending(trending?.data);
      const top = await getSearchData("top");
      setTop(top?.data);
      const noll = await getSearchData("noll");
      setNoll(noll?.data);
      const african = await getSearchData("african");
      setAfrican(african?.data);
      const netflix = await getSearchData("netflix");
      setNetflix(netflix?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getData("all");
  }, []);

  const DATA = [
    {
      title: "Popular on Netflix",
      data: data,
    },
    {
      title: "Trending Now",
      data: trending,
    },
    {
      title: "Top 10 in Nigeria Today",
      data: top,
    },
    {
      title: "African Movies",
      data: african,
    },
    {
      title: "Nollywood Movies & TV",
      data: noll,
    },
    {
      title: "Netflix Originals",
      data: netflix,
    },
  ];

  const src =
    "https://assets.nflxext.com/ffe/siteui/vlv3/594f8025-139a-4a35-b58d-4ecf8fdc507c/d3c4e455-f0bf-4003-b7cd-511dda6da82a/IN-en-20240108-popsignuptwoweeks-perspective_alpha_website_small.jpg";
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.black }}>
      <FlatList
        data={DATA}
        ListHeaderComponent={
          <ImageBackground
            source={{ uri: src }}
            style={{ height: 300, paddingTop: 10 }}
          >
            <Search
              onTextChange={() => {
                navigate("Search", []);
              }}
            />
          </ImageBackground>
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoaing}
            colors={["red"]}
            onRefresh={() => getData("all")}
          />
        }
        nestedScrollEnabled
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={HomeList}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  img_container: {
    height: Dimensions.get("screen").height * 0.161,
    width: Dimensions.get("screen").height * 0.103,
    backgroundColor: "red",
  },
  contentContainerStyle: {
    rowGap: 10,
    columnGap: 5,
    flexGrow: 1,
  },
});
