import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/Card"
import SpotlightCard from '../Components/SpotlightCard'

function LoginPage() {
  const { Name, setName, currentUser } = useAuth()
  const navigate = useNavigate()

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [isSigningIn, setSigningIn] = useState(false)

  // Error states
  const [emailErr, setEmailErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [generalErr, setGeneralErr] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()

    // Reset all errors first
    setEmailErr("")
    setPasswordErr("")
    setGeneralErr("")

    if (!Email.includes('@') || !Email.includes('.')) {
      setEmailErr("Please enter a valid email address.")
      return;
    }

    if (Password.length < 6) {
      setPasswordErr("Password must be at least 6 characters.")
      return;
    }

    if (!isSigningIn) {
      setSigningIn(true)
      try {
        await doSigninwithEmailAndPassword(Email, Password)
        navigate('/Inbox')
      } catch (err) {
        switch (err.code) {
          case "firebase : auth/invalid-email":
            setEmailErr("Invalid email address.")
            break;
          case "auth/user-not-found":
            setEmailErr("No user found with this email.")
            break;
          case "auth/wrong-password":
            setPasswordErr("Incorrect password.")
            break;
          case "auth/too-many-requests":
            setGeneralErr("Too many failed attempts. Try again later.")
            break;
          case "auth/network-request-failed":
            setGeneralErr("Network error. Please check your connection.")
            break;
          default:
            setGeneralErr("Login failed. Please try again.")
        }

        setSigningIn(false)
      }
    }
  }

  const onGoogleSubmit = async () => {
    if (!isSigningIn) {
      setSigningIn(true)
      try {
        const { isNewUser, displayName } = await doSignInWithGoogle()
        setName(displayName)
        navigate(isNewUser ? "/ProfileMaking" : "/Inbox")
      } catch (err) {
        console.error(err)
        setSigningIn(false)
      }
    }
  }

  const onFacebookSubmit = async () => {
    if (!isSigningIn) {
      setSigningIn(true)
      try {
        const { isNewUser, displayName } = await doSignInWithFacebook()
        setName(displayName)
        navigate(isNewUser ? "/ProfileMaking" : "/Inbox")
      } catch (err) {
        console.error(err)
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
        console.error(err)
        setSigningIn(false)
      }
    }
  }

  if (currentUser === undefined) {
    return <div>Loading...</div>
  }

  return (
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
                    {emailErr && <p className='text-red-500 text-sm'>{emailErr}</p>}
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
                    {passwordErr && <p className='text-red-500 text-sm'>{passwordErr}</p>}
                  </div>

                  {generalErr && <p className='text-red-500 text-sm text-center'>{generalErr}</p>}
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
  )
}

export default LoginPage
