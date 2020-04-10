import { DatePicker, DayOfWeek, IDatePickerStrings, mergeStyleSets, PrimaryButton, TextField } from 'office-ui-fabric-react';
import * as React from 'react';

const DayPickerStrings: IDatePickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker'
};

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '300px'
  }
});

export interface IDatePickerState {
  firstDayOfWeek?: DayOfWeek;
}


export class ChangeReturnDateForm extends React.Component<{}, IDatePickerState> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      firstDayOfWeek: DayOfWeek.Sunday
    };
  }

  public render() {
    const { firstDayOfWeek } = this.state;

    return (
      <div className="docs-DatePickerExample">
          <TextField label="Justification" multiline rows={3} />
          <br />
        <DatePicker
          className={controlClass.control}
          firstDayOfWeek={firstDayOfWeek}
          strings={DayPickerStrings}
          placeholder="Select a date..."
          ariaLabel="Select a date"
        />
        {/* // We will change the onClick handler in the PNPJS part of this series */}
        <PrimaryButton text="Primary" onClick={_alertClicked} allowDisabledFocus />
      </div>
    );
  };

}

function _alertClicked(): void {
  alert('Clicked');
}
