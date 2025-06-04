// src/components/MessagesPage.js
import React, { useState, useEffect, useRef } from 'react';
import styles from './MessagesPage.module.css';

function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const messagesEndRef = useRef(null);

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Fetch available users based on role
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/users/${currentUser.role === 'STUDENT' ? 'lecturers' : 'students'}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        const data = await response.json();
        if (data.success) {
          setUsers(data.users);
        } else {
          setError('Failed to load users');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
      }
    };

    fetchUsers();
  }, [currentUser.role, token]);

  // Fetch messages when a user is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      
      setLoading(true);
      try {
        console.log('Fetching messages for user:', selectedUser.id);
        const response = await fetch(
          `http://localhost:4000/api/messages/${selectedUser.id}?page=${page}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        const data = await response.json();
        console.log('Messages response:', data);

        if (!response.ok) {
          throw new Error(data.message || `Server error: ${response.status}`);
        }

        if (data.success) {
          setMessages(prev => page === 1 ? data.messages : [...data.messages, ...prev]);
          setError(null);
          // Mark messages as read
          markMessagesAsRead();
        } else {
          throw new Error(data.message || 'Failed to load messages');
        }
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError(err.message || 'Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedUser, page, token]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const markMessagesAsRead = async () => {
    if (!selectedUser) return;

    try {
      await fetch(
        `http://localhost:4000/api/messages/${selectedUser.id}/read`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
    } catch (err) {
      console.error('Error marking messages as read:', err);
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedUser) return;

    try {
      console.log('Sending message to:', selectedUser.id);
      const response = await fetch('http://localhost:4000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId: parseInt(selectedUser.id),
          content: messageText.trim()
        })
      });

      const data = await response.json();
      console.log('Send message response:', data);
      
      if (!response.ok) {
        console.error('Server response not ok:', response.status, data);
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      if (data.success) {
        setMessages(prev => [...prev, data.message]);
        setMessageText('');
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (err) {
      console.error('Error sending message:', err);
      if (err.message === 'Failed to fetch') {
        setError('Network error. Please check your connection.');
      } else if (err.message.includes('token')) {
        setError('Authentication error. Please try logging in again.');
        // You might want to redirect to login here
      } else {
        setError(`Failed to send message: ${err.message}`);
      }
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className={styles.messagesContainer}>
      <div className={styles.sidebar}>
        <h3>{currentUser.role === 'STUDENT' ? 'Lecturers' : 'Students'}</h3>
        {users.map((user) => (
          <div
            key={user.id}
            className={`${styles.userItem} ${selectedUser?.id === user.id ? styles.selected : ''}`}
            onClick={() => {
              setSelectedUser(user);
              setPage(1);
              setError(null);
            }}
          >
            <div className={styles.userName}>
              {user.firstName} {user.lastName}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chatArea}>
        {error && <div className={styles.error}>{error}</div>}
        
        {selectedUser ? (
          <>
            <h3>Chat with {selectedUser.firstName} {selectedUser.lastName}</h3>
            <div className={styles.messages}>
              {loading && page === 1 ? (
                <div className={styles.loading}>Loading messages...</div>
              ) : (
                <>
                  {page < 3 && messages.length >= 20 && (
                    <button 
                      className={styles.loadMore} 
                      onClick={handleLoadMore}
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </button>
                  )}
                  {messages.map((msg, index) => (
                    <div
                      key={msg.id || index}
                      className={`${styles.message} ${
                        msg.senderId === currentUser.id ? styles.sent : styles.received
                      }`}
                    >
                      <div className={styles.messageContent}>
                        {msg.content}
                      </div>
                      <div className={styles.messageTime}>
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
            
            <div className={styles.inputArea}>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  disabled={loading}
                />
                <button 
                  type="submit"
                  disabled={loading || !messageText.trim()}
                >
                  Send
                </button>
              </form>
            </div>
          </>
        ) : (
          <p>Select a {currentUser.role === 'STUDENT' ? 'lecturer' : 'student'} to start a conversation.</p>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;
