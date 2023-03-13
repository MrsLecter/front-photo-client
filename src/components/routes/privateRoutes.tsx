import NotificationSetting from "../pages/notificationSetting/NotificationSetting";
import Payment from "../pages/payment/Payment";
import PaymentComplete from "../pages/paymentComplete/PaymentComplete";
import PhotoView from "../pages/photoView/PhotoView";
import Menu from "../pages/menu/Menu";
import TakeSelfie from "../pages/takeSelfie/TakeSelfie";
import { UserProfilePage } from "../pages/userProfile/UserProfile";
import Frame from "../pages/frame/Frame";
import DeterminateEmail from "../pages/determinateEmail/DeterminateEmail";
import DeterminateUser from "../pages/determinateUser/DeterminateUser";
import ChangePhone from "../pages/changePhone/ChangePhone";
import ApproveSelfie from "../pages/approveSelfie/ApproveSelfie";
import EmptyAlbumsPage from "../pages/emptyAlbumPage/EmptyAlbumsPage";
import AlbumView from "../pages/albumView/AlbumView";
import Dashboard from "../pages/dashboard/Dashboard";
import AccountSettings from "../pages/accountSetting/AccoundSetting";
import AddSelfie from "../pages/addSelfie/AddSelfie";

export const payment_route_group = [
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/payment_complete",
    element: <PaymentComplete />,
  },
];

export const edit_route_group = [
  {
    path: "/framed",
    element: <Frame />,
  },
  {
    path: "/determinate_email",
    element: <DeterminateEmail />,
  },
  {
    path: "/determinate_user",
    element: <DeterminateUser />,
  },
  {
    path: "/change_phone",
    element: <ChangePhone />,
  },
];

export const profile_setting_route_group = [
  {
    path: "/approve_selfie",
    element: <ApproveSelfie />,
  },
  {
    path: "/take_selfie",
    element: <TakeSelfie />,
  },
  {
    path: "/add_selfie",
    element: <AddSelfie />,
  },
  {
    path: "/user_profile",
    element: <UserProfilePage />,
  },
  {
    path: "/account_settings",
    element: <AccountSettings />,
  },
  {
    path: "/notification",
    element: <NotificationSetting />,
  },
];

export const view_content_route_group = [
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/albums_empty",
    element: <EmptyAlbumsPage />,
  },
  {
    path: "/photo_view",
    element: <PhotoView />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/album_view/:albumName",
    element: <AlbumView />,
  },
];
