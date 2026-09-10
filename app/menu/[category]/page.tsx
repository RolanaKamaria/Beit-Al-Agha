"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useMenu } from "@/core/presentation/hook/useMenu";
import type { Menu } from "@/core/domain/entity/menu";

const categoryMeta: Record<
  string,
  { title: string; arabic: string; intro: string }
> = {
  appetizers: {
    title: "Appetizers",
    arabic: "المقبلات",
    intro: "Small plates made to begin the evening.",
  },
  "main-courses": {
    title: "Main Courses",
    arabic: "الأطباق الرئيسية",
    intro: "A generous table of dishes worth lingering over.",
  },
  salads: {
    title: "Salads",
    arabic: "السلطات",
    intro: "Fresh greens, vivid herbs, and generous textures.",
  },
  desserts: {
    title: "Desserts",
    arabic: "الحلويات",
    intro: "A sweet close to a table set in history.",
  },
  drinks: {
    title: "Drinks",
    arabic: "المشروبات",
    intro: "Cool pours and warm infusions for every kind of evening.",
  },
};

export default function MenuDetailPage() {
  const { category: slug } = useParams<{ category: string }>();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;
  const { data, loading, error, fetchItems } = useMenu(apiKey);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const dishes: Menu[] = data?.items ?? [];
  const meta = categoryMeta[slug];

  useEffect(() => {
    if (!slug) return;
    fetchItems({ filter: { category: slug }, limit: 100 });
  }, [slug, fetchItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [slug]);

  if (!meta) notFound();

  const selected: Menu = dishes[selectedIndex] ?? dishes[0];

  const handleSelect = (index: number) => {
    if (index === selectedIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIndex(index);
      setIsTransitioning(false);
    }, 180);
  };

  return (
    <main className="menu-detail-page">
      <section className="menu-detail-shell">
        <header className="menu-detail-header">
          <Link href="/" className="back-link">
            <ArrowLeft size={16} strokeWidth={1.75} />
            <span>الرجوع</span>
          </Link>

          <div className="header-center">
            <span className="detail-wordmark">بيت الآغا</span>
            <span className="header-divider" aria-hidden />
            <span className="detail-arabic">{meta.arabic}</span>
          </div>

          <div className="header-spacer" aria-hidden />
        </header>

        <div className="detail-intro">
          <div className="intro-ornament" aria-hidden>
            <span />
            <span className="ornament-dot">✦</span>
            <span />
          </div>
          <p className="eyebrow">الصنف</p>
          <h1>{meta.title}</h1>
          <p className="intro-text">{meta.intro}</p>
        </div>

        {loading && (
          <p style={{ textAlign: "center", padding: "2rem" }}>Loading...</p>
        )}
        {error && (
          <p style={{ textAlign: "center", padding: "2rem", color: "red" }}>
            {error}
          </p>
        )}

        {!loading && !error && dishes.length === 0 && (
          <p style={{ textAlign: "center", padding: "2rem" }}>
            No items found.
          </p>
        )}

        {!loading && !error && dishes.length > 0 && (
          <div className="detail-layout">
            <aside className="dish-list">
              <h2>
                اختر طبق
                <span className="list-rule" aria-hidden />
              </h2>

              <div className="dish-options">
                {dishes.map((dish, index) => (
                  <button
                    key={dish.title}
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
                      <strong>{dish.title}</strong>
                      <small>${dish.price}</small>
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
                  alt={selected.title}
                />
                <div className="dish-hero-fade" aria-hidden />
              </div>

              <div className="dish-body">
                <div className="dish-copy">
                  <p className="eyebrow">من مطبخنا</p>
                  <h2>{selected.title}</h2>
                  <p className="dish-desc">{selected.description}</p>
                </div>
                <div className="dish-meta">
                  <strong className="dish-price">${selected.price}</strong>
                </div>
              </div>
            </article>
          </div>
        )}
      </section>
    </main>
  );
}
