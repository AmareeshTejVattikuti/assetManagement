import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('currentUser')) {
            var us = sessionStorage.getItem('currentUser');
            // logged in so return true
            console.log("current user is "+us)
            return true;
        }

        // not logged in so redirect to login page with the return url
        // this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        this.router.navigate(['login']);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
      }
}
