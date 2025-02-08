"use client"
import React, { useState } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { handleLogIn, handleSignUp } from './LoginManager';
import Header from '../Header/Header';
import { useRouter } from "next/navigation";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const Login = () => {
	const [newUser, setNewUser] = useState(false);
	const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        phone: '',
        role: ''
    })
	const router = useRouter();

	const provider = new firebase.auth.GoogleAuthProvider();
	const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(async (res) => {
                const { displayName, email, photoURL } = res.user;
				const idToken = await res.user.getIdToken();

				const refreshToken = res.user.refreshToken;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }
				localStorage.setItem("accessToken", idToken);
				router.push('/ManageHotels');
				const cookieOptions = {
					secure: true,
					httpOnly: true,
				}
                setUser(signedInUser);
            })
            .catch(error => {
                console.log(error);
                console.log(error.message);
            })
    }

	const handleSubmit = (e) => {
        console.log(user);
        if (!newUser && user.email && user.password) {
            handleLogIn(user.email, user.password)
                .then(res => {
                    if (res.email) {
                        handleLogInUser(res, true);
                    }
                })
        }
        if (newUser && user.email && user.password) {
            handleSignUp(user.name, user.email, user.password)
                .then(res => {
                    if (res.email) {
                        handleLogInUser(res, false);
                        const userDetail = { ...user };
                        userDetail.error = "";
                        setUser(userDetail);
                        

                    }

                })
        }
        e.preventDefault();
    }
	
	const handleLogInUser = (res, isReplace) => {
        const signedInUser = {
            isSignedIn: true,
            name: res.displayName || user.name,
            email: res.email,
            photo: res.photoURL || "https://i.ibb.co/CzkSST0/avater.png",
            role: user.role
        }
        isReplace && checkRole(signedInUser);

    }


	return (
		<>
			<Header />
			<div className="loginbox">
				<div className="text-center social-btn">
					<button onClick={handleGoogleSignIn} > Continue With Google</button><br />
					</div>
					<h5 className="text-center mt-3 text-or">Or</h5>
					<form onSubmit={handleSubmit} className="login-form">
						{
							newUser && <input type="text" name="name" placeholder="Enter your name" required />
						}
						<input type="text" name="email" placeholder="Enter Email" required />
						<input type="password" name="password" placeholder="Enter Password" required />
						<input type="submit" value={newUser ? "Sign Up" : "Login"} disabled={!user.role && "disabled"} style={!user.role ? { cursor: 'context-menu', backgroundColor: 'gray' } : {}} />

						<div className="a mt-3 text-center text-logSign">
							{
								newUser ? 'already have an account?' : "Don't have an account? "
							}

							<span onClick={() => setNewUser(!newUser)} style={{ cursor: 'pointer' }}>
								{
									newUser ? 'login' : 'sign up'
								}
							</span>

						</div>
					</form>
			</div>
		</>

	);
};

export default Login;