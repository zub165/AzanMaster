# Adhan Master - Islamic Prayer Times Application

A modern, feature-rich web application for accurate Islamic prayer times calculation and Adhan notifications.

![Adhan Master Screenshot](./screenshot.png)

## Features

### Prayer Time Calculations
- Multiple calculation methods supported (Muslim World League, Egyptian, Karachi, etc.)
- Madhab-specific calculations (Hanafi, Shafi, etc.)
- High latitude prayer time adjustments
- Automatic location detection
- API fallback system for reliable calculations

### Adhan Player
- Multiple Qari (muezzin) options
- Special Fajr Adhan support
- Audio fallback system
- Quality audio from trusted sources
- Volume control and customization

### Daylight Saving Time (DST) Management
- Automatic DST detection
- Manual DST override options
- Custom time adjustments
- Timezone awareness
- Real-time updates

### User Interface
- Clean, modern design
- Multiple theme options (Light, Dark, Desert, Emerald, Azure, Ramadan, Night, Calligraphy)
- Responsive layout for all devices
- Prayer time countdown
- Next prayer highlighting
- Accessibility features

### Additional Features
- Browser notifications
- Offline support via Service Worker
- Local storage for preferences
- Multiple language support
- Qibla direction
- Islamic calendar

## Cross-Platform Compatibility

Adhan Master is designed to work seamlessly across all platforms:

### Web Browsers
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers on iOS and Android
- Responsive design adapts to all screen sizes

### Progressive Web App (PWA)
- Install on home screen for app-like experience
- Works offline with cached data
- Push notifications for prayer times
- Automatic updates

### iOS Compatibility
- Full support for Safari on iOS
- Home screen installation
- Optimized for all iPhone and iPad models
- iOS-specific UI adjustments

### Android Compatibility
- Works on all Android versions
- Chrome and other Chromium-based browsers
- Home screen installation
- Notification support

## Installation

### Web Version
1. Visit the application URL in any modern browser
2. Allow location access when prompted for accurate prayer times
3. Optionally install as PWA by clicking "Add to Home Screen" in your browser menu

### iOS Installation
1. Open Safari and navigate to the application URL
2. Tap the Share button (box with arrow)
3. Select "Add to Home Screen"
4. Confirm the name and tap "Add"

### Android Installation
1. Open Chrome and navigate to the application URL
2. Tap the menu button (three dots)
3. Select "Add to Home Screen" or "Install App"
4. Follow the prompts to complete installation

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/zub165/AzanMaster.git
cd AzanMaster
```

2. Install dependencies (for icon generation):
```bash
npm install sharp
```

3. Generate app icons:
```bash
node generate-icons.js
```

4. Serve the application locally:
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx serve
```

5. Open in browser:
```
http://localhost:8000
```

## Building for Production

1. Optimize assets:
```bash
# Minify CSS
npx clean-css-cli css/styles.css -o css/styles.min.css

# Minify JavaScript
npx terser js/modules/*.js -o js/app.min.js
```

2. Update HTML to use minified files
3. Test thoroughly on all target platforms
4. Deploy to your web server

## Testing on Different Platforms

### Browser Testing
- Test on Chrome, Firefox, Safari, and Edge
- Use browser dev tools to simulate different screen sizes
- Test with different network conditions (fast, slow, offline)

### Mobile Testing
- Test on actual iOS and Android devices
- Test installation as PWA on both platforms
- Verify notifications work correctly
- Test offline functionality

### Accessibility Testing
- Test with screen readers
- Verify keyboard navigation works
- Check color contrast for all themes

## Troubleshooting

### iOS Issues
- If notifications don't work, check Safari settings
- For audio issues, ensure user has interacted with the page first
- PWA installation requires Safari browser

### Android Issues
- Notification permissions may need to be granted in system settings
- For location issues, check app permissions in system settings
- Audio playback may require user interaction first

