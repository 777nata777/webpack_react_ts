import React from 'react';
import ReactDOM from 'react-dom/client'; // Новый API для React 18
import App from './components/App';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element not found');
}

// Создаем root для React 18
const root = ReactDOM.createRoot(rootElement); // Создаем корень

// Функция для рендера приложения
const render = (Component: React.ComponentType) => {
    root.render(<Component />);
};

// Первоначальный рендер
render(App);

// Поддержка HMR для автоматическово обнавления в браузере
if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        render(NextApp);
    });
}



