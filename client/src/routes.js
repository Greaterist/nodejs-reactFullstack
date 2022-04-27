import React from 'react';
import {Routes, Route} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage';
import { CreatePage } from './pages/CreatePage';
import { DetailPage } from './pages/DetailPage';
import { LinksPage } from './pages/LinksPage';

export const useRoutes = isAuthed => {
    if(isAuthed){
        return (
            <Routes>
                <Route path="/links" exact element={<LinksPage />} />
                <Route path="/create" exact element={<CreatePage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="*" to='/'/>
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path='*' exact element={<AuthPage />} />
            <Route path="*" to='/'/>
        </Routes>
    )
}