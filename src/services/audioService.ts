import { Audio } from 'expo-av';
import { Platform } from 'react-native';

export class AudioService {
  private static activeRecording: Audio.Recording | null = null;
  private static activeSound: Audio.Sound | null = null;

  public static async requestPermission(): Promise<boolean> {
    try {
      const permission = await Audio.requestPermissionsAsync();
      return permission.granted;
    } catch {
      return false;
    }
  }

  public static async startRecording(
    onStatusUpdate?: (status: Audio.RecordingStatus) => void
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const granted = await this.requestPermission();
      if (!granted) {
        return {
          success: false,
          error: 'Microphone access is needed so PitchMe can evaluate your communication.',
        };
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      if (this.activeRecording) {
        try {
          await this.activeRecording.stopAndUnloadAsync();
        } catch {
          // ignore cleanup errors
        }
        this.activeRecording = null;
      }

      const recordingOptions = {
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        isMeteringEnabled: true,
      };

      const { recording } = await Audio.Recording.createAsync(
        recordingOptions,
        onStatusUpdate,
        100
      );

      this.activeRecording = recording;
      return { success: true };
    } catch (err: any) {
      console.warn('Start recording error:', err);
      return {
        success: false,
        error: 'Unable to start recording. Please verify microphone permissions and retry.',
      };
    }
  }

  public static async stopRecording(): Promise<{ uri: string | null }> {
    if (!this.activeRecording) {
      return { uri: null };
    }

    try {
      await this.activeRecording.stopAndUnloadAsync();
      const uri = this.activeRecording.getURI();
      this.activeRecording = null;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      return { uri };
    } catch (err) {
      console.warn('Stop recording error:', err);
      this.activeRecording = null;
      return { uri: null };
    }
  }

  public static async playSound(
    uri: string,
    onPlaybackStatusUpdate?: (status: any) => void
  ): Promise<{ sound: Audio.Sound | null; error?: string }> {
    try {
      if (this.activeSound) {
        try {
          await this.activeSound.stopAsync();
          await this.activeSound.unloadAsync();
        } catch {
          // ignore
        }
        this.activeSound = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true },
        onPlaybackStatusUpdate
      );

      this.activeSound = sound;
      return { sound };
    } catch (err) {
      console.warn('Play sound error:', err);
      return { sound: null, error: 'Could not play audio recording.' };
    }
  }

  public static async stopSound(): Promise<void> {
    if (this.activeSound) {
      try {
        await this.activeSound.stopAsync();
        await this.activeSound.unloadAsync();
      } catch {
        // ignore
      }
      this.activeSound = null;
    }
  }
}
