import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const gAuthGuard: CanActivateFn = (route, state) => {

    const router = inject(Router);
    let usuario = localStorage.getItem("nombre");
    if(usuario && usuario != ''){
        return true;
    }else{
        localStorage.clear();
        router.navigate(['/']);
        return false;
    }
};
