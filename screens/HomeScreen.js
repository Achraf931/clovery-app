import React from 'react';
import {FlatList, ImageBackground, StyleSheet, Text} from 'react-native';
import { signOut } from 'firebase/auth';
import {View, Button, TextInput} from "../components";
import {auth, Colors} from '../config';
import { windowWidth } from '../utils/Dimensions';
import {TouchableOpacity} from "react-native-web";
import { useState } from "react";

export const HomeScreen = () => {
  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

    const [items, setItems] = useState([
        {
            id: 1,
            name: "Nike",
        },
        {
            id: 2,
            name: "Nike",
        },
        {
            id: 3,
            name: "Nike",
        },
        {
            id: 4,
            name: "Nike",
        },
    ]);

  return (
    <View isSafe style={styles.container}>
      <TextInput
        name='search'
        placeholder='Search'
        keyboard-type='search'
      />

        <FlatList
            data={items}
            renderItem={({ item }) => <TouchableOpacity style={[styles.stores, {marginLeft: 0, marginRight: item.id === items.length ? 0 : 10}]}>
                <ImageBackground style={{height: '100%', width: '100%'}} source={{uri: 'https://digitalintegral.fr/wp-content/uploads/2021/01/symbole-nike.jpg'}}>
                    <View style={[styles.storeName]}>
                        <Text style={{fontFamily: 'GilroyBold', color:'white'}}>{item.name}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>}
            keyExtractor={(item) => item.id}
            snapToAlignment="start"
            decelerationRate={"fast"}
            snapToInterval={windowWidth - 40}
            horizontal
        />

      <Button style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.background,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.pink,
    padding: 15,
    borderRadius: 100
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: 'GilroyBold',
  },
    stores: {
        width: windowWidth - 40,
        height: 200,
        resizeMode: 'cover',
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden'
    },
    storeName:{
        position: 'absolute',
        borderRadius: 5,
        zIndex:22,
        backgroundColor: Colors.pink,
        padding: 5,
        margin: 10
    },
    boxShadow: {
        shadowColor: "#949494",
        shadowOffset:{
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5.46,
        elevation: 6,
    }
});
