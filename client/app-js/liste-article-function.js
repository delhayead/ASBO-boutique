/* Recueil des function pour loader et enregister des information depuis l'app-web*/

/* StoreCatalogue function :
    Sauve une donnée de type catalogue dans la mémoire locale du browser
    Input :
        @catalogue : (Array) le catalogue sous forme de Array
        @refCatalogue : (String) le nom de référence de l'object catalogue

    Output :
        @ None
    


*/
const storeCatalogue = function(catalogue,refCatalogue){
    const listJASON = JSON.stringify(catalogue)
    localStorage.setItem(refCatalogue,listJASON)
}

/* storeUserArticles function :
    Sauve une donnée de type liste d'article dans la mémoire locale du browser
    Input :
        @catalogue : (Array) le catalogue sous forme de Array
        @refCatalogue : (String) le nom de référence de l'object panier d'article du client

    Output :
        @ None
    


*/


const addCommandToCatalogue = function(commande,catRef){
    let catalogue = readCatalogue(catRef)
    if(catalogue === null){
        newCatalogue = []
        newCatalogue.push(commande)
        storeCatalogue(commande,carRef)
    }
}



const storeUserArticles = function(userArticles,username){
    time =  moment().format("D MMMM YYYY H:mm")
    userArticles.push(time)
    let catalogue = readCatalogue(username)
    if(catalogue === null){
        catalogue = []
        catalogue.push(userArticles)
    }
    else{
        catalogue.push(userArticles)
    }
    
    const listJASON = JSON.stringify(catalogue)
    localStorage.setItem(username,listJASON)
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


/* readTextCatalogue function :
    A partir d'un fichier txt au format (nom,prix), créer un Array contenant un objet par insigne/produit du fichier.
    Stock ensuite sous forme du catalogue dans la mémoire locale du browser.
    Input :
        @filename : (string) le chemin d'accèe au fichier .txt

    Output :
        @ None
    


*/

const readTextCatalogue = function(filename){
    catalogue = []
    fetch(filename)
    .then(response => response.text())
    .then(data => {
        // Do something with your data
        lines = data.split("\n")
        lines.forEach(function(e,i){
            if(i>0){
                attr = e.split(",")
                newArticle = {
                    nom:attr[0],
                    prix:parseFloat(attr[1])
                }
                catalogue.push(newArticle)
            }
        })
    storeCatalogue(catalogue,"Catalogue")


    });
}

/* removeAllChild function :
 Retire tous les child d'un élément spécifié
 Input :
    @id : (string) l'ID du noeud parent


*/
const removeAllChild = function(id){
    whishlist = document.querySelector(id)
    while(whishlist.firstChild){
        whishlist.removeChild(whishlist.firstChild)
    }
}


const setUsername = function(inputUsername){
    document.querySelector(inputUsername).addEventListener("input",function(e){
        username = e.target.value
        console.log(username)
        return username
    })
    
}
