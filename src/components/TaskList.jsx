import { useState } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import * as actions from '../actions/index';
import { filter as filterArray } from "lodash";

function TaskList(props) {

    var { tasks, filterTable, keyword, sort } = props;
    var elementTask = tasks.map((task, index) => {
        return <TaskItem key={task.id} index={index} task={task} />
    })

    const [filter, setFilter] = useState({
        filterName: '',
        filterStatus: -1 //all : -1,active : 1,deactive : 0
    })

    var { filterName, filterStatus } = filter;

    function onChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        var filter = {
            name: name === 'filterName' ? value : filterName,
            status: name === 'filterStatus' ? value : filterStatus
        }
        props.onFilterTable(filter);

        setFilter((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        });

        // const backupList = JSON.parse(localStorage.getItem('tasks'));

        // var updatedList = backupList;

        // if (filterTable.name) {
        //     tasks = filterArray(updatedList, (task) => {
        //         return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1;
        //     });S
        // }

        // tasks = filterArray(updatedList, (task) => {
        //     if (filterTable.status === -1) {
        //         return task;
        //     } else {
        //         return task.status === (filterTable.status === 1 ? true : false);
        //     }
        // });

        // console.log(tasks);
    }
    const backupList = JSON.parse(localStorage.getItem('tasks'));

    var updatedList = backupList;

    var a = filterArray(updatedList, (task) => {
        if (filterTable.status === -1) {
            return task && task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1;
        } else {
            return task.status === (filterTable.status === 1 ? true : false) && task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1;
        }
    });

    if (keyword !== '') {
        a = filterArray(updatedList, (task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        })
    }


    if (sort.by === 'name') {
        a.sort((a, b) => {
            if (a.name > b.name) { return sort.value; }
            else if (a.name < b.name) { return -sort.value; }
            else { return 0; }
        })
    } else {
        a.sort((a, b) => {
            if (a.status > b.status) { return -sort.value; }
            else if (a.status < b.status) { return sort.value; }
            else { return 0; }
        })
    }

    elementTask = a.map((task, index) => {
        return <TaskItem key={task.id} index={index} task={task} />
    })

    return (
        <>
            <table className="table table-bordered table-hover mt-15" style={{ margin: '12px' }}>
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td />
                        <td>
                            <input type="text" className="form-control" name="filterName" value={filterName} onChange={onChange} />
                        </td>
                        <td>
                            <select className="form-control" name="filterStatus" value={filterStatus} onChange={onChange}>
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                        </td>
                        <td />
                    </tr>
                    {elementTask}
                </tbody>
            </table>

        </>
    );

}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        keyword: state.searchTask,
        sort: state.sortTasks
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTable(filter));
        },
        onSearch: (keyword) => {
            dispatch(actions.searchTask(keyword));
        },
        onSort: (sort) => {
            dispatch(actions.sortTasks(sort));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);