import { BlitzPage, Link, Image } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRecoilState } from 'recoil'
import { LatLang } from 'utils/globalState'

const icon = L.icon({ iconUrl: "/images/logos/marker-icon.png" });

const MapView: BlitzPage = () => {
  const [center, setCenter] = useRecoilState<any>(LatLang)
  const [mapState, setMapState] = useState(false)
  useEffect(() => {
    setMapState(true)
  })
  if (!mapState) {
    return null
  }
  return (
    <Map center={center} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={center} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  )
}

MapView.suppressFirstRenderFlicker = true
MapView.getLayout = page => <Layout title='Map'>{page}</Layout>

export default MapView
