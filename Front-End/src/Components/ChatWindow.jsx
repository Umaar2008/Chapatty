import React, { useEffect, useState, useRef } from 'react';
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc
} from 'firebase/firestore';
import { db } from '../Firebase/firebase-config';
import { getSafeBase64 } from '../Components/getSafeBase64';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { GoogleGenAI } from "@google/genai";




function getChatId(uid1, uid2) {
  if (uid2 === "gemini_ai_bot") return `ai_bot_${uid1}`;
  return [uid1, uid2].sort().join("_");
}

function ChatWindow({ currentUser, otherUser }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
const [typing , setTyping] = useState('')
  const chatId = getChatId(currentUser.uid, otherUser.FirebaseUId);
  const isAIChat = otherUser.FirebaseUId === "gemini_ai_bot";

  const ai = isAIChat
    ? new GoogleGenAI({
        apiKey: import.meta.env.VITE_REACT_APP_GEMINI_KEY,
      })
    : null;

  useEffect(() => {
    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      const msgs = snapshot.docs.map(doc => doc.data());
      setMessages(msgs);
      setLoading(false);
    });

    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleClick = () => {
    navigate(`/UserProfile/${otherUser.FirebaseUId}`);
  };

  const handleChange = (e) => {
    setText(e.target.value);
    setTyping(true);
    setTimeout(() => setTyping(false), 2000);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      if (isAIChat && ai) {
        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{ role: "user", parts: [{ text }] }],
        });

const reply = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";

        await addDoc(collection(db, 'chats', chatId, 'messages'), {
          from: currentUser.uid,
          to: "gemini_ai_bot",
          text,
          createdAt: serverTimestamp(),
        });

        await addDoc(collection(db, 'chats', chatId, 'messages'), {
          from: "gemini_ai_bot",
          to: currentUser.uid,
          text: reply,
          createdAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, 'chats', chatId, 'messages'), {
          from: currentUser.uid,
          to: otherUser.FirebaseUId,
          text,
          createdAt: serverTimestamp(),
        });
      }

      setText('');
      setTyping(false);
    } catch (error) {
      alert("Failed to send message. Try again.");
    throw new error(error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full bg-white">
        <ColorRing
          height="80"
          width="80"
          visible={true}
          ariaLabel="color-ring-loading"
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        <p className="ml-4 text-gray-600">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 border-b border-gray-300 p-3 bg-white/80 rounded-t-lg">
        <div
          className="w-12 h-12 cursor-pointer bg-gray-300 rounded-full overflow-hidden"
          onClick={handleClick}
        >
          <img
            src={getSafeBase64(otherUser.ProfilePic)}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-2xl text-gray-800">{otherUser.UserName || 'Unnamed User'}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.from === currentUser.uid ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-xs text-sm ${
                msg.from === currentUser.uid
                  ? 'bg-green-200 text-right'
                  : 'bg-gray-100 text-left'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

   
      <div className="flex items-center gap-2 p-3 border-t border-gray-300 bg-white/80">
        <input
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 rounded-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:ring focus:ring-green-300"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-green-500 text-white text-sm rounded-full hover:bg-green-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
