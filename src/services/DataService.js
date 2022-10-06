import firebase from "../assets/js/firebase";
import { getDatabase, ref, set, onValue } from "firebase/database";

const db = getDatabase();

class DataService {
 
  writeUserData(userId, name, email, imageUrl) {
    set(ref(db, "users/" + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl,
    });
  }
}

export default new DataService();
