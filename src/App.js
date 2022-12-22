import { 
  getDocs, addDoc, deleteDoc, doc, onSnapshot, 
  where, query, orderBy, serverTimestamp, getDoc, updateDoc } from "firebase/firestore";
import colRef from "./firebase/fbConfig";
import { db } from "./firebase/fbConfig";
import Authentication from "./Authentication";
import unsubAuth from "./Authentication";

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

  
const unsubCol = onSnapshot(q, (snapshot) => {
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

  //get a singel document
  const docRef = doc(db, 'books', 'FVFx6Ny7eJBRNqmGwIeG')
  // getDoc(docRef)
  //   .then((doc) => {
  //     console.log(doc.data(), doc.id)
  //   })
  const unsubDoc = onSnapshot(docRef, (doc) => {
      console.log(doc.data(), doc.id)
    })

  const updateBook = (e) => {
    e.preventDefault()
    const docRef = doc(db, 'books', e.target.id.value)
    updateDoc(docRef, {
      title: "book has updated"
    })
      .then(() =>{
        console.log("book has been update")
      })
  }
  
  const unSub = () => {
    console.log("Unsubscribe")
    unsubCol()
    unsubAuth()
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

        <form onSubmit={ updateBook }>
          <label htmlFor="update">Document ID</label>
          <input type="text" id="update" required/>
          <button>Update a book</button>
        </form>

        <Authentication />

        <h2>Unsubscribing</h2>
        <button onClick={ unSub }>unsubscribe from db/auth changes</button>
    </div>
  );
}

export default App;
