import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/spot_model.dart';
import '../services/ble_service.dart';
import '../services/geoapify_service.dart';
import '../theme/app_theme.dart';

class DriverView extends StatefulWidget {
  const DriverView({super.key});

  @override
  State<DriverView> createState() => _DriverViewState();
}

class _DriverViewState extends State<DriverView> {
  double _walletBalance = 15.00;
  ParkingSpot? _activeSessionSpot;
  Timer? _sessionTimer;
  int _sessionSeconds = 0;

  final List<ParkingSpot> _spots = [
    ParkingSpot(
      id: "P01",
      code: "Vendi P-01",
      address: "Rr. Perandori Justinian (Pejton)",
      isAvailable: true,
      ratePerHour: 1.00,
      walkDistanceMeters: 45,
      hardwareId: "DN-0892",
      macAddress: "C4:4F:33:08:92:A1",
      lat: 42.6601,
      lon: 21.1572,
    ),
    ParkingSpot(
      id: "P02",
      code: "Vendi P-02",
      address: "Rr. Pashko Vasa (Pejton)",
      isAvailable: false,
      ratePerHour: 1.00,
      walkDistanceMeters: 120,
      hardwareId: "DN-1440",
      macAddress: "D1:22:98:14:40:B9",
      lat: 42.6592,
      lon: 21.1558,
    ),
    ParkingSpot(
      id: "P03",
      code: "Vendi P-03",
      address: "Afër Teatrit ODA (Pejton)",
      isAvailable: true,
      ratePerHour: 1.00,
      walkDistanceMeters: 85,
      hardwareId: "DN-0118",
      macAddress: "FA:88:51:01:18:C4",
      lat: 42.6608,
      lon: 21.1582,
    ),
  ];

  @override
  void dispose() {
    _sessionTimer?.cancel();
    super.dispose();
  }

