let helpfn=require("./commands/help");
let organisefn=require("./commands/organise");
let viewfn=require("./commands/view");
let input=process.argv.slice(2);
//input={organise}
//let a;//undefined
let command=input[0];
switch(command){
    case "view":
        viewfn.view(input[1],input[2]);
        break;
    case "organise":
        organisefn.organise(input[1]);
        break;
    default://help
         helpfn.help();
         break;

        

}
//node mycli.js view E:\Fjp_Eng\Javascript\Activity flat