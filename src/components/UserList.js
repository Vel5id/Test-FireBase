// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './UserList.css';
import { useTranslation } from 'react-i18next';

const UserList = () => {
  const { t } = useTranslation();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Для отображения состояния загрузки
  const [error, setError] = useState(null); // Для отображения ошибок

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
      } catch (err) {
        console.error('Ошибка получения пользователей:', err);
        setError(t('error_loading'));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [t]);

  return (
    <div className="user-list-container">
      <h2>{t('users_list')}</h2>
      {loading ? (
        <p>{t('loading')}</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : users.length === 0 ? (
        <p>{t('no_users')}</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>{t('name')}</th>
              <th>{t('age')}</th>
              <th>{t('gender')}</th>
              <th>{t('likes_spicy')}</th>
              <th>{t('likes_raw')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.age} {t('age')}</td>
                <td>{user.gender}</td>
                <td className="center-cell">
                  {user.likesSpicy ? <span className="checkmark">✔️</span> : ''}
                </td>
                <td className="center-cell">
                  {user.likesRaw ? <span className="checkmark">✔️</span> : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
