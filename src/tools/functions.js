import {urlFlagCHE, urlFlagFRA, urlFlagWorld, serverUrl} from './globalVariables'

//// Formating name for display with only the first letter of firsname ////
export function namePilot(firstName, lastName) {
  if (typeof firstName === "string" && typeof lastName === "string") {
      return (firstName[0].toUpperCase() + '. ' + lastName.toUpperCase())
  } else {
      return ""
  }
}

//// Formating name for display ////
export function fullNamePilot(firstName, lastName) {
  if (typeof firstName === "string" && typeof lastName === "string") {
      return (firstName[0].toUpperCase() + firstName.substring(1) + ' ' + lastName.toUpperCase())
  } else {
      return ""
  }
}

//// Return a flag url depending of nationnality ////
export function flagNationality(nationality) {
  if (nationality === 'fra') {
      return urlFlagFRA
  } else if (nationality === 'che') {
      return urlFlagCHE
  } else {
      return urlFlagWorld
  }
}


//// Formating a date wiith hour and minute for display ////
export function schedule(dateString) {
  let hours = new Date(dateString).getHours();
  let minutes = new Date(dateString).getMinutes()
  if (hours.toString().length === 1) {
      hours = '0' + hours
  }
  if (minutes.toString().length === 1) {
      minutes = '0' + minutes
  }
  return (hours + ':' + minutes)
}


//// Getting data in local storage if existing ////

// export const getData = async () => {

//   try {
//       const value = localStorage.getItem('token')
//       if (value !== null) {
//           const rawAnswer = await fetch(`${serverUrl}/user/get-user?token=${value}`, {
//               method: 'GET',
//           });
//           const answer = await rawAnswer.json();
//           return answer
//       }
//   } catch (e) {
//       console.log('ERROR', e);
//   }
// }

// //// Store data in local storage /////
// export const storeData = (dataToken, dataStatus) => {

//   try {
//       localStorage.setItem('token', dataToken)
//   } catch (e) {
//       // saving error
//       console.log('ERROR', e);
//   }

//   try {
//       localStorage.setItem('status', dataStatus)
//   } catch (e) {
//       // saving error
//       console.log('ERROR', e);
//   }
// }

// export {namePilot, fullNamePilot, flagNationality}