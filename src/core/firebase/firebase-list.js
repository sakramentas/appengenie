import { firebaseDb } from './firebase';

// A Class to deal with all the Firebase methods. I'm removing the dependency on this class
// creating a firebasebuild file for all the core components.
export class FirebaseList {
  constructor(actions, modelClass, path = null) {
    this._actions = actions;
    this._modelClass = modelClass;
    this._path = path;
  }

  get path() {
    return this._path;
  }

  set path(value) {
    this._path = value;
  }

  push(value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(this._path)
        .push(value, error => error ? reject(error) : resolve());
    });
  }

  remove(key) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .remove(error => error ? reject(error) : resolve());
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .set(value, error => error ? reject(error) : resolve());
    });
  }

  update(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`)
        .update(value, error => error ? reject(error) : resolve());
    });
  }

  subscribe(dispatch) {

    let ref = firebaseDb.ref(this._path);
    let initialized = false;
    let list = [];

    ref.once('value', (snapshot) => {
      initialized = true;
      dispatch(this._actions.onLoad(list));
    });

    ref.on('child_added', snapshot => {
      if (initialized) {
        dispatch(this._actions.onAdd(this.unwrapSnapshot(snapshot)));
      }
      else {
        list.push(this.unwrapSnapshot(snapshot));
      }
    });

    ref.on('child_changed', snapshot => {
      dispatch(this._actions.onChange(this.unwrapSnapshot(snapshot)));
    });

    ref.on('child_removed', snapshot => {
      dispatch(this._actions.onRemove(this.unwrapSnapshot(snapshot)));
    });

    this._unsubscribe = () => ref.off();

  }

  unsubscribe() {
    this._unsubscribe();
  }

  unwrapSnapshot(snapshot) {
    let attrs = snapshot.val();
    attrs.key = snapshot.key;
    return new this._modelClass(attrs);
  }
}
