import React from 'react';

function CommentCard({ProfilePic ,
    Name ,
Comment


}) {
  return (
    <div className="relative m-4 border rounded-xl border-white/20 hover:scale-102 cursor-pointer ease-in-out w-80 h-34 p-4">
      <div className="absolute outline-white   top-4 left-6 z-20">
        <div className=" flex ">
        <img 
        className='rounded-full outline-white w-12 h-12 object-cover'
        src={ProfilePic} alt="profile_pic" />
        <p className="text-xl ml-4 mt-2 text-white font-bold">{Name}</p>

        </div>
        <p className="text-white/80 text-sm mt-2">
         {Comment}
        </p>
      </div>

      <div className="absolute inset-0  border border-white/80 rounded-xl blur-sm  backdrop-blur-sm shadow-lg z-10" />
    </div>
  );
}

export default CommentCard;
