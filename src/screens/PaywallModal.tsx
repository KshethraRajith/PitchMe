import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';

interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccessPro: () => void;
  improvementText?: string;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  visible,
  onClose,
  onSuccessPro,
  improvementText = '61 → 87 🎉',
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const proFeatures = [
    'Unlimited voice practice sessions',
    'Advanced coaching & detailed delivery analysis',
    'Full access to Technical, Viva & Campus Placement modes',
    'Side-by-side attempt comparison & trajectory charts',
    'Custom interview question generation',
  ];

  const handleSubscribe = () => {
    onSuccessPro();
    alert('🎉 Welcome to PitchMe Pro! Unlimited practice unlocked.');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />

        {/* Close button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Crown */}
          <View style={styles.crownOrb}>
            <Text style={{ fontSize: 34 }}>👑</Text>
          </View>

          {/* Headline */}
          <Text style={styles.eyebrow}>KEEP THE MOMENTUM GOING</Text>
          <Text style={styles.title}>You've improved from{'\n'}{improvementText}</Text>
          <Text style={styles.subtitle}>
            Continue accelerating your communication confidence with PitchMe Pro.
          </Text>

          {/* Features List */}
          <View style={styles.featuresCard}>
            {proFeatures.map((feat) => (
              <View key={feat} style={styles.featureRow}>
                <Text style={styles.checkIcon}>✓</Text>
                <Text style={styles.featureText}>{feat}</Text>
              </View>
            ))}
          </View>

          {/* Plan Selector */}
          <View style={styles.planSelector}>
            {/* Monthly */}
            <TouchableOpacity
              onPress={() => setSelectedPlan('monthly')}
              style={[
                styles.planCard,
                selectedPlan === 'monthly' && styles.planCardSelected,
              ]}
              activeOpacity={0.8}
            >
              <Text style={styles.planName}>MONTHLY</Text>
              <Text style={styles.planPrice}>
                ₹299 <Text style={styles.planPer}>/ month</Text>
              </Text>
              <Text style={styles.planSub}>Flexible month-to-month</Text>
            </TouchableOpacity>

            {/* Yearly */}
            <TouchableOpacity
              onPress={() => setSelectedPlan('yearly')}
              style={[
                styles.planCard,
                selectedPlan === 'yearly' && styles.planCardSelected,
              ]}
              activeOpacity={0.8}
            >
              <View style={styles.bestValueTag}>
                <Text style={styles.bestValueText}>BEST VALUE · SAVE 58%</Text>
              </View>
              <Text style={styles.planName}>YEARLY ACCESS</Text>
              <Text style={styles.planPrice}>
                ₹1,499 <Text style={styles.planPer}>/ year</Text>
              </Text>
              <Text style={styles.planSub}>Just ₹125 / month, billed annually</Text>
            </TouchableOpacity>
          </View>

          {/* CTA */}
          <View style={styles.actionWrap}>
            <PrimaryButton
              label={
                selectedPlan === 'yearly'
                  ? 'Start PitchMe Pro Yearly  →'
                  : 'Start PitchMe Pro Monthly  →'
              }
              onPress={handleSubscribe}
            />
            <Text style={styles.disclaimer}>
              Cancel anytime in Google Play / App Store. Handled securely via RevenueCat.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0B0B14',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#1C1C2C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#9494A8',
    fontSize: 16,
    fontWeight: '800',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  crownOrb: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#291C4A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#6D28D9',
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 6,
  },
  eyebrow: {
    color: '#A78BFA',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    textAlign: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.6,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 34,
  },
  subtitle: {
    color: '#8E8EA8',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
    maxWidth: 290,
  },
  featuresCard: {
    backgroundColor: '#141420',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#242436',
    marginTop: 24,
    gap: 14,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkIcon: {
    color: '#10B981',
    fontSize: 15,
    fontWeight: '900',
  },
  featureText: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  planSelector: {
    width: '100%',
    marginTop: 20,
    gap: 12,
  },
  planCard: {
    backgroundColor: '#141420',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#242436',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: '#1C1732',
  },
  bestValueTag: {
    position: 'absolute',
    top: -11,
    right: 16,
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  bestValueText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  planName: {
    color: '#8E8EA8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  planPrice: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 4,
  },
  planPer: {
    color: '#8E8EA8',
    fontSize: 12,
    fontWeight: '600',
  },
  planSub: {
    color: '#A78BFA',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  actionWrap: {
    width: '100%',
    marginTop: 24,
    gap: 12,
  },
  disclaimer: {
    color: '#65657A',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
});
