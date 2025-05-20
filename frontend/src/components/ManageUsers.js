import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ManageUsers.module.css';

const usersData = [
  {
    id: 1,
    name: 'Alice M.',
    regNo: 'ADM001',
    email: 'alice@mail.com',
    role: 'Lecturer',
    status: 'Active',
    photo: null,
  },
  {
    id: 2,
    name: 'Brian C.',
    regNo: 'STD102',
    email: 'brian@mail.com',
    role: 'Student',
    status: 'Active',
    photo: null,
  },
  {
    id: 3,
    name: 'Clara D.',
    regNo: 'INS205',
    email: 'clara@mail.com',
    role: 'Lecturer',
    status: 'Deactivated',
    photo: null,
  },
  {
    id: 4,
    name: 'Daniel L.',
    regNo: 'STD104',
    email: 'daniel@mail.com',
    role: 'Student',
    status: 'Active',
    photo: null,
  },
  {
    id: 5,
    name: 'Eleanor T.',
    regNo: 'INS301',
    email: 'eleanor@mail.com',
    role: 'Lecturer',
    status: 'Active',
    photo: null,
  },
];

function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState({});
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelectUser = (id) => {
    setSelectedUsers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleMenu = (id) => {
    setOpenMenuId(prev => (prev === id ? null : id));
  };

  const handleEdit = (userId) => {
    console.log('Edit user', userId);
  };

  const handleResetPassword = (userId) => {
    console.log('Reset password for', userId);
  };

  const handleToggleStatus = (userId, status) => {
    console.log(`${status === 'Active' ? 'Deactivate' : 'Activate'} user`, userId);
  };

  const handleDelete = (userId) => {
    console.log('Delete user', userId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>👥 Manage Users</h2>
        <div className={styles.actionBar}>
          <input
            type="text"
            placeholder="Search by name, email, or reg. no"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button className={styles.addButton} onClick={() => navigate('/add-user')}>
            + Add New User
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Select</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Reg. No</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={!!selectedUsers[user.id]}
                    onChange={() => toggleSelectUser(user.id)}
                  />
                </td>
                <td>
                  <div className={styles.profilePicPlaceholder}>
                    {user.photo
                      ? <img src={user.photo} alt="User" className={styles.profilePic} />
                      : <span className={styles.avatarPlaceholder}>👤</span>
                    }
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.regNo}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`${styles.roleBadge} ${styles[user.role.toLowerCase()]}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`${styles.status} ${user.status === 'Active' ? styles.active : styles.deactivated}`}>
                    {user.status}
                  </span>
                </td>
                <td className={styles.actions}>
                  <div className={styles.dropdownWrapper}>
                    <button
                      className={styles.dropdownToggle}
                      onClick={() => toggleMenu(user.id)}
                    >
                      ⋮
                    </button>
                    {openMenuId === user.id && (
                      <div className={styles.dropdownMenu}>
                        <button onClick={() => handleEdit(user.id)}>Edit</button>
                        <button onClick={() => handleResetPassword(user.id)}>Reset Password</button>
                        <button onClick={() => handleToggleStatus(user.id, user.status)}>
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button onClick={() => handleDelete(user.id)} className={styles.deleteOption}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;
