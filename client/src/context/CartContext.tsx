import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Tool } from "@/data/tools";

export interface CartItem {
  tool: Tool;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (tool: Tool) => void;
  removeItem: (toolId: string) => void;
  updateQty: (toolId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((tool: Tool) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.tool.id === tool.id);
      if (existing) return prev.map((i) => i.tool.id === tool.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { tool, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((toolId: string) => {
    setItems((prev) => prev.filter((i) => i.tool.id !== toolId));
  }, []);

  const updateQty = useCallback((toolId: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.tool.id !== toolId));
    } else {
      setItems((prev) => prev.map((i) => i.tool.id === toolId ? { ...i, quantity: qty } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.tool.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, openCart, closeCart, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
