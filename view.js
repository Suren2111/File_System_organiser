let fs=require("fs");
let path=require("path");
//mode=tree/flat
//src=folder_path
function viewfn(src,mode){
    
    if(mode=="flat"){

    checkfilesOrfoldersflat(src);
    }
    else{
        checkfilesOrfolderstree(src,"|");
    }
}


function files(src){
    //check for files or not
    //return type=boolean
    let con=fs.lstatSync(src).isFile();
    return con;

}
function checkfilesOrfoldersflat(src){

    let filesornot=files(src);
    if(filesornot==true){
        console.log(src,"*");
    }
    else{
       let folders=fs.readdirSync(src);// Read all the folder under the given path
       //folders[]={folder1,folder2,file,folder3}
       //console.log(folders);
        //console.log(src); /////
       
       for(let i=0;i<folders.length;i++){
          let child=folders[i];//child=folder1
           //child=commands
          let childpath=path.join(src,child);
          // E/fjp_eng/Javascript/Folder=src   child=folder1
         // childpath= E/fjp_eng/Javascript/Activity/folder1
          checkfilesOrfoldersflat(childpath);
          //console.log(childpath);

       }
    
    }

}
function checkfilesOrfolderstree(src,indent){ //indent=|

    let filesornot=files(src);
    if(filesornot==true){
        console.log(indent,path.basename(src),"*");
    }
    else{
       let folders=fs.readdirSync(src);
       //console.log(folders);
       //folders={folder1,folder2,file3....}
      //E:\Fjp_Eng\Javascript\Activity=src
     console.log(indent,path.basename(src));//path.basename(src)=>E/folder/folder1/file1.txt
                                            //path.basename(src)=>E/folder/folder1
       for(let i=0;i<folders.length;i++){
          let child=folders[i];
           //child=commands
          let childpath=path.join(src,child);
          checkfilesOrfolderstree(childpath,indent+"____");//4 underscore
          //console.log(childpath);

       }
    }
    

}

module.exports={
    view:viewfn
}