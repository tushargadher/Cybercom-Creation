import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { CartService } from 'src/app/Services/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent {
  productsData: any[] = [];
  isloading = false;
  productId = '';
  userID: number = 0;
  product: any = {};
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toast: NgToastService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.productId = params['id'];
          return this.productService.getSingalProduct(this.productId);
        })
      )
      .subscribe({
        next: (res: any) => {
          this.product = res.data.attributes;
          console.log(this.product);

          if (this.product) {
            this.getSimilarProduct(this.product.category.data.id);
          }
        },
        error: (error: any) => {
          console.log(error);
        },
      });

    this.userID = JSON.parse(sessionStorage.getItem('user_id')!);
  }

  //api call

  getSingleProduct(id: any) {
    this.productService.getSingalProduct(id).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.product = res.data.attributes;
        console.log(this.product);

        if (this.product) {
          this.getSimilarProduct(this.product.category.data.id);
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  //add to card api
  addTocard() {
    this.isloading = true;
    const productData = {
      data: {
        product: this.productId,
        quantity: 1,
        user_detail: this.userID,
        order: null,
      },
    };
    // console.log(productData);

    this.cartService.addTocart(productData).subscribe({
      next: (res: any) => {
        this.isloading = false;
        // console.log(res);
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Added to cart',
        });
      },
      error: (error: any) => {
        this.isloading = false;
        console.log(error);
      },
    });
  }
  getSimilarProduct(categoryId: any) {
    this.productService.getFilterProduct(categoryId).subscribe({
      next: (res: any) => {
        // console.log(res.data);
        this.productsData = res.data;
      },
      error: (error: any) => {
        console.log(error);
        this.toast.error(error.error.error.message);
      },
    });
  }
  viewProductDetails(productId: string) {
    this.router.navigate([`/product-detail/${productId}`]);
  }
}

//spread opreation work only with iterable object like array
