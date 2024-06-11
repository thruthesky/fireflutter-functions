import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
// import { google } from "googleapis";


/**
 * Returns true if the event is a create event
 *
 * @param {functions.Change<functions.database.DataSnapshot>} change
 * @return {boolean}
 */
export function isCreate(change: functions.Change<functions.database.DataSnapshot>): boolean {
    return !change.before.exists() && change.after.exists();
}


/**
 * Returns true if the event is an update event
 *
 * @param {functions.Change<functions.database.DataSnapshot>} change
 * @return {boolean}
 */
export function isUpdate(change: functions.Change<functions.database.DataSnapshot>): boolean {
    return change.before.exists() && change.after.exists();
}

/**
 * Return true if the event is a delete event
 *
 * @param {functions.Change<functions.database.DataSnapshot>} change
 * @return {boolean}
 */
export function isDelete(change: functions.Change<functions.database.DataSnapshot>): boolean {
    return change.before.exists() && !change.after.exists();
}


/**
 * Returns chunks of the array
 *
 *
 * @param {T[]} myArray The array to be chunked
 * @param {number} chunkSize The size of the chunk
 *
 * @return {number}
 *
 * see `chunkArray.spec.ts` for the test
 *
 */
export function chunkArray<T>(myArray: T[], chunkSize: number): T[][] {
    const results = [];
    while (myArray.length) {
        results.push(myArray.splice(0, chunkSize));
    }
    return results as T[][];
}

/**
 * This function retrieves the project ID from the Firebase admin app options.
 *
 * @return {string} The project ID. If the project ID is not set in the app options,
 * it tries to retrieve it from the credential options. If it's not there either, it returns an empty string.
 */
export function getProjectID(): string {
    const app = admin.app();
    // Return the project ID from the app options, or from the credential options if it's not set in the app options
    // If it's not set in either, return an empty string
    return app.options.projectId ||
        (app.options.credential && (app.options.credential as unknown as { projectId: string }).projectId) || "";
}


/**
 * Debug console log
 *
 * @param {unknown[]} args arguments to be logged to the console
 */
export function dog(...args: unknown[]) {
    console.log("-- dog;", ...args);
}


/**
 * Returns a string that is cut to the length.
 * @param {string} str string to cut.
 * @param {number} length length of the string after cutting
 * @return {string} string
 */
export function strcut(str: string, length: number): string {
    return str.length > length ? str.substring(0, length) : str;
}


/**
 * Returns a string that is cut to the length.
 *
 * @param {any[]} arr array to cut
 * @param {number} size size of the chunk
 * @return {any[]}
 */
export const chunk = (arr: any[], size: number): any[] => // eslint-disable-line
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Array.from({length: Math.ceil(arr.length / size)}, (_: any, i: number) =>
        arr.slice(i * size, i * size + size)
    );

