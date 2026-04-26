import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbRouteDTO } from '../../../dto/util/breadcrump-route.dto';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent {
  @Input() breadcrumbRoutes!: BreadcrumbRouteDTO[];

  constructor(private router: Router) {}

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
