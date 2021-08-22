import './App.css';
import Control from './components/Control';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from "./actions/index";

function App(props) {

  var { isDisplayForm } = props;

  function onToggleForm() {
    var { editingTask } = props;
    if (editingTask && editingTask.id !== '') {
      props.onOpenForm();
    } else {
      props.onToggleForm();
    }
    props.onClearTask({
      id: '',
      name: '',
      status: false
    });

  }

  return (
    <>
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
            <TaskForm />
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-8 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" style={{ margin: '12px' }} onClick={onToggleForm}>
              <span className="fa fa-plus mr-5" /> Thêm Công Việc
            </button>
            <Control />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm,
    editingTask: state.editingTask
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onClearTask: (task) => {
      dispatch(actions.updateTask(task));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
