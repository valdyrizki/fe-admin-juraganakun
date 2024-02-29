export const decimalFormatter = (angka) => {
  let angkaToString = angka.toString();
  var number_string = angkaToString.replace(/[^,\d]/g, ""),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah;
};

export const decimalFormatter2 = (angka) => {
  let angkaToString = angka.toString();

  if (angkaToString.includes(".")) {
    angkaToString = angkaToString.substr(0, angkaToString.length - 2);
  }

  var number_string = angkaToString.replace(/[^,\d]/g, ""),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah;
};

export function getStsTransaction(sts) {
  switch (sts) {
    case 0:
      return "PENDING";
    case 1:
      return "DONE";
    case 2:
      return "REFUND";
    case 3:
      return "EXPIRED";
    case 9:
      return "CANCEL";

    default:
      return "PENDING";
  }
}

export function getStsProduct(sts) {
  switch (sts) {
    case 0:
      return "ARSIP";
    case 1:
      return "AKTIF";

    default:
      return "AKTIF";
  }
}

export function getStsFileProduct(sts) {
  switch (sts) {
    case 0:
      return "READY";
    case 1:
      return "SOLD";

    default:
      return "READY";
  }
}

export function getStsDbCr(sts) {
  switch (sts) {
    case 0:
      return "DEBIT";
    case 1:
      return "CREDIT";
    default:
      return "DEBIT";
  }
}

export function getStsUser(sts) {
  switch (sts) {
    case 0:
      return "BELUM AKTIF";
    case 1:
      return "AKTIF";
    case 9:
      return "NONAKTIF";
    default:
      return "AKTIF";
  }
}

export function getStsGeneral(sts) {
  switch (sts) {
    case 0:
      return "BELUM AKTIF";
    case 1:
      return "AKTIF";
    case 9:
      return "NONAKTIF";
    default:
      return "AKTIF";
  }
}

export function getFormatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function downloadFile(response, filename) {
  const type = response.headers["content-type"];
  const blob = new Blob([response.data], { type: type, encoding: "UTF-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export function getMsgByResponse(resp) {
  let msg = resp.statusText;
  switch (parseInt(resp.status)) {
    case 401:
      msg = "Unauthorize, please login!";
      break;
    default:
      msg = resp.statusText;
      break;
  }
  return msg;
}

export const getToken = () => {
  try {
    if (localStorage.getItem("auth") != null) {
      return JSON.parse(localStorage.getItem("auth")).token.replace(
        /[ "]/g,
        ""
      );
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const getUserLogin = () => {
  if (localStorage.getItem("auth") != null) {
    return JSON.parse(localStorage.getItem("auth")).data.data;
  } else {
    return false;
  }
};

export const getBaseUrl = () => {
  return "https://be.juraganakun.com/";
};

export const REPLICATE_API_TOKEN = () => {
  return "r8_Q78Opetzc5Cf3t7RmVk17cyWojLhElU164LAn";
};

// export const getFlgAutoStock = async () => {
//   try {
//     let { data } = await axios.get(`${ip}/setting/getall`, {
//       headers: {
//         Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
//       },
//     });
//     let { setting_value } = data.data[0];
//     return setting_value;
//   } catch (e) {
//     console.log(e.getMessage);
//   }
// };
