import Swal from 'sweetalert2';

export function showMsg(msg) {
  Swal.fire({
    title: msg,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}

export function showFlashMsg(msg){
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: msg,
    showConfirmButton: false,
    timer: 1000
  })
}

export function showSuccess(msg) {
  Swal.fire(
    'Success!',
    msg,
    'success'
  )
}

export function showError(msg) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: msg
  })
}

export function showConfirm(callback){ //return true/false
  Swal.fire({
      title: 'Are you sure ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
      }).then((confirmed) => {
          callback(confirmed && confirmed.value === true);
  })
}






