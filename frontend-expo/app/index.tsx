import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, Pressable, ActivityIndicator, Animated } from "react-native";
import IntensityBar from "@/components/IntensityBar";

interface DwdsData {
  hits: number,
  frequency: number,
  total: string,
  q: string
}

interface WikiData {
  title: string,
  meanings: string,
  example: string,
}

export default function Index() {
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(false);

  const [dwdsData, setDwdsData] = useState<DwdsData | null>(null);
  const [wikiData, setWikiData] = useState<WikiData | null>(null);

  const handleSearch = async () => {
    setLoading(true);

    const dwdsResponse = await fetch(`http://localhost:5000/search/dwds/${searchString}`);
    const wikiResponse = await fetch(`http://localhost:5000/search/wiki/${searchString}`);

    if (dwdsResponse.ok) {
      const dwdsJson = await dwdsResponse.json()
      setDwdsData(dwdsJson);
    }
    if (wikiResponse.ok) {
      const wikiJson = await wikiResponse.json()
      setWikiData(wikiJson);
    }

    setLoading(false);
    // setSearchString("");
  }

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.input}
        placeholder="Type Here..."
        onChange={(value) => setSearchString(value.nativeEvent.text)}
        onSubmitEditing={handleSearch}
      />

      {loading &&
        <ActivityIndicator size="large" color="#697565"/>
      }

      {dwdsData &&
        <>
          <Text style={[styles.baseText, styles.subtitle]}>Worthäufigkeit</Text>
          <IntensityBar frequency={dwdsData.frequency}/>
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
    flex: 1,
    margin: 0,
    padding: 5,
  },
  input: {
    backgroundColor: "#697565",
    color: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  baseText: {
    color: "#1E201E",
  },
  subtitle: {
    paddingTop: 5,
    paddingBottom: 3,
    fontWeight: "bold",
  },
})
