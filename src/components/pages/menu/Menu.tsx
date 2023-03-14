import { AppUrlsEnum, MAIN_MENU_BUTTONS } from "@const";
import ButtonMenu from "./buttonMenu/ButtonMenu";
import {
  Wrapper,
  MenuPage,
  MenuPageHeader,
  MenuPageLogo,
  MenuPageBtnList,
} from "./Menu.styles";
import mainLogoPNG from "@images/main_logo.png";
import { useEffect } from "react";
import localStorageHandler from "@/components/utils/local-storage-hendler";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks/reducers.hook";
import { userSlice } from "@/components/store/reducers/userSlice";

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const { enroll } = userSlice.actions;
  const dispatch = useAppDispatch();
  const { phoneNumber } = useAppSelector((store) => store.userReducer);

  useEffect(() => {
    const userData = localStorageHandler.getUserData();
    if (typeof userData === "undefined") {
      navigate("../");
    } else {
      if (!phoneNumber) {
        dispatch(enroll(userData));
        navigate("../" + AppUrlsEnum.DASHBOARD);
      }
    }
  }, []);

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
