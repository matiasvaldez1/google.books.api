import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import img from "./utils/images.jpg";
/* https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=yourAPIKey */
/*AIzaSyCM8WZoMU9vVSz6qYeJ6Juk6Y4X160H6I4*/

function App() {

  const [book,setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey,setApiKey] = useState("AIzaSyCM8WZoMU9vVSz6qYeJ6Juk6Y4X160H6I4")

  function handleChange(e){
    const book = e.target.value;
    setBook(book);
  }

  function handleSubmit(e){
    e.preventDefault()
      axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+"&key="+apiKey+"&maxResults=40")
      .then(data =>{ 
        console.log(data.data)
        setResult(data.data.items)
      })
    }

  return (
    <div className="App">

        <h1>Google Books Searcher</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input className="input" onChange={handleChange} type="text" placeholder='Search books'/>
          <button className="btn-1" type='submit'>
            <BsSearch className='icons'/>
            </button>
        </form>

          <div className='img'>
            {result.map(book =>(
            <a href={book.volumeInfo.previewLink}>
              <img src = {book.volumeInfo.imageLinks === undefined ? `${img}`:`${book.volumeInfo.imageLinks.thumbnail}`} alt={book.title}></img>
              <p>{book.volumeInfo.title}</p>
            </a>
          ))}

        </div>

    </div>
  )
}

export default App
