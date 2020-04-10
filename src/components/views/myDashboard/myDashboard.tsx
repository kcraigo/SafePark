import { IIconProps } from 'office-ui-fabric-react';
import { DetailsList, DetailsListLayoutMode, IColumn, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { Fabric, mergeStyles } from 'office-ui-fabric-react/lib/index';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import * as React from 'react';
// CUSTOM STYLES
import './myDashboard.scss';
import { ReturnDateFormPanel } from './returnDateFormPanel';

const theme = getTheme();
const headerDividerClass = 'DetailsListAdvancedExample-divider';

export interface IDetailsListBasicExampleItem {
  key: number;
  name: string;
  value: number;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  selectionDetails: {};
}

const classNames = mergeStyleSets({
  headerDivider: {
    display: 'inline-block',
    height: '100%'
  },
  headerDividerBar: [
    {
      display: 'none',
      background: theme.palette.themePrimary,
      position: 'absolute',
      top: 16,
      bottom: 0,
      width: '1px',
      zIndex: 5
    },
    headerDividerClass
  ],
  linkField: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%'
  },
  root: {
    selectors: {
      [`.${headerDividerClass}:hover + .${headerDividerClass}`]: {
        display: 'inline'
      }
    }
  }
});
const wrapperClassName = mergeStyles({
  selectors: {
    '& > *': { marginBottom: '20px' },
    '& .ms-ComboBox': { maxWidth: '300px' }
  }
});

export default class MyDashboard extends React.Component<{}, IDetailsListBasicExampleState> {
private _selection: Selection;
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    // Populate with items for demos.
    this._allItems = [];
    for (let i = 0; i < 10; i++) {
      this._allItems.push({
        key: i,
        name: 'Item ' + i,
        value: i
      });
    }

    this._columns = [
      { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true }
    ];

    this.state = {
      items: this._allItems,
      selectionDetails: this._getSelectionDetails()
    };
  }


  public render(): JSX.Element {
    const { items, selectionDetails } = this.state;
    const postUpdateIcon: IIconProps = { iconName: 'PostUpdate' };
    // const [isOpen,setIsOpen] = React.useState(false);

    // const dismissForm = useConstCallback(() => setIsOpen(false));

    // const showForm = useConstCallback(() => setIsOpen(true));

    return (
      <Fabric className={wrapperClassName}>
          <div className={classNames.root}>
            <div className="dashBoardDetails">
                <h2>My Dashboard!</h2>
                <p>Request Details</p>
                <p><strong><label>Start Date:</label></strong> 11/01/2019 </p>
                <p><strong><label>Return Date:</label></strong> 12/01/2019
                <ReturnDateFormPanel />
                </p>
                <p><strong><label>Comments:</label></strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae vero eos consectetur sequi laborum beatae aut, ipsum sed excepturi at nihil hic harum exercitationem expedita quod. Saepe maiores quas quidem.</p>
            </div>

            <div className="securityNotificationsWrapper">
                <h3>Security Notifications</h3>
                <DetailsList
                    items={items}
                    columns={this._columns}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                    selection={this._selection}
                    selectionPreservedOnEmptyClick={true}
                    ariaLabelForSelectionColumn="Toggle selection"
                    ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                    checkButtonAriaLabel="Row checkbox"
                    onItemInvoked={this._onItemInvoked}
                />
            </div>


        </div>

      </Fabric>

    );
  }
 private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as IDetailsListBasicExampleItem).name;
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({
      items: text ? this._allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1) : this._allItems
    });
  };

  private _onItemInvoked = (item: IDetailsListBasicExampleItem): void => {
    alert(`Item invoked: ${item.name}`);
  };

}
