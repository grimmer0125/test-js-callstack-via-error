function test3() {
    console.log("test3")
    test34();
}

function test34() {
    console.log("test34")
    const s = (new Error()).stack
    console.log({ s })
}

test3();

async function test1() {
    console.log("test1")
    await test2();
    console.log("test2")
}
const fnNameMatcher = /([^(]+)@|at ([^(]+) \(/;

function fnName(str) {
    // [NOTE: choose this one] https://stackoverflow.com/a/48985787/7354486
    const regexResult = fnNameMatcher.exec(str);
    return regexResult[1] || regexResult[2];
}

async function test2() {
    console.log("test2")
    const s2 = (new Error()).stack
    const stackLines = s2.split('\n');

    // or https://stackoverflow.com/a/57023880/7354486
    // use console.log((new Error()).stack.split("\n")[2].trim().split(" ")[1])
    // but https://stackoverflow.com/a/45072174/7354486 
    // points that it is different in browser so fnNameMatcher may be better

    // TODO: check the length first 
    // Please note that, the above line will throw an exception, if there is no caller or no previous stack. Use accordingly.
    const callee = fnName(stackLines[1]); // test2
    const caller = fnName(stackLines[2]);
    console.log({ s2 })
}

(async () => {
    console.log("0");
    await test1();
    console.log("02");
})();