
// load and read the catalogue with nom, description and image
maListeArticle = readTextCatalogue("app-js/myFileC.txt")
monCatalogue = readCatalogue("CatalogueInfo")


//On display 5 insigne/ ligne
let lineCount = 0;
const displayCatalogue = function(catalogueList,rowsize){

    catalogueList.forEach(function(item,index){
        console.log(lineCount)

        if(item.description === undefined){
            mosaic = document.querySelector(".mosaic")
            mosaic.appendChild(lineDiv)
            lineCount = 0;
        }
        else if((lineCount % rowsize) === 0){
            lineDiv = createDiv("LineContainer")

            container = createDiv("container")

            image = createImage(item.image_src,item.nom,"image")

            descript = createDescription(item.nom,item.description,"overlay")


            currentElem = createImageElement(container,image,descript)

            lineDiv.appendChild(currentElem)
            lineCount += 1
        }
        else{
            container = createDiv("container")

            image = createImage(item.image_src,item.nom,"image")

            descript = createDescription(item.nom,item.description,"overlay")


            currentElem = createImageElement(container,image,descript)

            lineDiv.appendChild(currentElem)
            lineCount += 1

        }
        if(lineCount === rowsize){
            mosaic = document.querySelector(".mosaic")
            mosaic.appendChild(lineDiv)
            lineCount = 0;
        }

    })
}

displayCatalogue(monCatalogue,5)