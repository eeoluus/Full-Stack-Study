import { Link } from "react-router-dom";

export default function Dream(props) {
    return (
        <li className="dream"> {/* Should preferably only include a shortened summary. */}

           



            {/* {props.summary}, type: {props.quality}  */}
            <Link to={`/dream/${props.id}`}>
                Dream: {props.quality} 
                <p className="dream-short-formatting">
                    {/* View */}{props.summary}
                </p>
            </Link>
        </li>
    );
}