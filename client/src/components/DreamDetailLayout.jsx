import { Link } from "react-router-dom";

export default function DreamDetailLayout(props) {
    const params = props.params;
    const dream = props.dream;
    const deleteDream = props.deleteDream;

    return (
        <div className="top-lvl-formatting">
            <main className="dream-detail-content">
                <h2>{dream.quality}</h2>
                <p>{dream.summary}</p>
            </main>
            <aside className="controls">  
                <Link 
                    to={`/dream/${params.id}/update`}
                    className="dream">
                    Edit
                </Link>
                <button
                    type="button"
                    className="dream"
                    onClick={
                        () => {deleteDream(params.id)}
                    }>
                    Delete
                </button>
            </aside>
        </div>
    );
}