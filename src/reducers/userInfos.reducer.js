export default function (userInfos = {}, action) {

  if (action.type === 'record') {
    console.log(action.user)
      return {
          token: action.user.token,
          status: action.user.status,
          firstName: action.user.firstname,
          lastName: action.user.name,
          email: action.user.email,
          avatar: action.user.avatar,
          nationality: action.user.nationality
      };

  } else if (action.type === 'reset') {
      return {}

  } else if (action.type === 'changeAvatar') {
      let updatedUser = { ...userInfos };
      updatedUser.avatar = action.url;
      return updatedUser

  } else {
      return userInfos;
  }
}