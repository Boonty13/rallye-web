export default function (screenName = 'Accueil', action) {

    if (action.type === 'changeScreen') {
        return action.screen
    } else {
        return screenName
    }
}