
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Event from './components/Event';
import Favorite from './components/Favorite';
import Login from './components/Login';

import './App.css';



function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function checkAuth() {
        try {
            const response = await fetch('/api/check-auth', {
                credentials: 'include'
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Failed checking authentication:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    // Page rendering
    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div className="container-fluid d-flex justify-content-start align-items-center">
                    <img className="me-3" src='/icon.png' alt='webpage logo' style={{ maxWidth: "45px" }} />

                    <ul className="navbar-nav">
                        {/* Always show these links */}
                        <li className="nav-item">
                            <Link className="nav-link" to='/'>Home</Link>
                        </li>
                        <li className="nav-item ms-2">
                            <Link className="nav-link" to='/event'>Event list</Link>
                        </li>
                        <li className="nav-item ms-2">
                            <Link className="nav-link" to='/favorite'>Favorite list</Link>
                        </li>

                        {/* Login link - shows when NO user */}
                        {!user && (
                            <li className="nav-item ms-2">
                                <Link className="nav-link" to='/login'>Log In</Link>
                            </li>
                        )}

                        {/* User info - shows when user exists */}
                        {user && (
                            <>
                                <li className="nav-item ms-3">
                                    <span className="nav-link">
                                        <i className="bi bi-person me-1"></i> {user.username}
                                    </span>
                                </li>
                                <li className="nav-item ms-2">
                                    <button
                                        className="nav-link btn btn-link p-0"
                                        onClick={async () => {
                                            await fetch('/api/logout', {
                                                method: 'POST',
                                                credentials: 'include'
                                            });
                                            setUser(null);
                                            checkAuth();
                                        }}
                                    >
                                        Log out
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>

            <Routes>
                <Route path='/' element={
                    user ? <Home /> : <Navigate to="/login" replace />
                } />
                <Route path='/event' element={
                    user ? <Event /> : <Navigate to="/login" replace />
                } />
                <Route path='/favorite' element={
                    user ? <Favorite /> : <Navigate to="/login" replace />
                } />
                <Route path='/login' element={
                    user ? <Navigate to="/" replace /> : <Login setUser={setUser} />
                } />
                <Route path='*' element={
                    <Navigate to={user ? "/" : "/login"} replace />
                } />
            </Routes>
        </div>
    );
}

export default App;
