import { initializeApp } from "firebase/app"
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyAnWIfp58aWbI51kAHu5b1drJf4g6IfH0Y",
  authDomain: "vanvibe-af8b4.firebaseapp.com",
  projectId: "vanvibe-af8b4",
  storageBucket: "vanvibe-af8b4.firebasestorage.app",
  messagingSenderId: "996961822073",
  appId: "1:996961822073:web:0babde6c0d0ef4190f3ba8"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}




export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}