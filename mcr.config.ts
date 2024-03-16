// import type { CoverageReportOptions } from "monocart-coverage-reports";
import fs from 'fs';
import path from 'path';
import { getSnapshot, diffSnapshot } from 'monocart-coverage-reports';

const coverageOptions = {
    // logging: 'debug',

    reports: [
        ['v8'],
        ['console-details']
    ],

    entryFilter: {
        '**/node_modules/**': false,
        '**/src/**': true,
        '**/test/**': true
    },

    onEnd: (coverageResults) => {

        const snapDir = path.resolve(import.meta.dirname, 'snapshot');
        if (!fs.existsSync(snapDir)) {
            fs.mkdirSync(snapDir, {
                recursive: true
            });
        }

        const newSnapshot = getSnapshot(coverageResults);
        const id = coverageResults.reportPath.split('/')[1];
        const snapPath = path.resolve(snapDir, `${id}.snapshot.json`);

        if (!fs.existsSync(snapPath) || process.env.TEST_SNAPSHOT) {
            fs.writeFileSync(snapPath, JSON.stringify(newSnapshot, null, 4));
            return;
        }

        const oldSnapshot = JSON.parse(fs.readFileSync(snapPath).toString('utf-8'));

        const diff = diffSnapshot(oldSnapshot, newSnapshot, {
        // skipEqual: false,
        // showSummary: false,
            maxCols: 30,
            metrics: []
        });

        const snapName = path.basename(snapPath);
        if (diff.change) {
            console.log(`ERROR: Snapshot does not match reference: ${snapName}`);
            console.log(diff.message);
            process.exit(1);
        } else {
            console.log(`Snapshot matched: ${snapName}`);
        }

    }

};

export default coverageOptions;
