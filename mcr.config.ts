import fs from 'fs';
import path from 'path';
import os from 'os';
const { geteuid } = process;
// import type { CoverageReportOptions } from "monocart-coverage-reports";

let caches;
const getCaches = () => {
    const userId = geteuid ? geteuid() : os.userInfo().username;
    const tmpdir = path.join(os.tmpdir(), `tsx-${userId}`);
    const files = fs.readdirSync(tmpdir);
    return files.map((filename) => {
        const content = fs.readFileSync(path.resolve(tmpdir, filename)).toString('utf8');
        const json = JSON.parse(content);
        return json;
    });
};

const getRealSourceFromCache = (entry) => {
    if (!caches) {
        caches = getCaches();
    }

    const item = caches.find((cache) => {
        if (cache.map.mappings === entry.sourceMap.mappings) {
            return true;
        }
    });

    // console.log(item, entry.sourceMap);

    if (item) {
        entry.source = item.code;
        entry.fake = false;
    }

};

const coverageOptions = {
    // logging: "debug",

    reports: [
        ['v8'],
        ['console-details']
    ],

    entryFilter: {
        '**/node_modules/**': false,
        '**/src/**': true
    },

    onEntry: (entry) => {

        // get the source for fake entry from tsx cache
        if (entry.fake && entry.sourceMap) {
            getRealSourceFromCache(entry);
        }

    }
};

export default coverageOptions;
