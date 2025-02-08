import firebase from "firebase/app";
import "firebase/auth";

export const handleLogIn = async (email, password) => {
  try {
		const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
		const user = userCredential.user;
		return user;
	} catch (error) {
		const errorMessage = error.message;
		return errorMessage;
	}
}

export const handleSignUp = async (name, email, password) => {
  try {
		const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
		updateUserName(name);
		const user = userCredential.user;
		console.log(user);
		return user;
	} catch (error) {
		const errorMessage = error.message;
		return errorMessage;
	}
}

const updateUserName = name => {
  const user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: name
    }).then(res => {
      
    }).catch(error => {
      console.log(error);
    });
}