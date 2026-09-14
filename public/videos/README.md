# Dossier des vidéos d'arrière-plan

Placez votre vidéo de fond ici avec le nom `background-video.mp4`

## Recommandations pour la vidéo :

- **Format** : MP4 (recommandé pour la compatibilité)
- **Durée** : 10-30 secondes (la vidéo sera en boucle)
- **Résolution** : 1920x1080 ou plus pour une qualité optimale
- **Taille** : Essayer de garder sous 10-15 MB pour un chargement rapide
- **Contenu** : Images appropriées pour votre plateforme de dons (nature, communauté, solidarité, etc.)
- **Transition** : Assurez-vous que le début et la fin de la vidéo se fondent bien pour une boucle fluide

## Où trouver des vidéos gratuites :

- **Pexels** : https://www.pexels.com/videos/
- **Pixabay** : https://pixabay.com/videos/
- **Coverr** : https://coverr.co/

## Personnalisation :

Pour changer la vidéo ou l'opacité de l'overlay, modifiez les paramètres dans `src/pages/Home.jsx` :

```jsx
<VideoBackground 
  videoSrc="/videos/votre-video.mp4"  // Changez le nom de la vidéo
  overlayOpacity={0.6}                // Ajustez l'opacité (0.0 à 1.0)
/>
```
