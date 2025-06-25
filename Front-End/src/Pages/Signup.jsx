import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  doSignInWithFacebook,
  doSignInWithGithub,
  doSignInWithGoogle,
  doCreatewithEmailAndPassword,
} from '../Firebase/auth'
import { useAuth } from '../Contexts/AuthContext'
import { Label } from '../Components/Label'
import Button from '../Components/Button'
import Input from "../Components/Input"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/Card"
import SpotlightCard from '../Components/SpotlightCard'

function Signup() {
  
  const { userLoggedIn , Name , setName } = useAuth()
  const navigate = useNavigate()
  
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [isSigningIn, setSigningIn] = useState(false)
  const [err , serErr] = useState('');
  
    const isValidEmail = (Email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(Email);
    };
  
    
    //   const validateEmailWithZeroBounce = async (email) => {
      //   const response = await fetch(`https://api.zerobounce.net/v2/validate?api_key=2ba1ddbdae3b4b28a2532ef1f7c2b54b&email=${email}`);
//   const data = await response.json();
//   return data;
// };

// ZERO BOUNCE NOT WORKING RIGHT NOW 

  const onSubmit = async (e) => {
  e.preventDefault();

  if (!isSigningIn) {
    setSigningIn(true);

    try {
    
      // const data = await validateEmailWithZeroBounce(Email);

      // if (data.status === "invalid") {
      //   serErr("Invalid Email");
      //   setSigningIn(false);
      //   return;
      // }

      // serErr(""); 

      const { isNewUser } = await doCreatewithEmailAndPassword(Email, Password);

      navigate(isNewUser ? "/ProfileMaking" : "/Inbox");

        if (!isValidEmail(Email)) {
    serErr("Please enter a valid email address");
    return;
  }

      
    } catch (err) {
      setSigningIn(false);
      
      if (err.message === "Firebase: Error (auth/email-already-in-use).") {
        serErr("User already exists. Please login.");
      } else if (err.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
        serErr("Password should be at least 6 characters.");
      } else {
        console.error(err.message);
        serErr("Something went wrong. Please try again.");
      }
    }
  }
};


  const onGoogleSubmit = async () => {
    if (!isSigningIn) {
      setSigningIn(true)
      try {
        const { isNewUser , displayName} = await doSignInWithGoogle();
        setName(displayName)
        navigate(isNewUser ? "/ProfileMaking" : "/Inbox")
      } catch (err) {
        console.error(err.message)
        setSigningIn(false)
      }
    }
  }
  
  const onFacebookSubmit = async () => {
    if (!isSigningIn) {
      setSigningIn(true)
      try {
        const { isNewUser , displayName } = await doSignInWithFacebook();
        setName(displayName)
        navigate(isNewUser ? "/ProfileMaking" : "/Inbox")
      } catch (err) {
        console.error(err.message)
        setSigningIn(false)
      }
    }
  }

  const onGithubSubmit = async () => {
    if (!isSigningIn) {
      setSigningIn(true)
      try {
        const { isNewUser , displayName} = await doSignInWithGithub()
        setName(displayName)
        navigate(isNewUser ? "/ProfileMaking" : "/Inbox")
      } catch (err) {
        console.error(err.message)
        setSigningIn(false)
      }
    }
  }
  



  return (
 <>
      <SpotlightCard className='h-screen'>
        <div className='content-center h-full'>
          <div className='flex justify-center'>
            <Card className="w-full bg-transparent text-white text-2xl h-128 content-center flex justify-center max-w-sm">
              <CardHeader>
                <CardTitle className='w-full  content-center flex justify-center'>SignUp</CardTitle>
              
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit}>
                  <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                      <Label htmlFor="email">Name</Label>
                      <Input
                        id="Name"
                        type="Name"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="FirstName_LastName"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="m@example.com"
                        required
                      />
                    <p className=' text-red-500 text-sm'> {err} </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='w-full flex justify-center mt-4'>
                  <Button type="submit" primary rounded hover>
                    SignUp
                  </Button>

                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <p className='text-white text-sm text-center'>
                 Already a member? <Link to='/LoginPage' className='underline-offset-4 hover:underline'>Login</Link>
                </p>

                <div className='flex justify-between mt-4 w-48'>
                  <img
                    className='cursor-pointer'
                    onClick={onGoogleSubmit}
                    src='/2993685_brand_brands_google_logo_logos_icon.png'
                    alt="Google"
                  />
                  <img
                    className='cursor-pointer'
                    onClick={onGithubSubmit}
                    src='/211904_social_github_icon.png'
                    alt="GitHub"
                  />
                  <img
                    className='cursor-pointer'
                    onClick={onFacebookSubmit}
                    src='/317727_facebook_social media_social_icon.png'
                    alt="Facebook"
                  />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </SpotlightCard>
    </>
  )
}

export default Signup
