import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { ToastContainer, Toast, Button } from "react-bootstrap";
import { PiCheckFatFill, PiWarningFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

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
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
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
      localStorage.setItem("cart", JSON.stringify(newItems)); // Save to localStorage
      return { items: newItems };
    }

    case "CLEAR_CART":
      localStorage.setItem("cart", JSON.stringify([])); // Clear cart in localStorage
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
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "danger">("success");
  const [toastProgress, setToastProgress] = useState(100);

  const customDispatch = useCallback(
    (action: CartAction) => {
      if (action.type === "ADD_ITEM") {
        const existingItem = state.items.find(
          (item) => item.id === action.payload.id
        );
        if (existingItem && existingItem.quantity >= MAX_QUANTITY) {
          setToastType("danger");
          setShowToast(true);
          return;
        }
        setToastType("success");
        setShowToast(true);
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

  const contextValue = useMemo(
    () => ({
      state,
      dispatch: customDispatch,
      totalPrice: calculateTotalPrice(state.items),
      showToast,
      setShowToast,
    }),
    [state, customDispatch, showToast]
  );

  return (
    <CartContext.Provider value={contextValue}>
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
                bg={toastType}
              >
                <Toast.Header>
                  <span>
                    {toastType === "success" ? (
                      <PiCheckFatFill />
                    ) : (
                      <PiWarningFill />
                    )}
                  </span>
                  <strong className="mx-1 me-auto">
                    {toastType === "success" ? "Hozzáadva" : "Figyelmeztetés"}
                  </strong>
                  <Button
                    variant="link"
                    className="text-light"
                    onClick={() => setShowToast(false)}
                  ></Button>
                </Toast.Header>
                <Toast.Body className="text-white">
                  <span className="text-left">
                    {toastType === "success"
                      ? "Termék hozzáadva a kosárhoz!"
                      : `Maximum ${MAX_QUANTITY} darab vehető egy termékből!`}
                  </span>
                  <div
                    className="progress mt-2"
                    style={{ height: "3px", backgroundColor: "#ffffff40" }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${toastProgress}%`,
                        backgroundColor:
                          toastType === "success" ? "#28a745" : "#dc3545",
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
