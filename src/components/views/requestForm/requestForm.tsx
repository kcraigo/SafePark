import * as React from "react";
import { useState } from "react";

import { Separator } from "office-ui-fabric-react/lib/Separator";
import { Text } from "office-ui-fabric-react/lib/Text";

import {
  DatePicker,
  DayOfWeek,
  Dropdown,
  IDatePickerStrings,
  IDropdownOption,
  Label,
  Link,
  MaskedTextField,
  mergeStyles,
  mergeStyleSets,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  TextField,
  Toggle,
  DefaultButton,
  Button
} from "office-ui-fabric-react";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Stack, IStackTokens } from "office-ui-fabric-react/lib/Stack";

import { useEffect, useReducer } from "react";
import IBuilding from "../../../models/IBuilding";
import ICampus from "../../../models/ICampus";
import "./requestForm.scss";

import appUser from "../../../utility/user";

import { sp } from "@pnp/sp/presets/all";
import { IItemAddResult } from "@pnp/sp/items";

import { graphAuthService, getManager } from "../../../utility/graphService";
import config from "../../../utility/config";
import { JSONParser } from "@pnp/odata";

// import "isomorphic-fetch";

const PolicyIcon = () => (
  <Icon iconName="DocumentSet" className="ms-IconExample" />
);

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: "0 25px"
});

const classNames = mergeStyleSets({
  deepSkyBlue: [{ color: "deepskyblue" }, iconClass],
  greenYellow: [{ color: "greenyellow" }, iconClass],
  salmon: [{ color: "salmon" }, iconClass]
});

const DayPickerStrings: IDatePickerStrings = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],

  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],

  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],

  shortDays: ["S", "M", "T", "W", "T", "F", "S"],

  goToToday: "Go to today",
  prevMonthAriaLabel: "Go to previous month",
  nextMonthAriaLabel: "Go to next month",
  prevYearAriaLabel: "Go to previous year",
  nextYearAriaLabel: "Go to next year",
  closeButtonAriaLabel: "Close date picker"
};

const controlClass = mergeStyleSets({
  control: {
    margin: "0 0 15px 0",
    maxWidth: "300px"
  }
});

export interface IDatePickerState {
  firstDayOfWeek?: DayOfWeek;
}

export interface ICompanyLocationState {
  campuses: ICampus[];
  buildings: IBuilding[];
  selectedCampus: string;
}

export interface ICampuses {
  Id: number;
  Title: string;
}

export interface IBuildings {
  Id: number;
  Title: string;
  Street: string;
  City: string;
  PostalCode: string;
}

const levels: IDropdownOption[] = [
  { key: "ground", text: "Ground" },
  { key: "1", text: "1" },
  { key: "2", text: "2" },
  { key: "3", text: "3" },
  { key: "4", text: "4" },
  { key: "5", text: "5" }
];

let selectedEndDate: Date;
let selectedStartDate: Date;
let userDetails: any;
let managerDetails: any;

// Initialize
let businessPhones = "";
let displayName = "";
let givenName = "";
let jobTitle = "";
let mail = "";
let mobilePhone = "";
let officeLocation = "";
let prefferedLanguage = "";
let surname = "";
let userPrincipalName = "";
let cUser = "";

const stackTokens: IStackTokens = { childrenGap: 12 };
const HorizontalSeparatorStack = (props: { children: JSX.Element[] }) => (
  <>
    {React.Children.map(props.children, child => {
      return <Stack tokens={stackTokens}>{child}</Stack>;
    })}
  </>
);

