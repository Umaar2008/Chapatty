import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  doSignInWithFacebook,
  doSignInWithGithub,
  doSignInWithGoogle,
  doSigninwithEmailAndPassword,
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

const apiKey = "867ed4b56d634377a9842528f64bf3d2";


function LoginPage() {
  const { userLoggedIn , Name , setName } = useAuth()
  const navigate = useNavigate()

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [isSigningIn, setSigningIn] = useState(false)
  const [err , serErr] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault()
     const response = await fetch(`https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${Email}`);
    const data = await response.json();
      if (data.status === "invalid") {
        serErr("Invalid Email");
        return;
      } 
      else if (data.status === "valid") {
        serErr("");
      }
     

    if (!isSigningIn) {
      setSigningIn(true)
      try {
        await doSigninwithEmailAndPassword(Email, Password)
        navigate('/Inbox')
      } catch (err) {
        
        console.error(err.message)
        serErr(err.message)
        setSigningIn(false)
      }
    }
  }

  const onGoogleSubmit = async () => {
    if (!isSigningIn) {
      setSigningIn(true)
      try {
        const { isNewUser,displayName } = await doSignInWithGoogle()
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
        const { isNewUser, displayName } = await doSignInWithFacebook();
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
        const { isNewUser, displayName } = await doSignInWithGithub()
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
      {userLoggedIn && <Navigate to='/Inbox' replace={true} />}
      <SpotlightCard className='h-screen '>
        <div className='content-center h-full'>
          <div className='flex justify-center'>
            <Card className="w-full bg-transparent text-white text-2xl h-128 content-center flex justify-center max-w-sm">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription className='text-white'>
                  Enter your email below to login
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit}>
                  <div className="flex flex-col gap-6">
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
                    </div>
                    <p className='text-red text-sm'> {err} </p>
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
                    Login
                  </Button>

                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <p className='text-white text-sm text-center'>
                  Don't have an account? <Link to='/signup' className='underline-offset-4 hover:underline'>Sign Up</Link>
                </p>

                <div className='flex justify-between mt-14 w-48'>
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

export default LoginPage
