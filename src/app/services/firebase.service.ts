import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from "@firebase/firestore"

export const firebaseService = {
    query,
    post,
    put,
    get,
    remove,
}

interface Entity {
    id: string
}

export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyCnMKKz88CGPzzBwH23hEGS4rtJHIpYn14",
        authDomain: "bitcoin-statistics.firebaseapp.com",
        projectId: "bitcoin-statistics",
        storageBucket: "bitcoin-statistics.appspot.com",
        messagingSenderId: "39550622311",
        appId: "1:39550622311:web:2122e16dd522308a32d2c2"
    }
}

async function query<T>(collectionName: string, filterBy?: any) {
    const db = await _getDb()
    const collectionRef: any = collection(db, collectionName)

    const querySnapshot = await getDocs(collectionRef)
    const docs: any[] = []
    querySnapshot.forEach((doc) => {
        const data = doc.data()
        docs.push({ id: doc.id, ...data! })
    })
    return docs
}

async function post<T>(collectionName: string, document: T): Promise<T> {
    const db = await _getDb()
    const collectionRef: any = collection(db, collectionName)
    const docRef: any = await addDoc(collectionRef, document)
    console.log("docRef:", docRef)
    return {...document, id: docRef.id }

}

async function put<T extends Entity>(collectionName: string, document: T): Promise<T> {
    const db = await _getDb()
    const docRef: any = doc(db, collectionName, document.id)
    await setDoc(docRef, document, { merge: true })
    return document
}

async function get<T extends Entity>(collectionName: string, id: string): Promise<T | any> {
    const db = await _getDb()
    const snap = await getDoc(doc(db, collectionName, id))
    if (!snap.exists()) {
        throw new Error(`Cannot get, Item ${id} of type: ${collectionName} does not exist`)
    }
    const docToReturn = snap.data()
    docToReturn['id'] = id
    return docToReturn

}

async function remove(collectionName: string, id: string) {
    const db = await _getDb()
    await deleteDoc(doc(db, collectionName, id))
}

//Private functions
async function _getDb() {
    try {
        const db = getFirestore()
        return db
    } catch (err) {
        console.error('Error connecting to db ', err)
        throw err
    }
}

