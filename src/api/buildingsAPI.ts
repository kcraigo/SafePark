import { Web, IWeb } from "@pnp/sp/webs";
// this imports the functionality for lists associated only with web
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";

import {handleResponse, handleError} from "./apiUtils";
import { sp } from "@pnp/sp";

// Webpack setting
const baseUrl = process.env.API_URL;

export function getCampusBuildings(campus) {
    const web: IWeb = Web(baseUrl);

}
