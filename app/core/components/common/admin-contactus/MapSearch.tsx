import { BlitzPage, Link, Image } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Search from 'react-leaflet-search'
import { LatLng } from 'leaflet'
import { useRecoilState } from 'recoil'
import { LatLang } from '../../utils/globalState'

const icon = L.icon({ iconUrl: '/images/logos/marker-icon.png' })

function customPopup (SearchInfo: any) {
  return (
    <Popup>
      <div>
        <p>I am a custom popUp</p>
        <p>
          latitude and longitude from search component:{' '}
          {SearchInfo.latLng.toString().replace(',', ' , ')}
        </p>
        <p>Info from search component: {SearchInfo.info}</p>
        <p>
          {SearchInfo.raw && SearchInfo.raw.place_id && JSON.stringify(SearchInfo.raw.place_id)}
        </p>
      </div>
    </Popup>
  )
}

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
      <Search
        // customProvider={this.provider}
        onChange={info => {
          console.log('FROM onChange: ', info)
          let lat = info.latLng.lat
          let lang = info.latLng.lng
          setCenter([lat, lang])
        }}
        position='topleft'
        inputPlaceholder='Custom placeholder'
        // search={this.state.search}
        showMarker={false}
        zoom={7}
        closeResultsOnClick={true}
        openSearchOnLoad={false}
        // these searchbounds would limit results to only Turkey.
        providerOptions={{
          searchBounds: [
            new LatLng(33.100745405144245, 46.48315429687501),
            new LatLng(44.55916341529184, 24.510498046875)
          ],
          region: 'tr'
        }}

        // default provider OpenStreetMap
        // provider="BingMap"
        // providerKey="AhkdlcKxeOnNCJ1wRIPmrOXLxtEHDvuWUZhiT4GYfWgfxLthOYXs5lUMqWjQmc27"
      >
        {info => <Marker position={info?.latLng}>{customPopup(info)}</Marker>}
      </Search>
    </Map>
  )
}

MapView.suppressFirstRenderFlicker = true
MapView.getLayout = page => <Layout title='Map'>{page}</Layout>

export default MapView
