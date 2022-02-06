import { configureStore } from '@reduxjs/toolkit'
import userReducer from './users/userSlice';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export default configureStore({
    reducer: {
        users: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});