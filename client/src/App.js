import React, { Component} from 'react';
import axios from 'axios';
import TodoForm from './components/todos/TodoForm';
import List from './components/todos/List';



class App extends Component {
  state = { todos: [] }


  componentDidMount() {
    // make api call to the rails side to get all the todos
    axios.get('/api/todos')
      .then( res => {
        this.setState({ todos: res.data })
      })
      .catch( err => {
        console.log(err)
      })
  }


  addTodo = (todo) => {
    // make api call to add a todo into the rails side 
    axios.post('/api/todos', todo)
      .then( res => {
        // add the todo into the state
        const { todos } = this.state
        this.setState({ todos: [ ...todos, res.data ]})
      })
      .catch( err => {
        console.log(err)
      })
  }


  updateTodo = (todo, id) => {
    // make api call to update a todo in the rails side
    axios.put(`/api/todos/${id}`, todo)
      .then( res => {
        const todos = this.state.todos.map( t => {
          if ( t.id === id) {
            return res.data
          }
          return t
        })
        this.setState({ todos })
      })
    // update todo in the state
    .catch( err => {
      console.log(err)
    })
  }


  deleteTodo = (id) => {
    // make api call to delete a todo on the rails side
    axios.delete(`/api/todos/${id}`)
      .then( res => {
        const { todos } = this.state
        this.setState({ todos: todos.filter(todo => todo.id !== id)})
      })
    // delete the todo from our state
    .catch( err => {
      console.log(err)
    })
  }


  render() {
    return(
      <>
        <TodoForm addTodo={this.addTodo} />
        <List 
          todos={this.state.todos} 
          deleteTodo={this.deleteTodo}
          update={this.updateTodo}
        />
      </>
    )
  }
}
export default App;