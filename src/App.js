import React from 'react';
import './App.css';
import FeatureToogleApp from './components/feature';
import FlagsProvider from './components/FlagsProvider';
const ChatPage = () => <div>Chat</div>;
const Other = () => <div>Other</div>;

function App() {
  return (
    <div className="App">
      <FeatureToogleApp />
      <FlagsProvider
        defaults={{
          someAwesomeFeatureEnabled: false,
        }}
      >
        <ChatPage />
      </FlagsProvider>
      {/* <FlagsProvider
        defaults={{
          isValidPlans: 'CallCenter',
        }}
      >
        <Other />
      </FlagsProvider> */}
    </div>
  );
}

export default App;
