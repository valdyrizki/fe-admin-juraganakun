export const decimalFormatter = (angka) => {
    let angkaToString = angka.toString();
    var number_string = angkaToString.replace(/[^,\d]/g, ''),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
        let separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return rupiah;  
}

export function getStsTransaction(sts) {  
    switch (sts) {
        case 0:
            return "PENDING"
        case 1:
            return "DONE"
        case 2:
            return "REFUND"
        case 3:
            return "EXPIRED"
        case 9:
            return "CANCEL"
    
        default:
            return "PENDING"
    }
}

export function getStsProduct(sts) {  
    switch (sts) {
        case 0:
            return "ARSIP"
        case 1:
            return "AKTIF"
    
        default:
            return "AKTIF"
    }
}

export function getStsFileProduct(sts) {  
    switch (sts) {
        case 0:
            return "READY"
        case 1:
            return "SOLD"
    
        default:
            return "READY"
    }
}

export function getStsDbCr(sts) {  
    switch (sts) {
        case 0:
            return "DEBET"
        case 1:
            return "CREDIT"
    
        default:
            return "DEBET"
    }
}

export function getFormatDate(date){
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export function downloadFile(response, filename) {  
    const type = response.headers['content-type']
    const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    link.click()
}