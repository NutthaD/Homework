let alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

async function wait(){
    await setTimeout(()=>{}, 1000);
    return "End";
}

async function main(){
    let a = await wait();
    for(let i=0;i<alphabet.length;i++){
        let num = i+1;
        if(num%2==0){
            console.log(alphabet[i-1]);
        }
        else{
            console.log(alphabet[num]);
        }
    } 
    console.log(a);
}

try{
    main();
}
catch(error){
    console.log("Error name: " + error.name);
    console.log("Error message: " + error.message);
}