import { auth } from "./firebase/fbConfig";
import { 
    createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword,
    onAuthStateChanged
 } from "firebase/auth";
const Authentication = () => {

    const handdleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.emailSignIn.value
        const password = e.target.passwordSignIn.value

        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                console.log('user created', cred.user)
            })
            .catch((err) => {
                console.log(err.message)
            })
        e.target.reset()
    }

    const handdleLogin = (e) => {
        e.preventDefault()
        console.log(e)
        const email = e.target.email.value
        const password = e.target.password.value

        signInWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                console.log("user logged in:", cred.user)
            })
            .catch((err) => {
                console.log(err.message)
            })
        e.target.reset()
    }

    const handdleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("the user signed out")
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    onAuthStateChanged(auth, (user) => {
        console.log("user states changed: ", user)
    })

    return ( 
        <div className="auth-wrapper">
            <form onSubmit={ handdleSubmit }>
                <label htmlFor="emailSignIn">Email</label>
                <input type="email" id="emailSignIn"/>
                <label htmlFor="passwordSignIn">Password</label>
                <input type="password" id="passwordSignIn"/>
                <button>Sign Up</button>
            </form>

            <form onSubmit={ handdleLogin }>
                <label htmlFor="email">Email</label>
                <input type="email" id="email"/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password"/>
                <button>Login</button>
            </form>

            <button onClick={ handdleLogout}>Logout</button>
        </div>
     );
}
 
export default Authentication;