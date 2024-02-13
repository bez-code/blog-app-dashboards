import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  permalink = '';
  imageSrc: any = '';
  selectedImage: any = ''

  onTitleChange($event: any) {

    const title = $event.target.value;
    this.permalink = title.replace(/\s+/g, '-')

  }

  onImageChange($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = e.target?.result;
    }
    reader.readAsDataURL($event.target.files[0])

    this.selectedImage = $event.target.files[0];
  }

}
