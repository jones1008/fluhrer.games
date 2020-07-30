new Glide('.glide', {
    // gap: 20,
    rewind: false,
    peek: 200,
    breakpoints: {
        992: {
            peek: 0
        }
    }
}).mount();