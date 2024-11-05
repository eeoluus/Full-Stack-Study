import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <header>
            <nav>
                <NavLink to="/" className="nighthawk">
                    <h1>Nighthawk</h1>
                </NavLink>
                <NavLink to="/user/create" className="user">
                    <h4>New user</h4>
                </NavLink>
            </nav>
        </header>
    );
}