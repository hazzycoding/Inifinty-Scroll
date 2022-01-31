const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
let ready = false
let imageLoaded = 0
let totalImages = 0
let photosArray = []
const count = 30
const apiKey = 'M0ADeGf8CStWS2WRsDOpCzl1xeROxeJTkGGlWSKJM-o'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&
count=${count}`

function imageLoader() {
  imageLoaded++
  if (imageLoaded === totalImages) {
    ready = true
    loader.hidden = true
  }
}

function displayPhotos() {
  imageLoaded = 0
  totalImages = photosArray.length
  photosArray.forEach((photo) => {
    const item = document.createElement('a')
    item.setAttribute('href', photo.links.html)
    item.setAttribute('target', '_blank')
    const img = document.createElement('img')
    img.setAttribute('src', photo.urls.regular)
    img.setAttribute('alt', photo.alt_decription)
    img.setAttribute('title', photo.alt_decription)

    img.addEventListener('load', imageLoader)

    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    displayPhotos()
  } catch (error) {}
}

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false
    getPhotos()
  }
})

//on load
getPhotos()
