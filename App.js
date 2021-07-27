import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import { Player } from './src/components/Player';

export default function App() {
  const [ indexAudio, setIndexAudio ] = useState(0);
  const [ playing, setPlaying ] = useState(false);
  const [ audio, setAudio ] = useState(null);
  const [ music, setMusic ] = useState([
    {
      id: 1,
      name: 'Bandolero',
      artist: 'Don Omar',
      playing: false,
      file: require('./src/musics/Bandolero.mp3')
    },
    {
      id: 2,
      name: 'T.N.T',
      artist: 'AC/DC',
      playing: false,
      file: require('./src/musics/T.N.T.mp3')
    },
    {
      id: 3,
      name: 'Lovers On The Sun',
      artist: 'David Guetta (Feat. Sam Martin)',
      playing: false,
      file: require('./src/musics/LoversOnTheSun(Feat.Sam_Martin).mp3')
    },

  ]);

  async function handleChangeMusic(id) {
    let curFile = null;
    let newMusic = music.filter((val, k) => {
      if(id == k) {
        music[k].playing = true;
        curFile = music[k].file;
        setPlaying(true);
        setIndexAudio(id);
      } else {
        music[k].playing = false;
      }

      return music[k];
    });

    if( audio != null ) {
      audio.unloadAsync();
    }

    let curAudio = new Audio.Sound();

    try {
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    } catch(error) {
      alert("Error");
    }

    setAudio(curAudio);
    setMusic(newMusic);
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Text style={styles.headerText}>Music App</Text>
        </View>

        <View style={styles.table} >
          <Text style={styles.tableText} >Music</Text>
          <Text style={styles.tableText} >Artist</Text>
        </View>

        {
          music.map((val, k)=>{
            if(val.playing){
              return(
                <TouchableOpacity onPress={()=>handleChangeMusic(k)} style={styles.musicButton} key={k} >
                  <View style={styles.table} >
                      <Text style={styles.tableTextPlay} >
                        <AntDesign name="play" size={15} color='#57B65F' > </AntDesign>
                        {val.name}
                      </Text>
                      <Text style={styles.tableTextPlay} >
                        {val.artist}
                      </Text>
                  </View>
                </TouchableOpacity>
              )
            } else {
              return(
                <TouchableOpacity onPress={()=>handleChangeMusic(k)} style={styles.table} key={k} >
                  <View style={styles.musicButton} >
                      <Text style={styles.tableText} >
                        <AntDesign name="play" size={15} color='#FFF' > </AntDesign>
                        {val.name}
                      </Text>
                      <Text style={styles.tableText} >
                        {val.artist}
                      </Text>
                  </View>
                </TouchableOpacity>
              )
            }

          })
        }

        <View style={{paddingBottom: 200}}></View>
      </ScrollView>

      <Player
        playing={playing}
        setPlaying={setPlaying}
        indexAudio={indexAudio}
        setIndexAudio={setIndexAudio}
        music={music}
        setMusic={setMusic}
        audio={audio}
        setAudio={setAudio}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    backgroundColor: '#57B65F',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#FFF',
  },
  table: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
  },
  tableText: {
    width: '50%',
    color: 'rgb(200,200,200)',
  },
  musicButton: {
    width: '100%',
    flexDirection: 'row',
  },
  tableTextPlay: {
    width: '50%',
    color: '#57B65F',
  },
});
