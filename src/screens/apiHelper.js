const apiHelper =
{
  appApi: `/Suggestions/`,
  employeeLogin: `/Auth/login`,
  employeeChangePassword: `/Auth/changePassword`,
  removeToken: `/Auth/removeToken`,
  getEmpNextShift: `/Roster/employeeNextShift`,
  rosterFilterShift: `/Roster/getShifts`,
  bankHolidays: `/Leave/getBankHolidays`,
  leaveRequest: `/Leave/getLeaveRequest`,
  leaveEntitlement: `/Leave/getLeaveEntitlement`,
  rosterFilterPeriod: `/Roster/getRosterPeriod`,
  publishedRoster: `/Roster/publishedRosters`,
  brodcastList: `/Broadcast/getBroadcastList`,
  messageBroadcast: `/Broadcast/getBroadcastDetail`,
  sendMessage: `/Broadcast/sendMessage`,
  commsGroupList: `/CommsGroups/getCommsGroupList`,
  commsGroupSend: `/CommsGroups/sendMessage`,
  commsMessage: `/CommsGroups/getCommsMessageDetail`,
  viewMembersComms: `/CommsGroups/getCommsGroupMembers`,
  mySayList: `/MySay/mySayList`,
  addMySay: `/MySay/add_mySay`,
  getIdeaSuggestionList: `/Suggestions/getSuggestions`,
  insertIdeaSuggestionList: `/Suggestions/newSuggestions`,
  getPublishedSurvey: `/Survey/getPublishedSurvey`,
  getQuestionSurvey: `/Survey/getSurveyQuestion`,
  insertSurveyQuestionAnswer: `/Survey/updateSurveyAnswer`,
  getEmpReportDetail: `/MyDiary/getEmpReportDetail`,
  getLeaveType: `/Leave/getLeaveType`,
  submitLeaveRequest: `/Leave/submitLeaveRequest`,
  termAndConditions: `/Auth/termAndConditions`,
  assignShortLeave: `/Roster/assignShortLeave`,
  BroadcastFiles: `/Broadcast/getBroadcastFile`,
  printRoaster: `/Roster/printPublishedRoster`,
  locationDetail: `/Roster/getLocationList`,
  getTrustCode: `https://ei1voordq8.execute-api.eu-west-2.amazonaws.com/prod/trust`,
  webViewRoster: `/employee-published-rota-app/`,
  exceptionList: `/ExceptionReport/getExceptionList`,
  getExceptionPlannerList: `/ExceptionReport/getExceptionPlannerList`,
  getExceptionSupervisorList: `/ExceptionReport/getExceptionSupervisorList`,
  getExceptionShiftDate: `/ExceptionReport/getExceptionShiftDate`,
  getExceptionLocationWorkarea: `/ExceptionReport/getExceptionLocationWorkarea`,
  addNewException: `/ExceptionReport/addNewException`,
  getEmpLeaveHoursPerDay : `Leave/getEmpLeaveHoursPerDay`,
  getHelpLinks : `/Support/getHelpLinks`
};

export default apiHelper;
