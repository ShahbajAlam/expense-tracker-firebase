import { auth } from "../firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const signin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate("expenses");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <button onClick={signin}>Sign In with Google</button>
        </div>
    );
}

export default Login;
