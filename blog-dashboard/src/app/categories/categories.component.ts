import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private categoryService: CategoriesService) { }
 
  ngOnInit(): void {

this.categoryService.loadData().subscribe(val =>{
  console.log(val)
})

  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category
    }

    this.categoryService.saveData(categoryData);
    // let subCategoryData = {
    //   subCategory: 'subCategory1',

    // };
    // this.afs
    //   .collection('categories')
    //   .add(categoryData)
    //   .then((docRef) => {
    //     console.log('Category added with id', docRef);

    //     this.afs.collection('categories').doc(docRef.id).collection('subCategories')
    //       .add(subCategoryData).then(docRef1 => {
    //         console.log(docRef1)
    //       })
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
}
