import { getDocs, addDoc, deleteDoc, doc, onSnapshot, where, query, orderBy, serverTimestamp } from "firebase/firestore";
import colRef from "./firebase/fbConfig";
import { db } from "./firebase/fbConfig";

function App() {
  // getDocs(colRef)
  //   .then((snapshot) => {
  //     let books = []
  //     snapshot.docs.forEach((book) => {
  //       books.push({ ...book.data(), id: book.id})
  //     })
  //     console.log(books)
  //   })
  //   .catch((err) => {
  //     console.log(err.message) 
  //   })
  
//queries
// const q = query(colRef, where('author', '==', 'Odoo'), orderBy('createdAt'))
const q = query(colRef, orderBy('createdAt'))

  
  onSnapshot(q, (snapshot) => {
    let books = []
      snapshot.docs.forEach((book) => {
        books.push({ ...book.data(), id: book.id})
      })
      console.log(books)
  })


  const addBook = (e) => {
    e.preventDefault()
    
    addDoc(colRef, {
      title: e.target.title.value, 
      author: e.target.author.value,
      createdAt: serverTimestamp()
    })
      .then(() => {
        console.log('book has added')
      })
      e.target.reset()
  }

  const deleteBook = (e) => {
    e.preventDefault()
    const docRef = doc(db, 'books', e.target.id.value)
    deleteDoc(docRef)
      .then(() => {
        console.log('book has removed')
      })
     e.target.reset()
  }
  
  return (
    <div className="App">
      <h2>Firebase Firestore</h2>

        <form onSubmit={ addBook }>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" required/>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" required/>

          <button>Add a new book</button>
        </form>

        <form onSubmit={ deleteBook }>
          <label htmlFor="id">Document id:</label>
          <input type="text" id="id" required/>

          <button>delete a book</button>
        </form>
    </div>
  );
}

export default App;
