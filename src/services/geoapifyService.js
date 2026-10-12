/**
 * Geoapify Mapping & Geocoding Service for Shtegu IoT Network
 * API Key configured from project setup
 */

export const GEOAPIFY_API_KEY = 'c8878e4857d34392a4ba89fc327116f6';

export const DEFAULT_COORDINATES = {
  // Pejton Innovation Corridor, Prishtinë
  lat: 42.6598,
  lon: 21.1565,
  zoom: 16
};

// Available Geoapify Tile Layer Styles
export const MAP_STYLES = {
  DARK_YELLOW: 'dark-matter-yellow-roads', // Matches Shtegu high-contrast yellow & dark theme
  DARK_GREY: 'dark-matter-dark-grey',
  BRIGHT_SMOOTH: 'osm-bright-smooth',
  LIBERTY: 'osm-liberty',
  POSITRON: 'positron'
};

/**
 * Perform Geocoding Search using Geoapify
 * Service endpoint: https://api.geoapify.com/v1/geocode/search
 * @param {string} text - Search address / query (e.g., "Pejton Prishtine" or "38 Upper Montagu Street, Westminster")
 * @param {object} options - Optional filters (limit, bias, lang)
 * @returns {Promise<Array>} Array of parsed place objects
 */
export async function searchAddress(text, options = {}) {
  if (!text || text.trim().length === 0) return [];

  const limit = options.limit || 5;
  const lang = options.lang || 'en';
  
  // Base endpoint
  let url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(text.trim())}&apiKey=${GEOAPIFY_API_KEY}&limit=${limit}&lang=${lang}`;

  // If bias coordinates are provided, prioritize results nearby
  if (options.biasLat && options.biasLon) {
    url += `&bias=proximity:${options.biasLon},${options.biasLat}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Geoapify geocoding error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    
    if (!data.features || !Array.isArray(data.features)) {
      return [];
    }

    return data.features.map(f => {
      const props = f.properties || {};
      const coords = f.geometry && f.geometry.coordinates ? f.geometry.coordinates : [0, 0];
      return {
        id: props.place_id || `${coords[1]}_${coords[0]}`,
        formatted: props.formatted || props.name || text,
        addressLine1: props.address_line1 || props.name || '',
        addressLine2: props.address_line2 || props.city || '',
        city: props.city || props.municipality || '',
        country: props.country || '',
        postcode: props.postcode || '',
        lat: coords[1],
        lon: coords[0],
        rank: props.rank?.confidence || 0,
        raw: props
      };
    });
  } catch (err) {
    console.error('Geoapify searchAddress failed:', err);
    return [];
  }
}

/**
 * Reverse geocode a latitude and longitude into a readable address
 * @param {number} lat 
 * @param {number} lon 
 * @returns {Promise<object|null>}
 */
export async function reverseGeocode(lat, lon) {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${GEOAPIFY_API_KEY}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Reverse geocoding error: ${res.status}`);
    const data = await res.json();
    if (data.features && data.features.length > 0) {
      const props = data.features[0].properties;
      return {
        formatted: props.formatted,
        addressLine1: props.address_line1,
        addressLine2: props.address_line2,
        city: props.city
      };
    }
    return null;
  } catch (err) {
    console.error('Geoapify reverseGeocode failed:', err);
    return null;
  }
}

/**
 * Get Leaflet tile layer URL template
 * @param {string} style 
 * @param {boolean} retina 
 * @returns {string}
 */
export function getTileLayerUrl(style = MAP_STYLES.DARK_YELLOW, retina = false) {
  return `https://maps.geoapify.com/v1/tile/${style}/{z}/{x}/{y}${retina ? '@2x' : ''}.png?apiKey=${GEOAPIFY_API_KEY}`;
}

/**
 * Generate a static map image URL
 * @param {object} params 
 * @returns {string}
 */
export function getStaticMapUrl({
  lat = DEFAULT_COORDINATES.lat,
  lon = DEFAULT_COORDINATES.lon,
  zoom = 16,
  width = 600,
  height = 400,
  style = MAP_STYLES.DARK_YELLOW,
  markers = []
}) {
  let url = `https://maps.geoapify.com/v1/staticmap?style=${style}&width=${width}&height=${height}&center=lonlat:${lon},${lat}&zoom=${zoom}&apiKey=${GEOAPIFY_API_KEY}`;
  
  if (markers.length > 0) {
    const markerStrings = markers.map(m => {
      // marker format: lonlat:lon,lat;color:rgb;size:medium;text:1
      const color = encodeURIComponent(m.color || '#FFB703');
      const size = m.size || 'medium';
      const text = m.text ? `;text:${encodeURIComponent(m.text)}` : '';
      return `lonlat:${m.lon},${m.lat};color:${color};size:${size}${text}`;
    });
    url += `&marker=${markerStrings.join('|')}`;
  }

  return url;
}
