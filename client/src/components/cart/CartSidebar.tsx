import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLocation } from "wouter";

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalItems, totalPrice, clearCart } = useCart();
  const [, navigate] = useLocation();

  if (!isOpen) return null;

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-background border-l border-border z-50 flex flex-col shadow-2xl"
        role="dialog"
        aria-label="Quote builder"
        data-testid="cart-sidebar"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg text-foreground">Your Toolbox</h2>
            {totalItems > 0 && (
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            aria-label="Close quote"
            data-testid="cart-close"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-foreground font-semibold">Your toolbox is empty</p>
            <p className="text-muted-foreground text-sm">Browse our AI tools and add them to get started.</p>
            <button
              onClick={closeCart}
              className="btn btn-primary mt-2"
              data-testid="cart-browse-tools"
            >
              Browse Tools
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map(({ tool, quantity }) => (
                <div
                  key={tool.id}
                  className="flex gap-4 p-4 rounded-xl bg-card border border-border"
                  data-testid={`cart-item-${tool.id}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm leading-tight">{tool.name}</p>
                    <p className="text-muted-foreground text-xs mt-0.5 truncate">{tool.tagline}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1 border border-border rounded-lg">
                        <button
                          onClick={() => updateQty(tool.id, quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Decrease quantity"
                        >−</button>
                        <span className="w-6 text-center text-sm font-medium text-foreground">{quantity}</span>
                        <button
                          onClick={() => updateQty(tool.id, quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeItem(tool.id)}
                        className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors"
                        aria-label={`Remove ${tool.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-foreground text-sm">
                      ${(tool.price * quantity).toLocaleString()}
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {tool.billing === "monthly" ? "/mo" : "once"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-6 py-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Mix of monthly &amp; one-time</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground text-xl">${totalPrice.toLocaleString()}</p>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="btn btn-primary w-full justify-center"
                data-testid="cart-checkout"
              >
                Get Your Custom Quote
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
                data-testid="cart-clear"
              >
                Clear quote
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
