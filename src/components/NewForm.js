import React from "react"

const NewForm = (props) => {
  
const [state, setState] = React.useState({
  title: props.bookmark.title,
  url: props.bookmark.url
})


const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    props.handleSubmit(props.match.params.id, state); // Submit to Parents desired function
    props.history.push("/"); //Push back to display page
  };


const handleChange = event => {
  setState({
    ...state,
    [event.target.id]: event.target.value
  })
}

  return (<form onSubmit={handleSubmit}>
    <label>Title: </label>
    <input className="form-control" id="title" type="text" name="title" value={state.title} onChange={handleChange} />
    <label>URL: </label>
    <input className="form-control" id="url" type="text" name="url" value={state.url} onChange={handleChange} />
    <input className="btn btn-secondary" type="submit" value={props.label} />
    </form>
  )

}

export default NewForm