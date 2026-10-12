import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:flutter_blue_plus/flutter_blue_plus.dart';

class BleLogEntry {
  final DateTime timestamp;
  final String direction; // 'TX', 'RX', or 'SYS'
  final String message;
  final List<int>? rawBytes;

  BleLogEntry({
    required this.timestamp,
    required this.direction,
    required this.message,
    this.rawBytes,
  });

  String get formattedHex {
    if (rawBytes == null) return message;
    return rawBytes!
        .map((b) => b.toRadixString(16).padLeft(2, '0').toUpperCase())
        .join(' ');
  }
}

class DiscoveredBarrier {
  final String name;
  final String id;
  final int rssi;
  final bool isConnected;
  final BluetoothDevice? device;

  DiscoveredBarrier({
    required this.name,
    required this.id,
    required this.rssi,
    this.isConnected = false,
    this.device,
  });
}

class BleService extends ChangeNotifier {
  static const String nordicServiceUuid = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
  static const String nordicTxUuid = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"; // Write
  static const String nordicRxUuid = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"; // Notify/Read

  bool _isMockMode = true;
  bool get isMockMode => _isMockMode;

  bool _isScanning = false;
  bool get isScanning => _isScanning;

  bool _isConnected = false;
  bool get isConnected => _isConnected;

  String? _connectedDeviceId;
  String? get connectedDeviceId => _connectedDeviceId;

  final List<BleLogEntry> _logs = [];
  List<BleLogEntry> get logs => List.unmodifiable(_logs);

  final List<DiscoveredBarrier> _devices = [];
  List<DiscoveredBarrier> get devices => List.unmodifiable(_devices);

  BluetoothDevice? _activeDevice;
  BluetoothCharacteristic? _txChar;
  BluetoothCharacteristic? _rxChar;
  StreamSubscription? _scanSub;
  StreamSubscription? _rxSub;

  BleService() {
    addLog("SYS", "Shtegu BLE Engine i inicializuar. NUS UUID: 6E400001-...");
    if (_isMockMode) {
      _loadMockDevices();
    }
  }

  void toggleMockMode(bool val) {
    _isMockMode = val;
    addLog("SYS", val ? "Aktivizuar: Simulo pa Hardware (Mock ON)" : "Aktivizuar: Hardware Real BLE (Mock OFF)");
    if (val) {
      _loadMockDevices();
    } else {
      _devices.clear();
    }
    notifyListeners();
  }

  void _loadMockDevices() {
    _devices.clear();
    _devices.addAll([
      DiscoveredBarrier(
        name: "SHTEGU-DN-0892",
        id: "C4:4F:33:08:92:A1",
        rssi: -58,
      ),
      DiscoveredBarrier(
        name: "SHTEGU-DN-1440",
        id: "D1:22:98:14:40:B9",
        rssi: -72,
      ),
      DiscoveredBarrier(
        name: "SHTEGU-DN-0118",
        id: "FA:88:51:01:18:C4",
        rssi: -84,
      ),
    ]);
    notifyListeners();
  }

  void addLog(String direction, String message, [List<int>? rawBytes]) {
    _logs.add(BleLogEntry(
      timestamp: DateTime.now(),
      direction: direction,
      message: message,
      rawBytes: rawBytes,
    ));
    // Keep last 150 logs
    if (_logs.length > 150) {
      _logs.removeAt(0);
    }
    notifyListeners();
  }

  void clearLogs() {
    _logs.clear();
    addLog("SYS", "Terminali i pastruar.");
  }

  Future<void> startScan() async {
    if (_isScanning) return;
    _isScanning = true;
    notifyListeners();

    addLog("SYS", "Filloi skanimi i pajisjeve BLE për Nordic UART...");

    if (_isMockMode) {
      await Future.delayed(const Duration(milliseconds: 1200));
      _loadMockDevices();
      _isScanning = false;
      addLog("SYS", "Skanimi përfundoi. U gjetën ${_devices.length} barriera Shtegu.");
      notifyListeners();
      return;
    }

    try {
      _devices.clear();
      notifyListeners();

      await FlutterBluePlus.startScan(
        timeout: const Duration(seconds: 6),
        withServices: [Guid(nordicServiceUuid)],
      );

      _scanSub = FlutterBluePlus.scanResults.listen((results) {
        for (ScanResult r in results) {
          final name = r.device.platformName.isNotEmpty ? r.device.platformName : "Shtegu Smart Barrier";
          final idx = _devices.indexWhere((d) => d.id == r.device.remoteId.str);
          if (idx == -1) {
            _devices.add(DiscoveredBarrier(
              name: name,
              id: r.device.remoteId.str,
              rssi: r.rssi,
              device: r.device,
            ));
          } else {
            _devices[idx] = DiscoveredBarrier(
              name: name,
              id: r.device.remoteId.str,
              rssi: r.rssi,
              device: r.device,
            );
          }
        }
        notifyListeners();
      });

      await Future.delayed(const Duration(seconds: 6));
      _isScanning = false;
      addLog("SYS", "Skanimi real përfundoi. Gjetur: ${_devices.length} pajisje.");
      notifyListeners();
    } catch (e) {
      _isScanning = false;
      addLog("SYS", "Gabim në skanim: $e");
      notifyListeners();
    }
  }

  Future<void> stopScan() async {
    _isScanning = false;
    if (!_isMockMode) {
      await FlutterBluePlus.stopScan();
      _scanSub?.cancel();
    }
    addLog("SYS", "Skanimi u ndërpre.");
    notifyListeners();
  }

