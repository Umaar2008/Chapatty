import React, { useEffect, useState, useRef } from 'react';
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../Firebase/firebase-config';
import { getSafeBase64 } from '../Components/getSafeBase64';


function getChatId(uid1, uid2) {
  return [uid1, uid2].sort().join('_');
}

function ChatWindow({ currentUser, otherUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const chatId = getChatId(currentUser.uid, otherUser.FirebaseUId);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      const msgs = snapshot.docs.map(doc => doc.data());
      setMessages(msgs);
    });
    return unsubscribe;
  }, [chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  
  const handleChange = (e) => {
    setText(e.target.value);
    setTyping(true);
    setTimeout(() => setTyping(false), 2000);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;
    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        from: currentUser.uid,
        to: otherUser.FirebaseUId,
        text,
        createdAt: serverTimestamp(),
      });
      setText('');
      setTyping(false);
    } catch (error) {
      console.error("Send error:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 border-b border-gray-300 p-3 bg-white/80 rounded-t-lg">
        <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
  <img
    src={getSafeBase64(otherUser.ProfilePic)}
    alt="avatar"
    className="w-full h-full object-cover"
  />
</div>

        <div>
          <p className="text-2xl text-gray-800">{otherUser.UserName || 'Unnamed User'}</p>
          {typing && <p className="text-xs text-green-500">Typing...</p>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.from === currentUser.uid ? 'justify-end' : 'justify-start'
            }`}
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

      {/* Input */}
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
