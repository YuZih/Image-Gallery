// Apply this substitute image if no photo is available.
export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || require("@/assets/images/others/imgNotFound.jpeg");
    }
  }
}


// Apply this substitute image if no photo is available.
export const toDateFilter = {
  filters: {
    toDate(timestamp) {
      const date = new Date(timestamp);
      let Y = date.getFullYear();
      let M = date.getMonth();
      let D = date.getDate();
      let H = date.getHours();
      let min = ("0" + date.getMinutes()).slice(-2);
      return `${Y}/${M+1}/${D} ${H}:${min}`;
    }
  }
}

