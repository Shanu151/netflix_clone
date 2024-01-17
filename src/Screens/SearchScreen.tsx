import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Search from "../components/search/Card/Search";
import { Theme } from "../Theme";
import HeaderTitle from "../components/search/HeaderTitle";
import SearchCard from "../components/search/Card/SearchCard";
import { getSearchData } from "../services/SearchData";

const SearchScreen = () => {
  const [isLoaing, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [text, setText] = useState<any>("trending");
  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await getSearchData(text || "top10");
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [text]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.black, gap: 10 }}>
      <StatusBar barStyle="light-content" backgroundColor={Theme.black} />
      <Search onTextChange={setText} />
      <HeaderTitle />
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl
            refreshing={isLoaing}
            colors={["red"]}
            onRefresh={getData}
          />
        }
        contentContainerStyle={{ rowGap: 10 }}
        renderItem={SearchCard}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
