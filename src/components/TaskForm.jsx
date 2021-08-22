import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from '../actions/index';

function TaskForm(props) {

    const [task, setTask] = useState({
        id: '',
        name: '',
        status: false
    });

    useEffect(() => {
        if (props.task) {
            setTask({
                id: props.editingTask.id,
                name: props.editingTask.name,
                status: props.editingTask.status
            });
        }
    }, [props])

    //componentWillReceiveProps
    useEffect(() => {
        if (props && props.editingTask) {
            setTask({
                id: props.editingTask.id,
                name: props.editingTask.name,
                status: props.editingTask.status
            });
        } else {
            setTask({
                id: props.editingTask.id,
                name: '',
                status: false
            });
        }
    }, [props]) // this line will tell react only trigger if props was changed

    function onExitForm() {
        props.onCloseForm();
    }

    function onHandleChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        if (name === 'status') {
            value = (target.value === 'true' || target.value === true) ? true : false;
        }

        setTask((prevTask) => {
            return {
                ...prevTask,
                [name]: value
            };
        });
    }

    function onHandleSubmit(event) {
        event.preventDefault();
        props.onSave(task);
        onExitForm();
        onClear();
    }

    function onClear() {
        setTask({
            id: props.editingTask.id,
            name: '',
            status: false
        });
    }

    var { id, name, status } = task;

    if (!props.isDisplayForm) return null;

    return (
        <>
            <div className="panel panel-warning" style={{ margin: "12px" }}>
                <div className="panel-heading">
                    <h3 className="panel-title" >
                        {!id ? "Thêm Công Việc" : 'Cập Nhật Công Việc'}
                        <span className={!id ? "fa fa-times-circle text-right add-close" : "fa fa-times-circle text-right update-close"} onClick={onExitForm}></span></h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={onHandleSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" className="form-control" name="name" value={name} onChange={onHandleChange} />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" name="status" value={status} onChange={onHandleChange} required>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Lưu lại</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={onClear}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        editingTask: state.editingTask
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSave: (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);