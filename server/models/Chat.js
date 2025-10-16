const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  role: { type: String, enum: ['user','assistant','system'], required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ChatSchema = new Schema({
  userUid: { type: String, required: true, index: true },
  assistantType: { type: String, required: true }, // 'anxiety', 'emotional', 'relationship', etc.
  title: { type: String }, // optional conversation title
  messages: [ MessageSchema ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Chat", ChatSchema);
