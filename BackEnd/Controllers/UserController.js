const User = require('../Models/UserModel');
const asyncHandler = require('express-async-handler');

const CreateUser = asyncHandler(async (req, res) => {
  const { FirebaseUId, UserName, Bio, Hobbies, DOB, Gender } = req.body;

  if (!FirebaseUId || !UserName || !req.file || !DOB || !Gender) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const existingUsername = await User.findOne({ UserName });
  if (existingUsername) {
    return res.status(400).json({ error: 'Username already taken' });
  }
const existingUser = await User.findOne({ FirebaseUId });
if (existingUser) {
  return res.status(400).json({ error: 'User already exists' });
}

 const ProfilePic = req.file.buffer.toString("base64");

  const createdUser = await User.create({
    FirebaseUId,
    UserName,
    ProfilePic,
    Bio: Bio || "",
    Hobbies: Hobbies || "",
    DOB,
    Gender
  });

  res.status(201).json({ message: "User Created", userId: createdUser._id });
});

const GetUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
  
}); 

const GetUserbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ FirebaseUId: id });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { CreateUser, GetUsers ,GetUserbyid };
