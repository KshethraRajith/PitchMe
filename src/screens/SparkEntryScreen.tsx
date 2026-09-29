import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SparkEntryScreenProps {
  userName: string;
  userEmail?: string;
  isNewUser?: boolean;
  onComplete: () => void;
}

// 8 Spark particles radiating outward
const SPARK_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export const SparkEntryScreen: React.FC<SparkEntryScreenProps> = ({
  userName,
  userEmail,
  isNewUser = false,
  onComplete,
}) => {
  // Animation drivers
  const sparkScale = useRef(new Animated.Value(0)).current;
  const sparkOpacity = useRef(new Animated.Value(0)).current;
  const sparkRotate = useRef(new Animated.Value(0)).current;

  const logoScale = useRef(new Animated.Value(0.1)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const ring1Scale = useRef(new Animated.Value(0.2)).current;
  const ring1Opacity = useRef(new Animated.Value(0)).current;

  const ring2Scale = useRef(new Animated.Value(0.2)).current;
  const ring2Opacity = useRef(new Animated.Value(0)).current;

  const ring3Scale = useRef(new Animated.Value(0.2)).current;
  const ring3Opacity = useRef(new Animated.Value(0)).current;

  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(24)).current;

  const flashOpacity = useRef(new Animated.Value(0)).current;
  const containerScale = useRef(new Animated.Value(1)).current;

  // Synthesize a cosmic chime using Web Audio API on web platform
  const playWebChime = () => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        const AudioCtx =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          if (ctx.state === 'suspended') {
            ctx.resume();
          }

          // Harmonic sparkling chime
          const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C major pentatonic shimmer
          freqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

            gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
            gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.08 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.8);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + idx * 0.08);
            osc.stop(ctx.currentTime + idx * 0.08 + 0.85);
          });
        }
      }
    } catch {
      // Audio autoplay policy fallback, non-critical
    }
  };

  useEffect(() => {
    playWebChime();

    // 1. Initial Spark Ignition & Rotation
    Animated.loop(
      Animated.timing(sparkRotate, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Sequence of cosmic entry animation
    Animated.sequence([
      // Stage 1: The Spark ignites at the center
      Animated.parallel([
        Animated.timing(sparkScale, {
          toValue: 1,
          duration: 450,
          easing: Easing.out(Easing.back(1.8)),
          useNativeDriver: true,
        }),
        Animated.timing(sparkOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),

      // Stage 2: Logo emerges from within the spark & Rings expand
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 550,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // First energy shockwave
        Animated.parallel([
          Animated.timing(ring1Scale, {
            toValue: 2.2,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(ring1Opacity, {
              toValue: 0.9,
              duration: 250,
              useNativeDriver: true,
            }),
            Animated.timing(ring1Opacity, {
              toValue: 0,
              duration: 550,
              useNativeDriver: true,
            }),
          ]),
        ]),
        // Second energy shockwave
        Animated.sequence([
          Animated.delay(180),
          Animated.parallel([
            Animated.timing(ring2Scale, {
              toValue: 3.2,
              duration: 800,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(ring2Opacity, {
                toValue: 0.7,
                duration: 250,
                useNativeDriver: true,
              }),
              Animated.timing(ring2Opacity, {
                toValue: 0,
                duration: 550,
                useNativeDriver: true,
              }),
            ]),
          ]),
        ]),
        // Welcome text slides in
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(textTranslateY, {
            toValue: 0,
            duration: 500,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),

      // Stage 3: Hold momentarily so the user appreciates the brand entry
      Animated.delay(400),

      // Stage 4: Light Burst / Supernova Entry into the app
      Animated.parallel([
        // Screen flash
        Animated.sequence([
          Animated.timing(flashOpacity, {
            toValue: 0.95,
            duration: 260,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(flashOpacity, {
            toValue: 0,
            duration: 350,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
        // Logo zooms into viewer like a stargate
        Animated.timing(logoScale, {
          toValue: 2.6,
          duration: 380,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 360,
          useNativeDriver: true,
        }),
        Animated.timing(ring3Scale, {
          toValue: 6,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(ring3Opacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(containerScale, {
          toValue: 1.15,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Transition complete, open main app tabs
      onComplete();
    });
  }, []);

  const spinInterpolation = sparkRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* Main Animated Universe */}
      <Animated.View
        style={[
          styles.universe,
          {
            transform: [{ scale: containerScale }],
          },
        ]}
      >
        {/* Background Radial Light Glow */}
        <Animated.View
          style={[
            styles.ambientGlow,
            {
              opacity: sparkOpacity,
              transform: [{ scale: sparkScale }],
            },
          ]}
        />

        {/* Concentric Energy Shockwave Rings */}
        <Animated.View
          style={[
            styles.shockwaveRing,
            styles.ring1,
            {
              opacity: ring1Opacity,
              transform: [{ scale: ring1Scale }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.shockwaveRing,
            styles.ring2,
            {
              opacity: ring2Opacity,
              transform: [{ scale: ring2Scale }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.shockwaveRing,
            styles.ring3,
            {
              opacity: ring3Opacity,
              transform: [{ scale: ring3Scale }],
            },
          ]}
        />

        {/* Radiating Light Spark Rays */}
        <Animated.View
          style={[
            styles.sparkRayContainer,
            {
              opacity: sparkOpacity,
              transform: [{ scale: sparkScale }, { rotate: spinInterpolation }],
            },
          ]}
        >
          {SPARK_ANGLES.map((angle, idx) => (
            <View
              key={idx}
              style={[
                styles.sparkRay,
                {
                  transform: [{ rotate: `${angle}deg` }],
                },
              ]}
            >
              <View style={styles.sparkPoint} />
            </View>
          ))}
        </Animated.View>

        {/* Center Spark Starburst Core */}
        <Animated.View
          style={[
            styles.sparkCore,
            {
              opacity: sparkOpacity,
              transform: [{ scale: sparkScale }],
            },
          ]}
        />

        {/* PitchMe Logo with luminous glow */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={styles.logoHaloGlow} />
          <Image
            source={require('../../assets/logo.jpg')}
            style={styles.logoImage}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Welcome Text and Status */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: textOpacity,
              transform: [{ translateY: textTranslateY }],
            },
          ]}
        >
          <View style={styles.pillBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.pillText}>
              {isNewUser ? 'ACCOUNT CREATED' : 'ACCESS GRANTED'}
            </Text>
          </View>

          <Text style={styles.welcomeTitle}>
            Welcome, {userName || 'Pitcher'}!
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Igniting your personal AI voice coach...
          </Text>
        </Animated.View>
      </Animated.View>

      {/* Screen-Wide Radiant Flare Flash on Entry */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.screenFlash,
          {
            opacity: flashOpacity,
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#06060C',
  },
  universe: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  ambientGlow: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(139, 92, 246, 0.22)',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 80,
  },
  shockwaveRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
  },
  ring1: {
    borderColor: '#38BDF8',
    shadowColor: '#38BDF8',
    shadowOpacity: 0.9,
    shadowRadius: 20,
  },
  ring2: {
    borderColor: '#A855F7',
    shadowColor: '#A855F7',
    shadowOpacity: 0.8,
    shadowRadius: 24,
  },
  ring3: {
    borderColor: '#EC4899',
    shadowColor: '#EC4899',
    shadowOpacity: 0.7,
    shadowRadius: 28,
  },
  sparkRayContainer: {
    position: 'absolute',
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkRay: {
    position: 'absolute',
    width: 3,
    height: 120,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  sparkPoint: {
    width: 3,
    height: 38,
    borderRadius: 2,
    backgroundColor: '#67E8F9',
    shadowColor: '#67E8F9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  sparkCore: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 36,
  },
  logoContainer: {
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoHaloGlow: {
    position: 'absolute',
    width: 124,
    height: 124,
    borderRadius: 32,
    backgroundColor: 'rgba(167, 139, 250, 0.45)',
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 40,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  textContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.35)',
    marginBottom: 12,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ADE80',
    marginRight: 6,
  },
  pillText: {
    color: '#86EFAC',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  screenFlash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
    zIndex: 999,
  },
});