  Future<void> connect(String deviceId) async {
    addLog("SYS", "Duke u lidhur me pajisjen: $deviceId...");

    if (_isMockMode) {
      await Future.delayed(const Duration(milliseconds: 800));
      _isConnected = true;
      _connectedDeviceId = deviceId;
      addLog("SYS", "Lidhja u krye me sukses (GATT NUS Connected).");
      // Simulate unencrypted health beacon received
      Future.delayed(const Duration(milliseconds: 500), () {
        final mockBeacon = [0x01, 0x90, 0x00]; // Rev 1, Battery 9, Occupancy 0 (Vacant), Arm Up
        addLog("RX", "Beacon Telemetrik: Batt: 90% | Vendi: I LIRË | Krahu: NALT", mockBeacon);
      });
      notifyListeners();
      return;
    }

    try {
      final dev = _devices.firstWhere((d) => d.id == deviceId).device;
      if (dev == null) return;
      _activeDevice = dev;
      await dev.connect(timeout: const Duration(seconds: 8));

      final services = await dev.discoverServices();
      for (var s in services) {
        if (s.uuid.toString().toUpperCase() == nordicServiceUuid.toUpperCase()) {
          for (var c in s.characteristics) {
            if (c.uuid.toString().toUpperCase() == nordicTxUuid.toUpperCase()) {
              _txChar = c;
            } else if (c.uuid.toString().toUpperCase() == nordicRxUuid.toUpperCase()) {
              _rxChar = c;
              await _rxChar!.setNotifyValue(true);
              _rxSub = _rxChar!.onValueReceived.listen((bytes) {
                addLog("RX", "Përgjigje nga barriera (${bytes.length} bajta)", bytes);
              });
            }
          }
        }
      }

      _isConnected = true;
      _connectedDeviceId = deviceId;
      addLog("SYS", "Nordic UART Service u lidh me sukses.");
      notifyListeners();
    } catch (e) {
      _isConnected = false;
      addLog("SYS", "Lidhja dështoi: $e");
      notifyListeners();
    }
  }

  Future<void> disconnect() async {
    if (_isMockMode) {
      _isConnected = false;
      _connectedDeviceId = null;
      addLog("SYS", "Pajisja u shkëput.");
      notifyListeners();
      return;
    }

    try {
      _rxSub?.cancel();
      await _activeDevice?.disconnect();
      _isConnected = false;
      _connectedDeviceId = null;
      _activeDevice = null;
      _txChar = null;
      _rxChar = null;
      addLog("SYS", "Pajisja reale u shkëput.");
      notifyListeners();
    } catch (e) {
      addLog("SYS", "Gabim gjatë shkëputjes: $e");
    }
  }

  // 20-Byte Payload Constructor
  // Format:
  // STX: [0x44, 0x44, 0x54, 0x43] ("DDTC")
  // Length: [0x14, 0xFF]
  // Command: [0x14, commandByte] (0x01 Drop, 0x02 Raise, 0x03 Auto-Raise)
  // Key: 4-Byte MAC-derived key
  // Reserved: 7 bytes [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
  // ETX: 0x45
  // BCC: XOR checksum of previous 18 bytes
  // Isolation: 0x0A
  List<int> build20BytePayload(int commandByte, [List<int>? customKey]) {
    final key = customKey ?? [0xA1, 0xB2, 0xC3, 0xD4];
    final packet = List<int>.filled(20, 0);

    // Header
    packet[0] = 0x44; // 'D'
    packet[1] = 0x44; // 'D'
    packet[2] = 0x54; // 'T'
    packet[3] = 0x43; // 'C'
    packet[4] = 0x14; // Length 20
    packet[5] = 0xFF; // Frame marker
    packet[6] = 0x14; // Cmd category
    packet[7] = commandByte; // 0x01 Drop, 0x02 Raise, 0x03 Auto-Raise

    // 4-byte key
    packet[8] = key[0];
    packet[9] = key[1];
    packet[10] = key[2];
    packet[11] = key[3];

    // Reserved padding
    packet[12] = 0x00;
    packet[13] = 0x00;
    packet[14] = 0x00;
    packet[15] = 0x00;
    packet[16] = 0x00;
    packet[17] = 0x45; // ETX delimiter

    // Calculate BCC (XOR of bytes 0 to 17)
    int bcc = 0;
    for (int i = 0; i <= 17; i++) {
      bcc ^= packet[i];
    }
    packet[18] = bcc;
    packet[19] = 0x0A; // Line feed isolation

    return packet;
  }

  Future<bool> sendCommand(int commandByte, String cmdName) async {
    final payload = build20BytePayload(commandByte);
    addLog("TX", "Dërgim: $cmdName (Cmd: 0x${commandByte.toRadixString(16).padLeft(2, '0').toUpperCase()})", payload);

    if (_isMockMode) {
      await Future.delayed(const Duration(milliseconds: 600));
      // Simulate RX acknowledgement receipt
      final rxAck = [0x44, 0x44, 0x54, 0x43, 0x03, commandByte, 0x90, 0x45, 0x22, 0x0A];
      addLog("RX", "Konfirmim i suksesshëm: Krahu ekzekutoi komandën (Status 0x03).", rxAck);
      return true;
    }

    try {
      if (_txChar == null) {
        addLog("SYS", "Gabim: Karakteristika TX nuk është gati.");
        return false;
      }
      await _txChar!.write(payload, withoutResponse: false);
      addLog("SYS", "Korniza u shkrua në GATT TX.");
      return true;
    } catch (e) {
      addLog("SYS", "Dështim në dërgim: $e");
      return false;
    }
  }
}
