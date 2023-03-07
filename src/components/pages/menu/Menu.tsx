import { MAIN_MENU_BUTTONS } from "@const";
import ButtonMenu from "./buttonMenu/ButtonMenu";
import {
  Wrapper,
  MenuPage,
  MenuPageHeader,
  MenuPageLogo,
  MenuPageBtnList,
} from "./Menu.styles";
import mainLogoPNG from "@images/main_logo.png";

const Menu: React.FC = () => {
  return (
    <Wrapper>
      <MenuPage>
        <MenuPageLogo>
          <img src={mainLogoPNG} alt="mainLogo.png" />
        </MenuPageLogo>
        <MenuPageHeader>Photographers</MenuPageHeader>
        <MenuPageBtnList>
          {MAIN_MENU_BUTTONS &&
            MAIN_MENU_BUTTONS.map((item) => {
              return (
                <li key={item.id + 20}>
                  <ButtonMenu key={item.id} label={item.label} way={item.way} />
                </li>
              );
            })}
        </MenuPageBtnList>
      </MenuPage>
    </Wrapper>
  );
};

export default Menu;
