import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div className="layout-container">
            <header className="layout-header">
                <Link to="/" className="layout-logo">Code Challenge</Link>
                <nav className="layout-nav">
                    <ul>
                        <li>
                            <Link to="/" className={isActive('/')}>Home</Link>
                        </li>
                        <li>
                            <Link to="/problem1" className={isActive('/problem1')}>Problem 1</Link>
                        </li>
                        <li>
                            <Link to="/problem2" className={isActive('/problem2')}>Problem 2</Link>
                        </li>
                        <li>
                            <Link to="/problem3" className={isActive('/problem3')}>Problem 3</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="layout-main">
                <div className="content-card">
                    <Outlet />
                </div>
            </main>
            <footer className="layout-footer">
                © {new Date().getFullYear()} Code Challenge Solution
            </footer>
        </div>
    );
};

export default Layout;
