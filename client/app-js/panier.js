/* Display la liste des articles de l'utilisateur */

userPanier = readCatalogue("UserCatalogue")
catalogueInfo = readCatalogue("CatalogueInfo")

/* Create DivArchitecture function
Create a article Div containing the image of the article, the name of the article and the quantite 
commanded.
Input:
    @nomArticles : name of the article object;
    @Quantites : quantite of the article objects commanded;
    @images : image path of the article;
Output:
    @article : the article div 
    */
const createDivArchitecture = function(nomArticles,Quantites,images){

    // Create article div
    article = document.createElement("div")
    article.setAttribute("class","article")

    // Create Image Div
    imDIv = document.createElement("div")
    imDIv.setAttribute("class","imDiv")

    //Create and add image to Image div
    image = document.createElement("img")
    image.setAttribute("src", images)
    image.setAttribute("class","imgArticle")

    // Create separator
    separator = document.createElement("div")
    separator.setAttribute("class","separator")

    // Create the text container and info 
    txt = document.createElement("div")
    txt.setAttribute("class","txt-container")

    nameX = document.createElement("p")
    nameX.setAttribute("id","nom")
    nameX.textContent = nomArticles

    quantitie = document.createElement("p")
    quantitie.setAttribute("id","quantite")
    quantitie.textContent = "Quantité commandée : " + Quantites


    //puttin all together
    txt.appendChild(nameX)
    txt.appendChild(quantitie)

    imDIv.appendChild(image)

    article.appendChild(imDIv)
    article.appendChild(separator)
    article.appendChild(txt)

    return article

}


/* CreatUserCat:
Build the html display for one command giving an userlist containing a list of commanded object
and the date-time of the command.
Input:
    @userList : the list of commanded object ending by the date-time string

Output:
    @Command-html: an html element for one command
*/
const createUserCat = function(userList,color){
    listLength = userList.length;
    Allcommand = document.createElement("div")

    userCommandTimeP(userList,Allcommand)
    itemCount = 0;
    shortList = userList.slice(0,listLength-1)
    shortList.forEach(function(item,index){

        image_src = findImage(item,catalogueInfo)
        if((itemCount === 0)){
        wrapper = document.createElement("div")
        wrapper.setAttribute("class","wrapper")
        articleDiv = createDivArchitecture(item.nom,item.quantite,image_src)
        wrapper.appendChild(articleDiv)
        }
        else if ((itemCount % 3) === 0){
            Allcommand.appendChild(wrapper)
            wrapper = document.createElement("div")
            wrapper.setAttribute("class","wrapper")
            articleDiv = createDivArchitecture(item.nom,item.quantite,image_src)
            wrapper.appendChild(articleDiv)
        }
        else{
            articleDiv = createDivArchitecture(item.nom,item.quantite,image_src)
            wrapper.appendChild(articleDiv)
        }
        itemCount += 1;
        if(index === listLength -2){
            Allcommand.appendChild(wrapper)
        }


    })
    Allcommand.setAttribute("style","padding: 15px 0px; background-color:" + color)
    return Allcommand
}



/* userCommandTimeP :
Append a paragraph html-element with the date-time of the command in it
to the AllCommand main div.

Input:
    @userList : the userList for one command

*/
const userCommandTimeP = function(userList,Allcommand){
    const now = userList[userList.length-1]
    txt = document.createElement("h2")
    txt.setAttribute("class","commande")
    txt.textContent = "Commande effectuée le "
    txt.textContent += now

    txtdiv = document.createElement("div")
    txtdiv.appendChild(txt)
    Allcommand.appendChild(txtdiv)
}


/*¨findImage
Return the image path of an item from the catalogue
Input :
    @item : Command item object;
    @CatalogueInf : the catalogue to search in
Output:
    @imagePath : the image path of the given item obejct;

    */
const findImage = function(item,catalogueInf){
    image_src = ""
    for(ind=0;ind<catalogueInf.length;ind++){
        e = catalogueInf[ind]
        if(e.nom.trim() === item.nom.trim()){
            image_src = e.image_src
            break;
        }
        else{

        }
    }
    return image_src
}
/*
Allcommand = document.querySelector(".AllCommands")

while(Allcommand.firstChild){
    Allcommand.removeChild(Allcommand.firstChild)
}
*/
colorI = true;
userPanier.forEach(function(item){
    if(colorI){
        color = "rgba(0, 45, 71, 1)";
        colorI = false;
    }
    else{
        color = "#005485";
        colorI = true;
    }
    Cdiv = createUserCat(item,color)
    document.querySelector(".AllCommands").appendChild(Cdiv)
})