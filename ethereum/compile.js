const path = require("path");
const fs = require("fs");
const solc = require("solc");

const BUILD_DIR_NAME = "build";

function compile() {
    const buildPath = path.resolve(__dirname, BUILD_DIR_NAME);
    if (fs.existsSync(buildPath)) {
        fs.rmSync(buildPath, { recursive: true });
    }

    const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
    const campaignSource = fs.readFileSync(campaignPath, "utf-8");

    const output = solc.compile(campaignSource, 1).contracts;

    fs.mkdirSync(path.resolve(__dirname, BUILD_DIR_NAME));

    for (let contract in output) {
        fs.writeFileSync(
            path.resolve(buildPath, `${contract.replace(':', '')}.json`),
            JSON.stringify(output[contract]),
            { encoding: 'utf-8' }
        );
    }
}

compile();