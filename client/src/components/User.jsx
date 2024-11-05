import { Link } from "react-router-dom";

export default function User(props) {
    return (
        <li className="user">
            <Link to={`/user/${props.id}`}>
                {props.name}
            </Link>
        </li>
    );
}