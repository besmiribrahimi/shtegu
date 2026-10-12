import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Layers, 
  X, 
  Loader2, 
  Compass
} from 'lucide-react';
import { 
  GEOAPIFY_API_KEY, 
  DEFAULT_COORDINATES, 
  MAP_STYLES, 
  getTileLayerUrl, 
  searchAddress 
} from '../services/geoapifyService';

export default function GeoapifyMap({
  spots = [],
  selectedSpot = null,
  onSelectSpot = () => {},
  userLocation = { lat: 42.6593, lon: 21.1561 }, // Simulated driver in Pejton
  compact = false,
  height = '100%',
  lang = 'sq'
}) {
  const isSq = lang === 'sq';
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersLayerRef = useRef(null);
  const routeLineRef = useRef(null);
  const userMarkerRef = useRef(null);
  const searchMarkerRef = useRef(null);

  const [activeStyle, setActiveStyle] = useState(MAP_STYLES.DARK_YELLOW);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [destinationInfo, setDestinationInfo] = useState(null);

  // Initialize Leaflet Map
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    if (container._leaflet_id) {
      container._leaflet_id = null;
    }

    const map = L.map(container, {
      center: [DEFAULT_COORDINATES.lat, DEFAULT_COORDINATES.lon],
      zoom: compact ? 16 : 17,
      zoomControl: !compact,
      attributionControl: false
    });

    if (!compact) {
      L.control.zoom({ position: 'bottomright' }).addTo(map);
    }

    // Add Attribution
    L.control.attribution({
      position: 'bottomleft',
      prefix: false
    }).addAttribution(
      '<a href="https://www.geoapify.com/" target="_blank" rel="noopener" style="color: #8F96A3; text-decoration:none;">Geoapify</a> | <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener" style="color: #8F96A3; text-decoration:none;">© OpenStreetMap</a>'
    ).addTo(map);

    // Initial Tile Layer
    const tileUrl = getTileLayerUrl(MAP_STYLES.DARK_YELLOW);
    const tileLayer = L.tileLayer(tileUrl, {
      maxZoom: 20,
      subdomains: ['maps', 'maps'],
      apiKey: GEOAPIFY_API_KEY
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (container) {
        container._leaflet_id = null;
      }
    };
  }, [compact]);

  // Update Tile Layer when style changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    const newTileLayer = L.tileLayer(getTileLayerUrl(activeStyle), {
      maxZoom: 20,
      apiKey: GEOAPIFY_API_KEY
    }).addTo(mapInstanceRef.current);
    tileLayerRef.current = newTileLayer;
  }, [activeStyle]);

  // Render User Driver Marker
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation) return;

    if (userMarkerRef.current) {
      mapInstanceRef.current.removeLayer(userMarkerRef.current);
    }

    const driverIcon = L.divIcon({
      className: 'custom-driver-marker',
      html: `
        <div style="
          width: 34px; 
          height: 34px; 
          background: #2563EB; 
          border: 2.5px solid #FFFFFF; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          box-shadow: 0 0 15px rgba(37,99,235,0.7);
          position: relative;
        ">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
            <circle cx="7" cy="17" r="2"/>
            <path d="M9 17h6"/>
            <circle cx="17" cy="17" r="2"/>
          </svg>
          <div style="
            position: absolute;
            inset: -6px;
            border-radius: 50%;
            border: 2px solid #3B82F6;
            animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
            opacity: 0.7;
          "></div>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const marker = L.marker([userLocation.lat, userLocation.lon], { icon: driverIcon }).addTo(mapInstanceRef.current);
    marker.bindTooltip(isSq ? 'Pozicioni Juaj (Vetura)' : 'Your Location (Vehicle)', {
      direction: 'top',
      offset: [0, -16],
      className: 'leaflet-tooltip-dark'
    });
    userMarkerRef.current = marker;
  }, [userLocation, isSq]);

  // Render Parking Spot Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    markersLayerRef.current.clearLayers();

    spots.forEach(spot => {
      const isSelected = selectedSpot?.id === spot.id;
      const isFree = spot.isAvailable;

      const bgColor = isSelected ? '#FFB703' : (isFree ? '#10B981' : '#EF4444');
      const textColor = isSelected ? '#000000' : '#FFFFFF';
      const borderColor = isSelected ? '#FFFFFF' : (isFree ? '#047857' : '#991B1B');

      const spotIcon = L.divIcon({
        className: 'custom-spot-marker',
        html: `
          <div style="
            transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
            transition: transform 0.2s ease;
            cursor: pointer;
            filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));
          ">
            <div style="
              background: ${bgColor};
              color: ${textColor};
              border: 2px solid ${borderColor};
              border-radius: 20px;
              padding: 3px 8px;
              font-family: 'JetBrains Mono', monospace;
              font-size: 11px;
              font-weight: 800;
              display: flex;
              align-items: center;
              gap: 4px;
              white-space: nowrap;
              box-shadow: ${isSelected ? '0 0 16px rgba(255, 183, 3, 0.9)' : 'none'};
            ">
              <span>${spot.code.replace('Vendi ', '')}</span>
              <span style="
                background: ${isSelected ? '#000000' : 'rgba(0,0,0,0.25)'};
                color: ${isSelected ? '#FFB703' : '#FFFFFF'};
                border-radius: 4px;
                padding: 1px 4px;
                font-size: 9.5px;
              ">
                ${isFree ? (spot.rate || '€1.00') : (isSq ? 'ZËNË' : 'BUSY')}
              </span>
            </div>
            <div style="
              width: 0; 
              height: 0; 
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 6px solid ${bgColor};
              margin: 0 auto;
            "></div>
          </div>
        `,
        iconSize: [60, 32],
        iconAnchor: [30, 32]
      });

      const marker = L.marker([spot.lat, spot.lon], { icon: spotIcon });
      
      marker.on('click', () => {
        onSelectSpot(spot);
      });

      const popupContent = `
        <div style="font-family: 'Inter', sans-serif; color: #FFFFFF; min-width: 170px;">
          <div style="font-weight: 800; font-size: 13.5px; margin-bottom: 2px; color: ${isFree ? '#10B981' : '#EF4444'}">
            ${spot.code} — ${isFree ? (isSq ? 'I LIRË' : 'AVAILABLE') : (isSq ? 'I ZËNË' : 'OCCUPIED')}
          </div>
          <div style="font-size: 11px; color: #94A3B8; margin-bottom: 6px;">
            ${spot.address}
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace;">
            <span>Tarifa: <strong style="color: #FFB703">${spot.rate || '€1.00/h'}</strong></span>
            <span>Distanca: <strong>${spot.walk || '45m'}</strong></span>
          </div>
          <div style="font-size: 10px; color: #64748B; font-family: 'JetBrains Mono', monospace; margin-bottom: 8px;">
            BLE Beacon: ${spot.hardwareId || 'DN-0892'}
          </div>
          ${isFree ? `
            <button 
              id="btn-select-spot-${spot.id}"
              style="
                width: 100%;
                background: #FFB703;
                color: #000000;
                border: none;
                padding: 6px 10px;
                border-radius: 6px;
                font-weight: 800;
                font-size: 11.5px;
                cursor: pointer;
              "
            >
              ${isSq ? 'Zgjidh Vendin & Ule Krahun' : 'Select Spot & Lower Barrier'}
            </button>
          ` : ''}
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'leaflet-dark-popup',
        offset: [0, -28]
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-select-spot-${spot.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectSpot(spot);
            marker.closePopup();
          };
        }
      });

      markersLayerRef.current.addLayer(marker);
    });
  }, [spots, selectedSpot, onSelectSpot, isSq]);

  // Draw route connecting User to Selected Spot
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (routeLineRef.current) {
      mapInstanceRef.current.removeLayer(routeLineRef.current);
      routeLineRef.current = null;
    }

    if (selectedSpot && userLocation) {
      const latlngs = [
        [userLocation.lat, userLocation.lon],
        [selectedSpot.lat, selectedSpot.lon]
      ];

      const polyline = L.polyline(latlngs, {
        color: '#FFB703',
        weight: 3.5,
        opacity: 0.85,
        dashArray: '6, 8',
        lineCap: 'round'
      }).addTo(mapInstanceRef.current);

      routeLineRef.current = polyline;

      // Smoothly pan to show both or center on spot
      mapInstanceRef.current.panTo([selectedSpot.lat, selectedSpot.lon], { animate: true, duration: 0.8 });
    }
  }, [selectedSpot, userLocation]);

  // Handle Geocode Address Search
  const handleSearchSubmit = useCallback(async (queryText) => {
    const text = queryText || searchQuery;
    if (!text || text.trim().length === 0) return;

    setIsSearching(true);
    setShowSearchDropdown(true);

    try {
      const results = await searchAddress(text, {
        biasLat: DEFAULT_COORDINATES.lat,
        biasLon: DEFAULT_COORDINATES.lon,
        lang: isSq ? 'sq' : 'en'
      });
      setSearchResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, isSq]);

  // Fly map to a searched location
  const handleSelectSearchResult = (result) => {
    setShowSearchDropdown(false);
    setSearchQuery(result.formatted);
    setDestinationInfo(result);

    if (!mapInstanceRef.current) return;

    mapInstanceRef.current.flyTo([result.lat, result.lon], 16, {
      duration: 1.2
    });

    // Remove previous search marker
    if (searchMarkerRef.current) {
      mapInstanceRef.current.removeLayer(searchMarkerRef.current);
    }

    const searchIcon = L.divIcon({
      className: 'custom-search-marker',
      html: `
        <div style="
          width: 32px; 
          height: 32px; 
          background: #EC4899; 
          border: 2px solid #FFFFFF; 
          border-radius: 50% 50% 50% 0; 
          transform: rotate(-45deg); 
          display: flex; 
          align-items: center; 
          justify-content: center;
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.6);
        ">
          <div style="
            width: 10px; 
            height: 10px; 
            background: #FFFFFF; 
            border-radius: 50%;
          "></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    });

    const marker = L.marker([result.lat, result.lon], { icon: searchIcon }).addTo(mapInstanceRef.current);
    marker.bindTooltip(result.formatted, {
      direction: 'top',
      offset: [0, -28],
      className: 'leaflet-tooltip-dark'
    }).openTooltip();

    searchMarkerRef.current = marker;
  };

  const handleResetToPejton = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([DEFAULT_COORDINATES.lat, DEFAULT_COORDINATES.lon], 16, {
      duration: 0.8
    });
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: height,
      minHeight: compact ? '220px' : '360px',
      background: '#0B0B0D',
      overflow: 'hidden',
      borderRadius: compact ? '16px' : '18px',
      border: '1px solid #1F222A'
    }}>
      {/* Actual Leaflet Container */}
      <div 
        ref={mapContainerRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          zIndex: 1
        }} 
      />

      {/* Floating Header / Search Overlay */}
      <div style={{
        position: 'absolute',
        top: compact ? '10px' : '14px',
        left: compact ? '10px' : '16px',
        right: compact ? '10px' : '16px',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxWidth: compact ? '100%' : '440px',
          pointerEvents: 'auto'
        }}>
          {/* Search Bar Input */}
          <div style={{
            background: 'rgba(11, 11, 13, 0.92)',
            backdropFilter: 'blur(12px)',
            border: '1px solid #282C37',
            borderRadius: '12px',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}>
            <Search size={16} color="#FFB703" style={{ flexShrink: 0 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length > 2) {
                  handleSearchSubmit(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
              placeholder={isSq ? "Kërko adresë (Geoapify)..." : "Search destination via Geoapify..."}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                fontSize: compact ? '12px' : '13px',
                outline: 'none',
                fontFamily: 'var(--font-sans)'
              }}
            />

            {isSearching ? (
              <Loader2 size={15} color="#FFB703" className="animate-spin" />
            ) : searchQuery ? (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  setShowSearchDropdown(false);
                  if (searchMarkerRef.current && mapInstanceRef.current) {
                    mapInstanceRef.current.removeLayer(searchMarkerRef.current);
                    searchMarkerRef.current = null;
                  }
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8F96A3',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex'
                }}
              >
                <X size={14} />
              </button>
            ) : null}

            <span style={{
              background: 'rgba(255, 183, 3, 0.15)',
              color: '#FFB703',
              fontSize: '9px',
              fontFamily: 'var(--font-mono)',
              fontWeight: '800',
              padding: '2px 6px',
              borderRadius: '4px',
              whiteSpace: 'nowrap'
            }}>
              GEOAPIFY
            </span>
          </div>

          {/* Search Dropdown Results */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div style={{
              background: '#16181D',
              border: '1px solid #282C37',
              borderRadius: '10px',
              padding: '6px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.7)',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {searchResults.map((res) => (
                <div
                  key={res.id}
                  onClick={() => handleSelectSearchResult(res)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'start',
                    gap: '8px',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1F222A'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <MapPin size={14} color="#FFB703" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#FFFFFF' }}>
                      {res.addressLine1 || res.formatted}
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#8F96A3' }}>
                      {res.addressLine2 || res.city || res.country}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Preset Quick Chips */}
          {!compact && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { label: 'Pejton, Prishtinë', q: 'Pejton, Pristina' },
                { label: 'Teatri ODA', q: 'Teatri ODA, Pristina' },
                { label: '38 Upper Montagu St (UK)', q: '38 Upper Montagu Street, Westminster' }
              ].map(chip => (
                <button
                  key={chip.label}
                  onClick={() => {
                    setSearchQuery(chip.q);
                    handleSearchSubmit(chip.q);
                  }}
                  style={{
                    background: 'rgba(22, 24, 29, 0.85)',
                    border: '1px solid #282C37',
                    color: '#8F96A3',
                    fontSize: '10.5px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Navigation size={10} color="#FFB703" />
                  {chip.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Left Controls: Pejton Reset & Layer Switcher */}
      <div style={{
        position: 'absolute',
        bottom: compact ? '8px' : '16px',
        right: compact ? '8px' : '16px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        {/* Reset Pejton Center Button */}
        <button
          onClick={handleResetToPejton}
          title={isSq ? "Qendëro në Korridorin Pejton" : "Center on Pejton Corridor"}
          style={{
            background: 'rgba(11, 11, 13, 0.85)',
            border: '1px solid #282C37',
            color: '#FFFFFF',
            width: compact ? '32px' : '36px',
            height: compact ? '32px' : '36px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
          }}
        >
          <Compass size={16} color="#FFB703" />
        </button>

        {/* Map Style Toggle: Dark Yellow vs Bright OSM */}
        <button
          onClick={() => {
            setActiveStyle(prev => 
              prev === MAP_STYLES.DARK_YELLOW ? MAP_STYLES.BRIGHT_SMOOTH : MAP_STYLES.DARK_YELLOW
            );
          }}
          title={isSq ? "Ndrysho Stilin e Hartës" : "Toggle Map Style"}
          style={{
            background: 'rgba(11, 11, 13, 0.85)',
            border: '1px solid #282C37',
            color: '#FFFFFF',
            width: compact ? '32px' : '36px',
            height: compact ? '32px' : '36px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
          }}
        >
          <Layers size={16} color="#10B981" />
        </button>
      </div>

      {/* Floating Bottom Status Pill */}
      <div style={{
        position: 'absolute',
        bottom: compact ? '8px' : '16px',
        left: compact ? '8px' : '16px',
        zIndex: 10,
        background: 'rgba(11, 11, 13, 0.88)',
        backdropFilter: 'blur(10px)',
        border: '1px solid #282C37',
        borderRadius: '8px',
        padding: compact ? '4px 8px' : '6px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: compact ? '10px' : '11.5px',
        fontFamily: 'var(--font-mono)'
      }}>
        <div style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          background: '#10B981',
          boxShadow: '0 0 8px #10B981'
        }}></div>
        <span style={{ color: '#8F96A3' }}>
          {destinationInfo ? (isSq ? `Destinacioni: ${destinationInfo.addressLine1 || destinationInfo.formatted}` : `Destination: ${destinationInfo.addressLine1 || destinationInfo.formatted}`) : (selectedSpot ? `${selectedSpot.code} (${selectedSpot.walk || '45m'})` : (isSq ? 'Pejton: 2 vende të lira' : 'Pejton: 2 stalls available'))}
        </span>
      </div>

      {/* Custom Styles for Leaflet inside component */}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .leaflet-dark-popup .leaflet-popup-content-wrapper {
          background: #16181D;
          border: 1px solid #282C37;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.7);
        }
        .leaflet-dark-popup .leaflet-popup-tip {
          background: #16181D;
        }
        .leaflet-tooltip-dark {
          background: #16181D;
          border: 1px solid #282C37;
          color: #FFFFFF;
          border-radius: 6px;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}
