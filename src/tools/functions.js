
//// Formating name for display with only the first letter of firsname ////
function namePilot(firstName, lastName) {
  if (typeof firstName === "string" && typeof lastName === "string") {
      return (firstName[0].toUpperCase() + '. ' + lastName.toUpperCase())
  } else {
      return ""
  }
}

//// Formating name for display ////
function fullNamePilot(firstName, lastName) {
  if (typeof firstName === "string" && typeof lastName === "string") {
      return (firstName[0].toUpperCase() + firstName.substring(1) + ' ' + lastName.toUpperCase())
  } else {
      return ""
  }
}

//// Return a flag url depending of nationnality ////
function flagNationality(nationality) {
  if (nationality === 'fra') {
      return urlFlagFRA
  } else if (nationality === 'che') {
      return urlFlagCHE
  } else {
      return urlFlagWorld
  }
}

export {namePilot, fullNamePilot, flagNationality}