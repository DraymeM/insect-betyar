import ItemSection from "../ItemSection";
import { fetchCategoryItems } from "../../../api/repo";
import { PiButterflyFill } from "react-icons/pi";

const CatAItemSection = () => (
  <ItemSection
    title="Pillangók"
    titleBg="info-outline"
    fetchFunction={() => fetchCategoryItems("Category A")}
    icon={<PiButterflyFill />}
    button="link"
    buttonLink="/about/category/Category A"
  />
);

export default CatAItemSection;
