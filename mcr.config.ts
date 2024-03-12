import type { CoverageReportOptions } from "monocart-coverage-reports";

const coverageOptions:CoverageReportOptions = {
    logging: "debug",

    reports: [
        ["v8"],
        ["console-details"]
    ],

    entryFilter: {
        "**/node_modules/**": false,
        "**/src/**": true
    },

    onEntry: async (entry)=> {

       // can not get the source

    }
}

export default coverageOptions