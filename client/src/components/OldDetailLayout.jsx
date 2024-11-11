/* import { Link } from "react-router-dom";

export default function OldDetailLayout(props) {
    const params = props.params;
    const user = props.user;
    const dreamList = props.dreamList;
    const deleteUser = props.deleteUser;

    return (
        <div className="top-lvl-formatting">
            <aside>
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
            </aside>

            <main>
                <div className="bottom-lvl-formatting">
                    <span>{user.name}'s ({user.age}) dreams</span>
                    <Link 
                        to={`/dream/create?user=${params.id}`}
                        className="dream">
                        Create a new dream
                    </Link>
                </div>
                <section>
                    <ul>{dreamList}</ul>
                </section>
            </main>
        </div>
    );
} */