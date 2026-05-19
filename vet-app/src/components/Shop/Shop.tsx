import React, { useState, useMemo } from "react";
import "./Shop.css";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  animal: string[];
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  // Medicines
  { id: 1, name: "Oxytetracycline 20% Injection", category: "Medicines", subcategory: "Antibiotics", animal: ["Cattle", "Goats"], price: 850, originalPrice: 1000, unit: "100ml", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80&fit=crop", badge: "Bestseller", rating: 4.8, reviews: 124, inStock: true, description: "Broad-spectrum antibiotic for bacterial infections in livestock." },
  { id: 2, name: "Ivermectin 1% Injection", category: "Medicines", subcategory: "Antiparasitics", animal: ["Cattle", "Goats", "Poultry"], price: 1200, unit: "50ml", image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80&fit=crop", badge: "In Stock", rating: 4.6, reviews: 89, inStock: true, description: "Effective against internal and external parasites." },
  { id: 3, name: "Dexamethasone Injection", category: "Medicines", subcategory: "Anti-inflammatory", animal: ["Cattle", "Dogs", "Cats"], price: 640, unit: "10ml", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80&fit=crop", rating: 4.5, reviews: 67, inStock: true, description: "Corticosteroid for inflammation and allergic reactions." },
  { id: 4, name: "Multivitamin Supplement", category: "Medicines", subcategory: "Supplements", animal: ["Cattle", "Goats", "Poultry"], price: 450, originalPrice: 550, unit: "500g", image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&q=80&fit=crop", badge: "Sale", rating: 4.7, reviews: 203, inStock: true, description: "Complete vitamin and mineral blend for livestock health." },
  { id: 5, name: "Albendazole Bolus", category: "Medicines", subcategory: "Antiparasitics", animal: ["Cattle", "Goats"], price: 320, unit: "Pack of 10", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80&fit=crop", rating: 4.4, reviews: 55, inStock: true, description: "Oral dewormer for roundworms and tapeworms." },
  { id: 6, name: "Calcium Gluconate 23%", category: "Medicines", subcategory: "Supplements", animal: ["Cattle"], price: 780, unit: "400ml", image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&q=80&fit=crop", rating: 4.9, reviews: 41, inStock: false, description: "Treatment for milk fever and calcium deficiency." },

  // Food
  { id: 7, name: "Premium Cattle Feed", category: "Food", subcategory: "Livestock Feed", animal: ["Cattle"], price: 2200, unit: "50kg bag", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&q=80&fit=crop", badge: "Bestseller", rating: 4.8, reviews: 312, inStock: true, description: "High-protein balanced feed for dairy and beef cattle." },
  { id: 8, name: "Royal Canin Dog Food", category: "Food", subcategory: "Dog Food", animal: ["Dogs"], price: 3500, originalPrice: 4000, unit: "10kg", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80&fit=crop", badge: "Sale", rating: 4.9, reviews: 487, inStock: true, description: "Breed-specific nutrition for adult dogs." },
  { id: 9, name: "Premium Cat Food", category: "Food", subcategory: "Cat Food", animal: ["Cats"], price: 1800, unit: "3kg", image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400&q=80&fit=crop", rating: 4.7, reviews: 234, inStock: true, description: "Grain-free wet and dry food for indoor cats." },
  { id: 10, name: "Layer Poultry Feed", category: "Food", subcategory: "Poultry Feed", animal: ["Poultry"], price: 1400, unit: "25kg bag", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&q=80&fit=crop", rating: 4.6, reviews: 178, inStock: true, description: "Optimized feed for high egg production in layers." },
  { id: 11, name: "Goat Pellet Feed", category: "Food", subcategory: "Livestock Feed", animal: ["Goats"], price: 1600, unit: "25kg bag", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&q=80&fit=crop", rating: 4.5, reviews: 92, inStock: true, description: "Nutritionally complete pellet feed for all goat breeds." },
  { id: 12, name: "Dog Training Treats", category: "Food", subcategory: "Dog Food", animal: ["Dogs"], price: 650, originalPrice: 800, unit: "500g", image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80&fit=crop", badge: "Sale", rating: 4.8, reviews: 156, inStock: true, description: "Low-calorie treats ideal for training and rewards." },

  // Accessories
  { id: 13, name: "Adjustable Dog Collar", category: "Accessories", subcategory: "Collars & Leashes", animal: ["Dogs"], price: 450, unit: "1 piece", image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&q=80&fit=crop", rating: 4.6, reviews: 98, inStock: true, description: "Durable nylon collar with quick-release buckle." },
  { id: 14, name: "Cat Scratching Post", category: "Accessories", subcategory: "Cat Furniture", animal: ["Cats"], price: 1200, originalPrice: 1500, unit: "1 piece", image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&q=80&fit=crop", badge: "Sale", rating: 4.5, reviews: 73, inStock: true, description: "Sisal rope scratching post with toy ball attachment." },
  { id: 15, name: "Stainless Steel Feeding Bowl", category: "Accessories", subcategory: "Feeders & Bowls", animal: ["Dogs", "Cats"], price: 380, unit: "Set of 2", image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&q=80&fit=crop", rating: 4.7, reviews: 211, inStock: true, description: "Non-slip rust-proof double bowl set." },
  { id: 16, name: "Automatic Poultry Waterer", category: "Accessories", subcategory: "Feeders & Bowls", animal: ["Poultry"], price: 2800, unit: "1 unit", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&q=80&fit=crop", badge: "New", rating: 4.8, reviews: 44, inStock: true, description: "Gravity-fed automatic waterer for up to 50 birds." },
  { id: 17, name: "Cattle Ear Tags (100 pcs)", category: "Accessories", subcategory: "Livestock Equipment", animal: ["Cattle", "Goats"], price: 1500, unit: "100 pieces", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&q=80&fit=crop", badge: "Bestseller", rating: 4.9, reviews: 302, inStock: true, description: "UV-resistant numbered ear tags with applicator." },
  { id: 18, name: "Dog Grooming Kit", category: "Accessories", subcategory: "Grooming", animal: ["Dogs"], price: 1800, originalPrice: 2200, unit: "7-piece set", image: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=400&q=80&fit=crop", badge: "Sale", rating: 4.6, reviews: 127, inStock: true, description: "Complete grooming set with brush, nail clipper, and shampoo." },

  // Equipment
  { id: 19, name: "Digital Veterinary Thermometer", category: "Equipment", subcategory: "Diagnostic Tools", animal: ["Cattle", "Dogs", "Cats", "Goats"], price: 950, unit: "1 piece", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80&fit=crop", badge: "New", rating: 4.7, reviews: 88, inStock: true, description: "Fast 10-second reading digital thermometer for animals." },
  { id: 20, name: "Livestock Weighing Scale", category: "Equipment", subcategory: "Farm Equipment", animal: ["Cattle", "Goats"], price: 18500, unit: "1 unit", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&q=80&fit=crop", rating: 4.8, reviews: 29, inStock: true, description: "Heavy-duty electronic scale up to 1000kg capacity." },
  { id: 21, name: "Portable Milking Machine", category: "Equipment", subcategory: "Farm Equipment", animal: ["Cattle", "Goats"], price: 45000, unit: "1 unit", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&q=80&fit=crop", badge: "Premium", rating: 4.9, reviews: 18, inStock: true, description: "Single-bucket portable milking machine, 25L capacity." },
  { id: 22, name: "Syringe & Needle Set", category: "Equipment", subcategory: "Diagnostic Tools", animal: ["Cattle", "Dogs", "Cats", "Goats", "Poultry"], price: 280, unit: "Pack of 10", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80&fit=crop", rating: 4.5, reviews: 445, inStock: true, description: "Sterile disposable syringes in various sizes." },
];

const CATEGORIES = ["All", "Medicines", "Food", "Accessories", "Equipment"];
const ANIMALS = ["All Animals", "Cattle", "Goats", "Poultry", "Dogs", "Cats"];
const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Top Rated", "Most Reviews"];

const CATEGORY_ICONS: Record<string, string> = {
  All: "🏪", Medicines: "💊", Food: "🥩", Accessories: "🦮", Equipment: "🔧",
};

const ANIMAL_ICONS: Record<string, string> = {
  "All Animals": "🐾", Cattle: "🐄", Goats: "🐐", Poultry: "🐓", Dogs: "🐕", Cats: "🐈",
};

// ─── Component ────────────────────────────────────────────────────────────────
const Shop: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAnimal, setSelectedAnimal] = useState("All Animals");
  const [sortBy, setSortBy] = useState("Featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedAnimal !== "All Animals") {
      result = result.filter(p => p.animal.includes(selectedAnimal));
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case "Price: Low to High": result.sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": result.sort((a, b) => b.price - a.price); break;
      case "Top Rated": result.sort((a, b) => b.rating - a.rating); break;
      case "Most Reviews": result.sort((a, b) => b.reviews - a.reviews); break;
    }

    return result;
  }, [search, selectedCategory, selectedAnimal, sortBy, priceRange]);

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = PRODUCTS.find(p => p.id === Number(id));
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const addToCart = (id: number) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id: number) => setCart(c => {
    const updated = { ...c };
    if (updated[id] > 1) updated[id]--;
    else delete updated[id];
    return updated;
  });
  const toggleWishlist = (id: number) => setWishlist(w => {
    const updated = new Set(w);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    return updated;
  });

  return (
    <div className="shop">

      {/* ── Top bar ─────────────────────────────── */}
      <header className="shop__header">
        <div className="shop__header-inner">
          <div className="shop__logo">
            <span className="shop__logo-icon">🐾</span>
            <span className="shop__logo-text">VetMeds <span>Store</span></span>
          </div>

          {/* Search */}
          <div className="shop__search-wrap">
            <svg className="shop__search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M12.5 12.5l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input
              className="shop__search"
              type="text"
              placeholder="Search medicines, food, accessories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="shop__search-clear" onClick={() => setSearch("")}>✕</button>
            )}
          </div>

          <div className="shop__header-actions">
            <button className="shop__cart-btn" onClick={() => setCartOpen(!cartOpen)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
              {totalItems > 0 && <span className="shop__cart-badge">{totalItems}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* ── Cart drawer ──────────────────────────── */}
      {cartOpen && (
        <div className="shop__cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="shop__cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="shop__cart-header">
              <h3>Your Cart ({totalItems})</h3>
              <button onClick={() => setCartOpen(false)}>✕</button>
            </div>
            {totalItems === 0 ? (
              <div className="shop__cart-empty">
                <span>🛒</span>
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="shop__cart-items">
                  {Object.entries(cart).map(([id, qty]) => {
                    const p = PRODUCTS.find(p => p.id === Number(id));
                    if (!p) return null;
                    return (
                      <div key={id} className="shop__cart-item">
                        <img src={p.image} alt={p.name} />
                        <div className="shop__cart-item-info">
                          <div className="shop__cart-item-name">{p.name}</div>
                          <div className="shop__cart-item-price">PKR {p.price.toLocaleString()}</div>
                        </div>
                        <div className="shop__cart-item-qty">
                          <button onClick={() => removeFromCart(p.id)}>−</button>
                          <span>{qty}</span>
                          <button onClick={() => addToCart(p.id)}>+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="shop__cart-footer">
                  <div className="shop__cart-total">
                    <span>Total</span>
                    <span>PKR {totalPrice.toLocaleString()}</span>
                  </div>
                  <button className="shop__checkout-btn">Proceed to Checkout →</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="shop__body">

        {/* ── Sidebar ──────────────────────────────── */}
        <aside className="shop__sidebar">

          {/* Categories */}
          <div className="shop__filter-section">
            <h4 className="shop__filter-title">Categories</h4>
            <div className="shop__filter-list">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`shop__filter-btn ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  <span>{CATEGORY_ICONS[cat]}</span>
                  {cat}
                  <span className="shop__filter-count">
                    {cat === "All" ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Animal type */}
          <div className="shop__filter-section">
            <h4 className="shop__filter-title">Animal Type</h4>
            <div className="shop__filter-list">
              {ANIMALS.map(animal => (
                <button
                  key={animal}
                  className={`shop__filter-btn ${selectedAnimal === animal ? "active" : ""}`}
                  onClick={() => setSelectedAnimal(animal)}
                >
                  <span>{ANIMAL_ICONS[animal]}</span>
                  {animal}
                </button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div className="shop__filter-section">
            <h4 className="shop__filter-title">Price Range</h4>
            <div className="shop__price-range">
              <div className="shop__price-labels">
                <span>PKR {priceRange[0].toLocaleString()}</span>
                <span>PKR {priceRange[1].toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={50000}
                step={100}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="shop__range"
              />
            </div>
          </div>

          {/* Clear filters */}
          {(selectedCategory !== "All" || selectedAnimal !== "All Animals" || search) && (
            <button className="shop__clear-btn" onClick={() => {
              setSelectedCategory("All");
              setSelectedAnimal("All Animals");
              setSearch("");
              setPriceRange([0, 50000]);
            }}>
              ✕ Clear All Filters
            </button>
          )}
        </aside>

        {/* ── Main content ─────────────────────────── */}
        <main className="shop__main">

          {/* Toolbar */}
          <div className="shop__toolbar">
            <div className="shop__results-count">
              Showing <strong>{filtered.length}</strong> of <strong>{PRODUCTS.length}</strong> products
              {search && <span> for "<em>{search}</em>"</span>}
            </div>
            <div className="shop__toolbar-right">
              <select
                className="shop__sort"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
              <div className="shop__view-toggle">
                <button
                  className={viewMode === "grid" ? "active" : ""}
                  onClick={() => setViewMode("grid")}
                  title="Grid view"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="0" y="0" width="7" height="7" rx="1.5"/>
                    <rect x="9" y="0" width="7" height="7" rx="1.5"/>
                    <rect x="0" y="9" width="7" height="7" rx="1.5"/>
                    <rect x="9" y="9" width="7" height="7" rx="1.5"/>
                  </svg>
                </button>
                <button
                  className={viewMode === "list" ? "active" : ""}
                  onClick={() => setViewMode("list")}
                  title="List view"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="0" y="1" width="16" height="3" rx="1.5"/>
                    <rect x="0" y="6.5" width="16" height="3" rx="1.5"/>
                    <rect x="0" y="12" width="16" height="3" rx="1.5"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Active filters chips */}
          {(selectedCategory !== "All" || selectedAnimal !== "All Animals") && (
            <div className="shop__chips">
              {selectedCategory !== "All" && (
                <span className="shop__chip">
                  {CATEGORY_ICONS[selectedCategory]} {selectedCategory}
                  <button onClick={() => setSelectedCategory("All")}>✕</button>
                </span>
              )}
              {selectedAnimal !== "All Animals" && (
                <span className="shop__chip">
                  {ANIMAL_ICONS[selectedAnimal]} {selectedAnimal}
                  <button onClick={() => setSelectedAnimal("All Animals")}>✕</button>
                </span>
              )}
            </div>
          )}

          {/* Product grid */}
          {filtered.length === 0 ? (
            <div className="shop__empty">
              <div className="shop__empty-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className={`shop__grid ${viewMode === "list" ? "shop__grid--list" : ""}`}>
              {filtered.map((product, i) => (
                <div
                  key={product.id}
                  className="shop__card"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {/* Image */}
                  <div className="shop__card-img-wrap">
                    <img src={product.image} alt={product.name} className="shop__card-img" />
                    {product.badge && (
                      <span className={`shop__badge shop__badge--${product.badge.toLowerCase().replace(/[: ]/g, "-")}`}>
                        {product.badge}
                      </span>
                    )}
                    {!product.inStock && (
                      <div className="shop__out-of-stock">Out of Stock</div>
                    )}
                    <button
                      className={`shop__wishlist-btn ${wishlist.has(product.id) ? "active" : ""}`}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      {wishlist.has(product.id) ? "❤️" : "🤍"}
                    </button>
                  </div>

                  {/* Info */}
                  <div className="shop__card-body">
                    <div className="shop__card-meta">
                      <span className="shop__card-category">{product.subcategory}</span>
                      <div className="shop__card-animals">
                        {product.animal.slice(0, 2).map(a => (
                          <span key={a} className="shop__animal-tag">{ANIMAL_ICONS[a]}</span>
                        ))}
                      </div>
                    </div>

                    <h3 className="shop__card-name">{product.name}</h3>
                    <p className="shop__card-desc">{product.description}</p>

                    <div className="shop__card-rating">
                      <span className="shop__stars">{"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}</span>
                      <span className="shop__rating-num">{product.rating}</span>
                      <span className="shop__review-count">({product.reviews})</span>
                    </div>

                    <div className="shop__card-footer">
                      <div className="shop__card-price">
                        <span className="shop__price">PKR {product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="shop__price-original">PKR {product.originalPrice.toLocaleString()}</span>
                        )}
                        <span className="shop__price-unit">/ {product.unit}</span>
                      </div>

                      {cart[product.id] ? (
                        <div className="shop__qty-control">
                          <button onClick={() => removeFromCart(product.id)}>−</button>
                          <span>{cart[product.id]}</span>
                          <button onClick={() => addToCart(product.id)}>+</button>
                        </div>
                      ) : (
                        <button
                          className="shop__add-btn"
                          onClick={() => addToCart(product.id)}
                          disabled={!product.inStock}
                        >
                          {product.inStock ? "+ Add" : "Unavailable"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;