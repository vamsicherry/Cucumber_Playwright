const report = require("multiple-cucumber-html-reporter");
report.generate({
    jsonDir: "testResults",
    reportPath: "testResults/MultiCucumber",
    reportName: "Playwright Automation Report",
    pageTitle: "webcart test report",
    ignoreBadJsonFile:true,
    displayDuration: true,
    metadata:
    {
        browser:
        {
            name:
                "chrome",
            version: "112",
        },
        device: "vamsi -PC",
        platform:
        {
            name:
                "Windows",
            version: "10",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "web Cart Application" },
            { label: "Release", value: "1.2.3" },
            { label: "Cycle", value: "Smoke-1" }
        ],
    },
});