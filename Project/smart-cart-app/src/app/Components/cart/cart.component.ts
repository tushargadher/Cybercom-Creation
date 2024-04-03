import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartsData: any[] = [];
  userID: number = 0;
  TotalItemsinCart: number = 0;
  amountSummary: {
    subTotal: number;
    shippingCharge: number;
    tax: number;
    total: number;
  } = {
    subTotal: 0,
    shippingCharge: 50,
    tax: 0,
    total: 0,
  };
  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.userID = JSON.parse(sessionStorage.getItem('user_id')!);
    this.getCardProducts();
  }

  getCardProducts() {
    this.cartService.getCart(this.userID).subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartsData = res.data;
        this.TotalItemsinCart = res.meta.pagination.total;
        this.calculateTotal();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  RemoveCartItem(id: string) {
    if (confirm('Remove Item From Cart?')) {
      this.cartService.removeCartItem(id).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastr.info('Item Removed From Cart', undefined, {
            positionClass: 'toast-bottom-right',
          });
          this.getCardProducts();
          this.calculateTotal();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  //work left here last night
  //call updatacart item when increase value of quanity make it faster and for checkout page issuse stored currently placed order in local storage and display it
  // and still all users order is visible to one user

  increaseQuantity(cartId: string, productId: string, productQuantity: any) {
    this.toastr.info('Please Wait...', undefined, {
      timeOut: 6000,
      closeButton: false,
      positionClass: 'toast-bottom-right',
      progressBar: true,
    });
    const newQuantity = productQuantity + 1;
    this.updateCartItem(cartId, productId, newQuantity);
  }

  decreaseQuantity(cartId: string, productId: string, productQuantity: any) {
    if (productQuantity > 1) {
      this.toastr.info('Please Wait...', undefined, {
        timeOut: 6000,
        closeButton: false,
        positionClass: 'toast-bottom-right',
        progressBar: true,
      });
      const newQuantity = productQuantity - 1;
      this.updateCartItem(cartId, productId, newQuantity);
    } else {
      alert("Product Quantity Can't be zero");
    }
  }

  private updateCartItem(cartId: string, productId: string, quantity: number) {
    const productData = {
      data: {
        product: productId,
        quantity: quantity,
        user_detail: this.userID,
        order: null,
      },
    };

    this.cartService.updateCartItem(cartId, productData).subscribe({
      next: (res: any) => {
        this.toastr.success('Cart Updated', undefined, {
          positionClass: 'toast-bottom-right',
        });
        this.getCardProducts();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  calculateTotal() {
    this.amountSummary.subTotal = this.calculateSubtotal();
    this.amountSummary.tax = (this.amountSummary.subTotal * 18) / 100;
    this.amountSummary.total =
      this.amountSummary.subTotal +
      this.amountSummary.shippingCharge +
      this.amountSummary.tax;
    console.log(this.amountSummary);
  }

  calculateSubtotal(): number {
    return this.cartsData.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        currentValue.attributes.product.data.attributes.price *
          currentValue.attributes.quantity
      );
    }, 0);
  }
}
