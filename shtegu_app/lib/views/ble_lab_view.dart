import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/ble_service.dart';
import '../theme/app_theme.dart';

class BleLabView extends StatefulWidget {
  const BleLabView({super.key});

  @override
  State<BleLabView> createState() => _BleLabViewState();
}

class _BleLabViewState extends State<BleLabView> {
  final ScrollController _logScrollController = ScrollController();

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_logScrollController.hasClients) {
        _logScrollController.animateTo(
          _logScrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  void dispose() {
    _logScrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final ble = Provider.of<BleService>(context);

    // Auto-scroll log when new entries appear
    _scrollToBottom();

    return Scaffold(
      appBar: AppBar(
        title: const Text("LABORATORI BLE & TERMINALI"),
        actions: [
          IconButton(
            icon: const Icon(Icons.delete_sweep, size: 20),
            tooltip: "Pastro Logjet",
            onPressed: () => ble.clearLogs(),
          ),
        ],
      ),
      body: Column(
        children: [
          // Mock Hardware Switch & Status Bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
            color: AppTheme.surface,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(Icons.science, color: AppTheme.accentYellow, size: 18),
                    const SizedBox(width: 8),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          "Simulo pa Hardware",
                          style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13, color: AppTheme.textPrimary),
                        ),
                        Text(
                          ble.isMockMode ? "Modalitet testimi virtual aktiv" : "Kërkon pajisje reale fizike BLE",
                          style: const TextStyle(fontSize: 10.5, color: AppTheme.textMuted),
                        ),
                      ],
                    ),
                  ],
                ),
                Switch(
                  value: ble.isMockMode,
                  activeColor: AppTheme.accentYellow,
                  onChanged: (val) => ble.toggleMockMode(val),
                ),
              ],
            ),
          ),

          const Divider(height: 1, color: AppTheme.borderLight),

          // BLE Scan Control Bar
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(
                      width: 8,
                      height: 8,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: ble.isConnected ? AppTheme.statusGreen : AppTheme.textMuted,
                      ),
                    ),
                    const SizedBox(width: 6),
                    Text(
                      ble.isConnected ? "STATUSI: I LIDHUR (GATT NUS)" : "STATUSI: I SHKËPUTUR",
                      style: TextStyle(
                        fontFamily: 'monospace',
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: ble.isConnected ? AppTheme.statusGreen : AppTheme.textMuted,
                      ),
                    ),
                  ],
                ),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: ble.isScanning ? AppTheme.statusRed : AppTheme.surfaceSubtle,
                    foregroundColor: ble.isScanning ? Colors.white : AppTheme.accentYellow,
                    side: const BorderSide(color: AppTheme.borderLight),
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                  icon: ble.isScanning
                      ? const SizedBox(width: 12, height: 12, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : const Icon(Icons.bluetooth_searching, size: 16),
                  label: Text(
                    ble.isScanning ? "Ndalo" : "Skano Pajisjet",
                    style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                  ),
                  onPressed: () {
                    if (ble.isScanning) {
                      ble.stopScan();
                    } else {
                      ble.startScan();
                    }
                  },
                ),
              ],
            ),
          ),

          // Discovered Devices List
          Container(
            height: 115,
            padding: const EdgeInsets.symmetric(horizontal: 14),
            child: ble.devices.isEmpty
                ? Container(
                    decoration: BoxDecoration(
                      color: AppTheme.surface,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppTheme.borderLight),
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      ble.isScanning ? "Duke kërkuar për barriera BLE..." : "Nuk u gjet asnjë barrierë. Shtyp 'Skano Pajisjet'.",
                      style: const TextStyle(fontSize: 12, color: AppTheme.textMuted),
                    ),
                  )
                : ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: ble.devices.length,
                    itemBuilder: (ctx, i) {
                      final dev = ble.devices[i];
                      final isThisConnected = ble.connectedDeviceId == dev.id;

                      return Container(
                        width: 250,
                        margin: const EdgeInsets.only(right: 10),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: AppTheme.surface,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: isThisConnected ? AppTheme.accentYellow : AppTheme.borderLight,
                            width: isThisConnected ? 1.5 : 1,
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  dev.name,
                                  style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 13, color: AppTheme.textPrimary),
                                ),
                                Text(
                                  "${dev.rssi} dBm",
                                  style: TextStyle(
                                    fontSize: 11,
                                    fontWeight: FontWeight.bold,
                                    color: dev.rssi > -65 ? AppTheme.statusGreen : AppTheme.accentYellow,
                                  ),
                                ),
                              ],
                            ),
                            Text(
                              dev.id,
                              style: const TextStyle(fontFamily: 'monospace', fontSize: 10.5, color: AppTheme.textMuted),
                            ),
                            SizedBox(
                              width: double.infinity,
                              height: 30,
                              child: ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: isThisConnected ? AppTheme.statusRed : AppTheme.accentYellow,
                                  foregroundColor: isThisConnected ? Colors.white : Colors.black,
                                  padding: EdgeInsets.zero,
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
                                ),
                                onPressed: () {
                                  if (isThisConnected) {
                                    ble.disconnect();
                                  } else {
                                    ble.connect(dev.id);
                                  }
                                },
                                child: Text(
                                  isThisConnected ? "Shkëput" : "Lidhu me GATT",
                                  style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
          ),

          const SizedBox(height: 10),

          // Quick 20-Byte Command Buttons (Cmd 0x01, 0x02, 0x03)
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 14),
            child: Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.accentYellow,
                      foregroundColor: Colors.black,
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                    ),
                    onPressed: () => ble.sendCommand(0x01, "Ule Krahun (0x01)"),
                    child: const Text("Ule Krahun (0x01)", style: TextStyle(fontWeight: FontWeight.w800, fontSize: 12)),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.surfaceSubtle,
                      foregroundColor: AppTheme.textPrimary,
                      side: const BorderSide(color: AppTheme.borderLight),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                    ),
                    onPressed: () => ble.sendCommand(0x02, "Ngrite Krahun (0x02)"),
                    child: const Text("Ngrite (0x02)", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.surfaceSubtle,
                      foregroundColor: AppTheme.textPrimary,
                      side: const BorderSide(color: AppTheme.borderLight),
                      padding: const EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                    ),
                    onPressed: () => ble.sendCommand(0x03, "Auto-Raise (0x03)"),
                    child: const Text("Auto-Raise (0x03)", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11)),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 10),

          // Live Hex Log Console Header
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: const [
                Text(
                  "TERMINALI LIVE HEX (NORDIC UART)",
                  style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold, color: AppTheme.textMuted, letterSpacing: 0.8),
                ),
                Text(
                  "20-BYTE NUS PROTOCOL",
                  style: TextStyle(fontFamily: 'monospace', fontSize: 10, color: AppTheme.accentYellow),
                ),
              ],
            ),
          ),

          const SizedBox(height: 6),

          // Scrolling Terminal Log Window
          Expanded(
            child: Container(
              margin: const EdgeInsets.fromLTRB(14, 0, 14, 14),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppTheme.terminalBg,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: AppTheme.borderLight),
              ),
              child: ListView.builder(
                controller: _logScrollController,
                itemCount: ble.logs.length,
                itemBuilder: (ctx, i) {
                  final log = ble.logs[i];
                  final timeStr = "${log.timestamp.hour.toString().padLeft(2, '0')}:${log.timestamp.minute.toString().padLeft(2, '0')}:${log.timestamp.second.toString().padLeft(2, '0')}.${(log.timestamp.millisecond ~/ 100)}";

                  Color tagColor = AppTheme.textMuted;
                  if (log.direction == 'TX') tagColor = AppTheme.accentYellow;
                  if (log.direction == 'RX') tagColor = AppTheme.statusGreen;
                  if (log.direction == 'SYS') tagColor = Colors.cyanAccent;

                  return Padding(
                    padding: const EdgeInsets.only(bottom: 6.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Text(
                              "[$timeStr] ",
                              style: const TextStyle(fontFamily: 'monospace', fontSize: 10.5, color: AppTheme.textMuted),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                              decoration: BoxDecoration(
                                color: tagColor.withOpacity(0.18),
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Text(
                                log.direction,
                                style: TextStyle(fontFamily: 'monospace', fontSize: 10, fontWeight: FontWeight.bold, color: tagColor),
                              ),
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                log.message,
                                style: const TextStyle(fontSize: 11.5, color: AppTheme.textPrimary),
                              ),
                            ),
                          ],
                        ),
                        if (log.rawBytes != null)
                          Padding(
                            padding: const EdgeInsets.only(left: 12.0, top: 3.0),
                            child: Text(
                              "HEX: ${log.formattedHex}",
                              style: TextStyle(
                                fontFamily: 'monospace',
                                fontSize: 11,
                                color: tagColor.withOpacity(0.85),
                                letterSpacing: 0.5,
                              ),
                            ),
                          ),
                      ],
                    ),
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
