import * as actions from "../actions/index";
import { connect } from 'react-redux';

function TaskItem(props) {
    var { task, index } = props;

    function onUpdateStatus() {
        props.onUpdateStatus(task.id);
    }

    function onDelete() {
        props.onDelete(task.id);
        props.onCloseForm();
    }

    function onUpdate() {
        props.onOpenForm();
        props.onUpdate(task);
    }

    return (
        <>
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span className={task.status ? "label label-success" : "label label-danger"} onClick={onUpdateStatus}>
                        {task.status ? "Kích hoạt" : "Ẩn"}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={onUpdate}>
                        <span className="fa fa-pencil mr-5" /> Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={onDelete}>
                        <span className="fa fa-trash mr-5" /> Xóa
                    </button>
                </td>
            </tr>

        </>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDelete: (id) => {
            dispatch(actions.removeTask(id));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onUpdate: (task) => {
            dispatch(actions.updateTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);