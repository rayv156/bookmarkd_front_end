import React from "react"
import { Route, Link, Switch } from "react-router-dom";

const Display = (props) => {
    const {bookmarks, deleteBookmark} = props
   
const div = {
    backgroundColor: "rgb(248,255,247)",
    color: "rgb(53, 104, 115)",
}

const loaded = () => {
    console.log(bookmarks)
    return (
        
        <div style={{textAlign: "center"}}>
            <Link to="/create">
        <button className="btn btn-primary" style={{margin: 20}}>Add Bookmark</button>
      </Link>
            <table className="table text-center m-3 table-dark">
        {bookmarks.map((bookmark)=>(
         <tr>
         <td><a href={bookmark.url}><h3>{bookmark.title}</h3></a></td>
         <td>
         <Link to={`/${bookmark._id}`}>
         <button onClick={() => bookmark._id} className="btn btn-light">Edit</button>
       </Link></td>
             <td onClick={() => deleteBookmark(bookmark._id)}><button className="btn btn-danger">Delete</button></td>
             </tr>
        ))}
        </table>
    </div>
    )
    }

return bookmarks.length > 0 ? loaded() : "where are you!!!!????"
}
export default Display