/* eslint-disable jsx-a11y/anchor-is-valid */

import { connect } from "react-redux";
import * as actions from '../actions/index';

function Sort(props) {

    var { by, value } = props.sort;

    function onClick(sortBy, sortValue) {
        props.onSort({
            by: sortBy,
            value: sortValue
        });
    }

    return (
        <>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" style={{ margin: '12px' }}>
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5" />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => onClick('name', 1)}>
                            <a role="button">
                                <button type="submit" style={{ border: "none", background: "transparent" }}>
                                    <span className="fa fa-sort-alpha-asc pr-5">
                                        Tên A-Z
                                        <i className={(by === 'name' && value === 1 ? "fa-check" : '')}></i>
                                    </span>
                                </button>
                            </a>
                        </li>
                        <li onClick={() => onClick('name', -1)}>
                            <a role="button">
                                <button type="submit" style={{ border: "none", background: "transparent" }}>
                                    <span className="fa fa-sort-alpha-desc pr-5">
                                        Tên Z-A
                                        <i className={(by === 'name' && value === -1 ? "fa-check" : '')}></i>
                                    </span>
                                </button>
                            </a>
                        </li>
                        <li role="separator" className="divider" />
                        <li onClick={() => onClick('status', 1)}>
                            <a role="button">
                                <button type="submit" style={{ border: "none", background: "transparent" }}>
                                    <span className="fa pr-5">Trạng Thái Kích Hoạt <i className={(by === 'status' && value === 1 ? "fa-check" : '')}></i></span>
                                </button>
                            </a>
                        </li>
                        <li onClick={() => onClick('status', -1)}>
                            <a role="button" >
                                <button type="submit" style={{ border: "none", background: "transparent" }}>
                                    <span className="fa pr-5">Trạng Thái Ẩn <i className={(by === 'status' && value === -1 ? "fa-check" : '')}></i></span>
                                </button>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}

const mapStateToProps = state => {
    return {
        sort: state.sortTasks
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sortTasks(sort))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort);