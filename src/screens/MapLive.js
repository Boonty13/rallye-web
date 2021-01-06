import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import socketIOClient from "socket.io-client";

import ModalMapLive from '../components/ModalMapLive'
import { serverUrl } from '../tools/globalVariables'

const socket = socketIOClient(serverUrl);

function MapLive(props) {

  props.changeScreen('Suivi en direct')

  const [vehiculeToDisplay, setVehiculeToDisplay] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleFavorites, setVisibleFavorites] = useState(false);
  const [modalShow, setModalShow] = useState(true);

  useEffect(() => {
    socket.on('sendPositionToAll', (msg) => {
      setVehiculeToDisplay(msg.allPosition)
    })

    if (props.userInfos.token === undefined) {
      setVisibleLogin(!visibleLogin);
    } else if (props.userFavorites.length === 0) {
      setVisibleFavorites(!visibleFavorites);
    }
  }, []);

  ///// Update the marker list to display if favorites changes /////
  useEffect(() => {
    const favList = props.userFavorites.map(fav => fav.car_id);
    setUserFavorites(favList);
  }, [props.userFavorites]);

  ///// Filter the teams to display with favorites of the user connected /////
  const displayWithFavorite = vehiculeToDisplay.filter(car => userFavorites.includes(car.idVehicule));

  ///// Build the array of marker /////
  const markerVehicules = displayWithFavorite.map((car, i) => {
    return <Marker position={[car.lat, car.long]}>
      <Popup>#{car.idVehicule.toString()}</Popup>
    </Marker>
  })

  return (
    <MapContainer style={{ height: '100vh' }} center={[48.847648, 2.274218]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userFavorites.length === 0 ?
        <ModalMapLive show={modalShow} onHide={() => setModalShow(false)} text='Ajouter des favoris pour les suivre en direct sur la carte' />
        : ''}

      {props.userInfos.email == null ?
        <ModalMapLive show={modalShow} onHide={() => setModalShow(false)} text='Connectez vous pour accéder à cette fonctionnalité' />
        : ''}

      {markerVehicules}
    </MapContainer>
  );
}

// Redux functions
function mapDispatchToProps(dispatch) {
  return {
    changeScreen: function (screen) {
      dispatch({ type: 'changeScreen', screen })
    }
  }
}

function mapStateToProps(state) {
  return {
    userFavorites: state.userFavorites,
    userInfos: state.userInfos
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapLive);
