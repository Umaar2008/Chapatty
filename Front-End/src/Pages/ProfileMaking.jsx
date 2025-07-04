import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../Components/Input'
import { useAuth } from '../Contexts/AuthContext'
import { useProfile } from '../Contexts/ProfileContext'
import { FaCamera } from 'react-icons/fa'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "../Components/Calendar"
import DropDown from '../Components/Dropdown'
import { Button } from '../Components/bbutton'
import Buttons from '../Components/Button'
import DecryptedText from '../Components/DecryptedText'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../Components/Popover"

function ProfileMaking() {
  const navigate = useNavigate()
  const { Name, firebaseUId } = useAuth()

  const {
    file, setFile,
    date, setDate,
    gender, setGender,
    bio, setBio,
    username, setUserName,
    hobbies, setHobbies,
    CreateUser
  } = useProfile()

  const [preview, setPreview] = useState(null)
  const [errors, setErrors] = useState({}) // ✅ Error object per field

  const handleClick = async (e) => {
    e.preventDefault()

    // ✅ Front-end validation
    const newErrors = {}
    if (!username) newErrors.username = "Username is required"
    if (!gender) newErrors.gender = "Gender is required"
    if (!bio) newErrors.bio = "Bio is required"
    if (!date) newErrors.date = "Date of Birth is required"
    if (!hobbies) newErrors.hobbies = "Hobbies are required"
    if (!file) newErrors.file = "Profile picture is required"

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return // Stop if any error

    try {
      const success = await CreateUser(
        firebaseUId,
        username,
        file,
        bio,
        hobbies,
        date,
        gender?.value
      )

      if (success) {
        navigate('/Inbox')
      } else {
        setErrors({ submit: "Profile creation failed. Try again." })
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message
      setErrors({ submit: errorMsg })
    }
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      setFile(file)
    }
  }

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col items-center pt-8">
        <DecryptedText
          text={`Hey ${Name?.split(' ')[0]} !`}
          animateOn="view"
          revealDirection="center"
          className="text-2xl"
        />

        <div className="relative w-32 h-32 mt-4">
          <img
            src={preview || '/default.jpg'}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-2 border-white shadow"
          />
          <input
            type="file"
            accept="image/*"
            id="profilePicInput"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <label
            htmlFor="profilePicInput"
            className="absolute bottom-0 right-0 bg-white bg-opacity-60 rounded-full p-2 cursor-pointer"
            title="Change profile picture"
          >
            <FaCamera className="text-black text-sm" />
          </label>
          {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
        </div>

        <div className="w-full max-w-4xl mt-4 px-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {/* Username */}
            <div>
              <p className="mb-2">Username</p>
              <Input
                className="w-full"
                type="text"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>

            {/* Gender */}
            <div>
              <p className="mb-2">Gender</p>
              <DropDown options={genderOptions} value={gender} onChange={setGender} />
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <p className="mb-2">Bio</p>
              <textarea
          onChange={(e) => {setBio(e.target.value) }}
            placeholder="Bio"
            rows={4}
            className="h-32 text-sm 
            aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
            focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
            placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex  w-full min-w-0 rounded-sm border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-smh-24"
          />
              {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <p className="mb-2">Date of Birth</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            {/* Hobbies */}
            <div>
              <p className="mb-2">Hobbies</p>
              <Input
                className="w-full"
                type="text"
                placeholder="Hobbies"
                onChange={(e) => setHobbies(e.target.value)}
              />
              {errors.hobbies && <p className="text-red-500 text-sm">{errors.hobbies}</p>}
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex flex-col items-center">
              {errors.submit && <p className="text-red-500 text-sm mb-2">{errors.submit}</p>}
              <Buttons
                type="submit"
                primary
                hover
                rounded
                onClick={handleClick}
              >
                Create Profile
              </Buttons>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileMaking
