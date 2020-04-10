import { useConstCallback } from '@uifabric/react-hooks';
import { IIconProps } from 'office-ui-fabric-react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';
import { ChangeReturnDateForm } from './changeReturnDateForm';

const changeReturnDateIcon: IIconProps = { iconName: 'CalendarSettings' };

export const ReturnDateFormPanel: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openPanel = useConstCallback(() => setIsOpen(true));
  const dismissPanel = useConstCallback(() => setIsOpen(false));

  return (
    <div>
      <ActionButton iconProps={changeReturnDateIcon} allowDisabledFocus onClick={openPanel}>
      Change Return Date
    </ActionButton>
      <Panel
        headerText="Return Date"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
      >
        <span>
            <ChangeReturnDateForm/>
        </span>
      </Panel>
    </div>
  );
};
