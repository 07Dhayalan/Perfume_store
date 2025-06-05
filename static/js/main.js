const watches = [
  {
    id: 1,
    name: "Classic Analog",
    brand: "Omega",
    category: "analog",
    price: 320,
    description: "Elegant and timeless analog watch.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2020/05/professional-dive-watch-green-rose-gold-rotatable-ceramic-bezel-luminous-hands-two-tone-timepiece-3w-diver08-by-3watches.com-07-11.jpg?x61525"
  },
  {
    id: 2,
    name: "Sporty Digital",
    brand: "Casio",
    category: "digital",
    price: 75,
    description: "Rugged digital watch for all adventures.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2020/04/professional-dive-watch-white-dial-rotatable-ceramic-bezel-luminous-hands-timepiece-by-3watches.com-09-0.jpg?x61525"
  },
  {
    id: 3,
    name: "Smart Fit 2",
    brand: "Fitbit",
    category: "smart",
    price: 150,
    description: "Modern smartwatch with fitness tracking.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2016/05/chronograph_watch_black_meshband_list.jpg?x61525"
  },
  {
    id: 4,
    name: "Luxury Timepiece",
    brand: "Rolex",
    category: "luxury",
    price: 1200,
    description: "High-end premium quality watch.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2017/06/fashion-chronograph-men-watch-3w-mv54b-by-3watches.com-04.jpg?x61525"
  },
  {
    id: 5,
    name: "Casual Analog",
    brand: "Timex",
    category: "analog",
    price: 60,
    description: "Simple everyday wear watch.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2020/09/beautiful-ladies-watch-fashion-square-women-watch-with-high-quality-stainless-steel-milanese-mesh-wristband-timepiece-direct-watch-manufacturer-3w-p10041-0.jpg?x61525"
  },
  {
    id: 6,
    name: "Digital Runner",
    brand: "Garmin",
    category: "digital",
    price: 130,
    description: "GPS-enabled for runners and athletes.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2015/09/silver-white-black-400.jpg?x61525"
  },
  {
    id: 7,
    name: "Smart Luxe",
    brand: "Apple",
    category: "smart",
    price: 399,
    description: "Stylish smartwatch with premium features.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2020/10/professional-dive-watch-black-dial-rotatable-ceramic-bezel-luminous-hands-all-gold-timepiece-3w-diver11-by-3watches.com-9.jpg?x61525"
  },
  {
    id: 8,
    name: "Elegant Gold",
    brand: "Cartier",
    category: "luxury",
    price: 2000,
    description: "Gold-plated classic watch for formal wear.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2020/04/professional-dive-watch-black-dial-rotatable-ceramic-bezel-luminous-hands-timepiece-3w-diver03-by-3watches.com-10-0.jpg?x61525"
  },
  {
    id: 9,
    name: "Minimalist Leather",
    brand: "MVMT",
    category: "analog",
    price: 110,
    description: "Clean design with genuine leather strap.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2017/07/fashion-chronograph-men-watch-curve-glass-luminous-hands-3w-cw31-by-3watches.com-01.jpg?x61525"
  },
  {
    id: 10,
    name: "Tactical Digital",
    brand: "Suunto",
    category: "digital",
    price: 180,
    description: "Built for outdoor and extreme conditions.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2019/09/small-moq-luxury-ap-type-mechanical-watches-japanese-miyota-8215-automatic-men-watches-luminous-hands-and-indexes-direct-watch-manufacturer-3w-p514-by-3watches.com-5-1.jpg?x61525"
  },
  {
    id: 11,
    name: "Slim Smart Band",
    brand: "Xiaomi",
    category: "smart",
    price: 45,
    description: "Affordable smart band with health tracking.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2019/09/small-moq-luxury-ap-type-mechanical-watches-japanese-miyota-8215-automatic-men-watches-luminous-hands-and-indexes-direct-watch-manufacturer-3w-p512-by-3watches.com-5-1.jpg?x61525"
  },
  {
    id: 12,
    name: "Heritage Classic",
    brand: "Tissot",
    category: "analog",
    price: 295,
    description: "Swiss-made precision with vintage style.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2016/01/marble-watches-1-03-400x400.jpg?x61525"
  },
  {
    id: 13,
    name: "Royal Elite",
    brand: "Audemars Piguet",
    category: "luxury",
    price: 4800,
    description: "Bold statement piece with sapphire dial.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2016/01/marble-watches-3-02-400x400.jpg?x61525"
  },
  {
    id: 14,
    name: "EcoSmart Pro",
    brand: "Samsung",
    category: "smart",
    price: 350,
    description: "Feature-rich smart watch with AMOLED display.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2015/09/black-black_stone_spec-400.jpg?x61525"
  },
  {
    id: 15,
    name: "Classic Blackout",
    brand: "Diesel",
    category: "analog",
    price: 210,
    description: "Matte black steel body for urban styling.",
    image_url: "https://d2fn6rbs5rhk8j.cloudfront.net/wp-content/uploads/2017/11/fashion-unisex-watch-white-dial-silver-case-and-mesh-strap-timepiece-3w-dw30-by-3watches.com-02.jpg?x61525"
  }
];


function renderWatches(list) {
  const grid = document.getElementById("watchesGrid");
  grid.innerHTML = "";

  list.forEach(watch => {
    grid.innerHTML += `
      <div class="watch-card">
        <img src="${watch.image_url}" alt="${watch.name}">
        <div class="watch-info">
          <h4>${watch.name}</h4>
          <p>${watch.description}</p>
          <div class="watch-price">$${watch.price}</div>
          <div class="watch-actions">
            <button class="btn-details">Details</button>
            <button class="btn-addcart">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
}

renderWatches(watches);

// Filter watches
document.getElementById("categoryList").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    document.querySelectorAll("#categoryList li").forEach(li => li.classList.remove("active"));
    e.target.classList.add("active");

    const category = e.target.getAttribute("data-category");
    if (category === "all") {
      renderWatches(watches);
    } else {
      renderWatches(watches.filter(w => w.category === category));
    }
  }
});

// Search functionality
document.getElementById("searchInput").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  renderWatches(watches.filter(w =>
    w.name.toLowerCase().includes(term) || w.brand.toLowerCase().includes(term)
  ));
});
