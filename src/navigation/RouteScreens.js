import Dashboard from "../screens/Dashboard/Dashboard";
import PublishedRoster from "../screens/PublishedRoster/PublishedRoster";
import CommsGroup from "../screens/CommsGroup/CommsGroup";
import CommsGroupMembers from "../screens/CommsGroup/CommsGroupMembers";
import CommsGroupDetail from "../screens/CommsGroup/CommsGroupDetail";
import Suggestions from "../screens/Suggestions/Suggestions";
import SuggestionDetail from "../screens/Suggestions/SuggestionDetail";
import SuggestionsAdd from "../screens/Suggestions/SuggestionsAdd";
import Survey from "../screens/Survey/Survey";
import SurveyDetail from "../screens/Survey/SurveyDetail";
import Broadcasts from "../screens/Broadcast/Broadcasts";
import BroadcastDetail from "../screens/Broadcast/BroadcastDetail";
import MyLeave from "../screens/Leaves/MyLeave";
import MyDiary from "../screens/MyDiary/MyDiary";
import NewLeaveRequest from "../screens/Leaves/NewLeaveRequest";
import BankHoliday from "../screens/Leaves/BankHoliday";
import TermsAndConditions from "../screens/TermsConditions/TermsAndConditions";
import Profile from "../screens/Profile/Profile";
import ChangePassword from "../screens/ChangePassword/ChangePassword";
import { QrCodeScanner } from "../screens/QrCodeScanner/QrCodeScanner";
import PublishedRosterWebView from "../screens/PublishedRoster/PublishedRosterWebView";
import ExceptionReportingList from "../components/ExceptionReports/ExceptionReportingList";
import NewExceptionReport from "../components/ExceptionReports/NewExceptionReport";

const headerStyle = {
  alignSelf: "center",
  fontSize: 18,
};

export const SECURE_SCREENS_INFO = {
  Dashboard: {
    component: Dashboard,
    options: {
      // title: `${TRUST}`,
      // subtitle: "Card Subtitle",
      headerLeft: null,
      // headerTitleStyle: headerStyle,
      headerSubTitleStyle: { alignSelf: "center" },
    },
  },
  TermsAndConditions: {
    component: TermsAndConditions,
    options: {
      title: "Terms And Conditions",
      // headerTitleStyle: headerStyle,
    },
  },
  PublishedRoster: {
    component: PublishedRoster,
    options: {
      title: "Published Rosters",
      // headerTitleStyle: headerStyle,
    },
  },
  Survey: {
    component: Survey,
    options: {
      title: "Surveys",
      // headerTitleStyle: headerStyle,
    },
  },
  NewLeaveRequest: {
    component: NewLeaveRequest,
    options: {
      title: "New Leave Request",
      // headerTitleStyle: headerStyle,
    },
  },
  SurveyDetail: {
    component: SurveyDetail,
    options: {
      title: "Survey Detail",
      // headerTitleStyle: headerStyle,
    },
  },
  Suggestions: {
    component: Suggestions,
    options: {
      title: "Suggestions",
      headerTitleStyle: headerStyle,
    },
  },
  SuggestionsAdd: {
    component: SuggestionsAdd,
    options: {
      title: "Add New Suggestion",
      headerTitleStyle: headerStyle,
    },
  },
  SuggestionDetail: {
    component: SuggestionDetail,
    options: {
      title: "Suggestion Detail",
      headerTitleStyle: headerStyle,
    },
  },
  CommsGroup: {
    component: CommsGroup,
    options: {
      title: "Comms Group",
      headerTitleStyle: headerStyle,
    },
  },
  CommsGroupMembers: {
    component: CommsGroupMembers,
    options: {
      title: "Comms Group Members",
      headerTitleStyle: headerStyle,
    },
  },
  CommsGroupDetail: {
    component: CommsGroupDetail,
    options: {
      title: "Comms Group Detail",
      headerTitleStyle: headerStyle,
    },
  },
  Broadcasts: {
    component: Broadcasts,
    options: {
      title: "Broadcasts",
      headerTitleStyle: headerStyle,
    },
  },
  BroadcastDetail: {
    component: BroadcastDetail,
    options: {
      title: "Broadcast Detail",
      headerTitleStyle: headerStyle,
    },
  },
  MyLeave: {
    component: MyLeave,
    options: {
      title: "My Leave",
      headerTitleStyle: headerStyle,
    },
  },
  MyDiary: {
    component: MyDiary,
    options: {
      title: "My Diary",
      headerTitleStyle: headerStyle,
    },
  },
  BankHoliday: {
    component: BankHoliday,
    options: {
      title: "Bank Holiday",
      headerTitleStyle: headerStyle,
    },
  },
  Profile: {
    component: Profile,
    options: {
      title: "Profile",
      headerTitleStyle: headerStyle,
    },
  },
  ChangePassword: {
    component: ChangePassword,
    options: {
      title: "Change Password",
      headerTitleStyle: headerStyle,
    },
  },
  QrCodeScanner: {
    component: QrCodeScanner,
    options: {
      headerShown: false,
    },
  },
  PublishedRosterWebView: {
    component: PublishedRosterWebView,
    options: {
      title: "Publish Roster (Web View)",
      // headerShown: false,
    },
  },
  ExceptionReportingList: {
    component: ExceptionReportingList,
    options: {
      title: "Exception Reporting List",
      // headerShown: false,
    },
  },
  NewExceptionReport: {
    component: NewExceptionReport,
    options: {
      title: "New Exception",
      // headerShown: false,
    },
  },
};
