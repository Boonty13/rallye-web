export default function (userFavorites = [], action) {

  if (action.type === 'addFavoriteTeam') {
      let newFavorites = [...userFavorites];
      newFavorites.push(action.numTeam);
      return newFavorites

  } else if (action.type === 'removeFavoriteTeam') {

      const filteredFav = userFavorites.filter(fav => fav._id !== action.numTeam);

      return filteredFav

  } else if (action.type === 'retrieveFavoriteTeam') {
      return action.listFavorites
  } else {
      return userFavorites
  }
}