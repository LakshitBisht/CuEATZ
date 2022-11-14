import { db } from "./firebase";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

class UsersDB {
  constructor() {
    this.db = db;
    this.collectionName = "Users";
  }

  create = (docId) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return setDoc(docRef, { mylist: [], history: [], cart: [] });
  };

  insertMyList = (docId, data) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef, {
      mylist: arrayUnion(data),
    });
  };

  removeMyList = (docId, data) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef, {
      mylist: arrayRemove(data),
    });
  };

  addToCart = (docId, data) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef, {
      cart: arrayUnion(data),
    });
  };

  removeFromCart = (docId, data) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef, {
      cart: arrayRemove(data),
    });
  };

  clearCart = (docId) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef, {
      cart: [],
    });
  };

  addOneCart = (docId, data) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef, {
      cart: data,
    });
  };
  removeOneCart = (docId, data) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef, {
      cart: data,
    });
  };

  insertHistory = (docId, data) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef, {
      history: arrayUnion(data),
    });
  };

  removeHistory = (docId, data) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef, {
      history: arrayRemove(data),
    });
  };

  clearHistory = (docId) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return updateDoc(docRef, {
      history: [],
    });
  };

  initialize = (docId) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return getDoc(docRef);
  };

  copy = (docId, listArray, historyArray) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return setDoc(docRef, { mylist: listArray, history: historyArray });
  };

  delete = (docId) => {
    const docRef = doc(this.db, this.collectionName, docId);
    return deleteDoc(docRef);
  };
}

export default new UsersDB();
