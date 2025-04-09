import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { ToastContainer, Toast, Button } from "react-bootstrap";
import { PiCheckFatFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

type CartItem = {
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

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalPrice: number;
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
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

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return { items: [] };

    case "SET_CART":
      return { items: action.payload };

    case "UPDATE_QUANTITY":
      return {
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
  const [showToast, setShowToast] = useState(false);
  const [toastProgress, setToastProgress] = useState(100);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  }, [state.items]);

  useEffect(() => {
    if (showToast) {
      let progress = 100;
      const interval = setInterval(() => {
        progress -= 2;
        setToastProgress(progress);
        if (progress <= 0) {
          clearInterval(interval);
          setShowToast(false);
        }
      }, 60);
      return () => clearInterval(interval);
    }
  }, [showToast]);

  const totalPrice = calculateTotalPrice(state.items);

  return (
    <CartContext.Provider
      value={{ state, dispatch, totalPrice, showToast, setShowToast }}
    >
      {children}
      <ToastContainer
        className="p-3"
        style={{
          position: "fixed",
          top: "3rem",
          right: "20px",
          zIndex: 9999,
        }}
      >
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Toast
                onClose={() => setShowToast(false)}
                delay={3000}
                autohide
                bg="success"
              >
                <Toast.Header>
                  <span>
                    <PiCheckFatFill />
                  </span>
                  <strong className="mx-1 me-auto"> Hozzáadva</strong>
                  <Button
                    variant="link"
                    className="text-light"
                    onClick={() => setShowToast(false)}
                  ></Button>
                </Toast.Header>
                <Toast.Body className="text-white">
                  <span className="text-left">
                    Termék hozzáadva a kosárhoz!
                  </span>
                  {/* Progress bar */}
                  <div
                    className="progress mt-2"
                    style={{ height: "3px", backgroundColor: "#ffffff40" }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${toastProgress}%`,
                        backgroundColor: "#28a745",
                      }}
                    ></div>
                  </div>
                </Toast.Body>
              </Toast>
            </motion.div>
          )}
        </AnimatePresence>
      </ToastContainer>
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
