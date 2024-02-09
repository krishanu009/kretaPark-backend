const asyncHandler = require("express-async-handler");
const Room = require("../models/roomModel");
const User = require("../models/userModel");

//@desc Get members
//@route GET /api/room/:id
//@access private

const getRoom = asyncHandler(async (req, res) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json(room);
    } catch (error) {
      res.status(404);
      throw new Error("room not found");
    }
  });

  //@desc Get all rooms
//@route GET /api/room
//@access public

const getAllRoom = asyncHandler(async (req, res) => {
    const rooms = await Room.find();
    console.log("called");
    res.status(200).json(rooms);
  });


 //@desc Create New Room
//@route POST /api/room
//@access public
const createNewRoom =  asyncHandler(async (req, res) => {
    console.log("The body is:",req.body)
    const {roomName, memberId, memberName} = req.body;

    if(!roomName )
    {
        res.status(400);
        throw new Error("All Fileds are mandatory");
    }

    const room = await Room.create({
      roomName,
       members: [{id: memberId,
        name: memberName}],
     __createdtime__:Date.now()
    })

  res.status(200).json(room);
});

//@desc Add member to a specific room
//@route POST /api/room/addNew
//@access public

const addMemberToRoom = asyncHandler(async (req, res) => {
  const { roomId, email } = req.body;

  if (!roomId || !email) {
    res.status(400);
    throw new Error("Both roomId, newMemberId, and newMemberName are required");
  }
  const userAvailable = await User.findOne({email});
  if(!userAvailable)
  {
    res.status(500).json({ error: "User Not Available!" });
    return;
  }



  const room = await Room.findOne({
    _id: roomId,
    members: { $elemMatch: { id: userAvailable.id } }
  });
  if(room)
  {
    res.status(500).json({ error: "User is already there in the room!" });
    return;
  }

  

  
  
  try {
    const updatedRoom = await Room.findOneAndUpdate(
      { _id: roomId },
      {
        $push: {
          members: {
            id: userAvailable.id,
            name: userAvailable.userName
          }
        }
      },
      { new: true }
    );

    if (!updatedRoom) {
      res.status(404);
      throw new Error("Room not found");
    }

    res.status(200).json("user added to the room");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//@desc Add member to a specific room
//@route POST /api/room/myRooms
//@access public

const findRoomsByMemberId = asyncHandler(async (req, res) => {
  const { memberId } = req.params;

  if (!memberId) {
    res.status(400);
    throw new Error("Member ID is required");
  }

  try {
    const rooms = await Room.find({ "members.id": memberId });

    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  module.exports = { getAllRoom, getRoom, createNewRoom, addMemberToRoom , findRoomsByMemberId};