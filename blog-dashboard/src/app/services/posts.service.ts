import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService) { }

  uploadImage(selectedImage: any, postData: any) {
    const filePath = `postImg/${Date.now()}`

    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('Post Image Uploded Successfully');
      this.storage.ref(filePath).getDownloadURL().subscribe((url) => {
        postData.postImgPath = url;
      
        this.saveData(postData)
      })
    })
  }

  saveData(postData: any) {
    this.afs.collection('posts').add(postData).then((docRef) => {
      this.toastr.success("Data insert successfully");
    })
  }

}
