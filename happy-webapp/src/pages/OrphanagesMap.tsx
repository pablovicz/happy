import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg'

import '../styles/global.css';
import '../styles/pages/orphanage-map.css';
import api from '../services/api';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,

    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})


interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string
}


function OrphanagesMap() {


    // State = é qualquer tipo de informação que eui queira armazenar dentro do componente,
    ///ou que meu componente vai alterar
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {

        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });

    }, []);



    return (

        <div id="page-map">
            <aside>
                <header>
                    <Link to="">
                        <img src={mapMarkerImg} alt="Happy" />
                    </Link>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Curitiba</strong>
                    <span>Paraná</span>
                </footer>

            </aside>

            <Map
                center={[-25.4246372, -49.2700887]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            position={[orphanage.latitude, orphanage.longitude]}
                            icon={mapIcon}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>

                        </Marker>
                    );
                })}
            </Map>

            <Link to="/orphanage/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>

        </div>
    );
}

export default OrphanagesMap;