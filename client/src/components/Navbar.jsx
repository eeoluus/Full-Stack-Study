import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <nav>
                <NavLink to="/">
                    Home
                </NavLink>
                <NavLink to="/user/create">
                    Create new user
                </NavLink>
            </nav>
        </div>
    );
}