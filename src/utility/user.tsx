import * as React from 'react';
import { useState } from 'react';

import { Web } from "@pnp/sp/presets/all";
import config from "./config";

export default async function appUser()
{
    const web = Web(config().baseURL);
    try {
          const cUser = await web.currentUser();
          console.log("UserPrincipalName: " + cUser.UserPrincipalName);
          return cUser.UserPrincipalName;
          } catch (error) {return error}

}
