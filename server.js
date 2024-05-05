const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const Script = require("./models/scriptModel");
const Message = require("./models/messageModel");
const app = express();
var cors = require("cors");

app.use(cors());
const dotEnv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
connectDb();
const port = process.env.PORT | 5000;
const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const findOrCreateScript = async (doccumentId) => {
  try {
    const script = await Script.findById(doccumentId);
    if (script) {
      return script;
    } else {
      const newScript = await Script.create({
        _id: doccumentId,
        title: "untitled",
        data: { ops: [{ insert: "\n" }] },
        active: false,
      });
      return newScript;
      // if(newScript)
      // {
      //     res.status(200).json({_id:newScript._id, title:newScript.title,
      //     data: newScript.data, active:newScript.active })
      // }
      // else{
      //     res.status(400);
      //     throw new Error("Script data is not valid ");

      // }
    }
  } catch (error) {
    res.status(404);
  }
};

const uploadMessage = async (data) => {
  try {
    const { userId, message, username, room, __createdtime__ } = data;
    const newMessage = await Message.create({
      room,
      message,
      userId,
      username,
      __createdtime__,
    });
    console.log("message uploaded", newMessage);
    return newMessage;
  } catch (error) {
    console.log("error in message upload", error);
    throw error;
  }
};

const CHAT_BOT = "ChatBot";

let chatRoom = "";
let allUsers = [];

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    console.log("get-document", documentId);
    const doccument = await findOrCreateScript(documentId);
    socket.join(documentId);
    socket.emit("load-document", doccument);
    console.log("loaded doc", doccument);
    socket.on("send-changes", (delta) => {
      // console.log("delta received",delta);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      //  console.log(data);
      //  console.log(documentId);
      let script = await Script.findByIdAndUpdate(documentId, { data });
      //  console.log('saved script',script);
    });

    socket.on("save-title", async (title) => {
      //  console.log(data);
      //  console.log(documentId);
      let script = await Script.findByIdAndUpdate(documentId, { title });
      //  console.log('saved script',script);
    });
  });

  socket.on("join_room", async (data) => {
    const { username, room } = data;
    console.log("join room", data);
    socket.join(room);
    let __createdtime__ = Date.now();
    console.log(`${username} has joined the chat room`);
    socket.to(room).emit("receive_message", {
      userId: "--",
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });
  socket.on("get_all_messages", async (room) => {
    var allMessages = await Message.find({ room });
    socket.emit("all_messages", allMessages);
  });

  socket.on("send_message", async (data) => {
    try {
      const { userId, message, username, room, __createdtime__ } = data;
      console.log("send message", data);
      let messageUp = await uploadMessage(data);
      io.in(room).emit("receive_message", data);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    // Send to all users in room, including sender
    // harperSaveMessage(message, username, room, __createdtime__) // Save message in db
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));
  });
});

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/post", require("./routes/postRoutes"));
app.use("/api/script", require("./routes/scriptRoutes"));
app.use("/api/room", require("./routes/roomRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
