import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  constructor(private categoryService: CategoriesService,private fb : FormBuilder) {
    this.postForm = this.fb.group({
      title : [''],
      permalink:[''],
      excerpt : [''],
      category: [''],
      postImg: [''],
      content: [''] 
    })

    console.log(this.postForm);
    

               }
 
  
  permalink = '';
  imageSrc: any = '';
  selectedImage: any = ''
  categories : Array<any> = [];
  postForm!: FormGroup;
  
  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val =>{
      this.categories = val;
      console.log(this.categories);
      
    });
  }

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
