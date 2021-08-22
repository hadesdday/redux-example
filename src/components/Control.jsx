import Search from "./Search";
import Sort from "./Sort";

function Control(props) {
    return (
        <>
            <div className="row mt-15">
                <Search />
                <Sort />
            </div>
        </>
    );
}

export default Control;