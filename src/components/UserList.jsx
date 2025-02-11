import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  // Fetch user data using async/await
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Calculate the users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page navigation
  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1 className='user-list-heading'>User List</h1>
      <div className="user-list">
        {currentUsers.map((user) => (
          <div className="user-card" key={user.id}>
            <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
            <h2>{user.firstName} {user.lastName}</h2>
            <strong>Email:</strong>
            <p>{user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(users.length / usersPerPage)}
        >
          Next
        </button>
      </div>
      <div className="pagecount-container">
        <div className="pagecount">
            <span>Page {currentPage}</span>
        </div>
      </div>
    </div>
  );
};

export default UserList;