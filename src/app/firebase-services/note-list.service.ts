import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { Firestore, collectionData, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {

  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  items$;
  items;

  unSubList;
  unSubSingle;

  firestore: Firestore = inject(Firestore);

  constructor() {

    this.unSubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach((element) => {
        console.log(this.setNoteObject());
      });
    });

    this.unSubSingle = onSnapshot(this.getSingleDocRef("notes", "AHOF25PMSumJ2BoxOCXU"), (element) => {
    });

    this.items$ = collectionData(this.getNotesRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach((element) => {
        console.log(element);
      });
    });
  }


  ngOnDestroy() {
    this.items.unsubscribe();
    this.unSubSingle(); /*to Unsuscripe*/
    this.unSubList(); /*to Unsuscripe*/
  }


  getNotesRef() {
    return collection(this.firestore, 'notes');
  }


  getTrashRef() {
    return collection(this.firestore, 'trash');
  }


  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }


  setNoteObject(obj: any, id: string): Note {
    return {
      id: id || "",
      type: obj.type || "note",
      title: obj.title || "",
      content: obj.content || "",
      marked: obj.marked || false,
    }
  }
}