  void _startSessionTimer(ParkingSpot spot) {
    _sessionTimer?.cancel();
    _sessionSeconds = 0;
    _activeSessionSpot = spot;
    spot.isAvailable = false;
    _sessionTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (mounted) {
        setState(() {
          _sessionSeconds++;
        });
      }
    });
  }

  void _stopSession() {
    _sessionTimer?.cancel();
    final cost = ((_sessionSeconds / 3600) * 1.0).clamp(0.20, 5.00);
    setState(() {
      _walletBalance = (_walletBalance - cost).clamp(0.0, 999.0);
      if (_activeSessionSpot != null) {
        _activeSessionSpot!.isAvailable = true;
      }
      _activeSessionSpot = null;
      _sessionSeconds = 0;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: AppTheme.surface,
        content: Text(
          "Seanca e parkimit përfundoi. U zbritën: €${cost.toStringAsFixed(2)}",
          style: const TextStyle(color: AppTheme.accentYellow, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }

  void _openTopUpSheet() {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppTheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) {
        return Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "Mbush Kuletën Digjitale",
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: AppTheme.textPrimary),
              ),
              const SizedBox(height: 8),
              const Text(
                "Zgjidh paketën e parapaguar për të shmangur komisionet e vogla bankare:",
                style: TextStyle(fontSize: 13, color: AppTheme.textMuted),
              ),
              const SizedBox(height: 20),
              Row(
                children: [5.0, 10.0, 15.0].map((amount) {
                  return Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 4.0),
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme.surfaceSubtle,
                          foregroundColor: AppTheme.accentYellow,
                          side: const BorderSide(color: AppTheme.borderLight),
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        onPressed: () {
                          setState(() {
                            _walletBalance += amount;
                          });
                          Navigator.pop(ctx);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              backgroundColor: AppTheme.surface,
                              content: Text(
                                "Kuleta u mbush me sukse: +€${amount.toInt()}.00!",
                                style: const TextStyle(color: AppTheme.statusGreen, fontWeight: FontWeight.bold),
                              ),
                            ),
                          );
                        },
                        child: Text(
                          "+€${amount.toInt()}",
                          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),
              const SizedBox(height: 16),
            ],
          ),
        );
      },
    );
  }

  void _openSpotModal(ParkingSpot spot) {
    if (!spot.isAvailable) return;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppTheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return _SpotBookingSheet(
          spot: spot,
          walletBalance: _walletBalance,
          onDropSuccess: () {
            Navigator.pop(ctx);
            _startSessionTimer(spot);
          },
          onReroute: () {
            Navigator.pop(ctx);
            _rerouteToAlternate();
          },
        );
      },
    );
  }

  void _rerouteToAlternate() {
    final alternate = _spots.firstWhere((s) => s.isAvailable && s != _activeSessionSpot, orElse: () => _spots[0]);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: AppTheme.surface,
        duration: const Duration(seconds: 4),
        content: Text(
          "Rirutim automatik: U zgjodh ${alternate.code} (${alternate.walkDistanceMeters}m larg).",
          style: const TextStyle(color: AppTheme.accentYellow, fontWeight: FontWeight.w600),
        ),
      ),
    );
    _openSpotModal(alternate);
  }

  String _formatSessionTime(int sec) {
    final m = (sec ~/ 60).toString().padLeft(2, '0');
    final s = (sec % 60).toString().padLeft(2, '0');
    return "$m:$s";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Top Bar: Brand + Wallet
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: AppTheme.accentYellow, width: 1.5),
                          image: const DecorationImage(
                            image: AssetImage('assets/images/cat_logo_clean.jpg'),
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text(
                            "SHTEGU",
                            style: TextStyle(
                              fontSize: 19,
                              fontWeight: FontWeight.w900,
                              letterSpacing: -0.5,
                              color: AppTheme.textPrimary,
                            ),
                          ),
                          Text(
                            "Prishtinë • Pejton Pilot",
                            style: TextStyle(fontSize: 11, color: AppTheme.textMuted),
                          ),
                        ],
                      ),
                    ],
                  ),

                  // Wallet Chip
                  InkWell(
                    onTap: _openTopUpSheet,
                    borderRadius: BorderRadius.circular(20),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
                      decoration: BoxDecoration(
                        color: AppTheme.surface,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: AppTheme.borderLight),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.account_balance_wallet, size: 16, color: AppTheme.accentYellow),
                          const SizedBox(width: 6),
                          Text(
                            "€${_walletBalance.toStringAsFixed(2)}",
                            style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 13, color: AppTheme.textPrimary),
                          ),
                          const SizedBox(width: 6),
                          Container(
                            padding: const EdgeInsets.all(2),
                            decoration: const BoxDecoration(
                              shape: BoxShape.circle,
                              color: AppTheme.accentYellow,
                            ),
                            child: const Icon(Icons.add, size: 12, color: Colors.black),
                          )
                        ],
                      ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 22),

              // Active Session Floating Banner (if parking is active)
              if (_activeSessionSpot != null)
                Container(
                  margin: const EdgeInsets.only(bottom: 20),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: AppTheme.surface,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: AppTheme.accentYellow, width: 1.5),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: AppTheme.accentYellow.withOpacity(0.15),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.local_parking, color: AppTheme.accentYellow, size: 26),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "SEANCË AKTIVE: ${_activeSessionSpot!.code}",
                              style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 13, color: AppTheme.accentYellow),
                            ),
                            Text(
                              "Koha: ${_formatSessionTime(_sessionSeconds)}  (€1.00/orë)",
                              style: const TextStyle(fontSize: 12, color: AppTheme.textMuted),
                            ),
                          ],
                        ),
                      ),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme.statusRed,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                        ),
                        onPressed: _stopSession,
                        child: const Text("PËRFUNDO", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11)),
                      ),
                    ],
                  ),
                ),

              // Active Zone Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppTheme.surface,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: AppTheme.borderLight),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: const [
                            Icon(Icons.location_on, color: AppTheme.accentYellow, size: 18),
                            SizedBox(width: 6),
                            Text(
                              "Pejton — Korridori 1",
                              style: TextStyle(fontWeight: FontWeight.w800, fontSize: 15, color: AppTheme.textPrimary),
                            ),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: AppTheme.surfaceSubtle,
                            borderRadius: BorderRadius.circular(6),
                            border: Border.all(color: AppTheme.borderLight),
                          ),
                          child: const Text(
                            "BLE Beacon: AKTIV",
                            style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.statusGreen),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      "Zonë komerciale me frekuencë të lartë. Rezervo dhe ule barrierën menjëherë.",
                      style: TextStyle(fontSize: 12, color: AppTheme.textMuted),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 14),

              // Geoapify Live Map Banner Card
              Container(
                height: 160,
                width: double.infinity,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: AppTheme.borderLight),
                  color: AppTheme.surface,
                ),
                clipBehavior: Clip.antiAlias,
                child: Stack(
                  children: [
                    Positioned.fill(
                      child: Image.network(
                        GeoapifyService.getStaticMapUrl(
                          spots: _spots,
                          width: 600,
                          height: 320,
                        ),
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          return Container(
                            color: AppTheme.surface,
                            child: const Center(
                              child: Icon(Icons.map_outlined, color: AppTheme.accentYellow, size: 36),
                            ),
                          );
                        },
                      ),
                    ),
                    Positioned(
                      top: 10,
                      left: 10,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppTheme.background.withOpacity(0.85),
                          borderRadius: BorderRadius.circular(6),
                          border: Border.all(color: AppTheme.borderLight),
                        ),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.location_on, size: 12, color: AppTheme.accentYellow),
                            SizedBox(width: 4),
                            Text(
                              "Geoapify Live Map: Pejton",
                              style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppTheme.textPrimary),
                            ),
                          ],
                        ),
                      ),
                    ),
                    Positioned(
                      bottom: 10,
                      right: 10,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppTheme.statusGreen.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(6),
                          border: Border.all(color: AppTheme.statusGreen),
                        ),
                        child: const Text(
                          "GPS AKTIV",
                          style: TextStyle(fontSize: 9, fontWeight: FontWeight.bold, color: AppTheme.statusGreen),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 18),
              const Text(
                "VENDET E LIRA TË PARKIMIT",
                style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: AppTheme.textMuted, letterSpacing: 0.8),
              ),
              const SizedBox(height: 10),

              // 3 Simulated Spots
              ..._spots.map((spot) {
                final isFree = spot.isAvailable;
                return Container(
                  margin: const EdgeInsets.only(bottom: 12),
                  decoration: BoxDecoration(
                    color: AppTheme.surface,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: isFree ? AppTheme.borderLight : AppTheme.borderLight.withOpacity(0.5),
                    ),
                  ),
                  child: ListTile(
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                    onTap: isFree ? () => _openSpotModal(spot) : null,
                    leading: Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: isFree ? AppTheme.surfaceSubtle : AppTheme.background,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Icon(
                        Icons.directions_car,
                        color: isFree ? AppTheme.accentYellow : AppTheme.textMuted,
                        size: 22,
                      ),
                    ),
                    title: Text(
                      spot.code,
                      style: TextStyle(
                        fontWeight: FontWeight.w800,
                        fontSize: 14.5,
                        color: isFree ? AppTheme.textPrimary : AppTheme.textMuted,
                      ),
                    ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          spot.address,
                          style: const TextStyle(fontSize: 11.5, color: AppTheme.textMuted),
                        ),
                        const SizedBox(height: 3),
                        Text(
                          "Distanca: ${spot.walkDistanceMeters}m • €${spot.ratePerHour.toStringAsFixed(2)}/orë",
                          style: TextStyle(fontSize: 11, color: isFree ? AppTheme.accentYellow : AppTheme.textMuted),
                        ),
                      ],
                    ),
                    trailing: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                      decoration: BoxDecoration(
                        color: isFree ? AppTheme.statusGreen.withOpacity(0.12) : AppTheme.statusRed.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(
                          color: isFree ? AppTheme.statusGreen : AppTheme.statusRed,
                          width: 1,
                        ),
                      ),
                      child: Text(
                        isFree ? "I LIRË" : "I ZËNË",
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w800,
                          color: isFree ? AppTheme.statusGreen : AppTheme.statusRed,
                        ),
                      ),
                    ),
                  ),
                );
              }),
            ],
          ),
        ),
      ),
    );
  }
}

