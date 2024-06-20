import { Injectable, inject  } from '@angular/core';
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
        console.log(element);
      });
    });

    this.unSubSingle = onSnapshot(this.getSingleDocRef("notes", "AHOF25PMSumJ2BoxOCXU"), (element) => {
      });

      this.unSubSingle(); /*to Unsuscripe*/
      this.unSubList();

    this.items$ = collectionData(this.getNotesRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach((element) => {
        console.log(element);
      });
    });
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
}
