class ParkingSpot {
  final String id;
  final String code;
  final String address;
  bool isAvailable;
  final double ratePerHour;
  final int walkDistanceMeters;
  final String hardwareId;
  final String macAddress;
  final double lat;
  final double lon;

  ParkingSpot({
    required this.id,
    required this.code,
    required this.address,
    required this.isAvailable,
    this.ratePerHour = 1.00,
    required this.walkDistanceMeters,
    required this.hardwareId,
    required this.macAddress,
    this.lat = 42.6598,
    this.lon = 21.1565,
  });
}

