import styled, { css } from "styled-components";

interface IWrapperContentProps {
  children: React.ReactNode;
  isAlbum?: boolean;
}

const StyledContentPage = styled.div<{ isAlbum?: boolean }>`
  box-sizing: border-box;
  margin: 0 auto;
  overflow-x: hidden;

  ${(props) =>
    props.isAlbum &&
    css`
      @media (min-width: 1440px) {
        margin: 0 auto;
        padding-left: 120px;
        padding-right: 120px;
      }
    `}
`;

const WrapperContent: React.FC<IWrapperContentProps> = ({
  children,
  isAlbum,
}) => {
  return <StyledContentPage isAlbum={!!isAlbum}>{children}</StyledContentPage>;
};

export default WrapperContent;
