import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // Correct import

function OnBoardingItem({ item }) {
  const { width, height } = useWindowDimensions();
  const router = useRouter(); // Hook to access router

  return (
    <View>
      <LinearGradient
        colors={["#EE9CA7", "#FFDDE1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, { width }]}
      >
        <Image
          source={item.image}
          style={[
            styles.image,
            { resizeMode: 'contain' },
          ]}
        />
        <View>
          <Text style={styles.title}>{item.mainText}</Text>
          <Text style={styles.description}>{item.subText}</Text>
          <View style={styles.Btncontainer}>
            {item.id === 3 && (
              <View>
                <TouchableOpacity onPress={() => router.push('/Signup')} 
                style={styles.button}>
                  <Text style={{ fontSize: 18 }}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.signInContainer}>
                  <Text style={styles.signInText}>
                    Already have an account?
                    <TouchableOpacity onPress={() => router.push('/Login')} >
                      <Text style={styles.signInLink}> Sign In</Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 500,
    height: 300,
    marginTop: 60,
  },
  title: {
    color: '#000000',
    fontSize: 36,
    marginTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'WixMadeforText-Medium',
  },
  description: {
    fontWeight: '400',
    fontSize: 22,
    paddingRight: 20,
    paddingLeft: 20,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 20,
    color: '#000000',
    fontFamily: 'WixMadeforText-Regular',
  },
  button: {
    backgroundColor: '#FFBD26',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    height : 60 ,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
  },
  Btncontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 68,
  },
  signInContainer: {
    marginTop: 10,
    marginRight: 20,
  },
  signInText: {
    fontSize: 16,
    marginRight: 10,
    color: '#000000',
    flex: 2,
  },
  signInLink: {
    paddingTop : 3 ,
    fontSize: 14,
    color: '#FFBD26',
    fontWeight: '600',
  },
});

export default OnBoardingItem;
