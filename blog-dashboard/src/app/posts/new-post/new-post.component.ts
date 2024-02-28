import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

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

  constructor(private categoryService: CategoriesService,
              private fb : FormBuilder,
              private postService: PostsService) {
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

  onSubmit(){
    
    let splited = this.postForm.value.category.split('-')
    console.log(splited);
    
    const postData: Post = {
      title : this.postForm.value.title,
      permalink : this.postForm.value.permalink,
      excerpt: this.postForm.value.excerpt,
      category : {
        categoryId : splited[0],
        category: splited[1]
      },
      postImgPath: '',
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    }
    this.postService.uploadImage(this.selectedImage , postData)
    this.postForm.reset()
  }
  
}
