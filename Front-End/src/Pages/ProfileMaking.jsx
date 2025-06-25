import React, { useRef, useState } from 'react'
import Input from '../Components/Input'
import { useAuth } from '../Contexts/AuthContext'
import DecryptedText from '../Components/DecryptedText'
import { FaCamera } from 'react-icons/fa'; 
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 import { Button } from '../Components/bbutton'
 import Buttons from '../Components/Button'
import { cn } from "@/lib/utils"
import { Calendar } from "../Components/Calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../Components/Popover"

import DropDown from '../Components/Dropdown';

function ProfileMaking() {
  const {Name} = useAuth()
  console.log(Name)
  
  const [file , setFile ] = useState() 
  const [date, setDate] = useState(null);
  const [gender, setGender] = useState(null);
  const [bio , setBio ] = useState("")  
  const [username , setUserName] = useState("")
  const [hobbies , setHobbies] = useState("");


  
  
  const [preview, setPreview] = useState(null);
  
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];



  return (
    <>
   
    <div>
    <div className="min-h-screen bg-black text-white ">
  <div className="flex flex-col items-center pt-8">
    <DecryptedText
      text={'Hey ' + Name.split(' ')[0] + " !"}
      animateOn="view"
      revealDirection="center"
      className='text-2xl'
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
        <FaCamera className="text-white text-sm" />
      </label>
    </div>

    <div className="w-full max-w-4xl mt-4 px-6">
      <form method="post" enctype="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        
        <div>
          <p className="mb-2">Username</p>
          <Input className="w-full" type="text" placeholder="Username" />
        </div>

        <div>
          <p className="mb-2">Gender</p>
<DropDown options={genderOptions} value={gender} onChange={setGender} />
        </div>

        <div className="md:col-span-2">
          <p className="mb-2">Bio</p>
          <textarea
          
            placeholder="Bio"
            rows={4}
            className="h-32 text-sm 
    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
    focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
    placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex  w-full min-w-0 rounded-sm border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-smh-24"
          />
        </div>

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
        </div>

        <div>
          <p className="mb-2">Hobbies</p>
          <Input className="w-full" type="text" placeholder="Hobbies" />
        </div>
        <div className=''>

        <Buttons
          type="submit"
          primary 
          hover 
          rounded

           > Create Profile</Buttons>
        </div>
      </form>
    </div>
  </div>
</div>

</div>



 </>
    
  )
  
}

export default ProfileMaking
