let path=require("path");
let fs=require("fs");
let utility = {
    media: ['mp4','mkv','mp3'],
    archives: ['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents: ['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex'],
    app: ['exe','dmg','pkg','deb']
}
function organisefn(src){
    

    if(src==undefined){
        src=process.cwd();//Take path as my current working folder
        //console.log("organising your folder");
        //console.log(src);

    }
    let dest=createfolder(src,"Organisedfolder");
    //console.log("Hello");
    organisehelper(src,dest);
}
function createfolder(src,parameter){
    let folderpath=path.join(src,parameter);
    if(fs.existsSync(folderpath)==false){
        fs.mkdirSync(folderpath);//used to create folder
    }
    return folderpath;
}
function checkutility(src){// src=Folder/folder1/file1.txt
    //extension={Folder/folder1/file1,txt}
    let extension=src.split(".")[1];//txt
    for(let key in utility){
        let valuearr=utility[key];
        for(let i=0;i<valuearr.length;i++){
            if(extension==valuearr[i]){
                return key;
            }
        }
    }
        return "others";
    

}
function copyandorganisefiles(src,dest){
    //dest=folder/organisedfolder/Media
    //src=folder/folder1/folder1'/file1.txt
    dest=path.join(dest,path.basename(src));//  //dest=folder/organisedfolder/Media/file.txt
    //pathy.join is like a concatinating of 2 strings 
    //console.log(dest);
    fs.copyFileSync(src,dest);// it will create a file if it not exists and put the content in the file from para1 to para2 if the file exists it will overwrite the content from para1 to para2

    //console.log(dest);

}
function organisehelper(src,dest){

    let filesornot=files(src);
    if(filesornot==true){
        //logic
      let category=checkutility(src);//category=media or archieves or....
      // console.log(src,"->",category);
      let categorypath=createfolder(dest,category);
       copyandorganisefiles(src,categorypath)

        
    }
    else{
       let folders=fs.readdirSync(src);
       //console.log(folders);
      
    // console.log(path.basename(src));
       for(let i=0;i<folders.length;i++){
          let child=folders[i];
           //child=commands
          let childpath=path.join(src,child);
          organisehelper(childpath,dest);
          //console.log(childpath);

       }
    }
    

}
function files(src){

    let con=fs.lstatSync(src).isFile();
    return con;

}

module.exports={
    organise:organisefn
}