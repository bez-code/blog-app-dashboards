import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private afs: AngularFirestore,
    private toastr: ToastrService) { }

  saveData(data: unknown) {
    this.afs
      .collection('categories')
      .add(data)
      .then((docRef) => {
        this.toastr.success("Category added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

