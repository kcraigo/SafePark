import * as React from 'react';
import { TestImages } from '@uifabric/example-data';
import { IPersonaProps, IPersonaSharedProps, Persona, PersonaPresence, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import './contacts.scss';


const customCoinClass = mergeStyles({
  borderRadius: 20,
  display: 'block'
});

const contactPersona: IPersonaSharedProps = {
  imageInitials: 'TR',
  text: 'Ted Randall',
  secondaryText: 'Project Manager',
  optionalText: 'Available at 4:00pm'
};

// export const Contacts: React.FunctionComponent = () => {

function contacts() {
  return (
      <div className="contactDetails">
        <Stack tokens={{ childrenGap: 10 }}>
        <div>Contacts</div>
        <Persona
            {...contactPersona}
            size={PersonaSize.size72}
            presence={PersonaPresence.online}
            onRenderCoin={_onRenderCoin}
            imageAlt="Custom Coin Image"
            imageUrl={TestImages.personaMale}
            coinSize={72}
        />
        </Stack>
    </div>
  );
}
export default contacts;


function _onRenderCoin(props: IPersonaProps): JSX.Element {
  const { coinSize, imageAlt, imageUrl } = props;
  return <img src={imageUrl} alt={imageAlt} width={coinSize} height={coinSize} className={customCoinClass} />;
}
