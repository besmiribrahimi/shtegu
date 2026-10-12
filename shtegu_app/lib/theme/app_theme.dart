import 'package:flutter/material.dart';

class AppTheme {
  // Brand Color Palette
  static const Color background = Color(0xFF0B0B0D); // Matte asphalt
  static const Color surface = Color(0xFF16181D);    // Deep charcoal
  static const Color surfaceSubtle = Color(0xFF1F222A);
  static const Color accentYellow = Color(0xFFFFB703); // Hazard / Traffic Yellow
  static const Color accentYellowDark = Color(0xFFD99B00);
  static const Color textPrimary = Color(0xFFFFFFFF);
  static const Color textMuted = Color(0xFF8F96A3);
  static const Color borderLight = Color(0xFF282C37);
  static const Color statusGreen = Color(0xFF10B981);
  static const Color statusRed = Color(0xFFEF4444);
  static const Color terminalBg = Color(0xFF050507);

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: background,
      primaryColor: accentYellow,
      cardColor: surface,
      dividerColor: borderLight,
      colorScheme: const ColorScheme.dark(
        primary: accentYellow,
        secondary: accentYellow,
        surface: surface,
        background: background,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: background,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: textPrimary,
          fontSize: 18,
          fontWeight: FontWeight.w800,
          letterSpacing: -0.3,
        ),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: surface,
        selectedItemColor: accentYellow,
        unselectedItemColor: textMuted,
        type: BottomNavigationBarType.fixed,
        elevation: 10,
      ),
    );
  }
}
