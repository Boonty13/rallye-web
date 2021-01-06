// Functions to be used in development

import { urlFlagCHE, urlFlagFRA, urlFlagWorld } from './globalVariables'

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
