import React from 'react';
import { ArrowLeft, Shield, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            {/* <button 
              onClick={() => window.history.back()} 
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button> */}
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <h1 className="text-xl font-semibold text-slate-900">Privacy Policy</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border">
          {/* App Info Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b rounded-t-lg">
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-slate-700">App Name:</span>
                <p className="text-slate-900 font-semibold">Invaders</p>
              </div>
              <div>
                <span className="font-medium text-slate-700">Package Name:</span>
                <p className="text-slate-900 font-mono text-xs">com.antash.invaders</p>
              </div>
              <div>
                <span className="font-medium text-slate-700">Developer:</span>
                <p className="text-slate-900 font-semibold">Antash Mishra</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-100">
              <p className="text-sm text-slate-600 italic">
                Effective Date: June 23, 2025
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8 prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Introduction
              </h2>
              <p className="text-slate-700 leading-relaxed">
                This privacy policy describes how Invaders ("we", "our", or "us") collects, uses, and protects your information when you use our mobile game application. Invaders is a classic arcade-style space shooter game inspired by retro gaming experiences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Information We Collect
              </h2>
              
              <h3 className="text-lg font-medium text-slate-800 mb-3 mt-6">
                Automatically Collected Information
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Game Progress Data:</strong> High scores, level progression, and gameplay statistics</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Device Information:</strong> Device model, operating system version, and unique device identifiers for crash reporting and performance optimization</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Usage Analytics:</strong> Game session duration, feature usage, and performance metrics to improve the gaming experience</span>
                </li>
              </ul>

              <h3 className="text-lg font-medium text-slate-800 mb-3 mt-6">
                Google Play Games Services
              </h3>
              <p className="text-slate-700 mb-3">Our game integrates with Google Play Games Services, which may collect:</p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Your Google Play Games profile information</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Game achievements and leaderboard data</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Friends list and social gaming interactions</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Cloud save data for game progress synchronization</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                How We Use Your Information
              </h2>
              <p className="text-slate-700 mb-3">We use the collected information for the following purposes:</p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Game Functionality:</strong> To provide core gaming features, save progress, and maintain high scores</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Performance Improvement:</strong> To optimize game performance and fix bugs</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Social Features:</strong> To enable leaderboards, achievements, and social gaming through Google Play Games Services</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Analytics:</strong> To understand how players interact with our game and improve the user experience</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Information Sharing
              </h2>
              <p className="text-slate-700 mb-3">We do not sell, trade, or otherwise transfer your personal information to third parties except in the following cases:</p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Google Play Games Services:</strong> Game data is shared with Google to provide social gaming features</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Service Providers:</strong> With trusted third-party services that help us operate our game (analytics, crash reporting)</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Data Storage and Security
              </h2>
              <p className="text-slate-700 mb-3">We implement appropriate security measures to protect your information:</p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Game progress is stored locally on your device</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Cloud saves are securely stored through Google Play Games Services</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>We use industry-standard encryption for data transmission</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>No sensitive personal information is collected or stored</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Children's Privacy
              </h2>
              <p className="text-slate-700 mb-3">Our game is suitable for all ages. We do not knowingly collect personal information from children under 13. The game does not contain:</p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Chat features or communication with other players</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>In-app purchases</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Links to external websites or social media</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Personal information collection forms</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Third-Party Services
              </h2>
              <p className="text-slate-700 mb-3">Our game uses the following third-party services:</p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Google Play Games Services:</strong> For achievements, leaderboards, and cloud saves. Governed by Google's Privacy Policy.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Google Play Services:</strong> For app functionality and analytics. Governed by Google's Privacy Policy.</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Your Rights
              </h2>
              <p className="text-slate-700 mb-3">You have the following rights regarding your data:</p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Access:</strong> You can view your game progress and achievements within the app</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Deletion:</strong> You can delete local game data by uninstalling the app</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Google Play Data:</strong> You can manage your Google Play Games data through your Google account settings</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Opt-out:</strong> You can disable Google Play Games Services integration in the game settings</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Data Retention
              </h2>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Local game data is retained until you uninstall the app</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Cloud save data is retained according to Google Play Games Services policies</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Analytics data is retained for up to 2 years for performance improvement purposes</span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Changes to This Policy
              </h2>
              <p className="text-slate-700">
                We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
              </p>
            </section>
          </div>

          {/* Contact Footer */}
          <div className="bg-slate-50 px-8 py-6 border-t rounded-b-lg">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Contact Information
            </h3>
            <p className="text-slate-700 mb-4">
              If you have any questions about this privacy policy or our data practices, please contact us:
            </p>
            <div className="bg-white p-4 rounded-lg border">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-slate-700">Email:</span>
                  <p className="text-blue-600">antash.mishra@example.com</p>
                </div>
                <div>
                  <span className="font-medium text-slate-700">Developer:</span>
                  <p className="text-slate-900">Antash Mishra</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200">
                <span className="font-medium text-slate-700">App:</span>
                <p className="text-slate-900">Invaders (com.antash.invaders)</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">
              This privacy policy was last updated on June 23, 2025.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy; 