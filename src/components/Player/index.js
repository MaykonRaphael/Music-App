import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  TouchableOpacity
} from 'react-native';
import { Audio } from 'expo-av';

import { styles } from './styles';

export function Player(props) {

    const handleBack = async() => {
        let newIndex = props.indexAudio - 1;
        if( newIndex < 0 ) {
            newIndex = props.music.length - 1;
        }
        props.setIndexAudio(newIndex);

        let curFile = props.music[newIndex].file;

        let nextMusic = props.music.filter((val, k)=>{
            if( newIndex == k ) {
                props.music[k].playing = true;
                curFile = props.music[k].file;

            } else {
                props.music[k].playing = false;
            }

            return props.music[k];
        })

        if( props.audio != null ) {
            props.audio.unloadAsync();

        }
        let curAudio = new Audio.Sound();
        try {
            await curAudio.loadAsync(curFile);
            await curAudio.playAsync();

        } catch (error) {
            alert("Error: handleNext curAudio");
        }

        props.setAudio(curAudio);
        props.setMusic(nextMusic);
        props.setPlaying(true);
    }

    const handleNext = async() => {
        let newIndex = props.indexAudio + 1;
        if( newIndex >= props.music.length ) {
            newIndex = 0;
        }
        props.setIndexAudio(newIndex);

        let curFile = props.music[newIndex].file;

        let nextMusic = props.music.filter((val, k)=>{
            if( newIndex == k ) {
                props.music[k].playing = true;
                curFile = props.music[k].file;

            } else {
                props.music[k].playing = false;
            }

            return props.music[k];
        })

        if( props.audio != null ) {
            props.audio.unloadAsync();

        }
        let curAudio = new Audio.Sound();
        try {
            await curAudio.loadAsync(curFile);
            await curAudio.playAsync();

        } catch (error) {
            alert("Error: handleNext curAudio");
        }

        props.setAudio(curAudio);
        props.setMusic(nextMusic);
        props.setPlaying(true);

    }

    const handlePlay = async() => {
        let curFile = props.music[props.indexAudio].file;

        let newMusic = props.music.filter((val, k) => {
            if( props.indexAudio == k ) {
                props.music[k].playing = true;
                curFile = props.music[k].file;
            } else {
                props.music[k].playing = false;
            }

            return props.music[k];
        });

        try {
            if( props.audio != null ) {
                props.setPlaying(true);
                props.setMusic(newMusic);
                await props.audio.playAsync();

            } else {
                let curAudio = new Audio.Sound();
                try {
                    await curAudio.loadAsync(curFile);
                    await curAudio.playAsync();
                } catch (error) {
                    alert('Error audio');
                }

                props.setAudio(curAudio);
                props.setMusic(newMusic);
                props.setPlaying(true);
            }
        } catch (error) {
            alert('Error handle Play');
        }
    }

    const handlePause = async() => {
        if( props.audio != null ) {
            props.audio.pauseAsync();
        }
        props.setPlaying(false);
    }

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={()=> handleBack()} >
                <Ionicons name="play-skip-back" size={36} color="#F4EDE8" />
            </TouchableOpacity>
            {
                (!props.playing) ?
                <TouchableOpacity onPress={()=> handlePlay()} style={styles.button} >
                    <Ionicons name="play-circle" size={64} color="#F4EDE8" />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> handlePause()} style={styles.button} >
                    <Ionicons name="pause-circle" size={64} color="#F4EDE8" />
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={()=> handleNext()} >
                <Ionicons name="play-skip-forward" size={36} color="#F4EDE8" />
            </TouchableOpacity>
        </View>
    );
}