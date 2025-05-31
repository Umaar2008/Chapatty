import { StyleSheet, Text, View , TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { push } from 'expo-router/build/global-state/routing'
import Button from '../Components/Button'

const Signup = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordInitial, setPasswordInitial] = useState("");
    const [passwordConfirmed, setPasswordConfirmed] = useState("");

    const[err , setErr] = useState("");

    const onPress = () => {
        if (!email || !passwordInitial || !passwordConfirmed || !name) {
          setErr("All fields are required");
          return;
        }
      
        if (passwordInitial !== passwordConfirmed) {
          setErr("Passwords do not match");
          return;
        }
      
        setPassword(passwordInitial);
        setErr('');

        console.log("Form submitted:", { name, email, password: passwordInitial });
      

    };
      



  return (
        <LinearGradient 
        style={styles.container}
        colors={["#EE9CA7", "#FFDDE1"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        >
        
    <View  >
        <View style={styles.Whitebackground}>
    <LinearGradient
        colors={["#EE9Ce1", "#FFDDD1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradient}
      > 
      <View style={styles.innerContainer}>
      <Text style={styles.heading}>
        Create Your Account 
      </Text>
         
        <View  style={styles.textcontainer}>

 
        <LinearGradient
        colors={["#EE9fF1", "#FFDDD1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradientUsername}
        >


        <View style={styles.innerContaineruserName}>  
            <View style={styles.text}>
                
                
    <TextInput
    style={styles.Input}
    onChangeText={(text) => setName(text) }
    placeholder='Name'
keyboardType="default"
    >
    </TextInput>
    
    </View>   
        </View>
        </LinearGradient>

        <LinearGradient
        colors={["#EE9fF1", "#FFDDD1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradientUsername}
        >


        <View style={styles.innerContaineruserName}>   
        <View style={styles.text}>

    <TextInput
    style={styles.Input}
    onChangeText={(text) => setEmail(text) }
    placeholder='Email address'
       keyboardType="email-address"
    >
    </TextInput>
    
    </View>
        </View>
        </LinearGradient>
        <LinearGradient
        colors={["#EE9fF1", "#FFDDD1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradientUsername}
        >


        <View style={styles.innerContaineruserName}>  
            <View style={styles.text}>
                
                
    <TextInput
    style={styles.Input}
    placeholder='Password'
    onChangeText={(text) => setPasswordInitial(text) }
    secureTextEntry={true}
    >

    </TextInput>
    
    </View>
    </View>   
        </LinearGradient>
        <LinearGradient
        colors={["#EE9fF1", "#FFDDD1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradientUsername}
        >


        <View style={styles.innerContaineruserName}>  
            <View style={styles.text}>
                
                
    <TextInput
    style={styles.Input}
    placeholder='Confirm Password'
    onChangeText={(text) => setPasswordConfirmed(text) }
    secureTextEntry={true}
    >
    </TextInput>
    
    </View>   
        </View>
        </LinearGradient>
        {err ? <Text style={styles.errorText}>{err}</Text> : null}

      <Button
      title="Create Account"
      rounded
      yellow
      onPress={onPress}
      style={[styles.base, { width: 200 , height : 70 }]}
      textStyle={[styles.text , {fontSize : 18, color : "#000" , fontWeight: '400'} ]}
      
      >
        
      </Button>
    </View>
    </View>
    </LinearGradient>
        </View>
    </View>
    
        </LinearGradient>
  )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center' 
    } ,
    Whitebackground : {
backgroundColor : "white" ,
alignItems : 'center' ,
justifyContent : 'center',
height : 600 ,
width : 350,
margin : 12.5 ,
borderRadius : 20 ,

    } ,

    innerContainer: {
        borderRadius: 15, 
        flex: 1,
        margin: 5, 
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems : 'center',
        
      },

      innerContaineruserName: {
        borderRadius: 20, 
        flex: 1,
        margin: 5, 
        backgroundColor: '#fff',
       
      
        
      },
    
    linearGradient : {
        height: 600,
        width: 350, 
        borderRadius: 20, 
    } ,
    linearGradientUsername: {
        height: 70,
        width: 300,
        borderRadius: 25,
        marginVertical: 8,
    } ,
    Input : {
        height : 50 ,
        width : 260 ,
        marginTop : 5 ,
        padding : 16 ,
        color : "#000" ,
        fontFamily: 'Poppins-Light',
        fontSize : 18,
      
    } ,
    textcontainer : {
        flex : 2 ,
        alignItems : 'center' ,
        justifyContent : 'center',
        border : 10 ,
        marginTop : -60 ,


        
        
    } ,

    heading : {
        marginTop : 40 ,
        fontSize : 30 ,
        fontWeight : 500 ,


    } ,
    text : {
        margin : 7 ,

    },
    button: {
        backgroundColor: '#FFBD26',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        height : 60,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 22,
        marginTop : 30 ,
      },
      errorText: {
        color: 'red',
        fontSize: 18,
        marginLeft: 2,
        marginTop: 5,
      }

})