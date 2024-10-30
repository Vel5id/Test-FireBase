// src/components/UserForm.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './UserForm.css';
import { useTranslation } from 'react-i18next';

const UserForm = () => {
  const { t } = useTranslation();
  
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [likesSpicy, setLikesSpicy] = useState(false);
  const [likesRaw, setLikesRaw] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users'), {
        name,
        age: Number(age),
        gender,
        likesSpicy,
        likesRaw,
      });
      setMessage(t('success_added'));
      // Очистка формы
      setName('');
      setAge('');
      setGender('');
      setLikesSpicy(false);
      setLikesRaw(false);
    } catch (error) {
      console.error('Ошибка добавления документа: ', error);
      setMessage(t('error_adding'));
    }
  };

  const generateTestData = async () => {
    const testUsers = [
      { name: 'Иван', age: 25, gender: 'Мужской', likesSpicy: true, likesRaw: false },
      { name: 'Мария', age: 30, gender: 'Женский', likesSpicy: false, likesRaw: true },
      { name: 'Алексей', age: 22, gender: 'Мужской', likesSpicy: true, likesRaw: true },
      { name: 'Елена', age: 28, gender: 'Женский', likesSpicy: false, likesRaw: false },
      // Добавьте больше тестовых данных по необходимости
    ];

    try {
      const usersCollection = collection(db, 'users');
      const promises = testUsers.map(user => addDoc(usersCollection, user));
      await Promise.all(promises);
      setMessage(t('success_added'));
    } catch (error) {
      console.error('Ошибка добавления тестовых данных: ', error);
      setMessage(t('error_adding'));
    }
  };

  return (
    <div className="user-form-container">
      <h2>{t('add_user')}</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label>{t('name')}:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder={t('name')}
          />
        </div>
        <div className="form-group">
          <label>{t('age')}:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            placeholder={t('age')}
            min="0"
          />
        </div>
        <div className="form-group">
          <label>{t('gender')}:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">{t('gender')}</option>
            <option value="Мужской">{t('male')}</option>
            <option value="Женский">{t('female')}</option>
            <option value="Другой">{t('other')}</option>
          </select>
        </div>
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={likesSpicy}
              onChange={(e) => setLikesSpicy(e.target.checked)}
            />
            {t('likes_spicy')}
          </label>
        </div>
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={likesRaw}
              onChange={(e) => setLikesRaw(e.target.checked)}
            />
            {t('likes_raw')}
          </label>
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">{t('submit')}</button>
          <button type="button" onClick={generateTestData} className="btn btn-secondary">
            {t('generate_test_data')}
          </button>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UserForm;
