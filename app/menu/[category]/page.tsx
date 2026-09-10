"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Heart } from "lucide-react";
import { useState, useEffect } from "react";

const menus = {
  appetizers: {
    title: "Appetizers",
    arabic: "المقبلات",
    intro: "Small plates made to begin the evening.",
    dishes: [
      {
        name: "Hummus Beiruti",
        price: "$8.50",
        image:
          "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=1000&q=85",
        description: "Creamy chickpeas, tahini, lemon, and a bright finish.",
      },
      {
        name: "Crispy Sambousek",
        price: "$9.75",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=85",
        description:
          "Golden pastry filled with herbs, cheese, and warm spices.",
      },
    ],
  },
  "main-courses": {
    title: "Main Courses",
    arabic: "الأطباق الرئيسية",
    intro: "A generous table of dishes worth lingering over.",
    dishes: [
      {
        name: "Charcoal Chicken",
        price: "$18.50",
        image:
          "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=85",
        description:
          "Tender grilled chicken with herbs, lemon, and roasted vegetables.",
      },
      {
        name: "Lamb Ouzi",
        price: "$22.00",
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85",
        description:
          "Slow-cooked lamb over fragrant rice with toasted almonds.",
      },
    ],
  },
  salads: {
    title: "Salads",
    arabic: "السلطات",
    intro: "Fresh greens, vivid herbs, and generous textures.",
    dishes: [
      {
        name: "Fattoush",
        price: "$10.50",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
        description:
          "Crisp greens, herbs, toasted bread, and pomegranate dressing.",
      },
      {
        name: "Garden Tabbouleh",
        price: "$9.50",
        image:
          "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85",
        description: "Parsley, tomato, mint, and bulgur brightened with lemon.",
      },
    ],
  },
  desserts: {
    title: "Desserts",
    arabic: "الحلويات",
    intro: "A sweet close to a table set in history.",
    dishes: [
      {
        name: "Baklava",
        price: "$7.50",
        image:
          "https://images.unsplash.com/photo-1579888944880-d98341245702?auto=format&fit=crop&w=1000&q=85",
        description: "Layers of pastry, pistachio, and honey syrup.",
      },
      {
        name: "Rice Pudding",
        price: "$6.50",
        image:
          "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=85",
        description: "Silky rice pudding scented with orange blossom.",
      },
    ],
  },
  drinks: {
    title: "Drinks",
    arabic: "المشروبات",
    intro: "Cool pours and warm infusions for every kind of evening.",
    dishes: [
      {
        name: "Mint Lemonade",
        price: "$6.00",
        image:
          "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=85",
        description: "Fresh lemon, garden mint, and a little sweetness.",
      },
      {
        name: "Cardamom Tea",
        price: "$4.50",
        image:
          "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1000&q=85",
        description: "Black tea steeped with cardamom and served warm.",
      },
    ],
  },
} as const;

type MenuSlug = keyof typeof menus;
type Dish = (typeof menus)[MenuSlug]["dishes"][number];

export default function MenuDetailPage() {
  const { category: slug } = useParams<{ category: string }>();
  const menu = menus[slug as MenuSlug];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (!menu) notFound();

  const selected: Dish = menu.dishes[selectedIndex] ?? menu.dishes[0];

  const handleSelect = (index: number) => {
    if (index === selectedIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIndex(index);
      setLiked(false);
      setIsTransitioning(false);
    }, 180);
  };

  useEffect(() => {
    setSelectedIndex(0);
    setLiked(false);
  }, [slug]);

  return (
    <main className="menu-detail-page">
      <section className="menu-detail-shell">
        <header className="menu-detail-header">
          <Link href="/" className="back-link">
            <ArrowLeft size={16} strokeWidth={1.75} />
            <span>الرجوع</span>
          </Link>

          <div className="header-center">
            <span className="detail-wordmark">BEIT AL AGHA</span>
            <span className="header-divider" aria-hidden />
            <span className="detail-arabic">{menu.arabic}</span>
          </div>

          <div className="header-spacer" aria-hidden />
        </header>

        <div className="detail-intro">
          <div className="intro-ornament" aria-hidden>
            <span />
            <span className="ornament-dot">✦</span>
            <span />
          </div>
          <p className="eyebrow">The collection</p>
          <h1>{menu.title}</h1>
          <p className="intro-text">{menu.intro}</p>
        </div>

        <div className="detail-layout">
          <aside className="dish-list">
            <h2>
              <span className="list-rule" aria-hidden />
              Choose a dish
            </h2>

            <div className="dish-options">
              {menu.dishes.map((dish, index) => (
                <button
                  key={dish.name}
                  type="button"
                  className={
                    index === selectedIndex
                      ? "dish-option dish-option-active"
                      : "dish-option"
                  }
                  onClick={() => handleSelect(index)}
                  aria-pressed={index === selectedIndex}>
                  <div className="dish-option-thumb">
                    <img src={dish.image} alt="" />
                  </div>
                  <span className="dish-option-text">
                    <strong>{dish.name}</strong>
                    <small>{dish.price}</small>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <article
            className={`dish-detail ${isTransitioning ? "is-fading" : ""}`}>
            <div className="dish-hero-wrap">
              <img
                className="dish-hero"
                src={selected.image}
                alt={selected.name}
              />
              <div className="dish-hero-fade" aria-hidden />
            </div>

            <div className="dish-body">
              <div className="dish-copy">
                <p className="eyebrow">From our kitchen</p>
                <h2>{selected.name}</h2>
                <p className="dish-desc">{selected.description}</p>
              </div>
              <div className="dish-meta">
                <strong className="dish-price">{selected.price}</strong>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
