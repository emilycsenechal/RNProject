import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigStore } from './redux/configStore';

const store = ConfigStore();

export default function App() {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}