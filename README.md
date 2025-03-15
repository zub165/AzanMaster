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
- Dark/Light mode support
- Responsive layout
- Prayer time countdown
- Next prayer highlighting
- Accessibility features

### Additional Features
- Browser notifications
- Offline support
- Local storage for preferences
- Multiple language support
- Qibla direction
- Islamic calendar

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/adhan-master.git
cd adhan-master
```

2. Open the application:
   - For development: Use a local server (e.g., Live Server in VS Code)
   - For production: Deploy to your web server

## Usage

1. Allow location access when prompted to get accurate prayer times for your location
2. Select your preferred calculation method and madhab
3. Configure DST settings based on your location
4. Enable notifications to receive prayer time alerts
5. Use the Qibla compass to find the direction of prayer
6. Select your preferred Qari for each prayer time

## Configuration

### Prayer Time Settings
- Select calculation method in settings
- Choose madhab preference
- Adjust high latitude rules if needed
- Configure DST handling

### Audio Settings
- Select preferred Qari
- Set volume levels
- Configure notification preferences
- Choose Fajr-specific settings

### Location Settings
- Enable automatic location detection
- Set manual coordinates if preferred
- Configure timezone settings
- Adjust DST preferences

## Technical Details

### Prayer Time Calculation
- Uses Adhan.js library for accurate calculations
- Supports various calculation methods
- Handles extreme latitudes
- DST and timezone aware

### Audio System
- Progressive loading
- Multiple fallback sources
- Cache management
- Error handling

### Data Management
- Local storage for preferences
- Cache for calculations
- Offline capability
- API fallback system

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

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