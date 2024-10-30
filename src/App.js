// src/App.js
import React from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  // Функция для смены языка
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>{t('welcome')}</h1>
        <div className="language-switcher">
          <button onClick={() => changeLanguage('en')}>EN</button>
          <button onClick={() => changeLanguage('ru')}>RU</button>
          <button onClick={() => changeLanguage('es')}>ES</button>
        </div>
      </header>
      <main className="app-main">
        <UserForm />
        <UserList />
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 Ваше Имя. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default App;
