// Apply this substitute image if no photo is available.
export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || require("@/assets/images/others/imgNotFound.jpeg");
    }
  }
}