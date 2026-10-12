import '../models/spot_model.dart';

/// Geoapify Mapping & Geocoding Service for Shtegu Flutter App
class GeoapifyService {
  /// Project Geoapify API Key
  static const String apiKey = 'c8878e4857d34392a4ba89fc327116f6';

  /// Default center coordinates: Pejton Innovation Corridor, Prishtinë
  static const double defaultLat = 42.6598;
  static const double defaultLon = 21.1565;

  /// Generates a high-contrast Geoapify Static Map image URL with live parking markers
  static String getStaticMapUrl({
    double lat = defaultLat,
    double lon = defaultLon,
    int zoom = 16,
    int width = 600,
    int height = 320,
    String style = 'dark-matter-yellow-roads',
    List<ParkingSpot>? spots,
  }) {
    String url =
        'https://maps.geoapify.com/v1/staticmap?style=$style&width=$width&height=$height&center=lonlat:$lon,$lat&zoom=$zoom&apiKey=$apiKey';

    if (spots != null && spots.isNotEmpty) {
      final markers = spots.map((s) {
        final color = s.isAvailable ? '%2310b981' : '%23ef4444';
        final text = s.id.replaceAll('P', '');
        return 'lonlat:${s.lon},${s.lat};color:$color;size:medium;text:$text';
      }).join('|');
      url += '&marker=$markers';
    }

    return url;
  }

  /// Builds a REST Geocode Search endpoint URL for address autocompletion
  /// Endpoint: https://api.geoapify.com/v1/geocode/search
  static String getGeocodeSearchUrl(String address) {
    return 'https://api.geoapify.com/v1/geocode/search?text=${Uri.encodeComponent(address)}&apiKey=$apiKey';
  }
}
