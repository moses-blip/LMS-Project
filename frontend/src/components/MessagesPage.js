// src/components/MessagesPage.js
import React, { useState, useEffect } from 'react';
import styles from './MessagesPage.module.css';

function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  // Simulate getting user role (student or lecturer)
  const user = JSON.parse(localStorage.getItem("user")) || { role: "student", name: "John Doe" };
  const userRole = user.role;

  // Mocked users
  const lecturers = [
    { id: 1, name: "Mr. Kamau" },
    { id: 2, name: "Ms. Wambui" },
  ];

  const students = [
    { id: 101, name: "Jane Muthoni" },
    { id: 102, name: "Kevin Otieno" },
  ];

  const handleSelectUser = (user) => {
    setSelectedUser(user);

    // Simulate loading previous messages between the current user and selected user
    setMessages([
      {
        sender: userRole,
        text: userRole === "student"
          ? "Hello, I need clarification."
          : "Hi, do you need any help?",
      },
      {
        sender: userRole === "student" ? "lecturer" : "student",
        text: userRole === "student"
          ? "Sure, go ahead."
          : "Yes, I have a question about assignment 2.",
      },
    ]);
  };

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: userRole, text: messageText },
    ]);
    setMessageText("");
    // 🔔 Simulate backend update here if needed
  };

  return (
    <div className={styles.messagesContainer}>
      <div className={styles.sidebar}>
        <h3>{userRole === "student" ? "Lecturers" : "Students"}</h3>
        {(userRole === "student" ? lecturers : students).map((user) => (
          <div
            key={user.id}
            className={styles.lecturerItem}
            onClick={() => handleSelectUser(user)}
          >
            {user.name}
          </div>
        ))}
      </div>

      <div className={styles.chatArea}>
        {selectedUser ? (
          <>
            <h3>Chat with {selectedUser.name}</h3>
            <div className={styles.messages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.sender === userRole
                      ? styles.studentMsg
                      : styles.lecturerMsg
                  }
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className={styles.inputArea}>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p>
            Select a {userRole === "student" ? "lecturer" : "student"} to start
            a conversation.
          </p>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;
