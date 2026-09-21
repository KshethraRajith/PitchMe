import { Audio } from 'expo-av';
import { Platform } from 'react-native';

export class AudioService {
  // Mobile (expo-av) state
  private static activeRecording: Audio.Recording | null = null;
  private static activeSound: Audio.Sound | null = null;

  // Web (MediaRecorder / HTML5 Audio) state
  private static webMediaRecorder: any = null;
  private static webAudioChunks: any[] = [];
  private static webMediaStream: any = null;
  private static webAudioElement: any = null;

  public static async requestPermission(): Promise<boolean> {
    if (Platform.OS === 'web') {
      try {
        if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          // Stop stream immediately after permission check
          stream.getTracks().forEach((track) => track.stop());
          return true;
        }
        return false;
      } catch {
        return false;
      }
    }

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
    // Web Recording implementation via MediaRecorder
    if (Platform.OS === 'web') {
      try {
        if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
          return {
            success: false,
            error: 'Your browser does not support microphone recording.',
          };
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.webMediaStream = stream;
        this.webAudioChunks = [];

        // Check supported mime type
        const mimeType =
          typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('audio/webm')
            ? 'audio/webm'
            : '';

        const recorder = mimeType
          ? new (window as any).MediaRecorder(stream, { mimeType })
          : new (window as any).MediaRecorder(stream);

        recorder.ondataavailable = (e: any) => {
          if (e.data && e.data.size > 0) {
            this.webAudioChunks.push(e.data);
          }
        };

        recorder.start(100);
        this.webMediaRecorder = recorder;
        return { success: true };
      } catch (err: any) {
        console.warn('Web start recording error:', err);
        return {
          success: false,
          error: 'Microphone access is needed so PitchMe can evaluate your communication.',
        };
      }
    }

    // Native Mobile Recording
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
    // Web Stop Recording
    if (Platform.OS === 'web') {
      return new Promise<{ uri: string | null }>((resolve) => {
        if (!this.webMediaRecorder) {
          resolve({ uri: null });
          return;
        }

        this.webMediaRecorder.onstop = () => {
          try {
            const mimeType = this.webMediaRecorder?.mimeType || 'audio/webm';
            const audioBlob = new Blob(this.webAudioChunks, { type: mimeType });
            const uri = URL.createObjectURL(audioBlob);

            if (this.webMediaStream) {
              this.webMediaStream.getTracks().forEach((track: any) => track.stop());
              this.webMediaStream = null;
            }
            this.webMediaRecorder = null;
            resolve({ uri });
          } catch (err) {
            console.warn('Error creating audio blob on web:', err);
            resolve({ uri: null });
          }
        };

        try {
          this.webMediaRecorder.stop();
        } catch {
          resolve({ uri: null });
        }
      });
    }

    // Native Stop Recording
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
    // Web Audio Playback
    if (Platform.OS === 'web') {
      try {
        if (this.webAudioElement) {
          this.webAudioElement.pause();
          this.webAudioElement = null;
        }

        const audio = new (window as any).Audio(uri);
        this.webAudioElement = audio;

        audio.onended = () => {
          if (onPlaybackStatusUpdate) {
            onPlaybackStatusUpdate({ isLoaded: true, didJustFinish: true });
          }
        };

        await audio.play();
        return { sound: audio as any };
      } catch (err) {
        console.warn('Play sound error on web:', err);
        return { sound: null, error: 'Could not play audio recording.' };
      }
    }

    // Native Mobile Audio Playback
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
    // Web Stop Playback
    if (Platform.OS === 'web') {
      if (this.webAudioElement) {
        try {
          this.webAudioElement.pause();
          this.webAudioElement.currentTime = 0;
        } catch {
          // ignore
        }
        this.webAudioElement = null;
      }
      return;
    }

    // Native Stop Playback
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
