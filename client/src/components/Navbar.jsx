import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <header>
            <nav>
                <NavLink to="/" className="nighthawk">
                    Nighthawk
                </NavLink>
                <NavLink to="/user/create" className="user">
                    Create a new user
                </NavLink>
            </nav>
        </header>
    );
}