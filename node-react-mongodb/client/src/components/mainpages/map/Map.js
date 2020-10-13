import React, { useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import { formatRelative } from 'date-fns'
import { GlobalState } from '../../../GlobalState'

import mapStyles from './mapStyles'
import Filters from '../businesses/Filters'

// Import Bootstrap React Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// import "@reach/combobox/style.css"

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: -37.813629,
  lng: 144.963058
};

const options = {
  styles: mapStyles,
}

export default function Map() {
  const params = useParams()
  const state = useContext(GlobalState)
  const [businesses] = state.businessesAPI.businesses
  const [selected, setSelected] = useState({})

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: ["AIzaSyCz0h7Q7NqPU-Uz9mD4I-jxA0386gaeCBo"],
    libraries,
  });


  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  const onSelect = item => {
    setSelected(item);
  }

  return <Container fluid>
      <Row>
        <Col>
          <Filters />
        </Col>
      </Row>
      <Row>
        <Col>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={center}
            options={options}
          >
            {
              businesses.map(item => {
                return (
                  <Marker key={item.title}
                    position={{ lat: item.lat, lng: item.lng }}
                    onClick={() => onSelect(item)} />
                )
              })
            }
            {
              selected.lat &&
              (
                <InfoWindow
                  position={{ lat: selected.lat, lng: selected.lng }}
                  clickable={true}
                  onCloseClick={() => setSelected({})}
                ><div className="window">
                    <img src={selected.images.url} alt="" />
                    <h2><b>{selected.title}</b></h2>
                    <p><b>Address:</b> {selected.address}</p>
                    <p><b>Price Rate:</b> {selected.price}</p>
                    <button><Link to={`/detail/${selected._id}`}>More Information</Link></button>
                  </div>
                </InfoWindow>
              )
            }

          </GoogleMap>
        </Col>
      </Row>
  </Container>;

}

