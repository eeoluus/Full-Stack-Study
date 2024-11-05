import { Link } from "react-router-dom";

export default function UserDetailLayout(props) {
    const params = props.params;
    const user = props.user;
    const deleteUser = props.deleteUser;

    const dreamList = user.dreams.map(
        (dream) => (
            <li className="dream" key={dream._id}>
                <Link to={`/dream/${dream._id}`}>
                    <p>{dream.quality}: {dream.summary}</p>
                </Link>
            </li>
        )
    );

    return (
        <div className="top-lvl-formatting">
            <main className="user-detail-content">
                <div className="user-panel">
                    <h2>{user.name} ({user.age})</h2>
                    <div className="controls">
                        <Link 
                            to={`/dream/create?user=${params.id}`}
                            className="dream">
                            New dream
                        </Link>    
                        <Link 
                            to={`/user/${params.id}/update`}
                            className="user">
                            Edit
                        </Link>
                        <button
                            type="button"
                            className="user"
                            onClick={
                                () => {deleteUser(params.id)}
                            }>
                            Delete
                        </button>
                    </div>
                </div>
                <h3>Dreams</h3>
                <section>
                    <ul className="dream-list">
                        {dreamList}
                    </ul>
                </section>
            </main>
        </div>
    );
}