import ItemSection from "../ItemSection";
import { fetchLatestItems } from "../../../api/repo";
import { FaFire } from "react-icons/fa";

const LatestItemsSection = () => (
  <ItemSection
    title="Újdonságok"
    badgeText="Új"
    titleBg="danger"
    fetchFunction={fetchLatestItems}
    icon={<FaFire />}
  />
);

export default LatestItemsSection;
