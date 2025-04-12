import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { toast } from "react-toastify"; // Import React Toastify

export type CartItem = {
  id: number;
  name: string;
  picture: string;
  price: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } };

const MAX_QUANTITY = 10;

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalPrice: number;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return existingItem.quantity >= MAX_QUANTITY
          ? state
          : {
              items: state.items.map((item) =>
                item.id === action.payload.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
      }
      return {
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newItems));
      return { items: newItems };
    }

    case "CLEAR_CART":
      localStorage.setItem("cart", JSON.stringify([]));
      return { items: [] };

    case "SET_CART":
      return { items: action.payload };

    case "UPDATE_QUANTITY":
      return action.payload.quantity > MAX_QUANTITY
        ? state
        : {
            items: state.items.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: action.payload.quantity }
                : item
            ),
          };

    default:
      return state;
  }
};

const calculateTotalPrice = (items: CartItem[]) => {
  return items.reduce((total, item) => {
    const price = parseFloat(item.price.replace(" Ft", "").replace(",", "."));
    return total + price * item.quantity;
  }, 0);
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const customDispatch = useCallback(
    (action: CartAction) => {
      if (action.type === "ADD_ITEM") {
        const existingItem = state.items.find(
          (item) => item.id === action.payload.id
        );
        if (existingItem && existingItem.quantity >= MAX_QUANTITY) {
          toast.error(
            `Maximum ${MAX_QUANTITY} darab vehető egy termékből!`,
            {}
          );
          return;
        }
        toast.success("Termék hozzáadva a kosárhoz!", {});
      }
      dispatch(action);
    },
    [state.items]
  );

  useEffect(() => {
    const loadCart = async () => {
      const stored = localStorage.getItem("cart");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            dispatch({ type: "SET_CART", payload: parsed });
          }
        } catch (err) {
          console.error("Failed to parse cart from localStorage", err);
        }
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    if (state.items.length === 0) return;

    const timer = setTimeout(async () => {
      try {
        await localStorage.setItem("cart", JSON.stringify(state.items)); // Async write to localStorage
      } catch (error) {
        console.error("Failed to save cart to localStorage", error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [state.items]);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch: customDispatch,
      totalPrice: calculateTotalPrice(state.items),
    }),
    [state, customDispatch]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
