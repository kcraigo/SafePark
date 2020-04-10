import * as React from "react";
import { useContext } from "react";
import { Fabric, mergeStyles } from 'office-ui-fabric-react/lib/index';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

import { ConfigContext } from '../../App';


// CUSTOM STYLES
import './home.scss';

const theme = getTheme();

const headerDividerClass = 'DetailsListAdvancedExample-divider';
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

const DEFAULT_ITEM_LIMIT = 5;
const PAGING_SIZE = 10;
const PAGING_DELAY = 2000;
const ITEMS_COUNT = 5000;


const wrapperClassName = mergeStyles({
  selectors: {
    '& > *': { marginBottom: '20px' },
    '& .ms-ComboBox': { maxWidth: '300px' }
  }
});



function home() {

const context = useContext(ConfigContext);
    return (
    <div>
      <Fabric className={wrapperClassName}>
          <div className={classNames.root}>
            <div className="welcome">
                {context.showWelcome === false ? null : (
    <h2>Welcome!</h2>
    )}
                <p>Employee Vehicle Long Term Parking Request Manager</p>
                <p>SafePark is designed to allow Employees who will be going on company related business travel a to notify Physical Security about their vehicle being parked on company property for an extended period of time.
                </p>
                <p>This helps to alert Physical Security to pay special attention to the employee' vehicle and also serves the purpose of requesting that the employee' vehicle not be subject to towing.</p>
            </div>
        </div>

      </Fabric>
      </div>

    );

  }
export default home;
