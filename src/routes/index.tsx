import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Clock,
  X,
  Trash2,
  MapPin,
  ChefHat,
} from "lucide-react";
import { FOODS, CATEGORIES, type Food } from "@/data/foods";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FoodDekho — Order Food Online, Delivered Fast" },
      {
        name: "description",
        content:
          "Order from 30+ dishes — biryani, pizza, burgers, dosa, momos and desserts. Fresh food delivered hot to your door in minutes.",
      },
      { property: "og:title", content: "FoodDekho — Order Food Online" },
      {
        property: "og:description",
        content:
          "Order from 30+ dishes — biryani, pizza, burgers, dosa, momos and desserts, delivered hot and fast.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Cart = Record<number, number>;

function loadCart(): Cart {
  try {
    return JSON.parse(localStorage.getItem("fooddekho-cart") ?? "{}");
  } catch {
    return {};
  }
}

function Index() {
  const [cart, setCart] = useState<Cart>({});
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [vegOnly, setVegOnly] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    setCart(loadCart());
  }, []);

  useEffect(() => {
    localStorage.setItem("fooddekho-cart", JSON.stringify(cart));
  }, [cart]);

  const add = (id: number) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const remove = (id: number) =>
    setCart((c) => {
      const n = (c[id] ?? 0) - 1;
      const next = { ...c };
      if (n <= 0) delete next[id];
      else next[id] = n;
      return next;
    });

  const items = useMemo(
    () =>
      FOODS.filter(
        (f) =>
          (category === "All" || f.category === category) &&
          (!vegOnly || f.veg) &&
          f.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, vegOnly, query],
  );

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const food = FOODS.find((f) => f.id === Number(id));
    return sum + (food ? food.price * qty : 0);
  }, 0);
  const deliveryFee = cartTotal > 499 || cartTotal === 0 ? 0 : 29;

  const placeOrder = () => {
    setOrdered(true);
    setCart({});
    setTimeout(() => {
      setOrdered(false);
      setCartOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <ChefHat className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-foreground">
                Food<span className="text-primary">Dekho</span>
              </span>
            </div>
          </div>
          <div className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">Kolkata</span>
            <span className="hidden md:inline">— delivering in 30 min</span>
          </div>
          <div className="relative ml-auto hidden flex-1 max-w-xs md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search biryani, pizza, momos…"
              className="w-full rounded-full border border-input bg-background py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative ml-auto flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 md:ml-0"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[11px] font-bold text-background">
                {cartCount}
              </span>
            )}
          </button>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search biryani, pizza, momos…"
              className="w-full rounded-full border border-input bg-background py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </header>

      {/* Hero strip */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Craving something? <span className="text-primary">We've got you.</span>
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            32 dishes across biryani, pizza, burgers, dosas, momos & desserts — hot at your door in 30 minutes.
          </p>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[60px] z-30 border-b border-border bg-card/95 backdrop-blur md:top-[65px]">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              }`}
            >
              {c}
            </button>
          ))}
          <button
            onClick={() => setVegOnly((v) => !v)}
            className={`ml-auto flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              vegOnly
                ? "border-chart-2 bg-chart-2 text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-chart-2/60"
            }`}
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-current" />
            Pure Veg
          </button>
        </div>
      </div>

      {/* Food grid */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <p className="mb-4 text-sm text-muted-foreground">
          {items.length} dish{items.length === 1 ? "" : "es"} available
        </p>
        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-lg font-semibold text-foreground">No dishes found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                qty={cart[food.id] ?? 0}
                onAdd={() => add(food.id)}
                onRemove={() => remove(food.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        FoodDekho — made with love in Kolkata. Free delivery on orders above ₹499.
      </footer>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-lg font-bold text-foreground">Your Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {ordered ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-chart-2/15 text-3xl">
                  🎉
                </div>
                <h3 className="text-xl font-bold text-foreground">Order placed!</h3>
                <p className="text-sm text-muted-foreground">
                  Your food is being prepared and will arrive in ~30 minutes.
                </p>
              </div>
            ) : cartCount === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
                <h3 className="text-lg font-semibold text-foreground">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground">
                  Add some delicious dishes to get started.
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Browse food
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {Object.entries(cart).map(([id, qty]) => {
                    const food = FOODS.find((f) => f.id === Number(id))!;
                    return (
                      <div key={id} className="mb-4 flex items-center gap-3">
                        <img
                          src={food.image}
                          alt={food.name}
                          loading="lazy"
                          width={1024}
                          height={1024}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">{food.name}</p>
                          <p className="text-sm text-muted-foreground">₹{food.price}</p>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-border px-1 py-0.5">
                          <button
                            onClick={() => remove(food.id)}
                            className="p-1 text-primary"
                            aria-label={`Remove one ${food.name}`}
                          >
                            {qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                          </button>
                          <span className="w-4 text-center text-sm font-bold">{qty}</span>
                          <button
                            onClick={() => add(food.id)}
                            className="p-1 text-primary"
                            aria-label={`Add one ${food.name}`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="w-14 text-right text-sm font-bold text-foreground">
                          ₹{food.price * qty}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-border px-5 py-4">
                  <div className="mb-1 flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                    <span>Delivery fee {deliveryFee === 0 && "(free 🎉)"}</span>
                    <span>{deliveryFee === 0 ? "₹0" : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="mb-4 flex justify-between text-base font-bold text-foreground">
                    <span>To pay</span>
                    <span>₹{cartTotal + deliveryFee}</span>
                  </div>
                  <button
                    onClick={placeOrder}
                    className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
                  >
                    Place order · ₹{cartTotal + deliveryFee}
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

function FoodCard({
  food,
  qty,
  onAdd,
  onRemove,
}: {
  food: Food;
  qty: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative h-44 overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {food.bestseller && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
            ★ Bestseller
          </span>
        )}
        <span
          className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-sm border-2 bg-card ${
            food.veg ? "border-chart-2" : "border-destructive"
          }`}
          title={food.veg ? "Veg" : "Non-veg"}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${food.veg ? "bg-chart-2" : "bg-destructive"}`}
          />
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold leading-snug text-foreground">{food.name}</h3>
          <span className="flex shrink-0 items-center gap-1 rounded-md bg-chart-2/15 px-1.5 py-0.5 text-xs font-bold text-foreground">
            <Star className="h-3 w-3 fill-chart-2 text-chart-2" />
            {food.rating}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{food.desc}</p>
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {food.time}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-extrabold text-foreground">₹{food.price}</span>
          {qty === 0 ? (
            <button
              onClick={onAdd}
              className="flex items-center gap-1 rounded-full border border-primary px-4 py-1.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
              ADD
            </button>
          ) : (
            <div className="flex items-center gap-3 rounded-full bg-primary px-3 py-1.5 text-primary-foreground">
              <button onClick={onRemove} aria-label={`Remove one ${food.name}`}>
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-sm font-bold">{qty}</span>
              <button onClick={onAdd} aria-label={`Add one ${food.name}`}>
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
