import { Component, OnDestroy, OnInit } from '@angular/core';
import { Deal } from '../deal';
import { AuthService } from '../auth/auth.service';
import { DealService } from '../deal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-private-deals',
  templateUrl: './private-deals.component.html',
  styleUrls: ['./private-deals.component.css']
})
export class PrivateDealsComponent implements OnInit,OnDestroy {
  dealsSub: Subscription;
  privateDeals: Deal[];
  error: any;
  
  constructor(
    public dealService: DealService,
    public authService: AuthService
  ) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.dealsSub = this.dealService
      .getPublicDeals()
      .subscribe(
        deals => this.privateDeals = deals,
        err => this.error = err
      );
  }

}
