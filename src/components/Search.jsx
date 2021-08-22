import { useState } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions/index';

function Search(props) {
    const [key, setKey] = useState({
        keyword: ''
    });

    var { keyword } = key;

    function onChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        setKey({
            [name]: value
        })
    }

    function onSearch() {
        props.onSearch(keyword);
    }

    return (
        <>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 ">
                <div className="input-group" style={{ margin: '12px' }}>
                    <input type="text" className="form-control" placeholder="Nhập từ khóa..." name="keyword" value={keyword} onChange={onChange} />
                    <span className="input-group-btn ">
                        <button className="btn btn-primary" type="button" onClick={onSearch}>
                            <span className="fa fa-search mr-5" /> Tìm
                        </button>
                    </span>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch: (keyword) => dispatch(actions.searchTask(keyword))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);