### General Issues
- Clear browser cache if experiencing outdated content
- Check console for JavaScript errors
- Verify internet connection for API-based features
- Ensure location services are enabled for accurate prayer times

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Adhan.js](https://github.com/batoulapps/adhan-js) library for prayer time calculations
- Various Qari contributions for Adhan audio
- Community feedback and support

## Support

For issues and feature requests, please use the GitHub issues system or contact the maintainers.

## Security

Please report any security vulnerabilities to the maintainers directly rather than creating a public issue. 

33 Functions
graph TD
    A[DOM Content Loaded] --> B[AppInitializer.initialize]
    
    %% Main Initialization Flow
    B --> C1[loadAdhanLibrary]
    B --> C2[initializeLocation]
    B --> C3[initializeComponents]
    B --> C4[setupEventListeners]
    B --> C5[initializeHeaderComponents]
    B --> C6[startPeriodicUpdates]

    %% Location Management
    C2 --> D1[getCurrentPosition]
    D1 --> D2[updateLocationDisplay]
    D1 --> E1{Location Available?}
    E1 -->|Yes| F1[Use Current Location]
    E1 -->|No| F2[Use Makkah Coordinates]

    %% Component Initialization
    C3 --> G1[initializeDSTSettings]
    C3 --> G2[Initialize Prayer Calculation]
    C3 --> G3[Initialize Adhan Player]
    C3 --> G4[Initialize Qibla Compass]
    C3 --> G5[Update Islamic Calendar]

    %% Header Components
    C5 --> H1[updateCurrentTime]
    C5 --> H2[generateIslamicCalendar]
    C5 --> H3[updateMoonPhase]

    %% Periodic Updates
    C6 --> I1[Update Prayer Times - 1min]
    C6 --> I2[Update Calendar/Moon - 1hr]
    C6 --> I3[Update DST Status - 24hr]
    C6 --> I4[Update Location - 30min]

    %% Prayer Calculation Flow
    G2 --> J1[calculatePrayerTimes]
    J1 --> J2[updatePrayerTimesUI]
    J1 --> J3[setupPrayerNotifications]

    %% Islamic Calendar Flow
    H2 --> K1[getIslamicDate]
    K1 --> K2[getDaysInIslamicMonth]
    K1 --> K3[formatIslamicDate]

    %% Moon Phase Calculation
    H3 --> L1[calculateMoonPhase]
    L1 --> L2[getMoonPhase]
    L2 --> L3[updateMoonPhaseDisplay]

    %% Event Listeners
    C4 --> M1[Prayer Time Tests]
    C4 --> M2[Notification Permission]
    C4 --> M3[Calculation Method]
    C4 --> M4[Madhab Selection]
    C4 --> M5[DST Settings]
    C4 --> M6[Theme Changes]
    C4 --> M7[Location Refresh]

    %% Theme Management
    M6 --> N1[updateUIForTheme]
    N1 --> N2[Update Prayer Cards]
    N1 --> N3[Update Moon Phase]
    N1 --> N4[Update Qibla Compass]
    N1 --> N5[Handle Special Themes]

    %% Error Handling
    B --> O1{Error Occurred?}
    O1 -->|Yes| O2[showError]
    O1 -->|No| O3[Continue Operation]

    %% Adhan Player
    G3 --> P1[initializeAudio]
    P1 --> P2[setupNotifications]
    P1 --> P3[loadAudioFiles]

    %% Qibla Compass
    G4 --> Q1[initializeCompass]
    Q1 --> Q2[calculateQiblaDirection]
    Q2 --> Q3[showStaticDirection]

    Application Initialization
AppInitializer.initialize(): Main entry point
Loads required libraries
Sets up components
Initializes periodic updates
Location Management
getCurrentPosition(): Gets user location
updateLocationDisplay(): Updates UI
Fallback to Makkah coordinates if needed
Prayer Time Calculation
calculatePrayerTimes(): Computes prayer times
updatePrayerTimesUI(): Updates display
Handles DST adjustments
Islamic Calendar
getIslamicDate(): Converts Gregorian to Hijri
generateIslamicCalendar(): Creates calendar display
formatIslamicDate(): Formats dates
Moon Phase
calculateMoonPhase(): Computes current phase
updateMoonPhase(): Updates display
SVG generation for visualization
Theme Management
updateUIForTheme(): Applies theme changes
Handles special themes (e.g., Ramadan)
Updates component appearances
Periodic Updates
Prayer times (every minute)
Calendar/Moon (hourly)
DST status (daily)
Location (every 30 minutes)
Event Listeners
Prayer time tests
Notifications
Settings changes
Theme switching
Location refresh
Error Handling
Graceful degradation
User notifications
Fallback options