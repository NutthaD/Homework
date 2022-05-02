function sayHello(){
    return "Hello";
}

function delaySayHello() {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve("Delay Hello");
        }, 2000);
    });
}

async function longTimeHello(){
    await setTimeout(()=>{}, 1000); // เพื่อทำการ delay การทำงาน
    return "Long Time Hello";
}

async function main(){
    let a = sayHello();
    let b = await delaySayHello();
    let c = await longTimeHello();
    console.log(a);
    console.log(c);
    console.log(b);
}
main();