class _SpotBookingSheet extends StatefulWidget {
  final ParkingSpot spot;
  final double walletBalance;
  final VoidCallback onDropSuccess;
  final VoidCallback onReroute;

  const _SpotBookingSheet({
    required this.spot,
    required this.walletBalance,
    required this.onDropSuccess,
    required this.onReroute,
  });

  @override
  State<_SpotBookingSheet> createState() => _SpotBookingSheetState();
}

class _SpotBookingSheetState extends State<_SpotBookingSheet> {
  // States: 0 = Idle, 1 = Verifying with Cloud, 2 = Sending BLE, 3 = Dropped / Success
  int _stateStep = 0;
  String _statusMessage = "";

  Future<void> _executeDrop() async {
    final ble = Provider.of<BleService>(context, listen: false);

    setState(() {
      _stateStep = 1;
      _statusMessage = "Duke verifikuar çelësin me cloud...";
    });

    await Future.delayed(const Duration(milliseconds: 1000));
    if (!mounted) return;

    setState(() {
      _stateStep = 2;
      _statusMessage = "Duke dërguar komandën BLE (Cmd 0x01)...";
    });

    // Write 20-byte command through BLE service
    await ble.sendCommand(0x01, "Ule Barrierën");

    await Future.delayed(const Duration(milliseconds: 1000));
    if (!mounted) return;

    setState(() {
      _stateStep = 3;
      _statusMessage = "Barriera u ul! Parkim i suksesshëm.";
    });

    await Future.delayed(const Duration(milliseconds: 900));
    if (!mounted) return;
    widget.onDropSuccess();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 20, 20, 30),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                widget.spot.code,
                style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: AppTheme.textPrimary),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppTheme.statusGreen.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(6),
                  border: Border.all(color: AppTheme.statusGreen),
                ),
                child: const Text("I LIRË", style: TextStyle(fontWeight: FontWeight.w800, color: AppTheme.statusGreen, fontSize: 11)),
              )
            ],
          ),
          const SizedBox(height: 4),
          Text(widget.spot.address, style: const TextStyle(color: AppTheme.textMuted, fontSize: 13)),

          const SizedBox(height: 18),
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppTheme.surfaceSubtle,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: AppTheme.borderLight),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Column(
                  children: [
                    const Text("Çmimi", style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                    const SizedBox(height: 2),
                    Text("€${widget.spot.ratePerHour.toStringAsFixed(2)}/orë", style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  ],
                ),
                Container(width: 1, height: 30, color: AppTheme.borderLight),
                Column(
                  children: [
                    const Text("Distanca në Këmbë", style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                    const SizedBox(height: 2),
                    Text("${widget.spot.walkDistanceMeters} metra", style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  ],
                ),
                Container(width: 1, height: 30, color: AppTheme.borderLight),
                Column(
                  children: [
                    const Text("Hardware ID", style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                    const SizedBox(height: 2),
                    Text(widget.spot.hardwareId, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: AppTheme.accentYellow)),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // Animated Progress indicator if action is underway
          if (_stateStep > 0)
            Container(
              margin: const EdgeInsets.only(bottom: 16),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: _stateStep == 3 ? AppTheme.statusGreen.withOpacity(0.15) : AppTheme.accentYellow.withOpacity(0.12),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(
                  color: _stateStep == 3 ? AppTheme.statusGreen : AppTheme.accentYellow,
                ),
              ),
              child: Row(
                children: [
                  if (_stateStep < 3)
                    const SizedBox(
                      width: 18,
                      height: 18,
                      child: CircularProgressIndicator(strokeWidth: 2.2, color: AppTheme.accentYellow),
                    )
                  else
                    const Icon(Icons.check_circle, color: AppTheme.statusGreen, size: 20),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      _statusMessage,
                      style: TextStyle(
                        fontWeight: FontWeight.w700,
                        fontSize: 12.5,
                        color: _stateStep == 3 ? AppTheme.statusGreen : AppTheme.accentYellow,
                      ),
                    ),
                  ),
                ],
              ),
            ),

          // Massive Hazard-Yellow Button: "ULE BARRIERËN"
          SizedBox(
            width: double.infinity,
            height: 54,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.accentYellow,
                foregroundColor: Colors.black,
                elevation: 4,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              onPressed: _stateStep == 0 ? _executeDrop : null,
              child: Text(
                _stateStep == 0 ? "ULE BARRIERËN" : "DUKE EKZEKUTUAR...",
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900, letterSpacing: 0.5),
              ),
            ),
          ),

          const SizedBox(height: 10),

          // Emergency Fallback Button: "Vendi është i zënë? Riruto automatikisht"
          SizedBox(
            width: double.infinity,
            child: TextButton(
              onPressed: _stateStep == 0 ? widget.onReroute : null,
              child: const Text(
                "Vendi është i zënë? Riruto automatikisht",
                style: TextStyle(color: AppTheme.textMuted, fontSize: 12.5, decoration: TextDecoration.underline),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
