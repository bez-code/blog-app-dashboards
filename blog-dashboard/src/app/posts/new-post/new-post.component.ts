import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  permalink = '';
  imageSrc: any = '';
  selectedImage: any = ''
  categories : Array<any> = [];
  postForm!: FormGroup;

  constructor(private categoryService: CategoriesService,private fb : FormBuilder) {
    this.postForm = this.fb.group({
      title : ['', [ Validators.required, Validators.maxLength(10)]],
      permalink:['', [Validators.required]],
      excerpt : ['',[Validators.required, Validators.minLength(50 )]],
      category: ['',[Validators.required]],
      postImg: ['',[Validators.required]],
      content: ['',[Validators.required]] 
    })
  } ;
  
  
  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val =>{
      this.categories = val;      
    })
  }
  
  get fc(): { [key: string]: AbstractControl } {
    return this.postForm.controls;
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
