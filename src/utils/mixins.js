// Apply this substitute image if no photo is available.
export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || "https://cdn.vanderbilt.edu/vu-wp0/wp-content/uploads/sites/288/2019/03/28062612/Image-Coming-Soon-Placeholder.png"
    }
  }
}