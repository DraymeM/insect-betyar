import { FaShoppingCart } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";

interface CartButtonProps {
  onClick: () => void; // Add the onClick prop to handle item adding
  pending: boolean; // New prop to handle pending state
}

const CartButton: React.FC<CartButtonProps> = ({ onClick, pending }) => {
  const handleAddToCart = () => {
    if (!pending) {
      // Only trigger action when not pending
      onClick();
    }
  };

  return (
    <div className="mt-auto d-flex mt-5 gap-2">
      <Button
        className="flex-grow-1 d-flex p-0 overflow-hidden border-0 rounded shadow-sm"
        style={{
          height: "3rem",
          borderRadius: "1rem",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundImage:
            "linear-gradient(to right, #2f336e, rgb(58, 212, 255))",
          backgroundSize: "200% 100%", // Initial gradient size
          transition: "background-size 0.3s ease", // Smooth transition
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundSize = "250% 100%"; // On hover, expand the gradient
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundSize = "200% 100%"; // Revert gradient size
        }}
        onClick={handleAddToCart}
        disabled={pending} // Disable button while pending
      >
        {/* Cart Icon */}
        <motion.div
          className="d-flex align-items-center justify-content-center bg-primary rounded text-white px-3"
          style={{ minWidth: "3rem" }}
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1, // Always show cart icon
          }}
          transition={{ duration: 0.3 }}
        >
          <FaShoppingCart size={35} />
        </motion.div>

        {/* Right side: Kosárba text */}
        <motion.div
          className="d-flex align-items-center justify-content-center text-xl mx-1 text-white fw-bold flex-grow-1"
          style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            marginRight: "10vh",
          }}
          initial={{ opacity: 1 }}
          animate={{
            opacity: pending ? 0 : 1, // Hide text during pending
          }}
          transition={{ opacity: { duration: 0.3 } }}
        >
          Kosárba
        </motion.div>
      </Button>
    </div>
  );
};

export default CartButton;
