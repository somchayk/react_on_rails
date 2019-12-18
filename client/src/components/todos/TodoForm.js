import React, { Component } from 'react';
class TodoForm extends Component {
  state = { title: '', complete: false }
  componentDidMount() {
    if (this.props.id) {
      const { title, complete } = this.props
      this.setState({ title, complete })
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.id) {
      this.props.update(this.props.id, this.state)
      this.props.toggleEdit()
    } else {
      this.props.addTodo(this.state)
    }
    this.setState({ title: '' })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          name='title'
          value={this.state.title}
          onChange={this.handleChange}
          required
          placeholder='Add your todo here'
        />
        {
          this.props.id ?
          <input 
            type='checkbox'
            checked={this.props.complete}
            name='complete'
            value={this.state.complete}
            onChange={this.handleChange}
          />
          :
          ''
        }
        <input
          type='submit'
        />
      </form>
    )
  }
}
export default TodoForm;