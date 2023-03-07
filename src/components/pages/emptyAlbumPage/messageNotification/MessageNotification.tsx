import styled from "styled-components";
import messagePNG from "@images/message.png";

const MessageNotification: React.FC = () => {
  return (
    <NotificationWrapper>
      <img src={messagePNG} alt="message.png" />
    </NotificationWrapper>
  );
};

const NotificationWrapper = styled.div`
  margin: 10px auto 0px;
  width: 80px;

  img {
    margin-top: 6px;
    margin-bottom: -12px;
    width: 82px;
    height: 75px;
  }

  @media (min-width: 1440px) {
    img {
      margin-top: 30px;
      margin-bottom: -28px;
      width: 110px;
      height: 100px;
    }
  }
`;

export default MessageNotification;
