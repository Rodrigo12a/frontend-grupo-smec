import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService) { }
  msgError(e: HttpErrorResponse) {
    if(e.error.msg){
      this.toastr.error(e.error.msg, 'error');
    }else{
      this.toastr.error('ocurrio un error, comuniquese con el administrador')
    }
  }
}
