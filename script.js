const ImageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

//function used variables
let CurrentPhotoArray = [];
let AllLoaded = false;
let NeedToGrabImages = 0;
let ImageLoadedNumber = 0;

// the Unsplash API set
const Initialcount = 5;
const APIKEY = "O6pWEIicFDqroOzuo3_xv8cu342Rc-FsV-GWQqRddg0";
let APIURL = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${Initialcount}`;

/////Short Functions!///////////////////////////////////////////////////////
const setEachImageAttributes = function(element,attributes){
    for( const key in attributes){
        element.setAttribute(key,attributes[key]);
    };
};

const LoadAllDone = function(){
    AllLoaded = true;
    loader.hidden = true;
    let pagecount = 30;
    APIURL = `https://api.unsplash.com/photos/random/?client_id=${APIKEY}&count=${pagecount}`;
}

const ImageLoadCondition = function () {
    ImageLoadedNumber++;
    if (ImageLoadedNumber === NeedToGrabImages) {LoadAllDone();}
};

/////////Main Funtions!////////////////////////////////////////////////////////

// The Starter here!
async function getPhotos(){
    try{
        const response = await fetch(APIURL);
        CurrentPhotoArray = await response.json(); //await for thw Promise to resolve
        displayPhotos()
    }
    catch(e){
        console.log(e)
    };
};

//Display Each Photo on page
const displayPhotos = function(){
    ImageLoadedNumber = 0;
    NeedToGrabImages = CurrentPhotoArray.length;
    CurrentPhotoArray.forEach((photo) => {
      // Create an a tag for each photo
      const item = document.createElement("a");
      setEachImageAttributes(item, {
        href: photo.links.html,
        target: "_blank",
      });
      //Create the photos itself
      const img = document.createElement("img");
      setEachImageAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      });

      //Add event when the image is loaded
      img.addEventListener("load", ImageLoadCondition);
      //organize the a and img in ImageContainer
      item.appendChild(img);
      ImageContainer.appendChild(item);
    });
};

//When We want to scroll for more photos
 window.addEventListener("scroll", () => {
   if (
     window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
     AllLoaded
   ) {
     AllLoaded = false;
     getPhotos();
   }
 });




////////////////////////////////////////////////////////////////////////////////



//initiate
getPhotos();