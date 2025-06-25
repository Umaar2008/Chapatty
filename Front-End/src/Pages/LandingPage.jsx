import React, { useState } from 'react';
import Button from '../Components/Button';
import ShinyText from '../Components/ShinyText';
import DotGrid from '../Components/DotGrid';
import ScrollFloat from '../Components/ScrollFloat';
import TiltedCard from '../Components/TiltedCard'
import SpotlightCard  from '../Components/SpotlightCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import {faHeadset} from '@fortawesome/free-solid-svg-icons';
import Marquee from "react-fast-marquee";
import ChromaGrid from '../Components/ChromaGrid';
import CommentCard from '../Components/CommentCard';
import "../Stylesheets/LandingPage.css";
import { Router, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';




export default function LandingPage() {
  const navigate = useNavigate();
  const { userLoggedIn, loading } = useAuth();
  const [showUI, setShowUI] = useState(true);
  
if (loading) {
  return null; // or show loading spinner
}

if (userLoggedIn) {
  return <Navigate to="/Inbox" replace />;

}
  
  return (
    <>
         
          

    <div className="relative bg-gradient-to-br from-black via-grey-500 to-black w-full min-h-screen font-sans overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={10}
          gap={15}
          baseColor="#000099"
          activeColor="#000099"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur pointer-events-none" />

      <div className="relative z-20 px-12 py-6">

        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-semibold">Chatly</div>
          <div className="flex gap-4">
            <Button className="bg-gradient-to-r from-purple-200 to-red-100" rounded secondary hover>Home</Button>
            <Button className="bg-gradient-to-r from-purple-200 to-red-100" rounded secondary hover>Contact</Button>
            <Button className="bg-gradient-to-r from-purple-200 to-red-100" rounded secondary hover>About</Button>
            <Button
                  onClick={() => navigate('/LoginPage')}
              className=""
               rounded 
               warning
                hover
                >Login</Button>
          </div>
        </div>

        <div className="mt-32 ml-4 max-w-2xl">
          <ShinyText
            text="Your Conversations, Reconceived."
            speed={3}
            disabled={false}
            className="text-5xl  text-white font-bold"
          />
          <ShinyText
            text="Connect. Chat. Share. Instantly."
            speed={4}
            disabled={false}
            className="text-3xl text-white font-semibold mt-3"
          />
          <p className="mt-6 text-xl font-medium text-white/80 leading-relaxed">
            Chatly is your new favorite way to stay connected with friends, family, classmates, or teammates — all in real time. Whether you're chatting one-on-one or in a group, we make communication easy, fast, and secure.
          </p>

          <Button className="mt-10 px-10 py-3 text-lg" rounded warning hover>
            Get Started!
          </Button>
        </div>

        <div className="mt-20">
        <ScrollFloat
  animationDuration={1}
  ease="back.out(1)"
  scrollStart="top 85%"
  stagger={0.2}
>
  <div className="text-white ">
    <h1 className="text-4xl text-center max-w-3xl mx-auto font-bold">Powerful Features, Seamless Experience.</h1>
    <p className="mt-4 text-lg text-center max-w-3xl mx-auto text-white/80">
      From instant messaging to video calls, Chatly brings everything you need for fast, simple, and secure communication all in one place.
    </p>
    <div className='flex mt-30 distance-between justify-between'>

    <p className=' text-xl w-2xl text-white/80 leading-relaxed  font-bold'>
    Chatly isn’t just another messaging app it’s a complete communication platform built for the modern world. Whether you're catching up with old friends, coordinating group projects, or simply checking in with loved ones, Chatly makes every interaction feel effortless and natural. With blazing-fast servers, end-to-end encryption, and a clean, distraction-free interface, we prioritize both performance and privacy. Beyond just messaging, Chatly fosters real connection powered by features that feel intuitive, customizable, and designed with you in mind. Whether you're chatting across the street or across continents, we're here to make sure you always feel close.
    </p>
    <div className=' mr-12'>

    <TiltedCard
  imageSrc="https://media.istockphoto.com/id/1161008145/vector/chat-messages-on-computer-online-vector-illustration-flat-cartoon-workspace-or-working-desk.jpg?s=612x612&w=0&k=20&c=qZ-7gZDGWj7Bu3Mr3k2GP00ovyjHzAloToZNQ5DGCKA="
    containerHeight="370px"
  containerWidth="400px"
  imageHeight="370px"
  imageWidth="400px"
  rotateAmplitude={12}
  scaleOnHover={1.2}
  showMobileWarning={false}
  showTooltip={true}
  displayOverlayContent={false}
    
/>
    </div>
    </div>
  </div>
</ScrollFloat>


<ScrollFloat
  animationDuration={1}
  ease="back.out(1)"
  scrollStart="top 85%"
  stagger={0.2}
>
  <div className="text-white mt-10 ">
    <h1 className="text-4xl text-center max-w-3xl mx-auto font-bold">Why Choose us ?</h1>
  
    <div className='flex mt-30 ml-12 justify-between'>

    <SpotlightCard className="max-w-94 h-90 rounded-2xl" spotlightColor="rgba(102, 0, 102, 1)
">
  <div>
  <FontAwesomeIcon icon={faLock} className="text-white text-3xl mb-4" />
  <h1 className='text-2xl  font-semibold text-white/90'>
   Enhanced Security
    </h1>
    <p className='mt-6 font-light'> Our state of the art website makes sure that you never ever have to worry about your Security. Our developers have certainly made sure that your chats are never to be accesed by anyone else.</p>
  </div>    

</SpotlightCard>
<SpotlightCard className="max-w-94 h-90 rounded-2xl" spotlightColor="rgba(102, 0, 102, 1)
">
  <div>
  <FontAwesomeIcon icon={faHeadset}  className="text-white text-3xl mb-4" />
  <h1 className='text-2xl  font-semibold text-white/90'>
   Customer Service
    </h1>
    <p className='mt-6 font-light'>Got a question or issue? Don’t worry our customer support team is responsive, real, and always happy to help. We believe in support that actually supports</p>
  </div>    

</SpotlightCard>
<SpotlightCard className="max-w-94 h-90 rounded-2xl" spotlightColor="rgba(102, 0, 102, 1)">
  <div>
  
  <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#fff"><path d="M340-480q42 0 70-30.5t39-72.5l-58-14q-5 22-17.5 39.5T340-540q-21 0-33.5-17.5T289-597l-58 14q11 42 39 72.5t70 30.5Zm140 220q39 0 75-17.5t67-52.5l-44-40q-22 24-47 36.5T480-321q-26 0-51-12.5T382-370l-44 40q32 35 67.5 52.5T480-260Zm140-220q42 0 70-30.5t39-72.5l-58-14q-5 22-17.5 39.5T620-540q-21 0-33.5-17.5T569-597l-58 14q11 42 39 72.5t70 30.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"/></svg> 
   <h1 className='text-2xl mt-2  font-semibold text-white/90'>  User expirience </h1>
    <p className='mt-6  font-light'>No clutter, no lag just pure, seamless chatting. CHAPATTY delivers a lightning-fast, beautifully fluid experience across all your devices.</p>
  </div>     

</SpotlightCard>
 

    </div>
  </div>
</ScrollFloat>



        </div>

      </div>

 
      
    </div>

 <div className='w-full h-full overflow-hidden bg-black'>
<ScrollFloat
  animationDuration={1}
  ease="back.out(1)"
  scrollStart="top 85%"
  stagger={0.2}
>
<div className='text-white  mt-18 '>
    <div className=''>
    <h1 className='text-4xl  text-center max-w-3xl mx-auto font-bold'>About us</h1>
    <div className=' mt-30 ml-12 '>
       
    <p className=' text-xl text-center w-full text-white/80 leading-relaxed  font-bold'>
    At CHAPATTY, we’re on a mission to make communication more natural, secure, and enjoyable. We’re a passionate team of creators and problem-solvers who believe chatting online should feel as effortless as talking in person. That’s why we built CHAPATTY — a clean, modern platform designed for fast, expressive, and meaningful conversations. Whether you're connecting with friends, working with a team, or simply staying in touch, CHAPATTY offers the tools and experience to keep you close, no matter the distance. We don’t just build chat features — we create space for real connection.
    </p> 
<div>


    </div>
    </div>
</div>
<div>


</div>
        <div className='mt-10 flex justify-between w-full'>
<Marquee
gradient={true}
gradientColor='black'
gradientWidth={50}

> 

        <CommentCard
        Name="@techieRaza"
        ProfilePic={'https://xsgames.co/randomusers/assets/avatars/male/46.jpg'}
        Comment="“Absolutely love the design — it's clean, fast, and makes chatting a joy!”"
        />
          <CommentCard
        Name="@noor.codes"
        ProfilePic={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdBuvbsYu7WYAAUY2AqSQRGNESsYdkucDkQ&s'}
        Comment="“CHAPATTY helped my friends and I stay connected during exam season. Super helpful!”"
        />
          <CommentCard
        Name="@junaidthegeek"
        ProfilePic={'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'}
        Comment="“Feels way smoother than other apps I’ve used. Instant messages, zero lag!”"
        />
          <CommentCard
        Name="@sanawrites"
        ProfilePic={'https://touchsource.com/wp-content/uploads/2023/05/testimonial-3.jpg'}
        Comment="“The privacy features give me real peace of mind. It’s just built different.”"
        />

</Marquee>

        
            
            </div>
<Marquee
direction='right'
gradient={true}
gradientColor='black'
gradientWidth={50}

> 

        <CommentCard
        Name="@ayesha.dev"
        ProfilePic={'https://live.staticflickr.com/5252/5403292396_0804de9bcf_b.jpg'}
        Comment="“I use CHAPATTY daily to organize my study group — it’s honestly perfect.”"
        />
          <CommentCard
        Name="@hassaanx"
        ProfilePic={'https://img.freepik.com/free-photo/young-man-sad-expression_1194-2826.jpg?semt=ais_hybrid&w=740'}
        Comment="“CHAPATTY helped my friends and I stay connected during exam season. Super helpful!”"
        />
          <CommentCard
        Name="@fatimafx"
        ProfilePic={'https://img.freepik.com/free-photo/close-up-smiley-woman-outdoors_23-2149002410.jpg'}
        Comment="“I’ve tried a lot of apps — this one just feels right. Clean and intuitive.”"
        />
          <CommentCard
        Name="@abdullah.exe"
        ProfilePic={'https://img.freepik.com/free-photo/portrait-cheerful-caucasian-woman_53876-146181.jpg'}
        Comment="“Messaging feels instant, and I love the subtle design details.”"
        />

</Marquee>
<Marquee
direction='left'
gradient={true}
gradientColor='black'
gradientWidth={50}

> 

        <CommentCard
        Name="@maria.js"
        ProfilePic={'https://img.freepik.com/free-photo/close-up-smiley-woman-posing_23-2149178089.jpg'}
        Comment="“Group chats never felt this smooth. Easy to use, even for my mom!”"
        />
          <CommentCard
        Name="@coderzayan"
        ProfilePic={'https://img.freepik.com/premium-photo/portrait-smiling-man_1048944-3849232.jpg?semt=ais_hybrid&w=740'}
        Comment="“Group chats never felt this smooth. Easy to use, even for my mom!”"
        />
          <CommentCard
        Name="@mehreen_ui"
        ProfilePic={'https://images.pexels.com/photos/19270854/pexels-photo-19270854.jpeg?cs=srgb&dl=pexels-esma-atak-46104031-19270854.jpg&fm=jpg'}
        Comment="“Love the responsive design. Works flawlessly on both mobile and laptop!”"
        />
          <CommentCard
        Name="@rafay.xd"
        ProfilePic={'https://t4.ftcdn.net/jpg/06/78/09/75/360_F_678097580_mgsNEISedI7fngOwIipYtEU0T6SN8qKv.jpg'}
        Comment="“CHAPATTY is the only chat app I actually enjoy using. Simple and powerful.”"
        />

</Marquee>
<div class="w-full mt-12 h-px bg-white/60"></div>
<div className='flex  w-full justify-between'>
<div className='text-center  flex flex-col justify-end h-128  mt-10'>
    <div className=' h-64 flex w-64  justify-between flex-col mb-10 ml-10'>
    <h1 className='font-bold text-6xl'>Chapatty</h1>
    <p className='mr-12 '>Made with 💗 by Umar</p>

    </div>

</div>

<div>

    
</div>

<div className='text-center  flex flex-col justify-end h-128   mt-10'>

    <div className=' h-64 flex w-64  justify-between mt-20 flex-col mb-10 ml-10'>
 <div>
 
</div>
<div className='mt-52'>

        <div className='flex  h-24 w-32  justify-between  text-white'>

<div className='cursor-pointer'  onClick={() => window.location.href = 'https://www.linkedin.com/in/umar-sarfraz-675640264/'}>
  <svg  xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>        
</div>
<div className='cursor-pointer'  onClick={() => window.location.href = 'https://www.instagram.com/being_the_umar/'}>
<svg  xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
</div>
<div className='cursor-pointer'  onClick={() => window.location.href = 'https://github.com/Umaar2008'}>
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
</div>
        </div>
</div>
    </div>

</div>
</div>
</div>
</ScrollFloat>

 </div>

 
 </>
  );
}
