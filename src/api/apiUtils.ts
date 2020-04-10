export async function handleResponse(response) {
    // debugger;

    if(response.length > 0) {
        return response.map(desc => {
            return {
                ...desc
            };
        });
    }
    if(response.status === 400) {
        // Server side validation error occurred
        // Server side validation returns string error message, parse as text instead of JSON.
        const error = await response.text();
        throw new Error(error);
    }

    return;

}
 // Production app, should call an error logging service
 export function handleError(error) {
     console.error("API call failed. " + error);
     throw error;
 }
