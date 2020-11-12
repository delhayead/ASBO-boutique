


/* function textFileToCatalogue
read the text catalogue fileand return a list of object with each object
having a name (nom de l'insigne), a description (description de l'insigne)
et un filepath pour l'image de l'insigne. Pour la description, faire des saut 
à la ligne avec le caractère ;.
    @filename (string) : fichier .txt avec les variables


*/


const readTextCatalogue = function(filename){
    catalogueInfo = []
    fetch(filename)
    .then(response => response.text())
    .then(data => {
        // Do something with your data
        lines = data.split("\n")
        lines.forEach(function(e,i){
            if(i>0){
                attr = e.split(",")
                newItem = {
                    nom:attr[0],
                    description:attr[2],
                    image_src:attr[3]
                }
                catalogueInfo.push(newItem)
            }
        })
        console.log(catalogueInfo)
    storeCatalogue(catalogueInfo,"CatalogueInfo")


    });
}

/* StoreCatalogue function :
    Sauve une donnée de type catalogue dans la mémoire locale du browser
    Input :
        @catalogue : (Array) le catalogue sous forme de Array
        @refCatalogue : (String) le nom de référence de l'object catalogue

    Output :
        @ None
    


*/
const storeCatalogue = function(catalogue,refCatalogue){
    const listJSON = JSON.stringify(catalogue)
    localStorage.setItem(refCatalogue,listJSON)
}



/* readCatalogue function :
Read the catalogue from the local storage and return it as a list of article object
Input:
    @catalogueRef (string) : name of the catalogue ref in the local storage. See function storeCatalogue.

Output : 
    @Catalogue : (Array) Catalogue List.



*/
const readCatalogue = function(catalogueRef){
    
    const JScatalogue = localStorage.getItem(catalogueRef)
    if(JScatalogue !== null){
        Xcatalogue = JSON.parse(JScatalogue)
        return Xcatalogue
    }
    else{
        console.log("!! Catalogue in local storage is emptyCheck if .txt file exist and his ok")
        return null
    }

}


const createDiv = function(myclass){
        
    // le Div
    const Div = document.createElement("div")
    Div.setAttribute("class",myclass)

    return Div

}


const createImage = function(src,alt,imageClass){
    Image = document.createElement("img")
    Image.setAttribute("src",src)
    Image.setAttribute("alt",alt)
    Image.setAttribute("class",imageClass)

    return Image
}

const createDescription = function(nom,description,classTxt){
    const overlay = document.createElement("div")
    overlay.setAttribute("class",classTxt)
    myTxt = "<strong>" + nom + "</strong>"


    descriptionL = description.split(";")
    
    if(descriptionL.length > 1){
        descriptionL.forEach(function(item){
            myTxt += "<br>"
            myTxt += item
        })
        
    }
    else{
        myTxt += "<br>"
        myTxt += description
    }
    
    overlay.innerHTML += myTxt
    return overlay

}

const createImageElement = function(Container,image,overlay){
    let Element = Container
    Element.appendChild(image)
    Element.appendChild(overlay)
    return Element

}