export const ParkingRequestForm = () => {
  sp.setup({
    sp: {
      headers: {
        Accept: "application/json;odata=verbose"
      },
      baseUrl: config().baseURL
    }
  });

  const [state, dispatch] = useReducer(reducer, []);
  const [isDisabled, toggleDisable] = useState(true);

  let [selectedBuilding, setBuilding] = useState("");
  let [selectedLevel, setLevel] = useState("");
  let [selectedCampus, setCampus] = useState("");

  // Initiator User Details
  let [initiatorName, setInitiator] = useState("");
  let [initiatorEmail, setInitiatorEmail] = useState("");
  let [initiatorJobTitle, setInitiatorJobTitle] = useState("");
  let [initiatorPhone, setInitiatorPhone] = useState("");

  //   // Manager
  let [managerName, setManagerName] = useState("");
  let [managerEmail, setManagerEmail] = useState("");
  let [managerJobTitle, setManagerJobTitle] = useState("");
  let [managerPhone, setManagerPhone] = useState("");
  let [noManager, setNoManager] = useState(true); // false = visible, true = hidden

  // Search Employee Details
  let [searchUserName, setSearchUser] = useState("");
  let [searchUserEmail, setSearchUserEmail] = useState("");
  let [searchUserJobTitle, setSearchUserJobTitle] = useState("");
  let [searchUserPhone, setSearchUserPhone] = useState("");
  let [validEmployee, setValidEmployee] = useState(true); // false = visible, true = hidden

  const initiator = "Initiator Information";
  const manager = "Manager Information";
  const employee = "Employee Information";
  const vehicle = "Vehicle Information";
  const emergencyContact = "Emergency Contact Information";
  const parking = "Parking Information";
  //   const cUser = appUser();

  useEffect(() => {
    _getInitiator();
    return () => {
      console.log("Init - INITIATOR");
    };
  }, []);

  useEffect(() => {
    _getCampuses();
    return () => {
      console.log("Init - CAMPUSES");
    };
  }, []);

  return (
    <form className="requestForm" name="parkingRequestForm">
      <div className="container">
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
              <Stack
                horizontal
                tokens={{ childrenGap: 50 }}
                styles={{ root: { width: 850 } }}
              >
                <Link className="policyLink" href="#/policies">
                  <PolicyIcon />
                  <strong>Parking Policies</strong>
                </Link>
                <Toggle
                  id="IhaveReadParkingPolicy"
                  onText="I have read and understand the Parking Policy."
                  offText="Please make sure you have read and understand the Parking Policy!"
                  onChange={() => toggleDisable(!isDisabled)}
                />
              </Stack>
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
              <Text>
                <strong>All Fields are Required!</strong>
              </Text>

              <MessageBar>
                A Mobile App version of this form is available from the Power Apps Viewer. The
                viewer can be downloaded from the App Store link on your mobile device.
              </MessageBar>
            </div>
          </div>
          <div className="ms-Grid-row row-spacer">
            <>
              <Separator>{initiator}</Separator>
            </>

            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
              <div className="ms-Grid-row row-spacer">
                <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                  <Stack
                    horizontal
                    tokens={{ childrenGap: 50 }}
                    styles={{ root: { width: 850 } }}
                  >
                    <Stack>
                      <Label>Employee:</Label>
                      <Label id="initiatorName">{initiatorName}</Label>
                    </Stack>
                    <Stack>
                      <Label>Email:</Label>
                      <Label id="initiatorEmail">{initiatorEmail}</Label>
                    </Stack>
                    <Stack>
                      <Label>Title:</Label>
                      <Label id="initiatorJobTitle">{initiatorJobTitle}</Label>
                    </Stack>
                    <Stack>
                      <Label>Phone:</Label>
                      <Label id="initiatorPhone">{initiatorPhone}</Label>
                    </Stack>
                    <TextField
                      id="initiatorEmpID"
                      label="EmployeeID"
                      disabled={isDisabled}
                    />
                  </Stack>
                </div>
              </div>
            </div>
          </div>

          <div className="ms-Grid-row row-spacer">
            <>
              <Separator>{employee}</Separator>
            </>
            <div className="ms-Grid-row row-spacer">
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                <Stack
                  horizontal
                  tokens={{ childrenGap: 50 }}
                  styles={{ root: { width: 850 } }}
                >
                  <TextField
                    id="searchByEmployeeName"
                    label="Employee First Name"
                    disabled={isDisabled}
                  />
                  <Stack>
                    <Label>Employee:</Label>
                    <Label id="searchUserEmail">{searchUserName}</Label>
                  </Stack>
                  <Stack>
                    <Label>Title</Label>
                    <Label id="searchUserTitle">{searchUserJobTitle}</Label>
                  </Stack>
                  <Stack>
                    <Label>Phone</Label>
                    <Label id="searchUserPhone">{searchUserPhone}</Label>
                  </Stack>
                  <TextField
                    id="searchEmpID"
                    label="EmployeeID"
                    disabled={isDisabled}
                  />
                </Stack>
                <div hidden={validEmployee}>
                  <MessageBar messageBarType={MessageBarType.error}>
                    This employee does not exist!
                  </MessageBar>
                </div>
              </div>
            </div>
          </div>
          <div className="ms-Grid-row row-spacer">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg4">
              <PrimaryButton
                className="deepSkyBlue"
                text="SEARCH"
                allowDisabledFocus
                onClick={_searchUser}
                disabled={isDisabled}
              />
            </div>
          </div>

          <div className="ms-Grid-row row-spacer">
            <>
              <Separator>{manager}</Separator>
            </>
            <div hidden={noManager}>
              <MessageBar messageBarType={MessageBarType.warning}>
                CEO does not have a manager.
              </MessageBar>
            </div>
            <div className="ms-Grid-row row-spacer">
              <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
                <Stack
                  horizontal
                  tokens={{ childrenGap: 50 }}
                  styles={{ root: { width: 850 } }}
                >
                   <Stack>
                    <Label>Name:</Label>
                    <Label id="managerName">{managerName}</Label>
                  </Stack>
                   <Stack>
                    <Label>Email:</Label>
                    <Label id="managerEmail">{managerEmail}</Label>
                  </Stack>
                  <Stack>
                    <Label>Title:</Label>
                    <Label id="managerJobTitle">{managerJobTitle}</Label>
                  </Stack>
                  <Stack>
                    <Label>Phone:</Label>
                    <Label id="managerPhone">{managerPhone}</Label>
                  </Stack>
                </Stack>
              </div>
            </div>
          </div>

          <div className="ms-Grid-row row-spacer">
            <>
              <Separator>{emergencyContact}</Separator>
            </>
            <Stack
              horizontal
              tokens={{ childrenGap: 50 }}
              styles={{ root: { width: 650 } }}
            >
              <TextField
                id="contactName"
                label="Contact Name"
                disabled={isDisabled}
              />
              <MaskedTextField
                id="contactPhone"
                label="Phone"
                mask="(999) 999 - 9999"
                disabled={isDisabled}
              />
              <TextField
                id="contactEmailAddress"
                label="Email"
                disabled={isDisabled}
              />
            </Stack>
          </div>
          <div className="ms-Grid-row row-spacer">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
              <Label>Start Date</Label>
              <DatePicker
                id="startDate"
                onSelectDate={_onSelectStartDate}
                disabled={isDisabled}
                className={controlClass.control}
                strings={DayPickerStrings}
                placeholder="Start Date"
                ariaLabel="Start Date"
              />
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg6">
              <Label>Return Date</Label>
              <DatePicker
                id="returnDate"
                onSelectDate={_onSelectReturnDate}
                disabled={isDisabled}
                className={controlClass.control}
                strings={DayPickerStrings}
                placeholder="Return Date"
                ariaLabel="Return Date"
              />
            </div>
          </div>
        </div>
        <div className="ms-Grid-row row-spacer">
          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
            <>
              <Separator>{vehicle}</Separator>
            </>
            <Stack
              horizontal
              tokens={{ childrenGap: 50 }}
              styles={{ root: { width: 650 } }}
            >
              <TextField id="make" label="Make" disabled={isDisabled} />
              <TextField id="model" label="Model" disabled={isDisabled} />
              <TextField id="year" label="Year" disabled={isDisabled} />
              <TextField id="color" label="Color" disabled={isDisabled} />
              <TextField
                id="licensePlateNumber"
                label="License Plate"
                disabled={isDisabled}
              />
            </Stack>
            <TextField
              id="distinquishingFeatures"
              label="Distinguishing features and or marks to assist Security personnel in identifying your vehicle."
              multiline
              rows={3}
              disabled={isDisabled}
            />
          </div>
        </div>
        <div className="ms-Grid-row row-spacer">
          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
            <>
              <Separator>{parking}</Separator>
            </>

            <Stack
              horizontal
              tokens={{ childrenGap: 50 }}
              styles={{ root: { width: 650 } }}
            >
              <Dropdown
                id="campus"
                placeholder="Select a Campus"
                disabled={isDisabled}
                label="Campus"
                defaultSelectedKey=""
                options={state.campuses}
                onChange={_getBuildings}
              />

              <Dropdown
                id="building"
                placeholder="Select a Building"
                disabled={isDisabled}
                label="Building"
                defaultSelectedKey=""
                options={state.buildings}
                onChange={_setBuilding}
              />

              <Dropdown
                id="level"
                placeholder="Level"
                disabled={isDisabled}
                label="Level"
                defaultSelectedKey="Ground"
                options={levels}
                onChange={_setLevel}
              />
            </Stack>
          </div>
        </div>
        <div className="ms-Grid-row row-spacer">
          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg12">
            <TextField
              id="justification"
              label="Justification"
              multiline
              rows={4}
              disabled={isDisabled}
            />
          </div>
        </div>

        <div className="ms-Grid-row align-right">
          <PrimaryButton
            className="deepSkyBlue"
            text="Submit Parking Request"
            onClick={_saveParkingRequest}
            allowDisabledFocus
            disabled={isDisabled}
          />
        </div>
      </div>
    </form>
  );

  // USER
  async function _getInitiator(): Promise<void> {
    appUser().then(res => {
      // cUser = "barney@lobapps.onmicrosoft.com";
      cUser = res;
      if (cUser) {
        let searchUser = 0;// 0  = Initiator
        _getUsersGraphInfo(cUser, searchUser);
      }
    });
  }

  function _searchUser() {
    let searchUser = 1;// NOT 0  = Using the Search Feature
    const form = document.forms["parkingRequestForm"];
    let empFirstName = form.elements.searchByEmployeeName.value;
    let empUserPrincipalName = empFirstName + "@lobapps.onmicrosoft.com";
    _getUsersGraphInfo(empUserPrincipalName, searchUser);
  }

  // MICROSOFT GRAPH FUNCTIONS

   // Return user information from AD with MS Graph
  async function _getUsersGraphInfo(emp, searchUser): Promise<void> {
    // console.log(
    //   "GRPHSVC-USER DETAILS: " + initiator + " Passed: " + initiator
    // );
    await graphAuthService(emp)
      .then(response => {
        userDetails = response;
        businessPhones = userDetails.businessPhones;
        displayName = userDetails.displayName;
        givenName = userDetails.givenName;
        jobTitle = userDetails.jobTitle;
        mail = userDetails.mail;
        mobilePhone = userDetails.mobilePhone;
        officeLocation = userDetails.officeLocation;
        prefferedLanguage = userDetails.prefferedLanguage;
        surname = userDetails.surname;
        userPrincipalName = userDetails.userPrincipalName;

        // Determine if user is a valid Employee
        if (searchUser !== 1) {
          setInitiator(response.displayName);
          setInitiatorEmail(response.mail);
          setInitiatorJobTitle(response.jobTitle);
          setInitiatorPhone(response.businessPhones[0]);
        } else {
          setSearchUser(response.displayName);
          setSearchUserEmail(response.mail);
          setSearchUserJobTitle(response.jobTitle);
          setSearchUserPhone(response.businessPhones[0]);
          setValidEmployee(true);
        }
      })
      .catch(function(error) {
        if (error.code === "Request_ResourceNotFound") {
          console.log("Response Error: " + error.code);

          //employee
          setSearchUser("");
          setSearchUserEmail("");
          setSearchUserJobTitle("");
          setSearchUserPhone("");
          setValidEmployee(false);
          //manager
          setManagerName("");
          setManagerEmail("");
          setManagerJobTitle("");
          setManagerPhone("");
          throw new Error("Something went badly wrong!");
        }
      });

    if (
      userDetails.jobTitle === "CEO and Founder" ||
      userDetails.jobTitle === "" ||
      userDetails.jobTitle === undefined
    ) {
      setNoManager(false);
      setManagerName("");
      setManagerEmail("");
      setManagerJobTitle("");
      setManagerPhone("");
      return;
    } else {
      setNoManager(true);
      _getUsersManagerGraphInfo(emp);
    }
  }

  // Manager
  async function _getUsersManagerGraphInfo(emp): Promise<void> {
    console.log("Call the Graph - Get Manager Information " + emp);
    await getManager(emp).then(response => {
      setManagerName(response.displayName);
      setManagerEmail(response.mail);
      setManagerJobTitle(response.jobTitle);
      setManagerPhone(response.businessPhones[0]);
    });
  }

  // CAMPUSES
  async function _getCampuses(): Promise<void> {
    await sp.web.lists
      .getByTitle("Campus")
      .items.select("Id", "Title")
      .getAll()
      .then(response => {
        const cmps = response.map(desc => {
          return {
            ...desc
          };
        });

        dispatch({
          type: "setCampuses",
          data: cmps
        });
      });
  }

  //BUILDINGS
  async function _getBuildings(
    event: React.FormEvent<HTMLDivElement>,
    campus: IDropdownOption
  ): Promise<void> {
    setCampus((selectedCampus = campus.text));
    await sp.web.lists
      .getByTitle("Buildings")
      .items.select("Id", "Title", "Campus")
      .filter("Campus eq %27" + campus.text + "%27")
      .getAll()
      .then(response => {
        const bldgs = response.map(desc => {
          return {
            ...desc
          };
        });

        dispatch({
          type: "setBuildings",
          data: bldgs
        });
      });
  }

  // FUNCTIONS

  async function _setBuilding(
    event: React.FormEvent<HTMLDivElement>,
    building: IDropdownOption
  ): Promise<void> {
    setBuilding((selectedBuilding = building.text));
  }

  async function _setLevel(
    event: React.FormEvent<HTMLDivElement>,
    level: IDropdownOption
  ): Promise<void> {
    setLevel((selectedLevel = level.text));
  }

  // DATEPICKER
  function _onSelectStartDate(date: Date | null | undefined): void {
    console.log("STARTDATE: " + date);
    selectedStartDate = date;
  }

  function _onSelectReturnDate(date: Date | null | undefined): void {
    console.log("ENDDATE: " + date);
    selectedEndDate = date;
  }

  // SAVE
  async function _saveParkingRequest(): Promise<void> {
    // We need to reference the form in order to gain access to it's controls and the controls values.
    const form = document.forms["parkingRequestForm"];
    // add an item to the list
    // Format - {SharePoint List Field Name}:{Value}

    const iar: IItemAddResult = await sp.web.lists
      .getByTitle("ParkingRequest")
      .items.add({
        Title: "New Parking Request",
        ReadParkingPolicy: true,
        Justification: form.elements.justification.value,
        LicensePlate: form.elements.licensePlateNumber.value,
        Make: form.elements.make.value,
        Color: form.elements.color.value,
        Model: form.elements.model.value,
        Year: form.elements.year.value,
        StartDate: selectedStartDate,
        EndDate: selectedEndDate,
        ContactName: form.elements.contactName.value,
        ContactNumber: form.elements.contactPhone.value,
        ContactEmail: form.elements.contactEmailAddress.value,
        Level: selectedLevel,
        Campus: selectedCampus,
        Building: selectedBuilding,
        Manager: managerName,
        ManagerPhone: managerPhone,
        ManagerEmail: managerEmail,
        Initiator: initiatorName,
        InitiatorPhone: initiatorPhone,
        InitiatorEmail: initiatorEmail,
        Employee: searchUserName,
        EmployeePhone: searchUserPhone,
        EmployeeEmail: searchUserEmail
      });
    console.log("iar: " + iar);
  }
};

export default ParkingRequestForm;

function reducer(state: any, action: { type: any; data: any[] }) {
  switch (action.type) {
    case "setCampuses": {
      // We need to rename the keys: Id to key and Title to text
      return {
        campuses: action.data.map(function(cm: { [x: string]: any }) {
          cm["key"] = cm["Id"];
          delete cm["Id"];
          cm["text"] = cm["Title"];
          delete cm["Title"];
          return cm;
        })
      };
    }
    case "setBuildings": {
      // We need to rename the keys: Id to key and Title to text and keep the current state
      return {
        ...state,
        buildings: action.data.map(function(bldg: { [x: string]: any }) {
          bldg["key"] = bldg["Id"];
          delete bldg["Id"];
          bldg["text"] = bldg["Title"];
          delete bldg["Title"];
          return bldg;
        })
      };
    }

    case "enableFormControls": {
      return { ...state, ...{ isDisabled: false } };
    }

    case "disableFormControls": {
      return { ...state, ...{ isDisabled: true } };
    }

    default:
      return state;
  }
}
