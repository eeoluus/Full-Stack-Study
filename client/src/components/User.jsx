import { Link } from "react-router-dom";

export default function User(props) {
    return (
        <li className="user">
            {props.name}, age: {props.age} 
            <Link to={`/user/${props.id}`}>
                View
            </Link>
        </li>
    );
}