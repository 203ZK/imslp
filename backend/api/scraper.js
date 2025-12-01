import dotenv from "dotenv";
import { spawn } from "child_process";

dotenv.config();

const _pythonExecutable = "../scraper/.venv/Scripts/python.exe";

var uint8arrayToString = function (data) {
    return String.fromCharCode.apply(null, data);
};

export function scrapeWorkForScores(link) {
    const _scraperFileName = "./scraper/fetchScores.py";
    const scriptExecution = spawn(_pythonExecutable, [_scraperFileName, link]);

    return new Promise((resolve, reject) => {
        let response = "";

        scriptExecution.stdout.on('data', (data) => {
            response += uint8arrayToString(data);
        });

        scriptExecution.stderr.on('data', (data) => {
            console.error(uint8arrayToString(data));
        });

        scriptExecution.on('exit', (code) => {
            if (code === 0) {
                resolve(response);
            } else {
                reject(new Error(code));
            }
        });
    });
};

export function fetchMirroredLink(encodedLink) {
    const _scraperFileName = "./scraper/fetchPdf.py";
    const scriptExecution = spawn(_pythonExecutable, [_scraperFileName, encodedLink]);

    return new Promise((resolve, reject) => {
        let response = "";

        scriptExecution.stdout.on('data', (data) => {
            response += uint8arrayToString(data);
        });

        scriptExecution.stderr.on('data', (data) => {
            console.error(uint8arrayToString(data));
        });

        scriptExecution.on('exit', (code) => {
            if (code === 0) {
                resolve(response);
            } else {
                reject(new Error(code));
            }
        });
    });
};
