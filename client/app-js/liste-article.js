// Some Global Variable 
let myArticle = []


// LOAD CATALOGUE FROM TXT FILE
readTextCatalogue('app-js/myFileC.txt')

const JScatalogue = readCatalogue("Catalogue")

// Liste des insignes choisis par le client

// Liste déroulante avec les noms des insignes (update)
const updateListObject = function(catalogueList){
    selectList = document.querySelector("#whishlistInput")
    catalogueList.forEach(function(element,index){
        let opt = document.createElement("option")
        opt.textContent = element.nom
        opt.value = element.nom
        selectList.appendChild(opt)
    })
}
updateListObject(Xcatalogue)



// Détail de l'insigne en fonction du choix de la liste déroulante
inputName = document.querySelector("#whishlistInput").addEventListener('input',function(){
    itemPrice = document.querySelector("#priceInput")
    inputName = document.querySelector("#whishlistInput")
    itemPrice.value = 2
    catalogue.forEach(function(element){
        if(element.nom === inputName.value){
            itemPrice.value = element.prix
        }
    })
    
})


// Ajout d'une nouvelle commande
const addArticleButton = document.querySelector("button#addArticleButton")
addArticleButton.addEventListener("click",function(event){
    nomArticle = document.querySelector("#whishlistInput").value
    prixArticle = document.querySelector("#priceInput").value
    quantiteArticle = document.querySelector("#quantityInput").value
    articleAlreadyExist = false
    myArticle.forEach(function(element,index){
        if(element.nom === nomArticle){
            element.quantite += parseInt(quantiteArticle)
            articleAlreadyExist = true
        }
        else{

        }
    })
    if(articleAlreadyExist){

    }
    else{
        monArticle = {
            nom:nomArticle,
            prix:prixArticle,
            quantite:parseInt(quantiteArticle)
        }
        myArticle.push(monArticle)
    }
       
    renderArticle(myArticle)


})



let sumArticle = 0
let sumArticlePrice = 0


// Display du récap de tous les articles
const updateRecapWhishlist = function(){   
    sumArticle =0
    sumArticlePrice = 0
    myArticle.forEach(function(item){
        sumArticle += item.quantite
        sumArticlePrice+=item.quantite*item.prix
    })
    recap = document.querySelector("#MonRecapArticle")
    
    if(recap.firstChild){
        const recapParagraph = document.createElement('p',)
        recapParagraph.textContent = `Nombre total d'article : ${sumArticle} pour un total de ${sumArticlePrice.toFixed(2)} €`
        recapParagraph.setAttribute('id','Articles-whishlist-resume')
        recap.replaceChild(recapParagraph,recap.firstChild)
    }
    else{
        const recapParagraph = document.createElement('p',)
        recapParagraph.textContent = `Nombre total d'article : ${sumArticle} pour un total de ${sumArticlePrice.toFixed(2)} €`
        recapParagraph.setAttribute('id','Articles-whishlist-resume')
        recap.appendChild(recapParagraph)
    }
}


// Display de la liste des articles 
const renderArticle = function(articleList){
    removeAllChild("#MesArticles-whishlist")
    
    articleList.forEach(function(element,index){

        // Creation d'un DIv englobant les éléments de chaque article
        const newDiv = document.createElement('div')
        newDiv.setAttribute("class","articleDiv")
        newDiv.setAttribute("id",`${element.nom}`)
        parity = (index % 2 )

        styleAttr = "border:3px solid #002d47; background-color:white" //"background-color:" + articleColor[parity]
        newDiv.setAttribute("style",styleAttr) 


        // Creation d'un boutton pour retirer l'article
        const newButton = document.createElement('button')
        newButton.setAttribute("id",`${element.nom}`)
        newButton.setAttribute("class","articleDeleteButton float-right")
        newButton.textContent = "Retirer l'article"

        // Creation du détail de l'article (nom, prix, quantité)
        const newParagraph = document.createElement('p')
        newParagraph.textContent = `${element.nom} (${element.prix}€/pcs) : x${element.quantite}`;
        newParagraph.setAttribute("class","WhishListElement")
        newParagraph.setAttribute("id",`${element.nom}`)

        // Espace entre le button et le p
        const spanObj = document.createElement("span")
        spanObj.setAttribute("class","articleSpaceBetween")

        // Ajotu des éléments au Div
        newDiv.appendChild(newParagraph)
        newDiv.appendChild(spanObj)
        newDiv.appendChild(newButton)

        // Ajout du Div a MesArticles-whishlist
        document.querySelector('#MesArticles-whishlist').appendChild(newDiv)

        return true
        
    })
    deleteArticleButtonList = document.querySelectorAll(".articleDeleteButton")
    deleteArticleButtonList.forEach(function(buttonX){
    buttonX.addEventListener("click",function(event){
        deleteArticle(event)
    })
})
    updateRecapWhishlist()
}

renderArticle(myArticle)



// When the "Confirmer la commande" button is pressed
document.getElementById('confirmerButton').addEventListener('click',function(event) {
    
    const commandeEnvoyeParagraph = document.createElement("p")
    commandeEnvoyeParagraph.textContent = "Commande enregistrée. Merci !"
    USERNAME = "UserCatalogue"

    storeUserArticles(myArticle,USERNAME)

    oldList = document.getElementById("MesArticles-whishlist")
    let parentDiv = oldList.parentNode
    parentDiv.replaceChild(commandeEnvoyeParagraph,oldList)

    suppressButton = document.querySelector("button#SupprimerCommandeButton")
    if(suppressButton.parentNode){
        suppressButton.parentNode.removeChild(suppressButton)
    }
    confirmerButton = document.querySelector("#confirmerButton")
    if(confirmerButton.parentNode){
        returnButton = document.createElement("button")
        returnButton.textContent = "Retour"
        returnButton.setAttribute("id","returnButton")
        confirmerButton.parentNode.removeChild(confirmerButton)
    }   
} )


// Retirer le Dernier Article

document.getElementById("SupprimerCommandeButton").addEventListener("click",function(event){
    myArticle.pop()
    removeAllChild("#MesArticles-whishlist")
    renderArticle(myArticle)
    return true
})

// Retirer l'Article associé au button

const deleteArticle = function(event){
    articleName = event.target.id
    console.log("PRESSED")
    console.log(articleName)

    myArticle.forEach(function(element,index){
        if(element.nom === articleName){
                myArticle.splice(index,1)
        }
    })
    removeAllChild("#MesArticles-whishlist")
    renderArticle(myArticle)
    return true
}

