import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Button, TextInput, IconButton } from 'react-native-paper';
import IntensityBar from "@/components/IntensityBar";
import { Text, Card, } from '@rneui/themed';


type DwdsData = {
  lemma: string,
  hits: number,
  frequency: number,
  total: string,
  q: string
}

type WikiData = {
  lemma: string,
  meanings: string[],
  examples: string[],
}

type LingueeAudioLink = {
  url: string,
  lang: string,
}

type LingueeExample = {
  src: string,
  dst: string
}

type LingueeTranslation = {
  featured: boolean,
  lemma: string,
  pos: string,
  examples: LingueeExample[] | null,
}

type LingueeData = {
  featured: boolean,
  lemma: string,
  pos: string,
  audioLinks: LingueeAudioLink[] | null,
  translations: LingueeTranslation[] | null,
}

export default function Index() {
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(false);

  const [lemma, setLemma] = useState(null);
  const [dwdsData, setDwdsData] = useState<DwdsData | null>(null);
  const [lingueeData, setLingueeData] = useState<LingueeData[] | null>(null);
  const [wikiData, setWikiData] = useState<WikiData | null>(null);

  const handleSearch = async () => {
    const lemmaResponse = await fetch(`http://localhost:5000/search/lemma/${searchString}`);
    if (lemmaResponse.ok) {
      const lemmaJson = await lemmaResponse.json()
      setLemma(lemmaJson);
    } else {
      setLemma(null);
    }
  }

  const playAudio = (url: string | null | undefined) => {
    if (url) {
      const pronunciation = new Audio(url);
      pronunciation.play();
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (lemma) {
        const dwdsResponse = await fetch(`http://localhost:5000/search/dwds/${lemma}`);
        const lingueeResponse = await fetch(`http://localhost:5000/search/linguee/${lemma}`);

        if (dwdsResponse.ok) {
          const dwdsJson = await dwdsResponse.json()
          setDwdsData(dwdsJson);
        } else {
          setDwdsData(null);
        }
        if (lingueeResponse.ok) {
          const lingueeJson = await lingueeResponse.json()
          setLingueeData(lingueeJson);
        } else {
          setLingueeData(null);
        }
      } else {
        setDwdsData(null);
        setLingueeData(null);
      }
      setLoading(false);
    }
    fetchData();
  }, [lemma])

  return (
    <ScrollView style={styles.view}>
      <TextInput
        style={[styles.searchBar, styles.baseText]}
        placeholder="Type here..."
        value={searchString}
        onChangeText={(value) => setSearchString(value)}
        onSubmitEditing={handleSearch}
        right={<TextInput.Icon icon="close" onPress={() => setSearchString("")}/>}
        dense={true}
      />

      <View style={{display: "flex"}}>
        {loading ?
        <ActivityIndicator style={{margin: 30}} size="large" color="#C8ACD6"/>
          :
          <>
            {dwdsData &&
                <Card>
                  <Card.Title style={styles.subtitle}>Worthäufigkeit</Card.Title>
                  <Card.Divider />
                  <IntensityBar frequency={dwdsData.frequency}/>
                </Card>
            }
            {lingueeData &&
              <Card>
                <Card.Title style={[styles.baseText, styles.subtitle]}>Übersetzung</Card.Title>
                <Card.Divider />
                {lingueeData.map((data, index) => (data.featured &&
                  <View key={index}>
                    <View style={styles.subsection}>
                      <Text style={[styles.baseText, { fontWeight: "bold" }]}>{data.lemma}{" "}
                        <Text style={[styles.baseText, { color: "grey", fontWeight: "normal" }]}>({data.pos})</Text>
                      </Text>
                      <IconButton
                        style={styles.soundButton}
                        iconColor="#2E236C"
                        icon="volume-high"
                        size={15}
                        onPress={() => playAudio(data.audioLinks?.[0].url)}></IconButton>
                    </View>
                    {data.translations?.map((translation, index) => (translation.featured &&
                      <View style={{marginLeft: 15}} key={index}>
                        <Text>{translation.lemma}</Text>
                        {translation.examples?.map((trExample, index) => (
                          <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 30, justifyContent: "space-between" }} key={index}>
                            <Text style={{ flex: 1, fontSize: 12, color: "#2E236C", paddingHorizontal: 5 }}>{trExample.src}</Text>
                            <Text style={{ flex: 1, fontSize: 12, color: "#2E236C", paddingHorizontal: 5 }}>{trExample.dst}</Text>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                ))}
              </Card>
            }
          </>
        }
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "white",
    flex: 1,
    margin: 0,
    padding: 5,
  },
  searchBar: {
    margin: 15,
  },
  baseText: {
    fontSize: 14,
    color: "#1E201E",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E201E",
  },
  subsection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  soundButton: {
    margin: 1,
  }
})
