"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const doorImage = "/door.webp";
const restaurantImage = "/resturantLight.webp";
const logoImage = "/logo.svg";

const categories = [
  {
    title: "Appetizers",
    arabic: "المقبلات",
    image:
      "https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Main Courses",
    arabic: "الأطباق الرئيسية",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Salads",
    arabic: "السلطات",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Desserts",
    arabic: "الحلويات",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Drinks",
    arabic: "المشروبات",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=85",
  },
];

export default function Page() {
  const router = useRouter();
  const fromCategory =
    typeof window !== "undefined" &&
    sessionStorage.getItem("from-category") === "true";
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isReturning = fromCategory || reduceMotion;
  const [doorOpening, setDoorOpening] = useState(isReturning);
  const [entered, setEntered] = useState(isReturning);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (isReturning) {
      sessionStorage.removeItem("from-category");
      setDoorOpening(true);
      setEntered(true);
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setDoorOpening(true);
      setEntered(true);
      return;
    }

    const openingTimer = window.setTimeout(() => setDoorOpening(true), 1200);
    const exitTimer = window.setTimeout(() => setEntered(true), 4400);
    return () => {
      window.clearTimeout(openingTimer);
      window.clearTimeout(exitTimer);
    };
  }, []);

  return (
    <main
      className={`restaurant-shell ${entered ? "is-entered" : ""} ${isReturning ? "is-returning" : ""}`}
      suppressHydrationWarning>
      <section className="restaurant-backdrop" aria-hidden="true">
        <div
          className="restaurant-backdrop-image"
          style={{ backgroundImage: `url(${restaurantImage})` }}
        />
        <div className="restaurant-vignette" />
      </section>

      <div
        className={`cinematic-door ${doorOpening ? "door-opening" : ""} ${entered ? "door-dismissed" : ""}`}
        aria-hidden={entered}>
        <div
          className="door-panel door-panel-left"
          style={{ backgroundImage: `url(${doorImage})` }}
        />
        <div
          className="door-panel door-panel-right"
          style={{ backgroundImage: `url(${doorImage})` }}
        />
        <div className="door-seam" />
        <div className="door-instruction">Enter the house of memory</div>
      </div>

      <div className="menu-content" id="menu">
        <img
          className="brand-mark"
          src={logoImage}
          alt="Beit Al Agha restaurant"
        />
        <div className="heading-ornament" aria-hidden="true">
          <span /> ◇ <span />
        </div>
        <p className="eyebrow reveal-eyebrow">A table set in history</p>
        <h1>
          <span>Our Menu</span>
          <em>قائمة الطعام</em>
        </h1>
        <div className="heading-ornament bottom-ornament" aria-hidden="true">
          <span /> ◇ <span />
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <button
              className={`category-card category-card-${index} ${activeCategory === category.title ? "category-selected" : ""}`}
              key={category.title}
              onClick={() => {
                setActiveCategory(category.title);
                sessionStorage.setItem("from-category", "true");
                router.push(
                  `/menu/${encodeURIComponent(category.title.toLowerCase().replaceAll(" ", "-"))}`,
                );
              }}
              aria-label={`View ${category.title} menu`}>
              <span className="card-image">
                <img src={category.image} alt="" />
              </span>
              <span className="card-title">{category.title}</span>
              <span className="card-arabic">{category.arabic}</span>
              <span className="card-symbol" aria-hidden="true">
                ✦
              </span>
            </button>
          ))}
        </div>
        {activeCategory && (
          <p className="selection-note">
            {activeCategory} — choose a dish to begin your evening.
          </p>
        )}
      </div>

      <footer className="site-footer">
        <span>Beit Al Agha · Homs . Syria</span>
      </footer>
    </main>
  );
}
