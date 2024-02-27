import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from "@firebase/firestore"
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

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

export const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [
    //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      
      {
        requireDisplayName: false,
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
      },
    ],
    // tosUrl: '<your-tos-link>',
    // privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
    credentialHelper: firebaseui.auth.CredentialHelper.NONE
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

