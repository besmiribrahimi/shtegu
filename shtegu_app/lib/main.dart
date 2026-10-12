import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'services/ble_service.dart';
import 'theme/app_theme.dart';
import 'views/driver_view.dart';
import 'views/ble_lab_view.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => BleService()),
      ],
      child: const ShteguApp(),
    ),
  );
}

class ShteguApp extends StatelessWidget {
  const ShteguApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SHTEGU Prototype',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: const MainNavigationScreen(),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    DriverView(),
    BleLabView(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          border: Border(
            top: BorderSide(color: AppTheme.borderLight, width: 1),
          ),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) {
            setState(() {
              _currentIndex = index;
            });
          },
          backgroundColor: AppTheme.surface,
          selectedItemColor: AppTheme.accentYellow,
          unselectedItemColor: AppTheme.textMuted,
          selectedLabelStyle: const TextStyle(fontWeight: FontWeight.w800, fontSize: 12),
          unselectedLabelStyle: const TextStyle(fontWeight: FontWeight.w600, fontSize: 12),
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.local_parking_rounded),
              activeIcon: Icon(Icons.local_parking_rounded, color: AppTheme.accentYellow),
              label: 'Shoferi',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.terminal_rounded),
              activeIcon: Icon(Icons.terminal_rounded, color: AppTheme.accentYellow),
              label: 'Laboratori BLE',
            ),
          ],
        ),
      ),
    );
  }
}
