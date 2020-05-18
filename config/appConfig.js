// import IConfiguration from "../ioc/IConfiguration";
// import CustomerList from "../pages/customer/CustomerList";
import * as icons from "@material-ui/icons";
// import DashBoard from "../pages/dashboard/DashBoard";
// import Customer from "../pages/customer/Customer";
// import Profile from "../pages/profile/Profile";
// import CustomerAddNew from "../pages/customer/CustomerAddNew";
// import DailyProfitAdd from "../pages/dailyprofitadd/DailyProfitAdd";
// import EndOfMonthTransaction from "../pages/endofmonthtransaction/EndOfMonthTransaction";
// import ShopProfitEntry from "../pages/shopprofitentry/ShopProfitEntry";
// import CustomerTransactionReport from "../pages/reports/CustomerTransactionReport";
// import GeneralTransactionReport from "../pages/reports/GeneralTransactionReport";
// import TransactionRequestList from "../pages/transactionrequest/TransactionRequestList";
// import Settings from "../pages/settings/Settings";
// import CustomerGroup from "../pages/customer/CustomerGroup";
// import SmsRequestList from "../pages/reports/SmsRequestList";
// import UserList from "../pages/users/UserList";

const config = {
  projectName: "İstanbul Sarrafiye v2.0",
  // baseApiUrl: "https://localhost:44370/",
  baseApiUrl: "https://api.istanbulsarrafiye.com/",
  screenList: [
    {
      link: "",
      displayName: "Anasayfa",
      icon: icons.Home,
      isVisible: true,
      onlyAdmin: false,
    },
    {
      link: "customerlist",
      displayName: "Müşteri Listesi",
      icon: icons.Hotel,
      isVisible: true,
      onlyAdmin: false,
    },
    {
      link: "groupList",
      displayName: "Grup Tanımları",
      icon: icons.GroupAdd,
      isVisible: true,
      onlyAdmin: true,
    },
    {
      link: "transactionrequestlist",
      displayName: "Onaya Gelen İşlemler",
      icon: icons.DoneAll,
      isVisible: true,
      onlyAdmin: true,
    },
    {
      link: "customer",
      displayName: "Müşteri",
      icon: icons.Hotel,
      isVisible: false,
      onlyAdmin: false,
    },
    {
      link: "customeraddnew",
      displayName: "Müşteri Ekle Yeni",
      icon: icons.Hotel,
      isVisible: false,
      onlyAdmin: false,
    },
    {
      link: "dailyprofitadd",
      displayName: "Günlük Kar Girişi",
      icon: icons.AttachMoney,
      isVisible: true,
      onlyAdmin: true,
    },
    {
      link: "billingprocess",
      displayName: "Hesap Kesim İşlemi",
      icon: icons.CalendarToday,
      isVisible: true,
      onlyAdmin: true,
    },
    {
      link: "shopprofitentry",
      displayName: "Dükkan Kar Girişi",
      icon: icons.Money,
      isVisible: true,
      onlyAdmin: true,
    },
    {
      link: "customertransactionreport",
      displayName: "Müşteri İşlem Raporu",
      icon: icons.Report,
      isVisible: true,
      onlyAdmin: false,
    },
    {
      link: "smsrequestlist",
      displayName: "Sms Listesi",
      icon: icons.Sms,
      isVisible: true,
      onlyAdmin: true,
    },
    {
      link: "generaltransactionreport",
      displayName: "Genel İşlem Raporu",
      icon: icons.Today,
      isVisible: true,
      onlyAdmin: false,
    },
    {
      link: "settings",
      displayName: "Ayarlar",
      icon: icons.Settings,
      isVisible: true,
      onlyAdmin: true,
    },
    {
      link: "userList",
      displayName: "Kullanıcı Listesi",
      icon: icons.VerifiedUser,
      isVisible: true,
      onlyAdmin: true,
    },
    {
      link: "profile",
      dislpayName: "Profil",
      isVisible: false,
      onlyAdmin: false,
    },
  ],
  topBarRightButtons: [{ link: "profile", displayName: "Profil" }],
};

export default config;
