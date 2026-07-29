import heroBgImage from '../img/image.png'
import s1BgImage from '../img/s1.png'
import s2BgImage from '../img/s2.jpg'
import s3BgImage from '../img/s3.jpg'
import demo1Img from '../img/demo_1.png'
import demo2Img from '../img/demo_2.png'
import demo3Img from '../img/demo_3.png'
import wallpaperImg from '../img/wallpaper2.jpg'

import finderImg from '../img/finder.png'
import launchpadImg from '../img/launchpad.png'
import chatgptImg from '../img/chatgpt.png'
import claudeImg from '../img/claude.png'
import safariImg from '../img/safari.png'
import messagesImg from '../img/messages.png'
import mailImg from '../img/mail.png'
import mapsImg from '../img/maps.png'
import photosImg from '../img/photos.png'
import musicImg from '../img/music.png'
import podcastsImg from '../img/podcasts.png'
import appletvImg from '../img/tv.png'
import appstoreImg from '../img/appstore.png'
import notesImg from '../img/notes.png'
import vscodeImg from '../img/vscode.png'
import settingsImg from '../img/settings.png'
import steamImg from '../img/steam.png'

export const ALL_SITE_IMAGES = {
  hero: heroBgImage,
  s1: s1BgImage,
  s2: s2BgImage,
  s3: s3BgImage,
  demo1: demo1Img,
  demo2: demo2Img,
  demo3: demo3Img,
  wallpaper: wallpaperImg,
  dockIcons: [
    finderImg, launchpadImg, chatgptImg, claudeImg, safariImg,
    messagesImg, mailImg, mapsImg, photosImg, musicImg,
    podcastsImg, appletvImg, appstoreImg, notesImg, vscodeImg,
    settingsImg, steamImg
  ]
}

/**
 * Preload all site images as soon as the site loads.
 * Priority 1: Hero image (image.png) loads FIRST & fastest.
 * Priority 2: Sequence & demo preview images.
 * Priority 3: macOS wallpaper & dock icons.
 */
export function preloadSiteImages() {
  if (typeof window === 'undefined') return

  // 1. FIRST IMAGE (Hero background) loaded fastest with high priority
  const heroImage = new Image()
  if ('fetchPriority' in heroImage) {
    heroImage.fetchPriority = 'high'
  }
  heroImage.src = ALL_SITE_IMAGES.hero

  // 2. Preload remaining sequence slides
  const sequenceImages = [
    ALL_SITE_IMAGES.s1,
    ALL_SITE_IMAGES.s2,
    ALL_SITE_IMAGES.s3,
    ALL_SITE_IMAGES.demo1,
    ALL_SITE_IMAGES.demo2,
    ALL_SITE_IMAGES.demo3
  ]

  sequenceImages.forEach(src => {
    const img = new Image()
    img.src = src
  })

  // 3. Preload macOS VOS Wallpaper & Dock Icons so demo opens instantly
  const vosImages = [
    ALL_SITE_IMAGES.wallpaper,
    ...ALL_SITE_IMAGES.dockIcons
  ]

  vosImages.forEach(src => {
    const img = new Image()
    img.src = src
  })
}

/**
 * Preloads all site assets (hero, sequence slides, wallpaper, dock icons)
 * and returns a promise that resolves when all images AND document readyState complete.
 */
export function preloadAllSiteAssets(onProgress) {
  if (typeof window === 'undefined') return Promise.resolve()

  const allSrcs = [
    ALL_SITE_IMAGES.hero,
    ALL_SITE_IMAGES.s1,
    ALL_SITE_IMAGES.s2,
    ALL_SITE_IMAGES.s3,
    ALL_SITE_IMAGES.demo1,
    ALL_SITE_IMAGES.demo2,
    ALL_SITE_IMAGES.demo3,
    ALL_SITE_IMAGES.wallpaper,
    ...ALL_SITE_IMAGES.dockIcons
  ]

  let loadedCount = 0
  const total = allSrcs.length

  const imagePromises = allSrcs.map(src => {
    return new Promise(resolve => {
      const img = new Image()
      if (src === ALL_SITE_IMAGES.hero && 'fetchPriority' in img) {
        img.fetchPriority = 'high'
      }
      img.onload = img.onerror = () => {
        loadedCount++
        if (onProgress) onProgress(loadedCount / total)
        resolve()
      }
      img.src = src
    })
  })

  // Also wait for window load event if document isn't ready
  const windowLoadPromise = new Promise(resolve => {
    if (document.readyState === 'complete') {
      resolve()
    } else {
      window.addEventListener('load', resolve, { once: true })
    }
  })

  // Maximum 4.5 second safety fallback to ensure page displays even under slow connection
  const safetyTimeout = new Promise(resolve => setTimeout(resolve, 4500))

  return Promise.race([
    Promise.all([...imagePromises, windowLoadPromise]),
    safetyTimeout
  ])
}

